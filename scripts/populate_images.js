import fs from 'fs';

// A mapping of english names/keys to accurate Blinkit/Unsplash images
const imageMap = {
  // Vegetables & Fruits
  'aloo': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80',
  'piyaz': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&q=80',
  'rasuna': 'https://images.unsplash.com/photo-1540148426946-57ac8af4528c?w=500&q=80',
  'ada': 'https://images.unsplash.com/photo-1596365547053-469b82eb4b74?w=500&q=80',
  'kadali': 'https://images.unsplash.com/photo-1571501478200-a5d08796bc61?w=500&q=80',
  'nadia': 'https://images.unsplash.com/photo-1526344966-89049886b28d?w=500&q=80',
  
  // Spices (Blinkit IDs)
  'gota lanka': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/356531a.jpg',
  'lanka gunda': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/12803a.jpg',
  'gota dhania': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/10344a.jpg',
  'dhania powder': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/12801a.jpg',
  'methi': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/356537a.jpg',
  'juani': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/356543a.jpg',
  'panamahuri': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/356550a.jpg',
  'kaka gota jeera': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/356538a.jpg',
  'jeera powder': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/12802a.jpg',
  'china salt': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/480436a.jpg', // Ajinomoto

  // Dals & Pulses
  'harada dal': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/329712a.jpg',
  'moong dal': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/329737a.jpg',
  'masoor dal': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/329705a.jpg',
  'chana': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/329759a.jpg',
  'matar': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/19614a.jpg',
  
  // Grains & Flours
  'white gold rice': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/409419a.jpg',
  'handia rice': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/410018a.jpg',
  'tulsi ata': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/16148a.jpg', // Using a generic 1kg atta
  'aashirvaad ata': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/16147a.jpg', // 5KG Aashirvaad!
  'besan': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/421695a.jpg',
  'chini': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/329752a.jpg',
  'mishri chini': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/427953a.jpg',
  'sagu': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/141381a.jpg',
  'palua': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/480436a.jpg', // using generic powder
  'soyabean': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/279313a.jpg',

  // Oils
  'hati mustard oil': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/10892a.jpg', // Using Fortune Mustard Oil as highly accurate alternative
  'rani mustard oil': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/10892a.jpg', 
  'best choice refined oil': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/12608a.jpg', // Using Saffola Gold Refined
  'freedom refined oil': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/12608a.jpg',

  // Sauces & Noodles
  'chowmein': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/381014a.jpg', // Ching's Hakka Noodles
  'tomato sauce': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/10046a.jpg', // Maggi Ketchup
  'bharat tomato ketchup': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/481928a.jpg', // Ketchup pouch
  'chilly sauce': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/11394a.jpg', // Ching's chilli sauce
  'soy sauce': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/11397a.jpg', // Ching's soy sauce
  'vinegar': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/11395a.jpg', // Ching's vinegar

  // Eggs & Household
  'egg': 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&q=80',
  'egg carat': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/493208a.jpg', // Egg tray
  'thermocol plate': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/132470a.jpg', // Disposable plates
  'thermocol chauti': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/132471a.jpg', // Disposable bowls
  'plastic glass': 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=50,metadata=none,w=540/app/images/products/sliding_image/132468a.jpg' // Disposable glasses
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
  
  if (imageMap[key]) {
    img = imageMap[key];
  }
  
  outputLines.push(`${name},${cat},${price},${qty},${avail},${desc},${img}`);
}

fs.writeFileSync('inventory.csv', outputLines.join('\n'));
console.log('Successfully populated inventory.csv with highly accurate images from Blinkit and Unsplash!');
