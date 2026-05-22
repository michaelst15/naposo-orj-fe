# Naposo ORJ (App)

## Menjalankan Backend (FastAPI)

1. Siapkan PostgreSQL (disarankan Neon) dan simpan connection string di `app/backend/.env` pada variable `DATABASE_URL`
2. Masuk folder backend:

   ```powershell
   cd "d:\Website Naposo ORJ\Web\app\backend"
   ```

3. Buat venv dan install dependency:

   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   ```

4. Jalankan server:

   ```powershell
   uvicorn server:app --reload --host 0.0.0.0 --port 8000
   ```

Environment backend ada di `.env` (DATABASE_URL, CORS_ORIGINS).

## Menjalankan Frontend (React + Vite)

1. Masuk folder frontend:

   ```powershell
   cd "d:\Website Naposo ORJ\Web\app\frontend"
   ```

2. Pastikan `.env` berisi URL backend yang benar:

   - `VITE_BACKEND_URL=http://localhost:8000`

3. Install dependency:

   ```powershell
   npm install
   ```

4. Jalankan dev server:

   ```powershell
   npm run dev
   ```

Frontend akan jalan di `http://localhost:5173`.
