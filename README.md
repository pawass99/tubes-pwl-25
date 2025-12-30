# Movie Catalog (Mini TMDB)

Fullstack contoh UAS: Express.js + MySQL + Vue 3. Fitur: admin mengelola genre & film, user memberi review.

## Struktur
- `backend/`: REST API + MySQL (MVC)
- `frontend/`: SPA Vue 3 + Vite
- `backend/database/schema.sql` & `seed.sql`

## Jalankan Backend
1. `cd backend`
2. `cp .env.example .env` lalu sesuaikan DB & JWT
3. Import DB: jalankan `mysql -u <user> -p < backend/database/schema.sql` lalu `mysql -u <user> -p < backend/database/seed.sql`
4. Instal dep: `npm install`
5. Start dev: `npm run dev` (port default 4000)

## Jalankan Frontend
1. `cd frontend`
2. `cp .env.example .env` (pastikan `VITE_API_URL` menunjuk API backend)
3. Instal dep: `npm install`
4. Dev server: `npm run dev` (Vite port default 5173)

## API Endpoint
- **Auth**
  - `POST /api/auth/login`
  - `POST /api/auth/register`
- **Genres (public GET, admin CRUD)**
  - `GET /api/genres`
  - `GET /api/genres/:id`
  - `POST /api/genres`
  - `PUT /api/genres/:id`
  - `DELETE /api/genres/:id`
- **Movies (public GET, admin CRUD)**
  - `GET /api/movies` (query: `genreId`, `search`)
  - `GET /api/movies/:id` (include reviews)
  - `POST /api/movies`
  - `PUT /api/movies/:id`
  - `DELETE /api/movies/:id`
- **Reviews**
  - `GET /api/movies/:movieId/reviews`
  - `POST /api/movies/:movieId/reviews` (auth)
  - `PUT /api/reviews/:id` (owner/admin)
  - `DELETE /api/reviews/:id` (owner/admin)

## Akun Sample
- Admin: `admin@example.com` / `password`
- User: `jane@example.com` / `password`
