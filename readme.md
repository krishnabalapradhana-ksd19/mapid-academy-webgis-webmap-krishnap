## Bagian A — Struktur proyek dan pengembangan lokal

Repo ini *monorepo* dengan dua bagian independen:

| Folder | Isi | Perintah lokal |
| --- | --- | --- |
| [`spatial-engine/`](spatial-engine/) | API Flask (lihat [`spatial-engine/README.md`](spatial-engine/README.md) untuk daftar endpoint) | `cd spatial-engine && flask --app engine run --debug` |
| [`webapp-maplibre/`](webapp-maplibre/) | Frontend Vite + MapLibre GL | `cd webapp-maplibre && npm install && npm run dev` |

`webapp-maplibre` punya tiga halaman, didaftarkan di
[`vite.config.js`](webapp-maplibre/vite.config.js) sebagai *multi-page build*:

| Halaman | Berkas sumber |
| --- | --- |
| Peta utama | [`index.html`](webapp-maplibre/index.html) → [`src/main.js`](webapp-maplibre/src/main.js) |
| Data | [`data.html`](webapp-maplibre/data.html) → [`src/data.js`](webapp-maplibre/src/data.js) |
| Sumatera | [`01_Sumatera/sumatera.html`](webapp-maplibre/01_Sumatera/sumatera.html) → [`src/sumatera/sumatera.js`](webapp-maplibre/src/sumatera/sumatera.js) |

Alamat *backend* Flask dibaca dari environment variable `VITE_API_URL` di
[`src/config.js`](webapp-maplibre/src/config.js), dengan *fallback* ke
`http://127.0.0.1:5000` bila variabel tidak diset. Salin
[`.env.example`](webapp-maplibre/.env.example) menjadi `.env` untuk pengembangan lokal.

---

## Bagian B — Deploy `spatial-engine` ke PythonAnywhere

### B.1. Clone repo dan siapkan virtualenv

Buka **Consoles → Bash**, lalu:

```bash
git clone https://github.com/krishnabalapradhana-ksd19/mapid-academy-webgis-webmap-krishnap.git
mkvirtualenv webgis --python=$(which python3.11)
pip install -r ~/mapid-academy-webgis-webmap-krishnap/spatial-engine/requirements.txt
```

Gunakan Python 3.10 ke atas (pengembangan lokal memakai 3.13). `shapely` dan `pyproj` terpasang
dari *wheel* manylinux, jadi tidak perlu *compiler*.

### B.2. Buat web app

Buka tab **Web → Add a new web app**, pilih **Manual configuration** — **bukan** wizard "Flask",
karena wizard tersebut membuat berkas aplikasi sendiri. Pilih versi Python yang sama dengan
virtualenv di atas.

### B.3. Isi pengaturan di tab Web

| Kolom | Nilai |
| --- | --- |
| Source code | `/home/Owner/mapid-academy-webgis-webmap-krishnap/spatial-engine` |
| Working directory | `/home/Owner/mapid-academy-webgis-webmap-krishnap/spatial-engine` |
| Virtualenv | `/home/Owner/.virtualenvs/webgis` |

### B.4. Sunting WSGI configuration file

Klik tautan **WSGI configuration file** di tab Web, hapus seluruh isinya, ganti dengan:

```python
import sys

path = "/home/Owner/mapid-academy-webgis-webmap-krishnap/spatial-engine"
if path not in sys.path:
    sys.path.insert(0, path)

from wsgi import application
```

Baris `sys.path.insert` **wajib ada** — tanpa itu, `import` ke `toolbox.*` di dalam
[`engine.py`](spatial-engine/engine.py) akan gagal dan web app membalas error 500.

### B.5. Reload dan uji

Klik tombol hijau **Reload**, lalu uji dari terminal mana pun:

```bash
curl -X POST https://Owner.pythonanywhere.com/spatial_computation/area \
  -H "Content-Type: application/json" \
  -d '{"geometry": "POLYGON((110 -7, 111 -7, 111 -8, 110 -8, 110 -7))"}'
```

Respons yang diharapkan berupa JSON berisi `area_ha` dan `unit`. Jika muncul error 500, baca
*error log* yang tautannya ada di tab Web.

> Akun gratis kedaluwarsa setiap 1 bulan. Klik tombol **"Run until 1 month from today"** di tab
> Web secara berkala agar API tetap hidup.

---

## Bagian C — Deploy `webapp-maplibre` ke Netlify

