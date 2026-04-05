#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
================================================================================
Asmara.Store - File Organizer Bot (Single File Structured)
================================================================================
كل شيء في ملف واحد لكن مقسم كأنه Modules
================================================================================
"""

# ============================================
# 📦 Imports
# ============================================
import os
import shutil
import json
import datetime
import argparse

# ============================================
# 🎨 Module: Colors
# ============================================
class Colors:
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    END = '\033[0m'
    BOLD = '\033[1m'

# ============================================
# ⚙️ Module: Constants
# ============================================
VERSION = "2.1.0"
BOT_NAME = "Asmara.Store File Organizer Bot"

IGNORED_FILES = {
    ".DS_Store", "Thumbs.db", "organization_report.json", ".gitignore"
}

MANAGED_ROOTS = {
    "frontend", "backend", "assets", "data", "docs",
    "archives", "config", "tests", "others", "project",
    "scripts", "logs", "uploads"
}

EXTENSION_MAP = {
    ".html": "frontend/pages",
    ".css": "frontend/styles",
    ".js": "frontend/scripts",
    ".py": "backend/python",
    ".json": "data",
    ".jpg": "assets/images",
    ".png": "assets/images",
    ".mp4": "assets/videos",
    ".mp3": "assets/audio",
    ".pdf": "docs",
    ".zip": "archives",
}

SPECIAL_FILE_MAP = {
    ".env": "config",
    "package.json": "project",
    "README.md": "docs",
}

NAME_RULES = [
    (["car"], "frontend/pages/cars"),
    (["job"], "frontend/pages/jobs"),
    (["realestate", "house"], "frontend/pages/realestate"),
]

BASE_FOLDERS = [
    "frontend/pages",
    "frontend/pages/cars",
    "frontend/pages/jobs",
    "frontend/pages/realestate",
    "frontend/styles",
    "frontend/scripts",
    "backend/python",
    "assets/images",
    "assets/videos",
    "assets/audio",
    "docs",
    "config",
    "data",
    "archives",
    "logs",
    "others",
    "project"
]

# ============================================
# 🧠 Module: Classifier
# ============================================
def get_extension(file_name):
    name = file_name.lower()

    if name in SPECIAL_FILE_MAP:
        return name

    return os.path.splitext(name)[1]

def get_base_category(file_name):
    name = file_name.lower()

    if name in SPECIAL_FILE_MAP:
        return SPECIAL_FILE_MAP[name]

    ext = get_extension(file_name)
    return EXTENSION_MAP.get(ext, "others")

def refine_by_name(file_name, default):
    name = file_name.lower()

    for keywords, folder in NAME_RULES:
        if any(k in name for k in keywords):
            return folder

    return default

def decide_target(file_name):
    base = get_base_category(file_name)
    return refine_by_name(file_name, base)

# ============================================
# 🎯 Module: Banner
# ============================================
def print_banner():
    print(f"""
{Colors.CYAN}==============================================
{Colors.GREEN}{BOT_NAME} - v{VERSION}
{Colors.CYAN}==============================================
""")

# ============================================
# 🤖 Module: Bot
# ============================================
class FileOrganizerBot:

    def __init__(self, folder=".", dry_run=False, verbose=True):
        self.root = os.path.abspath(folder)
        self.dry_run = dry_run
        self.verbose = verbose

        self.stats = {
            "moved": 0,
            "skipped": 0,
            "errors": 0
        }

    def log(self, msg, type="info"):
        if not self.verbose:
            return

        icons = {
            "info": "ℹ️",
            "ok": "✅",
            "err": "❌",
            "skip": "⚠️",
        }

        print(f"{icons.get(type,'')} {msg}")

    def create_structure(self):
        for f in BASE_FOLDERS:
            path = os.path.join(self.root, f)
            os.makedirs(path, exist_ok=True)

    def should_ignore(self, name):
        return name in IGNORED_FILES or name.startswith(".")

    def already_managed(self, path):
        rel = os.path.relpath(path, self.root)
        if rel == ".":
            return False
        return rel.split(os.sep)[0] in MANAGED_ROOTS

    def move_file(self, path):
        name = os.path.basename(path)

        if self.should_ignore(name):
            self.stats["skipped"] += 1
            return

        if self.already_managed(path):
            self.stats["skipped"] += 1
            return

        target_folder = decide_target(name)
        target_dir = os.path.join(self.root, target_folder)
        os.makedirs(target_dir, exist_ok=True)

        target_path = os.path.join(target_dir, name)

        if self.dry_run:
            self.log(f"[DRY] {name} → {target_folder}", "info")
            self.stats["moved"] += 1
            return

        try:
            shutil.move(path, target_path)
            self.stats["moved"] += 1
            self.log(f"{name} → {target_folder}", "ok")
        except Exception as e:
            self.stats["errors"] += 1
            self.log(f"Error: {e}", "err")

    def run(self):
        start = datetime.datetime.now()

        print_banner()
        self.log(f"Start organizing: {self.root}")

        self.create_structure()

        for item in os.listdir(self.root):
            full = os.path.join(self.root, item)
            if os.path.isfile(full):
                self.move_file(full)

        end = datetime.datetime.now()
        self.summary(start, end)

    def summary(self, start, end):
        duration = (end - start).total_seconds()

        print(f"""
{Colors.BOLD}📊 Summary{Colors.END}
Time: {duration:.2f}s
Moved: {self.stats['moved']}
Skipped: {self.stats['skipped']}
Errors: {self.stats['errors']}
""")

# ============================================
# 🖥️ Module: CLI
# ============================================
def main():
    parser = argparse.ArgumentParser(description="Asmara Organizer")

    parser.add_argument("folder", nargs="?", default=".")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--quiet", action="store_true")

    args = parser.parse_args()

    bot = FileOrganizerBot(
        folder=args.folder,
        dry_run=args.dry_run,
        verbose=not args.quiet
    )

    bot.run()

# ============================================
# 🚀 Entry Point
# ============================================
if __name__ == "__main__":
    main()
