const ejs = require('ejs');
const puppeteer = require('puppeteer');

exports.toPdfBuffer = async (filepath, additionalData = {}) => {
    const htmlContent = await ejs.renderFile(filepath, additionalData, {
        views: '../../views',
    });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');

    const byteArray = await page.pdf({
        format: 'A4',
        scale: 1,
        printBackground: true,
    });

    const buffer = Buffer.from(byteArray, 'binary');
    browser.close();
    return buffer;
};
