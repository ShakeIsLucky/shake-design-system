#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "fal-client>=0.5.6",
#     "httpx>=0.27.0",
# ]
# ///
"""
Batch image/video generation for the UI course via fal.ai.

Manifest: JSON array of jobs:
  {"id": "ch1-vignelli-map", "kind": "image", "model": "flash"|"pro",
   "prompt": "...", "aspect_ratio": "4:3", "out": "assets/img/ch1-vignelli-map.png"}
  {"id": "ch6-clip", "kind": "video", "model": "kling",
   "prompt": "...", "out": "assets/video/ch6-clip.mp4"}

Usage:
    uv run batch_generate.py --manifest manifest.json --base-dir /path/to/course [--only id1,id2] [--workers 4]

Skips jobs whose output file already exists (delete the file to regenerate).
Prints one line per job: OK/FAIL id -> path. Exit code 1 if any job failed.
"""

import argparse
import json
import os
import sys
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import fal_client
import httpx

IMAGE_MODELS = {
    "flash": "fal-ai/nano-banana-2",
    "pro": "fal-ai/nano-banana-pro",
}
VIDEO_MODELS = {
    # text-to-video, 5s default
    "kling": "fal-ai/kling-video/v3/standard/text-to-video",
    "wan": "fal-ai/wan/v2.7/text-to-video",
}

print_lock = threading.Lock()


def log(msg: str) -> None:
    with print_lock:
        print(msg, flush=True)


def download(url: str, out: Path) -> None:
    out.parent.mkdir(parents=True, exist_ok=True)
    with httpx.stream("GET", url, follow_redirects=True, timeout=300) as r:
        r.raise_for_status()
        with open(out, "wb") as f:
            for chunk in r.iter_bytes():
                f.write(chunk)


def run_job(job: dict, base: Path) -> tuple[str, bool, str]:
    jid = job["id"]
    out = base / job["out"]
    if out.exists():
        return jid, True, f"skip (exists) {out}"
    kind = job.get("kind", "image")
    try:
        if kind == "image":
            endpoint = IMAGE_MODELS[job.get("model", "flash")]
            args = {
                "prompt": job["prompt"],
                "num_images": 1,
                "output_format": "png",
                "aspect_ratio": job.get("aspect_ratio", "4:3"),
            }
            result = fal_client.subscribe(endpoint, arguments=args, with_logs=False)
            url = result["images"][0]["url"]
        elif kind == "video":
            endpoint = VIDEO_MODELS[job.get("model", "kling")]
            args = {"prompt": job["prompt"], "duration": job.get("duration", "5")}
            if "aspect_ratio" in job:
                args["aspect_ratio"] = job["aspect_ratio"]
            result = fal_client.subscribe(endpoint, arguments=args, with_logs=False)
            url = result["video"]["url"]
        else:
            return jid, False, f"unknown kind {kind}"
        download(url, out)
        return jid, True, str(out)
    except Exception as e:  # noqa: BLE001
        return jid, False, f"{type(e).__name__}: {e}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--manifest", required=True)
    ap.add_argument("--base-dir", required=True)
    ap.add_argument("--only", default="")
    ap.add_argument("--workers", type=int, default=4)
    ns = ap.parse_args()

    if not os.environ.get("FAL_KEY"):
        print("FAL_KEY not set", file=sys.stderr)
        return 2

    jobs = json.loads(Path(ns.manifest).read_text())
    if ns.only:
        wanted = set(ns.only.split(","))
        jobs = [j for j in jobs if j["id"] in wanted]
    base = Path(ns.base_dir)

    failed = []
    with ThreadPoolExecutor(max_workers=ns.workers) as ex:
        futs = {ex.submit(run_job, j, base): j["id"] for j in jobs}
        for fut in as_completed(futs):
            jid, ok, msg = fut.result()
            log(f"{'OK  ' if ok else 'FAIL'} {jid} -> {msg}")
            if not ok:
                failed.append(jid)

    log(f"done: {len(jobs) - len(failed)}/{len(jobs)} succeeded")
    if failed:
        log("failed: " + ",".join(failed))
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
