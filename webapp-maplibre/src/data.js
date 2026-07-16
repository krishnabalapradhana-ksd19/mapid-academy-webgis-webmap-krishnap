//Import Assets
import 'maplibre-gl/dist/maplibre-gl.css';
import { Map } from 'maplibre-gl';
import { addKotaLayer, addPulauLayer } from './layers/vector.js';

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

map.on('load', () => {
  addKotaLayer(map);
  });
