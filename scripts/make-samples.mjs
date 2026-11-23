// Generates placeholder artwork for the two sample case studies.
// Replace these with real project images when you have them.
import sharp from 'sharp';

const W = 1600, H = 1000;
const art = {
  'northfield-coffee': [
    { name: 'cover', bg: '#2b1d14', svg: (c) => `
      <circle cx="800" cy="500" r="300" fill="none" stroke="#e8c79a" stroke-width="28"/>
      <path d="M640 560 L800 340 L960 560 Z" fill="#e8c79a"/>
      <text x="800" y="900" font-family="Georgia, serif" font-size="72" fill="#e8c79a" text-anchor="middle" letter-spacing="18">NORTHFIELD</text>` },
    { name: 'palette', bg: '#f3ece2', svg: () => ['#2b1d14','#7a4a2a','#c98b55','#e8c79a','#6f7d5c'].map((c,i)=>`<rect x="${120+i*280}" y="200" width="240" height="600" rx="12" fill="${c}"/>`).join('') },
    { name: 'packaging', bg: '#6f7d5c', svg: () => [0,1,2].map(i=>`<rect x="${260+i*400}" y="220" width="300" height="560" rx="20" fill="${['#2b1d14','#e8c79a','#c98b55'][i]}"/><circle cx="${410+i*400}" cy="420" r="70" fill="none" stroke="${i===1?'#2b1d14':'#f3ece2'}" stroke-width="10"/>`).join('') },
  ],
  'halo-health': [
    { name: 'cover', bg: '#0f1a3d', svg: () => `
      <circle cx="800" cy="500" r="320" fill="none" stroke="#7cf3c8" stroke-width="6" opacity=".35"/>
      <circle cx="800" cy="500" r="240" fill="none" stroke="#7cf3c8" stroke-width="10" opacity=".6"/>
      <circle cx="800" cy="500" r="160" fill="#7cf3c8"/>
      <text x="800" y="925" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="700" fill="#ffffff" text-anchor="middle">halo</text>` },
    { name: 'dashboard', bg: '#eef1f8', svg: () => `
      <rect x="140" y="120" width="1320" height="760" rx="28" fill="#ffffff"/>
      <rect x="140" y="120" width="260" height="760" rx="28" fill="#0f1a3d"/>
      ${[0,1,2].map(i=>`<rect x="460" y="${180+i*120}" width="${420-i*90}" height="70" rx="12" fill="${['#7cf3c8','#9fb4ff','#ffd27a'][i]}"/>`).join('')}
      <polyline points="940,700 1040,600 1140,640 1240,480 1380,520" fill="none" stroke="#0f1a3d" stroke-width="12" stroke-linejoin="round"/>` },
    { name: 'mobile', bg: '#9fb4ff', svg: () => [0,1,2].map(i=>`<rect x="${300+i*380}" y="${140+(i%2)*60}" width="300" height="640" rx="44" fill="#0f1a3d"/><rect x="${325+i*380}" y="${190+(i%2)*60}" width="250" height="540" rx="24" fill="${['#ffffff','#7cf3c8','#ffffff'][i]}"/>`).join('') },
  ],
};

for (const [slug, images] of Object.entries(art)) {
  for (const img of images) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><rect width="100%" height="100%" fill="${img.bg}"/>${img.svg()}</svg>`;
    await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(`src/content/work/${slug}/${img.name}.jpg`);
  }
}
console.log('done');
