const fs = require('fs');
const path = require('path');
const https = require('https');

const imageDirs = ['hero', 'collection', 'services', 'story', 'contact', 'agents'];
const basePath = path.join(__dirname, 'public', 'images');

// Create directories
imageDirs.forEach(dir => {
  const fullPath = path.join(basePath, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// A curated list of Unsplash Source URLs for luxury real estate
const imagesToDownload = [
  { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80', dest: 'hero/main-hero.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1613490908578-752119eb1499?w=1200&q=80', dest: 'collection/villa-pool-01.webp', photographer: 'Ralph Kelly' },
  { url: 'https://images.unsplash.com/photo-1600607687931-cebf559d3326?w=1200&q=80', dest: 'collection/penthouse-interior.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', dest: 'collection/modern-townhouse.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80', dest: 'collection/luxury-bedroom.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?w=1200&q=80', dest: 'collection/modern-kitchen.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1200&q=80', dest: 'collection/apartment-skyline.webp', photographer: 'Todd Kent' },
  
  { url: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=1200&q=80', dest: 'services/investment.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80', dest: 'services/legal.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&q=80', dest: 'services/mortgage.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80', dest: 'services/valuation.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80', dest: 'services/rental.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80', dest: 'services/aftersales.webp', photographer: 'Todd Kent' },

  { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', dest: 'story/vision.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1600573472592-401b489a8039?w=1200&q=80', dest: 'story/selection.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1560250057-3b24ddb59f3d?w=1200&q=80', dest: 'story/companion.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1200&q=80', dest: 'story/handover.webp', photographer: 'Todd Kent' },

  { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80', dest: 'contact/office.webp', photographer: 'Todd Kent' },
  
  { url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80', dest: 'agents/agent-1.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80', dest: 'agents/agent-2.webp', photographer: 'Todd Kent' },
  { url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80', dest: 'agents/agent-3.webp', photographer: 'Todd Kent' },
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
      fs.unlink(dest, () => reject(err));
    });
  });
};

async function run() {
  console.log('Downloading images...');
  for (const img of imagesToDownload) {
    try {
      await downloadImage(img.url, img.dest);
      console.log(`Downloaded ${img.dest}`);
    } catch (e) {
      console.error(`Failed ${img.dest}`);
    }
  }
  
  // Generate CREDITS.md
  let credits = '# Image Credits\n\nAll images are sourced from Unsplash (free for commercial use).\n\n';
  imagesToDownload.forEach(img => {
    credits += `- **${img.dest}**: Photographer ${img.photographer}. Source: Unsplash. URL: ${img.url.split('?')[0]}\n`;
  });
  credits += '\n*Note: These are sample images and must be replaced with the client\'s real property photos before going live.*\n';
  
  fs.writeFileSync(path.join(basePath, 'CREDITS.md'), credits);
  console.log('Done!');
}

run();
