/*
 * Makes the placeholder images for the two sample case studies.
 * Run it with: node scripts/make-sample-images.mjs
 *
 * You only need this while the samples are in the site.
 * Once you add your own projects, delete the samples and this file.
 */
import sharp from 'sharp';

const imageWidth = 1600;
const imageHeight = 1000;
const caseStudiesFolder = 'src/content/case-studies';

/*
 * Each image is a simple drawing written in SVG (a text format for vector shapes).
 * We draw it, then let the "sharp" library save it as a JPEG.
 */

function drawNorthfieldCover() {
  return `
    <circle cx="800" cy="500" r="300" fill="none" stroke="#e8c79a" stroke-width="28" />
    <path d="M640 560 L800 340 L960 560 Z" fill="#e8c79a" />
    <text x="800" y="900" font-family="Georgia, serif" font-size="72" fill="#e8c79a"
          text-anchor="middle" letter-spacing="18">NORTHFIELD</text>
  `;
}

function drawNorthfieldPalette() {
  const paletteColors = ['#2b1d14', '#7a4a2a', '#c98b55', '#e8c79a', '#6f7d5c'];
  const swatchWidth = 240;
  const distanceBetweenSwatches = 280;
  const firstSwatchLeftEdge = 120;

  const swatches = paletteColors.map((color, swatchIndex) => {
    const leftEdge = firstSwatchLeftEdge + swatchIndex * distanceBetweenSwatches;
    return `<rect x="${leftEdge}" y="200" width="${swatchWidth}" height="600" rx="12" fill="${color}" />`;
  });
  return swatches.join('');
}

function drawNorthfieldPackaging() {
  const bagColors = ['#2b1d14', '#e8c79a', '#c98b55'];
  const distanceBetweenBags = 400;

  const bags = bagColors.map((bagColor, bagIndex) => {
    const bagLeftEdge = 260 + bagIndex * distanceBetweenBags;
    const logoCenter = bagLeftEdge + 150;
    const isLightBag = bagColor === '#e8c79a';
    let logoColor = '#f3ece2';
    if (isLightBag) {
      logoColor = '#2b1d14';
    }
    return `
      <rect x="${bagLeftEdge}" y="220" width="300" height="560" rx="20" fill="${bagColor}" />
      <circle cx="${logoCenter}" cy="420" r="70" fill="none" stroke="${logoColor}" stroke-width="10" />
    `;
  });
  return bags.join('');
}

function drawHaloCover() {
  return `
    <circle cx="800" cy="500" r="320" fill="none" stroke="#7cf3c8" stroke-width="6" opacity="0.35" />
    <circle cx="800" cy="500" r="240" fill="none" stroke="#7cf3c8" stroke-width="10" opacity="0.6" />
    <circle cx="800" cy="500" r="160" fill="#7cf3c8" />
    <text x="800" y="925" font-family="Helvetica, Arial, sans-serif" font-size="64"
          font-weight="700" fill="#ffffff" text-anchor="middle">halo</text>
  `;
}

function drawHaloDashboard() {
  const progressBars = [
    { width: 420, color: '#7cf3c8' },
    { width: 330, color: '#9fb4ff' },
    { width: 240, color: '#ffd27a' },
  ];

  const progressBarShapes = progressBars.map((progressBar, barIndex) => {
    const topEdge = 180 + barIndex * 120;
    return `<rect x="460" y="${topEdge}" width="${progressBar.width}" height="70" rx="12" fill="${progressBar.color}" />`;
  });

  return `
    <rect x="140" y="120" width="1320" height="760" rx="28" fill="#ffffff" />
    <rect x="140" y="120" width="260" height="760" rx="28" fill="#0f1a3d" />
    ${progressBarShapes.join('')}
    <polyline points="940,700 1040,600 1140,640 1240,480 1380,520"
              fill="none" stroke="#0f1a3d" stroke-width="12" stroke-linejoin="round" />
  `;
}

function drawHaloMobileScreens() {
  const screenColors = ['#ffffff', '#7cf3c8', '#ffffff'];
  const distanceBetweenPhones = 380;

  const phones = screenColors.map((screenColor, phoneIndex) => {
    const phoneLeftEdge = 300 + phoneIndex * distanceBetweenPhones;
    // Every second phone sits a little lower, for a staggered look.
    const isMiddlePhone = phoneIndex % 2 === 1;
    let phoneTopEdge = 140;
    if (isMiddlePhone) {
      phoneTopEdge = 200;
    }
    return `
      <rect x="${phoneLeftEdge}" y="${phoneTopEdge}" width="300" height="640" rx="44" fill="#0f1a3d" />
      <rect x="${phoneLeftEdge + 25}" y="${phoneTopEdge + 50}" width="250" height="540" rx="24" fill="${screenColor}" />
    `;
  });
  return phones.join('');
}

const imagesToMake = [
  { caseStudyFolder: 'northfield-coffee', fileName: 'cover', backgroundColor: '#2b1d14', drawShapes: drawNorthfieldCover },
  { caseStudyFolder: 'northfield-coffee', fileName: 'palette', backgroundColor: '#f3ece2', drawShapes: drawNorthfieldPalette },
  { caseStudyFolder: 'northfield-coffee', fileName: 'packaging', backgroundColor: '#6f7d5c', drawShapes: drawNorthfieldPackaging },
  { caseStudyFolder: 'halo-health', fileName: 'cover', backgroundColor: '#0f1a3d', drawShapes: drawHaloCover },
  { caseStudyFolder: 'halo-health', fileName: 'dashboard', backgroundColor: '#eef1f8', drawShapes: drawHaloDashboard },
  { caseStudyFolder: 'halo-health', fileName: 'mobile', backgroundColor: '#9fb4ff', drawShapes: drawHaloMobileScreens },
];

for (const imageToMake of imagesToMake) {
  const svgDrawing = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${imageWidth}" height="${imageHeight}">
      <rect width="100%" height="100%" fill="${imageToMake.backgroundColor}" />
      ${imageToMake.drawShapes()}
    </svg>
  `;
  const outputPath = `${caseStudiesFolder}/${imageToMake.caseStudyFolder}/${imageToMake.fileName}.jpg`;
  await sharp(Buffer.from(svgDrawing)).jpeg({ quality: 82 }).toFile(outputPath);
  console.log(`Saved ${outputPath}`);
}
