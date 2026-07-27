//Import Assets
import 'maplibre-gl/dist/maplibre-gl.css';
import { Map, 
  FullscreenControl, 
  GlobeControl, 
  LogoControl,
  Popup
 } from 'maplibre-gl';
import {addAttribution} from './controls/basic.control.js';
import {LogoHondaControl} from './controls/customLogoControls.js';
import { addKotaPopup } from './popups/layerPopups.js';

//Import Folder layers
import { addKotaLayer, addPulauLayer, addJalurPesawatLayer } from './layers/vector.js';
import { addSpongebobImage } from './layers/raster.js';

//Membuat Wadah Peta
const mapElement = document.createElement('div');
mapElement.id = 'map';
mapElement.style.height = '550px';
document.body.appendChild(mapElement);

//Membuat Peta
const map = new Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/globe.json',
  center: [106.83, -6.19],
  zoom: 1,
  attributionControl: false
});

addAttribution(map);
 
//Membuat Popup
const popup = new Popup(); 
  popup.on('open', () => {
  console.log('popup was opened');
});

// Memanggil fungsi layer setelah peta selesai dimuat
map.on('load', () => {
  addKotaLayer(map);
  addPulauLayer(map);
  addSpongebobImage(map);
  addJalurPesawatLayer(map);
});

// Event Listener: Menampilkan popup saat titik kota diklik
map.on('click', 'titik-kota', (event) => {
    addKotaPopup(map, event);
});


// Event Listener: Mengubah kursor mouse menjadi pointer saat berada di atas titik kota
map.on('mouseenter', 'titik-kota', () => {
  map.getCanvas().style.cursor = 'pointer';
});

// Event Listener: Mengembalikan kursor ke normal saat mouse keluar dari titik kota
map.on('mouseleave', 'titik-kota', () => {
  map.getCanvas().style.cursor = '';
});

// Menambahkan kontrol antarmuka
map.addControl(new FullscreenControl(), 'top-right');
map.addControl(new GlobeControl());
map.addControl(new LogoControl({compact: false}));
map.addControl(new LogoHondaControl(), 'top-left');