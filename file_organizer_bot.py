#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
================================================================================
Asmara.Store - File Organizer Bot (Enhanced Version)
================================================================================
إصدار محسن مع دعم كامل لمشروع Asmara.Store
================================================================================
"""

import os
import shutil
import json
import datetime
import argparse
from pathlib import Path

# ============================================
# 🎨 Module: Colors
# ============================================
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    END = '\033[0m'
    BOLD = '\033[1m'

# ============================================
# ⚙️ Module: Constants (Enhanced)
# ============================================
VERSION = "2.2.0"
BOT_NAME = "Asmara.Store File Organizer Bot"

IGNORED_FILES = {
    ".DS_Store", "Thumbs.db", "organization_report.json", 
    "organization_report.html", ".gitignore", ".gitkeep"
}

MANAGED_ROOTS = {
    "frontend", "backend", "assets", "data", "docs",
    "archives", "config", "tests", "others", "project",
    "scripts", "logs", "uploads", "images"
}

# التصنيف حسب الامتداد (موسع)
EXTENSION_MAP = {
    # Frontend Pages
    ".html": "frontend/pages",
    ".htm": "frontend/pages",
    ".ejs": "frontend/templates",
    ".hbs": "frontend/templates",
    
    # Styles
    ".css": "frontend/styles",
    ".scss": "frontend/styles",
    ".sass": "frontend/styles",
    ".less": "frontend/styles",
    
    # Scripts
    ".js": "frontend/scripts",
    ".mjs": "frontend/scripts",
    ".ts": "frontend/scripts",
    ".jsx": "frontend/scripts",
    ".tsx": "frontend/scripts",
    ".vue": "frontend/components",
    ".svelte": "frontend/components",
    
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
    
    # Images
    ".jpg": "assets/images",
    ".jpeg": "assets/images",
    ".png": "assets/images",
    ".gif": "assets/images",
    ".svg": "assets/images",
    ".webp": "assets/images",
    ".ico": "assets/images",
    ".bmp": "assets/images",
    
    # Videos
    ".mp4": "assets/videos",
    ".mkv": "assets/videos",
    ".avi": "assets/videos",
    ".mov": "assets/videos",
    ".wmv": "assets/videos",
    
    # Audio
    ".mp3": "assets/audio",
    ".wav": "assets/audio",
    ".aac": "assets/audio",
    ".flac": "assets/audio",
    ".ogg": "assets/audio",
    
    # Fonts
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
    ".yml": "config",
    ".yaml": "config",
}

# ملفات خاصة (تتم معالجتها بالاسم الكامل)
SPECIAL_FILE_MAP = {
    "package.json": "project",
    "README.md": "docs",
    "CONTRIBUTING.md": "docs",
    "LICENSE": "docs",
    "vercel.json": "config",
    "gitignore": "project",
}

# كلمات مفتاحية لتحسين التصنيف (مخصص لـ Asmara.Store)
NAME_RULES = [
    # Asmara.Store Specific Pages
    (["realestate", "property", "house", "apartment", "villa", "land"], "frontend/pages/realestate"),
    (["car", "vehicle", "auto", "toyota", "hyundai", "kia", "nissan", "honda"], "frontend/pages/cars"),
    (["electronics", "phone", "laptop", "macbook", "iphone", "samsung", "dell"], "frontend/pages/electronics"),
    (["job", "career", "employment", "resume", "cv", "position"], "frontend/pages/jobs"),
    (["flight", "airline", "ticket", "booking", "travel"], "frontend/pages/flights"),
    (["service", "shipping", "delivery", "cleaning", "maintenance"], "frontend/pages/services"),
    
    # Frontend Components
    (["component", "navbar", "footer", "header", "card", "modal", "sidebar", "widget"], "frontend/components"),
    
    # Frontend Pages
    (["page", "home", "about", "contact", "login", "register", "dashboard"], "frontend/pages"),
    
    # Styles
    (["style", "theme", "layout", "design", "responsive"], "frontend/styles"),
    
    # Backend
    (["controller", "ctrl"], "backend/controllers"),
    (["model", "schema", "entity"], "backend/models"),
    (["api", "route", "endpoint"], "backend/api"),
    (["service"], "backend/services"),
    (["util", "utils", "helper", "helpers", "tool"], "backend/utils"),
    (["admin", "agent", "moderator", "review", "approve"], "backend/admin"),
    (["payment", "paypal", "checkout", "invoice", "transaction"], "backend/payment"),
    (["chat", "message", "messaging", "conversation"], "backend/chat"),
    (["rating", "review", "testimonial", "feedback", "comment"], "backend/reviews"),
    
    # Config
    (["config", "setting", "env"], "config"),
    
    # Tests
    (["test", "spec"], "tests"),
    
    # Project specific
    (["asmara", "store", "eritrea", "asmera"], "project"),
]

# هيكل المجلدات الأساسي للمشروع
BASE_FOLDERS = [
    # Frontend
    "frontend/pages",
    "frontend/pages/realestate",
    "frontend/pages/cars",
    "frontend/pages/electronics",
    "frontend/pages/jobs",
    "frontend/pages/flights",
    "frontend/pages/services",
    "frontend/components",
    "frontend/styles",
    "frontend/scripts",
    "frontend/templates",
    
    # Backend
    "backend/python",
    "backend/php",
    "backend/api",
    "backend/models",
    "backend/controllers",
    "backend/services",
    "backend/admin",
    "backend/payment",
    "backend/chat",
    "backend/reviews",
    "backend/utils",
    
    # Assets
    "assets/images",
    "assets/icons",
    "assets/fonts",
    "assets/videos",
    "assets/audio",
    
    # Other
    "docs",
    "config",
    "data",
    "archives",
    "logs",
    "uploads",
    "others",
    "project",
    "tests",
    "scripts"
]

# ============================================
# 🧠 Module: Classifier
# ============================================
def get_extension(file_name: str) -> str:
    """الحصول على امتداد الملف"""
    name = file_name.lower()
    
    if name in SPECIAL_FILE_MAP:
        return name
    
    return os.path.splitext(name)[1]

def get_base_category(file_name: str) -> str:
    """التصنيف الأساسي حسب الامتداد"""
    name = file_name.lower()
    
    if name in SPECIAL_FILE_MAP:
        return SPECIAL_FILE_MAP[name]
    
    ext = get_extension(file_name)
    return EXTENSION_MAP.get(ext, "others")

def refine_by_name(file_name: str, default_folder: str) -> str:
    """تحسين التصنيف حسب اسم الملف"""
    name = file_name.lower()
    
    for keywords, target_folder in NAME_RULES:
        if any(keyword in name for keyword in keywords):
            return target_folder
    
    return default_folder

def decide_target_folder(file_name: str) -> str:
    """تحديد المجلد الهدف النهائي"""
    base = get_base_category(file_name)
    return refine_by_name(file_name, base)

# ============================================
# 🎨 Module: Banner
# ============================================
def print_banner():
    """طباعة شعار البوت"""
    print(f"""
{Colors.CYAN}╔══════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   █████╗ ███████╗███╗   ███╗ █████╗ ██████╗  █████╗     ███████╗████████╗ ██████╗ ██████╗ ███████╗
║  ██╔══██╗██╔════╝████╗ ████║██╔══██╗██╔══██╗██╔══██╗    ██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗██╔════╝
║  ███████║███████╗██╔████╔██║███████║██████╔╝███████║    ███████╗   ██║   ██║   ██║██████╔╝█████╗  
║  ██╔══██║╚════██║██║╚██╔╝██║██╔══██║██╔══██╗██╔══██║    ╚════██║   ██║   ██║   ██║██╔══██╗██╔══╝  
║  ██║  ██║███████║██║ ╚═╝ ██║██║  ██║██║  ██║██║  ██║    ███████║   ██║   ╚██████╔╝██║  ██║███████╗
║  ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝
║                                                                          ║
║                    {Colors.YELLOW}{BOT_NAME} - الإصدار {VERSION}{Colors.CYAN}                              ║
║                    {Colors.GREEN}لتنظيم ملفات مشروع Asmara.Store{Colors.CYAN}                              ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════════╝{Colors.END}
    """)

# ============================================
# 🤖 Module: FileOrganizerBot
# ============================================
class FileOrganizerBot:
    """بوت تنظيم الملفات الرئيسي"""
    
    def __init__(self, source_folder: str = ".", dry_run: bool = False, verbose: bool = True):
        self.root = os.path.abspath(source_folder)
        self.dry_run = dry_run
        self.verbose = verbose
        self.start_time = None
        self.end_time = None
        
        self.stats = {
            "moved": 0,
            "skipped": 0,
            "errors": 0,
            "by_extension": {},
            "by_folder": {}
        }
    
    def log(self, message: str, type: str = "info"):
        """طباعة رسالة مع تنسيق"""
        if not self.verbose:
            return
        
        icons = {
            "info": f"{Colors.BLUE}ℹ️{Colors.END}",
            "ok": f"{Colors.GREEN}✅{Colors.END}",
            "err": f"{Colors.RED}❌{Colors.END}",
            "skip": f"{Colors.YELLOW}⚠️{Colors.END}",
            "move": f"{Colors.CYAN}📁{Colors.END}",
        }
        
        print(f"{icons.get(type, '📌')} {message}")
    
    def create_base_structure(self):
        """إنشاء هيكل المجلدات الأساسي"""
        self.log("📁 إنشاء هيكل المجلدات...", "info")
        
        for folder in BASE_FOLDERS:
            folder_path = os.path.join(self.root, folder)
            os.makedirs(folder_path, exist_ok=True)
            
            # إضافة ملف .gitkeep للحفاظ على المجلدات الفارغة
            gitkeep = os.path.join(folder_path, ".gitkeep")
            if not os.path.exists(gitkeep):
                with open(gitkeep, 'w') as f:
                    f.write("# This folder is kept for project structure\n")
        
        self.log(f"✅ تم إنشاء {len(BASE_FOLDERS)} مجلد", "ok")
    
    def should_ignore(self, file_name: str) -> bool:
        """التحقق مما إذا كان الملف يجب تجاهله"""
        return file_name in IGNORED_FILES or file_name.startswith(".")
    
    def already_managed(self, file_path: str) -> bool:
        """التحقق مما إذا كان الملف في مجلد منظم مسبقاً"""
        rel_path = os.path.relpath(file_path, self.root)
        if rel_path == ".":
            return False
        first_dir = rel_path.split(os.sep)[0]
        return first_dir in MANAGED_ROOTS
    
    def move_file(self, file_path: str):
        """نقل ملف إلى المجلد المناسب"""
        if not os.path.isfile(file_path):
            return
        
        file_name = os.path.basename(file_path)
        
        if self.should_ignore(file_name):
            self.stats["skipped"] += 1
            return
        
        if self.already_managed(file_path):
            self.stats["skipped"] += 1
            return
        
        target_folder = decide_target_folder(file_name)
        target_dir = os.path.join(self.root, target_folder)
        os.makedirs(target_dir, exist_ok=True)
        
        target_path = os.path.join(target_dir, file_name)
        
        # تسجيل الإحصائية حسب الامتداد
        ext = os.path.splitext(file_name)[1]
        self.stats["by_extension"][ext] = self.stats["by_extension"].get(ext, 0) + 1
        self.stats["by_folder"][target_folder] = self.stats["by_folder"].get(target_folder, 0) + 1
        
        if self.dry_run:
            self.log(f"[تجريبي] سينقل: {file_name} -> {target_folder}/", "move")
            self.stats["moved"] += 1
            return
        
        try:
            shutil.move(file_path, target_path)
            self.stats["moved"] += 1
            self.log(f"نقل: {file_name} -> {target_folder}/", "ok")
        except Exception as e:
            self.stats["errors"] += 1
            self.log(f"خطأ في نقل {file_name}: {str(e)}", "err")
    
    def generate_json_report(self):
        """توليد تقرير JSON"""
        report = {
            "bot_name": BOT_NAME,
            "version": VERSION,
            "source_folder": self.root,
            "dry_run": self.dry_run,
            "start_time": self.start_time.isoformat() if self.start_time else None,
            "end_time": self.end_time.isoformat() if self.end_time else None,
            "duration_seconds": (self.end_time - self.start_time).total_seconds() if self.start_time and self.end_time else 0,
            "stats": self.stats
        }
        
        report_path = os.path.join(self.root, "organization_report.json")
        with open(report_path, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        self.log(f"📄 تم حفظ التقرير JSON في: {report_path}", "ok")
    
    def generate_html_report(self):
        """توليد تقرير HTML"""
        html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Asmara.Store - Organization Report</title>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f4f9; padding: 2rem; }}
        .container {{ max-width: 900px; margin: 0 auto; }}
        .header {{ background: linear-gradient(135deg, #1e3a5f, #2c5282); color: white; padding: 2rem; border-radius: 20px 20px 0 0; text-align: center; }}
        .stats {{ background: white; padding: 2rem; border-radius: 0 0 20px 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }}
        .stats-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }}
        .stat-card {{ background: #eef2f8; padding: 1.5rem; border-radius: 16px; text-align: center; }}
        .stat-number {{ font-size: 2.5rem; font-weight: bold; color: #c7a12b; }}
        .stat-label {{ color: #4a627a; margin-top: 0.5rem; }}
        .section {{ margin-top: 2rem; }}
        .section h3 {{ color: #1e3a5f; margin-bottom: 1rem; border-left: 4px solid #c7a12b; padding-left: 1rem; }}
        table {{ width: 100%; border-collapse: collapse; }}
        th, td {{ padding: 0.75rem; text-align: left; border-bottom: 1px solid #e2e8f0; }}
        th {{ background: #eef2f8; color: #1e3a5f; }}
        .footer {{ text-align: center; margin-top: 2rem; padding: 1rem; color: #8ba0b5; }}
        .verified {{ color: #c7a12b; font-weight: bold; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Asmara.Store</h1>
            <p>File Organization Report</p>
        </div>
        <div class="stats">
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number">{self.stats['moved']}</div>
                    <div class="stat-label">📁 Files Moved</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">{self.stats['skipped']}</div>
                    <div class="stat-label">⚠️ Skipped</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">{self.stats['errors']}</div>
                    <div class="stat-label">❌ Errors</div>
                </div>
            </div>
            
            <div class="section">
                <h3>📂 Files by Extension</h3>
                <table>
                    <tr><th>Extension</th><th>Count</th></tr>
                    {''.join(f'<tr><td>{ext}</td><td>{count}</td></tr>' for ext, count in sorted(self.stats['by_extension'].items()))}
                </table>
            </div>
            
            <div class="section">
                <h3>📁 Files by Folder</h3>
                <table>
                    <tr><th>Folder</th><th>Count</th></tr>
                    {''.join(f'<tr><td>{folder}</td><td>{count}</td></tr>' for folder, count in sorted(self.stats['by_folder'].items()))}
                </table>
            </div>
        </div>
        <div class="footer">
            <p>Generated by {BOT_NAME} v{VERSION}</p>
            <div class="verified">✓ Asmara.Store Certified</div>
        </div>
    </div>
</body>
</html>
        """
        
        report_path = os.path.join(self.root, "organization_report.html")
        with open(report_path, 'w', encoding='utf-8') as f:
            f.write(html)
        
        self.log(f"📄 تم حفظ التقرير HTML في: {report_path}", "ok")
    
    def print_summary(self):
        """طباعة ملخص في الطرفية"""
        duration = (self.end_time - self.start_time).total_seconds()
        
        print(f"\n{Colors.CYAN}{'='*60}{Colors.END}")
        print(f"{Colors.BOLD}{Colors.GREEN}📊 ملخص تنظيم الملفات - Asmara.Store{Colors.END}")
        print(f"{Colors.CYAN}{'='*60}{Colors.END}")
        
        print(f"\n{Colors.YELLOW}⏱️  الوقت المستغرق:{Colors.END} {duration:.2f} ثانية")
        print(f"{Colors.YELLOW}📁 الملفات المنقولة:{Colors.END} {self.stats['moved']}")
        print(f"{Colors.YELLOW}⚠️  الملفات المتجاوزة:{Colors.END} {self.stats['skipped']}")
        print(f"{Colors.YELLOW}❌ الأخطاء:{Colors.END} {self.stats['errors']}")
        
        if self.stats['by_extension']:
            print(f"\n{Colors.CYAN}📄 توزيع الملفات حسب الامتداد:{Colors.END}")
            for ext, count in sorted(self.stats['by_extension'].items()):
                print(f"   {ext}: {count} ملف(ات)")
        
        if self.stats['by_folder']:
            print(f"\n{Colors.CYAN}📂 توزيع الملفات حسب المجلدات:{Colors.END}")
            for folder, count in sorted(self.stats['by_folder'].items()):
                print(f"   📄 {folder}: {count} ملف(ات)")
        
        print(f"\n{Colors.GREEN}{'='*60}{Colors.END}")
        if self.dry_run:
            print(f"{Colors.YELLOW}⚠️ هذا كان تشغيلاً تجريبياً. قم بإزالة --dry-run للتنفيذ الفعلي.{Colors.END}")
        else:
            print(f"{Colors.GREEN}🎉 اكتمل التنظيم بنجاح!{Colors.END}")
        print(f"{Colors.CYAN}{'='*60}{Colors.END}\n")
    
    def organize(self):
        """الدالة الرئيسية للتنظيم"""
        self.start_time = datetime.datetime.now()
        
        print_banner()
        self.log(f"🚀 بدء تنظيم المشروع في: {self.root}", "info")
        
        if self.dry_run:
            self.log("⚠️ وضع التشغيل التجريبي (لن يتم نقل أي ملفات فعلياً)", "skip")
        
        self.create_base_structure()
        
        self.log("📂 بدء تنظيم الملفات...", "info")
        
        for item in os.listdir(self.root):
            item_path = os.path.join(self.root, item)
            if os.path.isfile(item_path):
                self.move_file(item_path)
        
        self.end_time = datetime.datetime.now()
        self.print_summary()
    
    def run(self, generate_reports: bool = True):
        """تشغيل البوت"""
        self.organize()
        if generate_reports and not self.dry_run:
            self.generate_json_report()
            self.generate_html_report()

# ============================================
# 🖥️ Module: Command Line Interface
# ============================================
def main():
    """الدالة الرئيسية لواجهة سطر الأوامر"""
    parser = argparse.ArgumentParser(
        description=f"{BOT_NAME} - لتنظيم ملفات مشروع Asmara.Store",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=f"""
{Colors.GREEN}أمثلة:{Colors.END}
  %(prog)s                              # تنظيم المجلد الحالي
  %(prog)s /path/to/project             # تنظيم مجلد محدد
  %(prog)s --dry-run                    # تشغيل تجريبي بدون نقل
  %(prog)s --quiet                      # تشغيل بدون تفاصيل
  %(prog)s --no-reports                 # عدم إنشاء تقارير
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
        "--no-reports",
        action="store_true",
        help="عدم إنشاء تقارير JSON و HTML"
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
    
    bot.run(generate_reports=not args.no_reports)

# ============================================
# 🚀 Entry Point
# ============================================
if __name__ == "__main__":
    main()
