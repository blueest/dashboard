# AI Analytics Admin Dashboard

Dashboard admin dengan Analytics berbasis AI menggunakan Flask dan Bootstrap.

## Fitur Utama

* Sidebar navbar responsif
* Dark mode/Light mode
* Interactive charts dengan Chart.js
* Analytics berbasis AI
* Deteksi anomali
* Rekomendasi AI
* Analisis sentimen
* Prediksi vs data aktual

## Instalasi

1. Clone repository ini
2. Buat virtual environment:
```bash
python -m venv venv
```

3. Aktifkan virtual environment:
```bash
# Windows
venv\Scripts\activate

# MacOS/Linux
source venv/bin/activate
```

4. Install dependensi:
```bash
pip install -r requirements.txt
```

5. Jalankan aplikasi:
```bash
python app.py
```

6. Buka browser dan akses `http://localhost:5000`

## Struktur Folder

```
admin-dashboard/
├── app.py                # File utama aplikasi Flask
├── requirements.txt      # Dependensi Python
├── static/               # File statis
│   ├── css/
│   │   └── style.css     # Style CSS custom
│   ├── img/              # Gambar 
│   │   └── avatar.png    # Avatar default
│   └── js/
│       └── main.js       # JavaScript untuk charts dan interaktivitas
└── templates/            # Template HTML
    └── index.html        # Template utama dashboard
```

## Pengembangan Lebih Lanjut

Untuk pengembangan lebih lanjut, Anda dapat:

1. Menambahkan otentikasi pengguna
2. Mengintegrasikan dengan database (SQLAlchemy)
3. Menambahkan dashboard tambahan untuk modul spesifik
4. Mengimplementasikan model AI yang nyata untuk prediksi dan rekomendasi
5. Menambahkan pagination dan filtering untuk data

## Lisensi

MIT