import { Map } from 'maplibre-gl';
import { addKotaLayer, addPulauLayer } from './layers/vector';
import { addSpongebobImage } from './layers/raster';

const mapElement = document.createElement('div');
mapElement.id = 'map';
mapElement.style.height = "300px";
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
//           106.3343232,
//           -6.1416728
//         ]
//       }
//     }
//   ]
// }


map.on("load", () => {
  addKotaLayer(map);
  addPulauLayer(map);
  addSpongebobImage(map);

})