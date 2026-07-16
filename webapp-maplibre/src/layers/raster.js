// Export function untuk menambahkan layer raster
export function addSpongebobImage(map) {
  map.addSource('spongebob', {
    type: 'image',
    url: 'https://static.wikia.nocookie.net/spongebob/images/6/6b/Spongebob_happy_stock_art_1.octet-stream.png',
    coordinates: [
  [-43.76, 27.22],  // kiri atas  (barat, utara)
  [-16.24, 27.22],  // kanan atas (timur, utara)
  [-16.24, 12.78],  // kanan bawah (timur, selatan)
  [-43.76, 12.78]   // kiri bawah (barat, selatan)
  ]
});


map.addLayer({
  id: 'spongebob-image',
  type: 'raster', 
  source: 'spongebob',
  paint: {
    'raster-opacity': 0.8
  }
});
}