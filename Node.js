const fs = require('fs');
const path = require('path');

const folders = [
    'logo', 'categories', 'default', 'temp',
    'ads/real_estate', 'ads/electronics', 'ads/cars', 'ads/jobs', 'ads/general',
    'users/avatars', 'flags', 'airlines', 'institutions', 'badges', 'backgrounds'
];

const basePath = './images';

if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
}

folders.forEach(folder => {
    const fullPath = path.join(basePath, folder);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`✅ تم إنشاء: ${fullPath}`);
    }
});

console.log('🎉 تم إنشاء جميع المجلدات بنجاح!');
