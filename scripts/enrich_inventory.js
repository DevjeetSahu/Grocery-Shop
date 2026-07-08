import fs from 'fs';

const itemMapping = {
  'aloo': { 
    category: 'Vegetables', 
    desc: 'aalu aloo alu potato',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&q=80' // Potato
  },
  'piyaz': { 
    category: 'Vegetables', 
    desc: 'pyaaz piaja kanda onion',
    image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=500&q=80' // Onion
  },
  'rasuna': { 
    category: 'Vegetables', 
    desc: 'lahsun rasuna garlic',
    image: 'https://images.unsplash.com/photo-1540148426946-57ac8af4528c?w=500&q=80' // Garlic
  },
  'ada': { 
    category: 'Vegetables', 
    desc: 'adrak ada ginger',
    image: 'https://images.unsplash.com/photo-1596365547053-469b82eb4b74?w=500&q=80' // Ginger
  },
  'kadali': { 
    category: 'Fruits', 
    desc: 'kela kadali banana',
    image: 'https://images.unsplash.com/photo-1571501478200-a5d08796bc61?w=500&q=80' // Banana
  },
  'gota lanka': { 
    category: 'Spices', 
    desc: 'lal mirch whole red chilli sukha lanka',
    image: 'https://images.unsplash.com/photo-1596647970725-728b2a3a5a75?w=500&q=80' // Whole red chilli
  },
  'lanka gunda': { 
    category: 'Spices', 
    desc: 'lal mirch lanka gunda red chilli powder',
    image: 'https://images.unsplash.com/photo-1596647895246-88c774620625?w=500&q=80' // Red Chilli powder
  },
  'gota dhania': { 
    category: 'Spices', 
    desc: 'sabut dhaniya coriander seeds whole',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80' // Coriander seeds
  },
  'dhania powder': { 
    category: 'Spices', 
    desc: 'dhaniya powder dhania gunda coriander powder',
    image: 'https://plus.unsplash.com/premium_photo-1675237625695-1f91b7d5ee82?w=500&q=80' // Spices powder generic
  },
  'methi': { 
    category: 'Spices', 
    desc: 'methi dana fenugreek seeds',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80' // Methi seeds (reusing similar seed image)
  },
  'juani': { 
    category: 'Spices', 
    desc: 'ajwain carom seeds juani',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80' // Ajwain
  },
  'panamahuri': { 
    category: 'Spices', 
    desc: 'saunf fennel seeds panamahuri mouri',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80' // Saunf
  },
  'kaka gota jeera': { 
    category: 'Spices', 
    desc: 'sabut jeera cumin seeds jira',
    image: 'https://plus.unsplash.com/premium_photo-1667057077555-5206de617ca1?w=500&q=80' // Cumin
  },
  'jeera powder': { 
    category: 'Spices', 
    desc: 'jeera jira cumin powder',
    image: 'https://plus.unsplash.com/premium_photo-1675237625695-1f91b7d5ee82?w=500&q=80'
  },
  'harada dal': { 
    category: 'Grains & Pulses', 
    desc: 'arhar dal harada dali toor dal pigeon pea',
    image: 'https://images.unsplash.com/photo-1585996884085-0551062b083c?w=500&q=80'
  },
  'moong dal': { 
    category: 'Grains & Pulses', 
    desc: 'moong dal muga dali green gram yellow',
    image: 'https://images.unsplash.com/photo-1615486171448-4dfcbdb40307?w=500&q=80'
  },
  'masoor dal': { 
    category: 'Grains & Pulses', 
    desc: 'masoor dal masura dali red lentil',
    image: 'https://images.unsplash.com/photo-1585996884085-0551062b083c?w=500&q=80'
  },
  'white gold rice': { 
    category: 'Grains & Pulses', 
    desc: 'chawal chaula premium rice basmati',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80' // Rice
  },
  'handia rice': { 
    category: 'Grains & Pulses', 
    desc: 'chawal chaula handia rice boiled',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80' // Rice
  },
  'tulsi ata': { 
    category: 'Grains & Pulses', 
    desc: 'atta ata wheat flour tulsi',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80' // Flour
  },
  'aashirvaad ata': { 
    category: 'Grains & Pulses', 
    desc: 'atta ata aashirvaad wheat flour',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80'
  },
  'besan': { 
    category: 'Grains & Pulses', 
    desc: 'besan besana gram flour chickpea',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80'
  },
  'chana': { 
    category: 'Grains & Pulses', 
    desc: 'chana chickpeas kabuli buta',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=500&q=80'
  },
  'matar': { 
    category: 'Grains & Pulses', 
    desc: 'matar dried peas matar buta green peas',
    image: 'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=500&q=80'
  },
  'chowmein': { 
    category: 'Packaged Food', 
    desc: 'chowmein noodles hakka',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80' // Noodles
  },
  'china salt': { 
    category: 'Spices', 
    desc: 'ajinomoto msg tasting salt china salt',
    image: 'https://images.unsplash.com/photo-1615486511484-92e172cb4efa?w=500&q=80' // Salt
  },
  'tomato sauce': { 
    category: 'Packaged Food', 
    desc: 'tomato sauce ketchup',
    image: 'https://plus.unsplash.com/premium_photo-1664301524345-90a694774519?w=500&q=80' // Ketchup
  },
  'chilly sauce': { 
    category: 'Packaged Food', 
    desc: 'chilli sauce green red spicy',
    image: 'https://images.unsplash.com/photo-1584852033621-03099908cf67?w=500&q=80' // Sauce bottle
  },
  'soy sauce': { 
    category: 'Packaged Food', 
    desc: 'soya sauce dark soy',
    image: 'https://images.unsplash.com/photo-1584852033621-03099908cf67?w=500&q=80'
  },
  'vinegar': { 
    category: 'Packaged Food', 
    desc: 'vinegar sirka white',
    image: 'https://images.unsplash.com/photo-1607593226490-349f87c1264c?w=500&q=80'
  },
  'bharat tomato ketchup': { 
    category: 'Packaged Food', 
    desc: 'tomato ketchup pouch sachet bharat',
    image: 'https://plus.unsplash.com/premium_photo-1664301524345-90a694774519?w=500&q=80'
  },
  'hati mustard oil': { 
    category: 'Oil & Ghee', 
    desc: 'mustard oil sarso tel sorisa tela hati',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80' // Oil
  },
  'rani mustard oil': { 
    category: 'Oil & Ghee', 
    desc: 'mustard oil sarso tel sorisa tela rani',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80'
  },
  'best choice refined oil': { 
    category: 'Oil & Ghee', 
    desc: 'refined oil sunflower oil best choice',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80'
  },
  'freedom refined oil': { 
    category: 'Oil & Ghee', 
    desc: 'refined oil sunflower oil freedom',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80'
  },
  'egg': { 
    category: 'Dairy & Eggs', 
    desc: 'anda egg anda',
    image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=500&q=80' // Egg
  },
  'egg carat': { 
    category: 'Dairy & Eggs', 
    desc: 'anda egg tray carat',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500&q=80' // Egg tray
  },
  'thermocol plate': { 
    category: 'Household', 
    desc: 'thermocol plate disposable thali',
    image: 'https://images.unsplash.com/photo-1616421455524-749e0b8e62f5?w=500&q=80' // Plate
  },
  'thermocol chauti': { 
    category: 'Household', 
    desc: 'thermocol bowl disposable katori chauti',
    image: 'https://images.unsplash.com/photo-1616421455524-749e0b8e62f5?w=500&q=80'
  },
  'plastic glass': { 
    category: 'Household', 
    desc: 'plastic glass disposable cup',
    image: 'https://images.unsplash.com/photo-1590457632943-346765790479?w=500&q=80' // Plastic cup
  },
  'nadia': { 
    category: 'Fruits', 
    desc: 'nariyal coconut nadia',
    image: 'https://images.unsplash.com/photo-1526344966-89049886b28d?w=500&q=80' // Coconut
  },
  'chini': { 
    category: 'Grains & Pulses', 
    desc: 'chini sugar sakkar',
    image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&q=80' // Sugar
  },
  'mishri chini': { 
    category: 'Grains & Pulses', 
    desc: 'mishri rock sugar',
    image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&q=80'
  },
  'sagu': { 
    category: 'Grains & Pulses', 
    desc: 'sagu sabudana sago tapioca pearl',
    image: 'https://plus.unsplash.com/premium_photo-1675237625695-1f91b7d5ee82?w=500&q=80'
  },
  'palua': { 
    category: 'Grains & Pulses', 
    desc: 'palua arrowroot powder',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80'
  },
  'soyabean': { 
    category: 'Grains & Pulses', 
    desc: 'soyabean soya chunks bari',
    image: 'https://images.unsplash.com/photo-1585996884085-0551062b083c?w=500&q=80'
  }
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
  const mapData = itemMapping[key];
  
  if (mapData) {
    if (!cat) cat = mapData.category;
    // Always use the detailed description for searchability
    desc = mapData.desc;
    // Fill the image
    img = mapData.image;
  }
  
  outputLines.push(`${name},${cat},${price},${qty},${avail},${desc},${img}`);
}

fs.writeFileSync('inventory.csv', outputLines.join('\n'));
console.log('Enriched inventory.csv successfully!');
