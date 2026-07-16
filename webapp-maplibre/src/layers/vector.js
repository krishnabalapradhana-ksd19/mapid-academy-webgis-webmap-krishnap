// Import data geojson dari folder assets
import naturalEarthData from '../assets/ne_populated.geojson?url';
import pulauKalimantan from '../assets/Kalimantan.geojson?url';

//Export function untuk menambahkan layer kota
export function addKotaLayer(map) {
  map.addSource('kota', {
  type: 'geojson',
  data: naturalEarthData
});

map.addLayer({
  id: 'titik-kota',
  type: 'circle',
source: 'kota',
  paint: {
    'circle-radius': 10,
    'circle-color': '#FF0000',
    'circle-stroke-width': 2,
    'circle-stroke-color' : 'black'
  }
});
}

//Export function untuk menambahkan layer kota
export function addPulauLayer(map) {
map.addSource('pulau', {
  type: 'geojson',
  data: pulauKalimantan
});

map.addLayer({
  id: 'pulau-kalimantan',
  type: 'fill',
  source: 'pulau',
  paint: {
    'fill-color': '#00FF00',
    'fill-outline-color': '#000000',
    'fill-opacity': 0.5
  }
});
}