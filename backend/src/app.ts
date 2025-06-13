import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import { initializeDatabase } from "./config/db";

export async function createApp() {
    const app = express();

    // Initialize database
    await initializeDatabase();

    // Middleware
    app.use(cors({
        origin: 'http://localhost:4200', // Your Angular app URL
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(express.json());

    // Routes
    app.use("/api/auth", authRoutes);

    return app;
}