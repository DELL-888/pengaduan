import mysql from 'mysql2/promise';
import { useRuntimeConfig } from '#imports';

// Tambahkan '| undefined' agar TypeScript tahu pool bisa kosong di awal
let pool: mysql.Pool | undefined;

export const getDb = (): mysql.Pool => {
  if (!pool) {
    const config = useRuntimeConfig();
    
    console.log(
      'Connecting to database:', 
      config.dbHost, 
      config.dbUser, 
      config.dbName, 
      'port:', 
      config.dbPort
    );

    pool = mysql.createPool({
      host: config.dbHost,
      // Masukkan port, jika tidak ada di config, fallback ke 3306 (default MySQL)
      port: config.dbPort ? Number(config.dbPort) : 3306,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  
  return pool;
};

// Helper untuk query
export const query = async <T = any>(
  sql: string,
  params?: any[]
): Promise<T> => {
  const [rows] = await getDb().execute(sql, params);
  return rows as T;
};

// Tutup pool saat server dimatikan
export const closePool = async (): Promise<void> => {
  if (pool) {
    await pool.end();
    // Ini sekarang AMAN secara TypeScript tanpa perlu 'as unknown as ...'
    pool = undefined; 
  }
};