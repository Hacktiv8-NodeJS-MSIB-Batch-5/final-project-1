# Final Project 1 Hacktiv8 NodeJS MSIB Batch 5


## Anggota
1. Maulana Daffa Ardiansyah (INJS-KS06-12)
2. Erin Gunawan (INJS-KS06-03)

## Cara Install
1. run `npm install` untuk menginstall dependensi
2. buat sebuah database pada postgresql untuk aplikasi ini
3. copy `.env.example` ke `.env` dan isi file `.env` sesuai database aplikasi
4. run `npm run db:migrate` untuk menjalankan migrasi
5. run `npm run dev` untuk menjalankan aplikasi dengan nodemon
6. run `npm run start` untuk menjalankan aplikasi secara default

## List Routes
### Users
- `POST` - `/api/v1/users/register` untuk registrasi pengguna
- `POST` - `/api/v1/users/login` untuk login pengguna
### Reflections
- `POST` - `/api/v1/reflections` untuk menambahkan reflection
- `GET` - `/api/v1/reflections` untuk mendapat list reflection milik user yang sedang login
- `PUT` - `/api/v1/reflections/:id` untuk mengupdate reflection dengan id `id`; milik user yang sedang login
- `DELETE` - `/api/v1/reflections/:id` untuk menambahkan reflection dengan id `id`; milik user yang sedang login