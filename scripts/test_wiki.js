import fs from 'fs';

async function fetchImageForQuery(query) {
  try {
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' grocery india')}`;
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    
    const html = await response.text();
    
    // DuckDuckGo HTML image search doesn't work through the normal HTML endpoint, it just shows web results.
    // However, some web results might have images or we can extract links.
    // A better approach without API keys is to use the actual image URL from a known source or Wikipedia.
  } catch(e) {}
}

async function searchWikipediaImage(query) {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(query)}`;
        const res = await fetch(url);
        const data = await res.json();
        const pages = data.query.pages;
        for (let key in pages) {
            if (pages[key].original) {
                return pages[key].original.source;
            }
        }
    } catch(e) {}
    return null;
}

async function test() {
    console.log(await searchWikipediaImage("Potato"));
    console.log(await searchWikipediaImage("Aashirvaad")); // Probably no product image
}
test();
