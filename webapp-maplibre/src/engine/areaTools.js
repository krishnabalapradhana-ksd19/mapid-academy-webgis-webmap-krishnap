// File: /src/engine/areaTools.js

export async function storeAreaGeometry(event, popupInstance) {
    const geometry = event.features[0];
    
    // Konversi GeoJSON geometry menjadi WKT secara langsung
    const wkt = geojsonToWKT(geometry.geometry);
    console.log("Hasil konversi WKT:", wkt);
    
    // Menunggu hasil perhitungan dari backend Flask
    const result = await computeArea(wkt);
    console.log("Hasil Luasan dari Backend:", result);

    // Jika hasil dari backend berhasil didapatkan
    if (result && result.area_ha !== undefined) {
        // Format nangka luasan agar rapi (misal: 127.972.443,92)
        const formattedArea = Number(result.area_ha).toLocaleString('id-ID', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        });
        const unitText = result.unit ? result.unit : 'Hektare';
        
        // Update HTML dari popup SECARA LANGSUNG tanpa getElementById
        popupInstance.setHTML(`
            <div style="color: black; font-family: sans-serif;">
                <h3 style="margin: 0 0 5px 0;">Informasi Pulau</h3>
                <p style="margin: 0; font-size: 14px;"><b>Luas:</b> ${formattedArea} ${unitText}</p>
            </div>
        `);
    } else {
        // Jika terjadi error atau format salah
        popupInstance.setHTML(`
            <div style="color: black; font-family: sans-serif;">
                <h3 style="margin: 0 0 5px 0;">Informasi Pulau</h3>
                <p style="margin: 0; font-size: 14px; color: red;">Gagal menghitung luasan.</p>
            </div>
        `);
    }
}

// ==========================================
// FUNGSI PEMBANTU (TIDAK BOLEH DIHAPUS)
// ==========================================

// Fungsi pembantu untuk mengubah GeoJSON ke WKT
function geojsonToWKT(geom) {
    if (geom.type === "Polygon") {
        const coords = geom.coordinates[0].map(coord => `${coord[0]} ${coord[1]}`).join(", ");
        return `POLYGON ((${coords}))`;
    }
    return null;
}

// Fungsi pembantu untuk memanggil API Flask
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
            // Menangkap pesan error detail dari backend Flask jika ada
            const errorData = await response.json().catch(() => null);
            console.error("Gagal dari backend Flask (400 Bad Request):", errorData || response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Kesalahan jaringan:", error);
        return null;
    }
}