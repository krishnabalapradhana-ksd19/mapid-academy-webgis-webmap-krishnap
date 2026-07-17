//Import Assets
import 'maplibre-gl/dist/maplibre-gl.css';
import { Map } from 'maplibre-gl';
import {addAttribution} from './controls/basic.control.js';

//Import Folder layers
import { addKotaLayer, addPulauLayer } from './layers/vector.js';
import { addSpongebobImage } from './layers/raster.js';

const mapElement = document.createElement('div');
mapElement.id = 'map';
mapElement.style.height = '550px';
document.body.appendChild(mapElement);

const map = new Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/globe.json',
  center: [106.83, -6.19],
  zoom: 1,
  attributionControl: false
});

addAttribution(map);
 
// 2. Panggil fungsi-fungsi yang sudah di-import di dalam event 'load'
map.on('load', () => {
  addKotaLayer(map);
  addPulauLayer(map);
  addSpongebobImage(map);
});