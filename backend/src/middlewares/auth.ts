import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db';

export async function authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Authentication required" });
        return;
    }

    try {
        const connection = await pool.getConnection();
        try {
            const [rows] = await connection.query(
                "SELECT user_id FROM sessions WHERE session_id = ? AND expires_at > NOW()",
                [token]
            );

            if (!(rows as any[]).length) {
                res.status(401).json({ message: "Invalid or expired session" });
                return;
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key") as { userId: number };
            (req as any).userId = decoded.userId;
            next();
        } finally {
            connection.release();
        }
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
}