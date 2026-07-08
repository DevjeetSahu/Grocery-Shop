import fs from 'fs';

const safeItems = ['aloo', 'piyaz', 'rasuna', 'ada', 'kadali', 'egg', 'nadia'];

const input = fs.readFileSync('inventory.csv', 'utf8');
const lines = input.split('\n');
const header = lines[0];

const outputLines = [header];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  let [name, cat, price, qty, avail, desc, img] = line.split(',');
  
  const key = name.toLowerCase();
  
  // If the item is not in the safe list, blank out the image
  if (!safeItems.includes(key)) {
    img = '';
  }
  
  outputLines.push(`${name},${cat},${price},${qty},${avail},${desc},${img}`);
}

fs.writeFileSync('inventory.csv', outputLines.join('\n'));
console.log('Fixed inventory.csv successfully! Only perfectly accurate images were kept.');
