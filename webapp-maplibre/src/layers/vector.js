// Import data geojson dari folder assets
import naturalEarthData from '../assets/ne_populated.geojson?url';
import pulauKalimantan from '../assets/Kalimantan.geojson?url';
import jalurPesawat from '../assets/Jalur_Pesawat.geojson?url';

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

export function addJalurPesawatLayer(map) {
  map.addSource('jalur-pesawat', {
    type: 'geojson',
    data: jalurPesawat
  });

  map.addLayer({
    id: 'garis-jalur-pesawat',
    type: 'line',
    source: 'jalur-pesawat',
    paint: {
      'line-color': '#ff00ddce', 
      'line-width': 5,
      'line-opacity': 0.9
    }
  });
}
// Di dalam file /src/layers/vector.js

export function addBufferLayer(map, data){
    const fid = getRandomInt(1, 1000);
    
    map.addSource(String(fid), {
        type: "geojson",
        data: data
    });

    map.addLayer({
        id: `area-${fid}`,
        type: "fill",
        source: String(fid),
        paint: {
            "fill-color": "red",
            "fill-outline-color": "black"
        }
    });
}