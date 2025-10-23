# API Sistem Cuci Sepatu

Deskripsi umum
API ini adalah layanan backend sederhana untuk mengelola daftar sepatu yang sedang menjalani layanan cuci, . Dibangun menggunakan Node.js, Express, dan Supabase sebagai sistem basis data.

Tujuan dan fitur utama
- Menyediakan endpoint CRUD untuk sistem cuci sepatu 
- Filter data berdasarkan status atau id

Struktur data 

- id: text atau uuid (PRIMARY KEY, non-null)
- namaPelanggan: text
- jenisSepatu: text
- layanan: text
- harga: numeric
- status: text (contoh: 'Menunggu', 'Proses', 'Selesai')
- tanggalMasuk: timestamptz
- tanggalSelesai: timestamptz (nullable)

Query SQL untuk membuat database:

```sql
CREATE TABLE public.items (
   id text PRIMARY KEY,
   namaPelanggan text NOT NULL,
   jenisSepatu text NOT NULL,
   layanan text NOT NULL,
   harga numeric NOT NULL,
   status text NOT NULL,
   tanggalMasuk timestamptz NOT NULL DEFAULT now(),
   tanggalSelesai timestamptz
);
CREATE INDEX idx_items_status ON public.items (status);
```

Contoh request dan response


1) Menambahkan daftar sepatu

Request (Content-Type: application/json):

```json
{
   "id": "2",
   "namaPelanggan": "Putra",
   "jenisSepatu": "Nike Air Max",
   "layanan": "Cuci Biasa",
   "harga": 45000,
   "status": "Selesai"
}
```
Output jika data sepatu berhasil didaftarkan 
```json
{
    "success": true,
    "data": {
        "id": "2",
        "namaPelanggan": "Putra",
        "jenisSepatu": "Nike Air Max",
        "layanan": "Cuci Biasa",
        "harga": 45000,
        "status": "Selesai",
        "tanggalMasuk": "2025-10-23T03:38:43.037+00:00",
        "tanggalSelesai": null
    }
}
```

2) Get items (GET /items)

Request: GET /items

```json
{
    "success": true,
    "count": 2,
    "data": [
        {
            "id": "2",
            "namaPelanggan": "Putra",
            "jenisSepatu": "Nike Air Max",
            "layanan": "Cuci Biasa",
            "harga": 45000,
            "status": "Selesai",
            "tanggalMasuk": "2025-10-23T03:38:43.037+00:00",
            "tanggalSelesai": null
        },
        {
            "id": "1",
            "namaPelanggan": "Herdika Putra Devara",
            "jenisSepatu": "Nike Air Jordan",
            "layanan": "Cuci Lengkap dan Polish",
            "harga": 150000,
            "status": "Menunggu",
            "tanggalMasuk": "2025-10-22T07:00:00+00:00",
            "tanggalSelesai": "2025-10-21T15:00:00+00:00"
        }
    ]
}
```

3) GET /items?status=Selesai (ada 3 status yaitu Menunggu, Proses, dan Selesai)
```json
{
    "success": true,
    "count": 1,
    "data": [
        {
            "id": "2",
            "namaPelanggan": "Putra",
            "jenisSepatu": "Nike Air Max",
            "layanan": "Cuci Biasa",
            "harga": 45000,
            "status": "Selesai",
            "tanggalMasuk": "2025-10-23T03:38:43.037+00:00",
            "tanggalSelesai": null
        }
    ]
}
```
Status Menunggu
```json
{
    "success": true,
    "count": 1,
    "data": [
        {
            "id": "1",
            "namaPelanggan": "Herdika Putra Devara",
            "jenisSepatu": "Nike Air Jordan",
            "layanan": "Cuci Lengkap dan Polish",
            "harga": 150000,
            "status": "Menunggu",
            "tanggalMasuk": "2025-10-22T07:00:00+00:00",
            "tanggalSelesai": "2025-10-21T15:00:00+00:00"
        }
    ]
}
```


Langkah instalasi dan cara menjalankan API

1. Menyalin file contoh environment:

copy .env.example .env

2. Edit `.env` dan isi kredensial Supabase :

SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-or-service-role-key
PORT=3500

3. Install dependencies dan jalankan:

npm install
npm run dev

4. Menggunakan Postman untuk menguji endpoint API

Link deploy (Vercel)


