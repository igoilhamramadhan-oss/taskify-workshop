# TaskMaster - Aplikasi To-Do List (React + Vite + Tailwind CSS)

Aplikasi manajemen tugas harian modern yang dibangun menggunakan **React 18**, **Vite**, **Tailwind CSS**, dan **Supabase JS Client v2 (PostgreSQL)** sesuai spesifikasi SKPL Modul 1-5.

---

## 🚀 Fitur Utama & Kepatuhan Arsitektur

1. **Siklus CRUD Lengkap:**
   - **Create:** Tambah tugas dengan judul, deskripsi, tanggal deadline, dan status.
   - **Read:** Tabel tugas interaktif dan 3 Kartu Ringkasan (KPI Summary Cards) yang reaktif.
   - **Update:** Edit rincian tugas penuh melalui form atau *quick-toggle* status instan.
   - **Delete:** Hapus data dengan dialog konfirmasi keamanan browser.
2. **Kepatuhan Skenario Uji Black Box (SKPL Modul 5):**
   - **`TC-01` (Toggle Status Instan):** Klik checkbox pada baris tabel langsung mengubah status (`Pending` <-> `Completed`) di Supabase, memberi efek coret teks (*strikethrough*), dan memperbarui kartu metrik seketika.
   - **`TC-02` (Validasi Form Judul Kosong):** Validasi JavaScript dua lapis mencegah pengiriman ke database dan memunculkan kotak peringatan merah dengan kalimat tepat: `"Judul tugas tidak boleh kosong"`.
3. **Standar Keamanan Mutlak:**
   - **`SEC-01` (Anti-XSS):** React JSX secara bawaan mengubah seluruh konten string dinamis menjadi teks murni (*auto-escaping*), sehingga kebal dari injeksi script seperti `<img src=x onerror=alert(1)>`.
   - **`SEC-02` (Kredensial Aman):** Hanya `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` (kunci publik) yang digunakan. Kunci rahasia (*service_role*) tidak pernah disertakan. Proteksi database dikunci oleh *Row Level Security* (RLS).
4. **Pencarian & Filter Real-Time:**
   - Pencarian kata kunci pada judul & deskripsi.
   - Filter status: *Semua Status*, *Pending*, dan *Completed*.
5. **Format Bahasa Indonesia:**
   - Format tanggal kalender standar bahasa Indonesia (`Intl.DateTimeFormat('id-ID')`, e.g., `18 Nov 2026`).

---

## 📁 Struktur Folder Project

```text
taskmaster-react/
├── index.html                 # Entry point HTML dengan Google Fonts
├── package.json               # Daftar dependensi & npm scripts
├── vite.config.js             # Konfigurasi Vite & React plugin
├── tailwind.config.js         # Konfigurasi Tailwind CSS
├── postcss.config.js          # Konfigurasi PostCSS untuk Tailwind
├── .env.example               # Template environment variable
├── .gitignore                 # Daftar file/folder yang diabaikan git
├── README.md                  # Dokumentasi panduan
└── src/
    ├── main.jsx               # React DOM entry mount
    ├── App.jsx                # Komponen utama & state management
    ├── index.css              # Directive Tailwind (@tailwind)
    ├── lib/
    │   └── supabase.js        # Inisialisasi Supabase JS Client v2
    ├── utils/
    │   └── formatters.js      # Formatter tanggal Indonesia (id-ID)
    └── components/
        ├── Header.jsx         # Bar navigasi atas & status koneksi
        ├── KPICards.jsx       # 3 kartu ringkasan metrik tugas
        ├── TaskForm.jsx       # Formulir input & validasi TC-02
        ├── TaskTable.jsx      # Kontrol pencarian, filter, & tabel
        ├── TaskItem.jsx       # Baris tugas, toggle TC-01, edit & hapus
        ├── EmptyState.jsx     # Tampilan saat data kosong/nihil
        ├── AlertError.jsx     # Alert peringatan merah (TC-02)
        ├── AlertSuccess.jsx   # Alert notifikasi sukses hijau
        └── ConfigModal.jsx    # Modal input kredensial Supabase
```

---

## 🛠️ Cara Menjalankan Project

### 1. Masuk ke Direktori Project
Buka terminal (PowerShell / Command Prompt / Git Bash) di VS Code, lalu masuk ke folder:
```bash
cd "taskmaster-react"
```

### 2. Install Dependensi
Jalankan perintah berikut untuk mengunduh seluruh library yang diperlukan:
```bash
npm install
```

### 3. Konfigurasi Kredensial Supabase
Ada dua cara mudah:
* **Cara 1 (File `.env`):**
  Salin file `.env.example` menjadi `.env`:
  ```bash
  cp .env.example .env
  ```
  Lalu isi dengan kredensial Supabase Anda:
  ```env
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```
* **Cara 2 (Langsung di UI Web):**
  Jalankan aplikasi terlebih dahulu, lalu klik tombol **Set Kredensial** atau ikon gerigi di pojok kanan atas aplikasi untuk memasukkan URL & Anon Key. Kredensial otomatis tersimpan di browser Anda.

### 4. Jalankan Development Server
```bash
npm run dev
```
Buka browser pada alamat yang muncul di terminal (biasanya `http://localhost:3000` atau `http://localhost:5173`).

### 5. Build untuk Production
Untuk membuat bundle produksi siap deploy ke Vercel, Netlify, atau GitHub Pages:
```bash
npm run build
```
Hasil build siap pakai akan tersedia di folder `dist/`.
