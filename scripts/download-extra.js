const fs = require('fs');
const path = require('path');
const https = require('https');

const basePath = path.join(__dirname, '..', 'public', 'images', 'collection');

const additionalImages = [
  // Prop 1 (Biệt Thự Ven Sông)
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', dest: 'villa-pool-01-2.webp' },
  { url: 'https://images.unsplash.com/photo-1600607687931-cebf559d3326?w=1200&q=80', dest: 'villa-pool-01-3.webp' },
  // Prop 2 (Penthouse)
  { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80', dest: 'penthouse-interior-2.webp' },
  { url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?w=1200&q=80', dest: 'penthouse-interior-3.webp' },
  // Prop 3 (Nhà Phố)
  { url: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1200&q=80', dest: 'modern-townhouse-2.webp' },
  { url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80', dest: 'modern-townhouse-3.webp' },
  // Prop 4 (Căn Hộ Hạng Sang)
  { url: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&q=80', dest: 'luxury-bedroom-2.webp' },
  { url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80', dest: 'luxury-bedroom-3.webp' },
  // Prop 5 (Biệt Thự Vườn)
  { url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80', dest: 'modern-kitchen-2.webp' },
  { url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80', dest: 'modern-kitchen-3.webp' },
  // Prop 6 (Căn Hộ Ven Sông)
  { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', dest: 'apartment-skyline-2.webp' },
  { url: 'https://images.unsplash.com/photo-1600573472592-401b489a8039?w=1200&q=80', dest: 'apartment-skyline-3.webp' }
];

const downloadImage = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(basePath, dest));
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      fs.unlink(path.join(basePath, dest), () => reject(err));
    });
  });
};

async function run() {
  console.log('Downloading additional images...');
  for (const img of additionalImages) {
    try {
      await downloadImage(img.url, img.dest);
      console.log(`Downloaded ${img.dest}`);
    } catch (e) {
      console.error(`Failed ${img.dest}`);
    }
  }
  console.log('Done!');
}

run();
