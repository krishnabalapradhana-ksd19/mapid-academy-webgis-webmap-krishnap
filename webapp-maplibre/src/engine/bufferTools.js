import { geojsonToWKT, wktToGeoJSON } from "@terraformer/wkt";
import { addBufferLayer } from "../layers/vector";

export function storeBufferGeometry(map, event) {
    const geometry = event.features[0].geometry;
    const wkt = geojsonToWKT(geometry);

    computeBuffer(map, wkt);
}
async function computeBuffer(map, wkt) {
    try {
        const response = await fetch("http://127.0.0.1:5000/geometry_manipulation/buffer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                geometry: wkt,
                distance_m: 100000
            })
        });

        if (!response.ok) {
            console.error("Gagal terhubung ke backend Flask:", response.statusText);
            return null;
        }

        const result = await response.json();
        
        // Pastikan properti dari flask sesuai (misal: result.wkt)
        if (result && result.wkt) {
            const data = wktToGeoJSON(result.wkt);
            addBufferLayer(map, data);
        }

        return result;
    } catch (error) {
        console.error("Terjadi kesalahan jaringan:", error);
        return null;
    }
}