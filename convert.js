const { mdToPdf } = require('md-to-pdf');
const path = require('path');
const fs = require('fs');

(async () => {
    try {
        // 從命令列獲取目標檔案路徑
        const targetFile = process.argv[2];
        if (!targetFile) {
            console.log('❌ 錯誤: 請提供 Markdown 檔案路徑。');
            console.log('用法: node convert.js <markdown_file_path>');
            process.exit(1);
        }

        const sourcePath = path.isAbsolute(targetFile) ? targetFile : path.join(process.cwd(), targetFile);

        if (!fs.existsSync(sourcePath)) {
            console.log(`❌ 錯誤: 找不到來源檔案 "${sourcePath}"`);
            process.exit(1);
        }

        const fileName = path.basename(sourcePath, '.md');
        const outputPath = path.join(process.cwd(), 'exports', `${fileName}.pdf`);

        // 確保輸出目錄存在
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        console.log(`📄 正在轉換: ${path.relative(process.cwd(), sourcePath)}`);
        console.log(`🎯 輸出路徑: ${path.relative(process.cwd(), outputPath)}`);

        const pdf = await mdToPdf({ path: sourcePath }, {
            stylesheet: path.join(__dirname, 'pdf-style.css'),
            pdf_options: {
                format: 'A4',
                margin: '20mm',
                printBackground: true,
                displayHeaderFooter: false,
                timeout: 60000,
            },
            launch_options: {
                headless: 'new',
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-gpu',
                    '--disable-dev-shm-usage',
                    '--font-render-hinting=none',
                ],
            }
        });

        if (pdf) {
            fs.writeFileSync(outputPath, pdf.content);
            console.log(`✅ 轉換成功！檔案已生成。`);
            console.log(`📏 檔案大小: ${(pdf.content.length / 1024).toFixed(2)} KB`);
        }
    } catch (error) {
        console.error('❌ 轉換過程中發生錯誤:', error);
        process.exit(1);
    }
})();
