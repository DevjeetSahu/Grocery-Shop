import fs from 'fs';

async function searchProduct(query) {
  try {
    // Bigbasket search API is easier to query
    const res = await fetch(`https://www.bigbasket.com/product/get-products/?slug=${encodeURIComponent(query)}&type=deck`);
    const data = await res.json();
    console.log("Found for", query, ":");
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

searchProduct("aashirvaad atta 5kg");
