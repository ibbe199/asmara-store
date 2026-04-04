// ===== دالة التحقق من تحميل الصور =====
function ensureImageLoad(imgElement, fallbackUrl) {
    if (!imgElement.complete || imgElement.naturalWidth === 0) {
        imgElement.src = fallbackUrl;
    }
}

// ===== دالة تحديث الصور بعد التحميل =====
function fixAllImages() {
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('error', function() {
            const category = this.closest('.gallery-item')?.dataset.category;
            const fallbacks = {
                'realestate': 'https://placehold.co/400x250/1e3a5f/white?text=عقار',
                'electronics': 'https://placehold.co/400x250/2c5282/white?text=جهاز',
                'cars': 'https://placehold.co/400x250/3a5a40/white?text=سيارة',
                'jobs': 'https://placehold.co/400x250/6d597b/white?text=وظيفة'
            };
            this.src = fallbacks[category] || fallbacks.realestate;
        });
    });
}

// استدعاء الدالة بعد تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(fixAllImages, 1000);
});
