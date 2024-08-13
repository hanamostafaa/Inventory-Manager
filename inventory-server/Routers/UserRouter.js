import express from 'express';
import { login, signUp } from '../Controllers/UserController.js'; // Update the import path if needed

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

export default router;
