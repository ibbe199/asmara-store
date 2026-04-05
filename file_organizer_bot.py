#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
================================================================================
Asmara.Store - File Organizer Bot
================================================================================
بوت ذكي لتنظيم ملفات المشروع تلقائياً حسب النوع والوظيفة
الإصدار: 2.0
المطور: Asmara.Store Team
================================================================================
"""

import os
import shutil
import sys
import json
import datetime
import argparse
from pathlib import Path
from typing import Dict, List, Tuple, Optional

# ============================================
# الإعدادات العامة
# ============================================
VERSION = "2.0.0"
BOT_NAME = "Asmara.Store File Organizer Bot"

# الألوان للطباعة في الطرفية
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    END = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def print_banner():
    """طباعة شعار البوت"""
    print(f"""
{Colors.CYAN}╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                                      ║
║   █████╗ ███████╗███╗   ███╗ █████╗ ██████╗  █████╗     ███████╗████████╗ ██████╗ ██████╗ ███████╗
║  ██╔══██╗██╔════╝████╗ ████║██╔══██╗██╔══██╗██╔══██╗    ██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗██╔════╝
║  ███████║███████╗██╔████╔██║███████║██████╔╝███████║    ███████╗   ██║   ██║   ██║██████╔╝█████╗  
║  ██╔══██║╚════██║██║╚██╔╝██║██╔══██║██╔══██╗██╔══██║    ╚════██║   ██║   ██║   ██║██╔══██╗██╔══╝  
║  ██║  ██║███████║██║ ╚═╝ ██║██║  ██║██║  ██║██║  ██║    ███████║   ██║   ╚██████╔╝██║  ██║███████╗
║  ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝
║                                                                                      ║
║                    {Colors.YELLOW}File Organizer Bot - الإصدار {VERSION}{Colors.CYAN}                              ║
║                    {Colors.GREEN}لتنظيم ملفات مشروع Asmara.Store{Colors.CYAN}                                    ║
║                                                                                      ║
╚════════════════════════════════════════════════════════════════════════════════════════╝{Colors.END}
    """)

# ============================================
# تصنيف الملفات
# ============================================

EXTENSION_MAP = {
    # Frontend - Pages
    ".html": "frontend/pages",
    ".htm": "frontend/pages",
    ".ejs": "frontend/templates",
    ".hbs": "frontend/templates",
    
    # Frontend - Styles
    ".css": "frontend/styles",
    ".scss": "frontend/styles",
    ".sass": "frontend/styles",
    ".less": "frontend/styles",
    
    # Frontend - Scripts
    ".js": "frontend/scripts",
    ".mjs": "frontend/scripts",
    ".ts": "frontend/scripts",
    ".jsx": "frontend/scripts",
    ".tsx": "frontend/scripts",
    ".vue": "frontend/components",
    
    # Backend
    ".py": "backend/python",
    ".php": "backend/php",
    ".java": "backend/java",
    ".cpp": "backend/cpp",
    ".c": "backend/c",
    ".cs": "backend/csharp",
    ".go": "backend/go",
    ".rb": "backend/ruby",
    
    # Data
    ".json": "data",
    ".xml": "data",
    ".csv": "data",
    ".yaml": "data",
    ".yml": "data",
    ".sql": "data",
    
    # Assets - Images
    ".png": "assets/images",
    ".jpg": "assets/images",
    ".jpeg": "assets/images",
    ".gif": "assets/images",
    ".svg": "assets/images",
    ".webp": "assets/images",
    ".ico": "assets/images",
    
    # Assets - Videos & Audio
    ".mp4": "assets/videos",
    ".mp3": "assets/audio",
    ".wav": "assets/audio",
    
    # Assets - Fonts
    ".ttf": "assets/fonts",
    ".otf": "assets/fonts",
    ".woff": "assets/fonts",
    ".woff2": "assets/fonts",
    
    # Documents
    ".pdf": "docs",
    ".doc": "docs",
    ".docx": "docs",
    ".txt": "docs",
    ".md": "docs",
    ".rtf": "docs",
    
    # Archives
    ".zip": "archives",
    ".rar": "archives",
    ".7z": "archives",
    ".tar": "archives",
    ".gz": "archives",
    
    # Scripts & Config
    ".sh": "scripts",
    ".bat": "scripts",
    ".ps1": "scripts",
    ".env": "config",
    ".toml": "config",
    ".ini": "config",
    
    # Tests
    ".test.js": "tests",
    ".spec.js": "tests",
    ".test.py": "tests",
}

# كلمات مفتاحية لتحديد الوظيفة
NAME_RULES = [
    # Frontend Components
    (["component", "navbar", "footer", "header", "card", "modal", "sidebar", "widget", "button"], "frontend/components"),
    
    # Frontend Pages
    (["page", "home", "about", "contact", "login", "register", "dashboard", "profile"], "frontend/pages"),
    
    # Asmara.Store Specific
    (["realestate", "property", "house", "apartment", "villa", "land"], "frontend/pages/realestate"),
    (["car", "vehicle", "auto", "toyota", "hyundai", "kia"], "frontend/pages/cars"),
    (["electronics", "phone", "laptop", "macbook", "iphone"], "frontend/pages/electronics"),
    (["job", "career", "employment", "resume", "cv"], "frontend/pages/jobs"),
    (["flight", "airline", "ticket", "booking", "travel"], "frontend/pages/flights"),
    (["service", "shipping", "delivery", "cleaning"], "frontend/pages/services"),
    
    # Styles
    (["style", "theme", "layout", "design", "responsive"], "frontend/styles"),
    
    # Backend
    (["controller", "ctrl"], "backend/controllers"),
    (["model", "schema", "entity"], "backend/models"),
    (["api", "route", "endpoint"], "backend/api"),
    (["service"], "backend/services"),
    (["util", "utils", "helper", "helpers", "tool"], "backend/utils"),
    (["admin", "agent", "moderator", "review"], "backend/admin"),
    (["payment", "paypal", "checkout", "invoice"], "backend/payment"),
    (["chat", "message", "messaging"], "backend/chat"),
    (["rating", "review", "testimonial"], "backend/reviews"),
    
    # Config
    (["config", "setting", "env"], "config"),
    
    # Tests
    (["test", "spec"], "tests"),
]

# المجلدات التي تم تنظيمها مسبقاً
MANAGED_ROOTS = {
    "frontend", "backend", "assets", "data", "docs", 
    "archives", "config", "tests", "others", "project",
    "scripts", "logs", "uploads"
}

# ============================================
# دوال البوت
# ============================================

class FileOrganizerBot:
    """بوت تنظيم الملفات"""
    
    def __init__(self, source_folder: str = ".", dry_run: bool = False, verbose: bool = True):
        self.source_folder = os.path.abspath(source_folder)
        self.dry_run = dry_run
        self.verbose = verbose
        self.stats = {
            "files_moved": 0,
            "folders_created": 0,
            "errors": 0,
            "skipped": 0,
            "by_type": {}
        }
        self.start_time = None
        self.end_time = None
    
    def log(self, message: str, type: str = "info"):
        """طباعة رسالة مع تنسيق"""
        if not self.verbose:
            return
        
        icons = {
            "info": f"{Colors.BLUE}ℹ️{Colors.END}",
            "success": f"{Colors.GREEN}✅{Colors.END}",
            "error": f"{Colors.RED}❌{Colors.END}",
            "warning": f"{Colors.YELLOW}⚠️{Colors.END}",
            "move": f"{Colors.CYAN}📁{Colors.END}",
        }
        
        print(f"{icons.get(type, '📌')} {message}")
    
    def ensure_source_folder(self):
        """التأكد من وجود مجلد المصدر"""
        if not os.path.exists(self.source_folder):
            os.makedirs(self.source_folder, exist_ok=True)
            self.log(f"تم إنشاء مجلد: {self.source_folder}", "success")
    
    def get_extension(self, file_name: str) -> str:
        """الحصول على امتداد الملف"""
        return os.path.splitext(file_name)[1].lower()
    
    def get_base_category(self, file_name: str) -> str:
        """التصنيف الأساسي حسب الامتداد"""
        ext = self.get_extension(file_name)
        return EXTENSION_MAP.get(ext, "others")
    
    def refine_by_name(self, file_name: str, default_folder: str) -> str:
        """تحسين التصنيف حسب اسم الملف"""
        name_lower = file_name.lower()
        
        for keywords, target_folder in NAME_RULES:
            if any(word in name_lower for word in keywords):
                return target_folder
        
        return default_folder
    
    def decide_target_folder(self, file_name: str) -> str:
        """تحديد المجلد الهدف النهائي"""
        folder = self.get_base_category(file_name)
        folder = self.refine_by_name(file_name, folder)
        return folder
    
    def get_unique_target_path(self, target_folder: str, file_name: str) -> str:
        """تجنب تكرار أسماء الملفات"""
        target_path = os.path.join(self.source_folder, target_folder, file_name)
        
        if not os.path.exists(target_path):
            return target_path
        
        base_name, ext = os.path.splitext(file_name)
        counter = 1
        while os.path.exists(target_path):
            new_name = f"{base_name}_{counter}{ext}"
            target_path = os.path.join(self.source_folder, target_folder, new_name)
            counter += 1
        
        return target_path
    
    def is_already_managed(self, file_path: str) -> bool:
        """التحقق مما إذا كان الملف في مجلد منظم مسبقاً"""
        rel_path = os.path.relpath(file_path, self.source_folder)
        if rel_path == '.':
            return False
        first_dir = rel_path.split(os.sep)[0]
        return first_dir in MANAGED_ROOTS
    
    def create_base_structure(self):
        """إنشاء هيكل المجلدات الأساسي"""
        folders = [
            "frontend/pages/realestate",
            "frontend/pages/cars",
            "frontend/pages/electronics",
            "frontend/pages/jobs",
            "frontend/pages/flights",
            "frontend/pages/services",
            "frontend/components",
            "frontend/styles",
            "frontend/scripts",
            "backend/api",
            "backend/models",
            "backend/controllers",
            "backend/services",
            "backend/admin",
            "backend/payment",
            "backend/chat",
            "backend/reviews",
            "assets/images",
            "assets/icons",
            "assets/fonts",
            "data",
            "config",
            "docs",
            "tests",
            "scripts",
            "logs",
            "uploads",
            "project"
        ]
        
        self.log("📁 إنشاء هيكل المجلدات...", "info")
        
        for folder in folders:
            folder_path = os.path.join(self.source_folder, folder)
            if not os.path.exists(folder_path):
                os.makedirs(folder_path, exist_ok=True)
                self.stats["folders_created"] += 1
                
                # إضافة ملف .gitkeep
                gitkeep = os.path.join(folder_path, ".gitkeep")
                if not os.path.exists(gitkeep):
                    with open(gitkeep, 'w') as f:
                        f.write("# This folder is kept for project structure\n")
        
        self.log(f"✅ تم إنشاء {self.stats['folders_created']} مجلد", "success")
    
    def move_file(self, file_path: str):
        """نقل ملف إلى المجلد المناسب"""
        if not os.path.isfile(file_path):
            return
        
        if self.is_already_managed(file_path):
            self.stats["skipped"] += 1
            return
        
        file_name = os.path.basename(file_path)
        target_relative_folder = self.decide_target_folder(file_name)
        target_folder = os.path.join(self.source_folder, target_relative_folder)
        
        os.makedirs(target_folder, exist_ok=True)
        target_path = self.get_unique_target_path(target_relative_folder, file_name)
        
        # تسجيل الإحصائية
        ext = self.get_extension(file_name)
        self.stats["by_type"][ext] = self.stats["by_type"].get(ext, 0) + 1
        
        if self.dry_run:
            self.log(f"[تجريبي] سينقل: {file_name} -> {target_relative_folder}/", "move")
        else:
            try:
                shutil.move(file_path, target_path)
                self.stats["files_moved"] += 1
                self.log(f"نقل: {file_name} -> {target_relative_folder}/", "success")
            except Exception as e:
                self.stats["errors"] += 1
                self.log(f"خطأ في نقل {file_name}: {str(e)}", "error")
    
    def organize(self):
        """الدالة الرئيسية لتنظيم المشروع"""
        self.start_time = datetime.datetime.now()
        
        print_banner()
        self.log(f"🚀 بدء تنظيم المشروع في: {self.source_folder}", "info")
        
        if self.dry_run:
            self.log("⚠️ وضع التشغيل التجريبي (لن يتم نقل أي ملفات فعلياً)", "warning")
        
        self.ensure_source_folder()
        self.create_base_structure()
        
        self.log("📂 بدء تنظيم الملفات...", "info")
        
        for item in os.listdir(self.source_folder):
            item_path = os.path.join(self.source_folder, item)
            if os.path.isfile(item_path):
                self.move_file(item_path)
        
        self.end_time = datetime.datetime.now()
        self.print_summary()
    
    def print_summary(self):
        """طباعة تقرير نهائي"""
        duration = (self.end_time - self.start_time).total_seconds()
        
        print(f"\n{Colors.CYAN}{'='*70}{Colors.END}")
        print(f"{Colors.BOLD}{Colors.GREEN}📊 تقرير تنظيم الملفات - Asmara.Store{Colors.END}")
        print(f"{Colors.CYAN}{'='*70}{Colors.END}")
        
        print(f"\n{Colors.YELLOW}⏱️  الوقت المستغرق:{Colors.END} {duration:.2f} ثانية")
        print(f"{Colors.YELLOW}📁 الملفات المنقولة:{Colors.END} {self.stats['files_moved']}")
        print(f"{Colors.YELLOW}📂 المجلدات المنشأة:{Colors.END} {self.stats['folders_created']}")
        print(f"{Colors.YELLOW}⚠️  الملفات المتجاوزة:{Colors.END} {self.stats['skipped']}")
        print(f"{Colors.YELLOW}❌ الأخطاء:{Colors.END} {self.stats['errors']}")
        
        if self.stats["by_type"]:
            print(f"\n{Colors.CYAN}📄 توزيع الملفات حسب الامتداد:{Colors.END}")
            for ext, count in sorted(self.stats["by_type"].items()):
                print(f"   {ext}: {count} ملف(ات)")
        
        print(f"\n{Colors.GREEN}{'='*70}{Colors.END}")
        if self.dry_run:
            print(f"{Colors.YELLOW}⚠️ هذا كان تشغيلاً تجريبياً. قم بإزالة --dry-run للتنفيذ الفعلي.{Colors.END}")
        else:
            print(f"{Colors.GREEN}🎉 اكتمل التنظيم بنجاح!{Colors.END}")
        print(f"{Colors.CYAN}{'='*70}{Colors.END}\n")
    
    def save_report(self, report_file: str = "organization_report.json"):
        """حفظ التقرير في ملف JSON"""
        report = {
            "bot_name": BOT_NAME,
            "version": VERSION,
            "source_folder": self.source_folder,
            "dry_run": self.dry_run,
            "start_time": self.start_time.isoformat() if self.start_time else None,
            "end_time": self.end_time.isoformat() if self.end_time else None,
            "duration_seconds": (self.end_time - self.start_time).total_seconds() if self.start_time and self.end_time else 0,
            "stats": self.stats
        }
        
        report_path = os.path.join(self.source_folder, report_file)
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        self.log(f"📄 تم حفظ التقرير في: {report_path}", "success")

# ============================================
# واجهة سطر الأوامر
# ============================================

def main():
    """الدالة الرئيسية"""
    parser = argparse.ArgumentParser(
        description=f"{BOT_NAME} - لتنظيم ملفات مشروع Asmara.Store",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
أمثلة:
  %(prog)s                          # تنظيم المجلد الحالي
  %(prog)s /path/to/project        # تنظيم مجلد محدد
  %(prog)s --dry-run                # تشغيل تجريبي بدون نقل
  %(prog)s --quiet                  # تشغيل بدون تفاصيل
  %(prog)s --report                 # حفظ التقرير في ملف JSON
        """
    )
    
    parser.add_argument(
        "folder",
        nargs="?",
        default=".",
        help="مسار مجلد المشروع (الافتراضي: المجلد الحالي)"
    )
    
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="تشغيل تجريبي (لن يتم نقل أي ملفات)"
    )
    
    parser.add_argument(
        "--quiet", "-q",
        action="store_true",
        help="تشغيل بدون تفاصيل"
    )
    
    parser.add_argument(
        "--report", "-r",
        action="store_true",
        help="حفظ التقرير في ملف JSON"
    )
    
    parser.add_argument(
        "--version", "-v",
        action="version",
        version=f"{BOT_NAME} الإصدار {VERSION}"
    )
    
    args = parser.parse_args()
    
    # تشغيل البوت
    bot = FileOrganizerBot(
        source_folder=args.folder,
        dry_run=args.dry_run,
        verbose=not args.quiet
    )
    
    bot.organize()
    
    if args.report and not args.dry_run:
        bot.save_report()

if __name__ == "__main__":
    main()
