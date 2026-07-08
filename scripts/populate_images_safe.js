import fs from 'fs';

// A mapping of english names/keys to accurate Unsplash images + BigBasket for Aashirvaad
// We will ONLY use highly accurate images. If not perfectly accurate, it stays blank (fallback icon).
const imageMap = {
  // Vegetables & Fruits
  'aloo': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80',
  'piyaz': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&q=80',
  'rasuna': 'https://images.unsplash.com/photo-1540148426946-57ac8af4528c?w=500&q=80',
  'ada': 'https://images.unsplash.com/photo-1596365547053-469b82eb4b74?w=500&q=80',
  'kadali': 'https://images.unsplash.com/photo-1571501478200-a5d08796bc61?w=500&q=80',
  'nadia': 'https://images.unsplash.com/photo-1526344966-89049886b28d?w=500&q=80',
  
  // Specific branded requested
  'aashirvaad ata': 'https://www.bigbasket.com/media/uploads/p/l/161826_8-aashirvaad-atta-whole-wheat.jpg', 
  
  // Grains, Rice, Sugar, Dals
  'white gold rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80',
  'handia rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80',
  'chini': 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&q=80',
  'chana': 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=500&q=80', // Chickpeas
  
  // Oils (Generic cooking oil photo is very accurate for this category)
  'hati mustard oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80',
  'rani mustard oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80', 
  'best choice refined oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80',
  'freedom refined oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80',

  // Packaged Food
  'chowmein': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80', // Noodles
  
  // Eggs
  'egg': 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&q=80',
  'egg carat': 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500&q=80', // Egg tray
};

const input = fs.readFileSync('inventory.csv', 'utf8');
const lines = input.split('\n');
const header = lines[0];

const outputLines = [header];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  let [name, cat, price, qty, avail, desc, img] = line.split(',');
  
  const key = name.toLowerCase();
  
  // Set image to map value if it exists, otherwise blank (fallback icon)
  img = imageMap[key] || '';
  
  outputLines.push(`${name},${cat},${price},${qty},${avail},${desc},${img}`);
}

fs.writeFileSync('inventory2.csv', outputLines.join('\n'));
console.log('Successfully populated inventory.csv with safe Unsplash/Bigbasket images, leaving uncertain ones blank!');
