// File: /src/engine/areaTools.js

export async function storeAreaGeometry(event) {
    const geometry = event.features[0];
    
    // Konversi GeoJSON geometry menjadi WKT secara langsung
    const wkt = geojsonToWKT(geometry.geometry);
    console.log("Hasil konversi WKT:", wkt);
    
    // Menunggu hasil perhitungan dari backend Flask
    const result = await computeArea(wkt);
    console.log("Hasil Luasan dari Backend:", result);
}

// Fungsi pembantu untuk mengubah GeoJSON ke WKT (Polygon/LineString sederhana)
function geojsonToWKT(geom) {
    if (geom.type === "Polygon") {
        const coords = geom.coordinates[0].map(coord => `${coord[0]} ${coord[1]}`).join(", ");
        return `POLYGON ((${coords}))`;
    }
    // Tambahkan tipe lain jika diperlukan (misal: LineString, Point)
    return null;
}

async function computeArea(wkt) {
    try {
        const response = await fetch("http://127.0.0.1:5000/spatial_computation/area", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ geometry: wkt })
        });
        
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Gagal memproses data dari backend.");
            return null;
        }
    } catch (error) {
        console.error("Kesalahan jaringan:", error);
        return null;
    }
}