import 'maplibre-gl/dist/maplibre-gl.css';import { Map } from 'maplibre-gl';
import naturalEarthData from './assets/ne_populated.geojson?url';
import pulauKalimantan from './assets/Kalimantan.geojson?url';
// { addKotaLayer, addPulauLayer } from './layers/vector';
// import { addSpongebobImage } from './layers/raster';

const mapElement = document.createElement('div');
mapElement.id = 'map';
mapElement.style.height = '550px';
document.body.appendChild(mapElement);

const map = new Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/globe.json',
  center: [106.83, -6.19],
  zoom: 1
});

// const data = { 
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "properties": {
//         "name": "Jakarta"
//       },
//       "geometry": {
//         "type": "Point",
//         "coordinates": [
//           106.8404846,
//           -6.2177536
//         ]
//       }
//     }
//   ]
// }


map.on('load', () => {
map.addSource('kota', {
  type: 'geojson',
  data: naturalEarthData
});
map.addSource('pulau', {
  type: 'geojson',
  data: pulauKalimantan
});

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
  id: 'pulau-kalimantan',
  type: 'fill',
  source: 'pulau',
  paint: {
    'fill-color': '#00FF00',
    'fill-outline-color': '#000000',
    'fill-opacity': 0.5
  }
});

map.addLayer({
  id: 'spongebob-image',
  type: 'raster', 
  source: 'spongebob',
  paint: {
    'raster-opacity': 0.8
  }
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


  // addKotaLayer(map);
  // addPulauLayer(map);
  // addSpongebobImage(map);
});