> Netlify dipilih karena *free tier*-nya tidak meminta kartu kredit untuk *static site*
> (berbeda dengan Render yang kini mewajibkan kartu, dan kartu terbitan Indonesia sering ditolak).

1. *Push* perubahan dari Bagian A ke GitHub.
2. Login ke [app.netlify.com](https://app.netlify.com) (cukup dengan akun GitHub, tanpa kartu),
   lalu **Add new site → Import an existing project → Deploy with GitHub**, dan pilih repositori ini.
3. Isi pengaturan *build* (repo ini *monorepo*, jadi **Base directory** wajib diisi):

   | Kolom | Nilai |
   | --- | --- |
   | Base directory | `webapp-maplibre` |
   | Build command | `npm ci && npm run build` |
   | Publish directory | `webapp-maplibre/dist` |

   > Catatan: `Publish directory` ditulis relatif terhadap akar repo, jadi tetap diawali
   > `webapp-maplibre/` walau `Base directory` sudah disetel.

4. Klik **Add environment variables** (atau setelah situs dibuat: **Site configuration →
   Environment variables → Add a variable**):

   ```
   VITE_API_URL = https://Owner.pythonanywhere.com
   ```

   Tanpa garis miring di akhir. Vite menanam nilai ini saat **build**, bukan saat *runtime* —
   jadi setiap kali nilainya diubah, situs harus di-*deploy* ulang (**Trigger deploy → Deploy site**),
   bukan sekadar di-*restart*.

5. Klik **Deploy** dan tunggu *build* selesai. URL bawaannya berbentuk
   `https://<nama-acak>.netlify.app` — bisa diganti di **Site configuration → Change site name**.

---

## Bagian D — Verifikasi

1. **Lokal masih jalan.** Jalankan Flask (`cd spatial-engine && flask --app engine run --debug`)
   dan `cd webapp-maplibre && npm run dev`. Klik poligon di layer `pulau-kalimantan` (lihat
   [`src/layers/vector.js`](webapp-maplibre/src/layers/vector.js) dan
   [`src/engine/areaTools.js`](webapp-maplibre/src/engine/areaTools.js)) → luasnya tampil di popup;
   klik titik di layer `titik-kota` → poligon *buffer* 1000 km muncul lewat
   [`src/engine/bufferTools.js`](webapp-maplibre/src/engine/bufferTools.js). Ini membuktikan
   *fallback* `VITE_API_URL` di `config.js` masih berfungsi.
2. **API produksi.** Perintah `curl` pada Bagian B.5 membalas 200 beserta JSON.
3. **End-to-end.** Buka URL Netlify, ulangi kedua klik di atas, lalu periksa DevTools:
   - Tab **Network**: permintaan menuju `https://Owner.pythonanywhere.com/...` dan berstatus 200.
   - Tab **Console**: tidak ada error *mixed content* maupun CORS.
4. **Halaman lain.** `https://<nama>.netlify.app/data.html` dan
   `https://<nama>.netlify.app/01_Sumatera/sumatera.html` terbuka tanpa 404 — menandakan
   konfigurasi *multi-page* di [`vite.config.js`](webapp-maplibre/vite.config.js) (Bagian A)
   sudah benar.

---

## Catatan dan *troubleshooting*

- **CORS.** [`engine.py`](spatial-engine/engine.py) memakai `CORS(app)` (terbuka untuk semua asal).
  Ini disengaja karena API bersifat demo publik. Untuk membatasinya, ganti menjadi
  `CORS(app, origins=["https://<nama>.netlify.app"])`.
- **Error 500 di PythonAnywhere** hampir selalu berarti `sys.path` belum disetel (Bagian B.4) atau
  virtualenv belum dipilih (Bagian B.3). Cek *error log* di tab Web.
- **`dist/` masuk `.gitignore`** — memang seharusnya begitu; Netlify membangunnya sendiri.
- **Kuota CPU** akun gratis PythonAnywhere terbatas per hari. Endpoint `dijkstra` pada jaringan
  besar bisa menghabiskannya; untuk data seukuran demo ini aman.
- **Ukuran data.** Berkas GeoJSON di
  [`webapp-maplibre/src/assets/`](webapp-maplibre/src/assets/) (`ne_populated.geojson`,
  `Kalimantan.geojson`, `Jalur_Pesawat.geojson`) di-*import* dengan `?url` di
  [`src/layers/vector.js`](webapp-maplibre/src/layers/vector.js), sehingga disalin apa adanya ke
  `dist/assets`. Wajar bila pemuatan pertama terasa lambat untuk berkas yang berukuran besar.
