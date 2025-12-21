const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/Portfolio_Icon.ico');
const outputPath = path.join(__dirname, '../public/favicon.ico');

async function generateFavicon() {
  try {
    // Generate a 32x32 PNG (standard favicon size for modern browsers)
    const favicon32 = await sharp(inputPath)
      .resize(32, 32, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toBuffer();

    // Save as PNG (browsers support PNG favicons)
    await sharp(favicon32).toFile(path.join(__dirname, '../public/favicon-32x32.png'));

    // Generate 16x16 as well
    await sharp(inputPath)
      .resize(16, 16, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(__dirname, '../public/favicon-16x16.png'));

    // Generate 48x48 for better quality
    await sharp(inputPath)
      .resize(48, 48, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(path.join(__dirname, '../public/favicon-48x48.png'));

    console.log('Favicons generated successfully!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon();
