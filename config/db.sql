-- using Postgres v 16.0
-- setelah menjalankan file sql ini, seluruh nama tabel dan kolom akan tergenerate dengan lowercase (huruf kecil semua)

DROP TABLE IF EXISTS "reflections";
DROP TABLE IF EXISTS "users";

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(128) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL
);
	
CREATE TABLE reflections(
  id SERIAL PRIMARY KEY,
  success TEXT NOT NULL,
  low_point TEXT NOT NULL,
  take_away TEXT NOT NULL,
  UserId INTEGER NOT NULL,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);