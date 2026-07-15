import { Map } from 'maplibre-gl';
// import { addKotaLayer, addPulauLayer } from './layers/vector';
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

const data = { 
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Jakarta"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          106.8404846,
          -6.2177536
        ]
      }
    }
  ]
}


map.on('load', () => {
map.addSource('kota', {
  type: 'geojson',
  data: data
});

map.addLayer({
  id: 'titik-kota',
  type: 'circle',
source: 'kota',
  paint: {
    'circle-radius': 10,
    'circle-color': '#FF0000',
    'circle-stroke-width': ,
    'circle-stroke-color' : 'black'
  }
});
  // addKotaLayer(map);
  // addPulauLayer(map);
  // addSpongebobImage(map);
});