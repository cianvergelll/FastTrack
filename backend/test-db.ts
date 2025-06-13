import { pool } from "./src/config/db";

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("Successfully connected to MySQL!");
        connection.release();
        process.exit(0);
    } catch (error) {
        console.error("Connection failed:", error);
        process.exit(1);
    }
}

testConnection();