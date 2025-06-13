import { pool } from "../config/db";
import bcrypt from "bcrypt";

export interface User {
    id: number;
    email: string;
    password: string;
    created_at: Date;
}

export class UserModel {
    static async findByEmail(email: string): Promise<User | null> {
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        return (rows as User[])[0] || null;
    }

    static async create(email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            "INSERT INTO users (email, password) VALUES (?, ?)",
            [email, hashedPassword]
        );
        try {
            return await this.findById((result as any).insertId);
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }

    static async findById(id: number): Promise<User> {
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        const user = (rows as User[])[0];
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    static async verifyPassword(user: User, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password);
    }
}