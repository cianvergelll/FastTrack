import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: "127.0.0.1", // Use 127.0.0.1 instead of localhost
    user: "root", // Default XAMPP username
    password: "", // Default XAMPP password is empty
    database: "fasttask_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306 // Default XAMPP MySQL port
});

export async function initializeDatabase() {
    const connection = await pool.getConnection();
    try {
        await connection.query(`
            CREATE DATABASE IF NOT EXISTS fasttask_db
        `);

        await connection.query(`
            USE fasttask_db
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS sessions (
                session_id VARCHAR(255) PRIMARY KEY,
                user_id INT NOT NULL,
                expires_at DATETIME NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);
    } finally {
        connection.release();
    }
}