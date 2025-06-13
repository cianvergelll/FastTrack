import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.post("/login", (req, res) => AuthController.login(req, res));
router.post("/logout", (req, res, next) => authenticateToken(req, res, next),
    (req, res) => AuthController.logout(req, res));
router.get("/me", (req, res, next) => authenticateToken(req, res, next),
    (req, res) => AuthController.getCurrentUser(req, res));

export default router;