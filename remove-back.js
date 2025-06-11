// remove-back.js
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const directoryPath = './works'; // 替換成存放 work.html 檔案的資料夾

fs.readdirSync(directoryPath).forEach(file => {
    if (file.endsWith('.html')) {
        const fullPath = path.join(directoryPath, file);
        const content = fs.readFileSync(fullPath, 'utf8');

        const $ = cheerio.load(content);

        // 刪除所有 .back 元素
        $('.back').remove();

        fs.writeFileSync(fullPath, $.html());
        console.log(`✅ Removed .back from: ${file}`);
    }
});