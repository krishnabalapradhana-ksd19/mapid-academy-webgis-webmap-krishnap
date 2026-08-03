import { Popup } from 'maplibre-gl';

/**
 * Helper function untuk mengonversi Desimal ke format DMS
 * @param {number} coordinate - Nilai koordinat desimal
 * @param {boolean} isLat - True jika koordinat adalah Latitude, False jika Longitude
 * @returns {string} - String format DMS (misal: 6°11'24"S)
 */
function convertToDMS(coordinate, isLat) {
    // 1. Ambil nilai absolut untuk menghindari perhitungan minus pada derajat
    const absolute = Math.abs(coordinate);
    
    // 2. Derajat adalah angka bulat dari nilai absolut
    const degrees = Math.floor(absolute);
    
    // 3. Menit dikalkulasi dari sisa desimal derajat dikali 60
    const minutesFloat = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    
    // 4. Detik dikalkulasi dari sisa desimal menit dikali 60 dan dibulatkan
    const seconds = Math.round((minutesFloat - minutes) * 60);
    
    // 5. Menentukan arah mata angin
    let direction;
    if (isLat) {
        direction = coordinate >= 0 ? 'U' : 'S'; // U = Utara (North), S = Selatan (South)
    } else {
        direction = coordinate >= 0 ? 'T' : 'B'; // T = Timur (East), B = Barat (West)
    }
    
    return `${degrees}°${minutes}'${seconds}"${direction}`;
}

export function addKotaPopup(map, event) {
    // Mengekstrak nama kota dari data GeoJSON
    const cityName = event.features[0].properties.NAME;
    
    // Mengekstrak nilai latitude dan longitude desimal
    const latDecimal = event.lngLat.lat;
    const lngDecimal = event.lngLat.lng;
    
    // Mengonversi desimal ke DMS menggunakan fungsi di atas
    const latDMS = convertToDMS(latDecimal, true);
    const lngDMS = convertToDMS(lngDecimal, false);

    console.log('Features dari data:', event.features);
    console.log('Nama Kota yang diklik:', cityName);
    console.log(`Koordinat DMS - Lat: ${latDMS}, Lon: ${lngDMS}`);

    return new Popup()
        .setLngLat(event.lngLat)
        .setHTML(`
            <div style="color: black; font-family: sans-serif;">
                <h3 style="margin: 0 0 5px 0;">${cityName}</h3>
                <p style="margin: 0; font-size: 14px;">Lat: ${latDMS}, Lon: ${lngDMS}</p>
            </div>
        `)
        .addTo(map);
}

export function addPulauPopup(map, event) {
    // Membuat instansi Popup baru
    return new Popup()
        .setLngLat(event.lngLat)
        .setHTML(`
            <div style="color: black; font-family: sans-serif;">
                <h3 style="margin: 0 0 5px 0;">Informasi Pulau</h3>
                <!-- Menambahkan teks loading sementara menunggu hasil dari backend -->
                <div id="luas">Sedang menghitung luasan...</div>
            </div>
        `)
        .addTo(map);
}