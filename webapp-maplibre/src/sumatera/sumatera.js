import 'maplibre-gl/dist/maplibre-gl.css';
import { Map} from 'maplibre-gl';
import { addKotaLayer, addPulauLayer } from '../layers/vector.js';
import {addAttribution} from '../controls/basic.control.js';


const map = new Map({
  container: 'map', 
  style: 'https://demotiles.maplibre.org/globe.json', 
  center: [106.83, -6.19], 
  zoom: 4,
  attributionControl: false
   
});

addAttribution(map);

map.on('load', () => {
  addPulauLayer(map); 
});

// map.on('load', () => {
//   console.log("Peta dasar berhasil dimuat!");