import { Map } from 'maplibre-gl';
import { addKotaLayer, addPulauLayer } from './layers/vector';

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

  // Layer Raster
  map.addSource("spongebob", {
    type: "image",
    url: "https://static.wikia.nocookie.net/cartoons/images/e/ed/Profile_-_SpongeBob_SquarePants.png",
    coordinates: [
      [79.16, -0.40], // top-left
      [94.18, -1.66], // top-right
      [94.65, -14.73], // bottom-right
      [72.97, -13.74] // bottom-left
    ]
  }) 

  map.addLayer({
    id: "spongebob-image",
    type: "raster",
    source: "spongebob",
  })

})