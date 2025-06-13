import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user';
import { pool } from '../config/db';
import jwt from 'jsonwebtoken';

export class AuthController {
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findByEmail(email);

            if (!user) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }

            const isValid = await UserModel.verifyPassword(user, password);
            if (!isValid) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }

            const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET || "your_secret_key",
                { expiresIn: "1h" }
            );

            const connection = await pool.getConnection();
            try {
                await connection.query(
                    "INSERT INTO sessions (session_id, user_id, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))",
                    [token, user.id]
                );
                res.json({ token, user: { id: user.id, email: user.email } });
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async logout(req: Request, res: Response): Promise<void> {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                res.status(400).json({ message: "No token provided" });
                return;
            }

            const connection = await pool.getConnection();
            try {
                await connection.query("DELETE FROM sessions WHERE session_id = ?", [token]);
                res.json({ message: "Logged out successfully" });
            } finally {
                connection.release();
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }

    static async getCurrentUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).userId;
            const user = await UserModel.findById(userId);

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.json({ user: { id: user.id, email: user.email } });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
}