import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 
import { createUser, findUserByUserName } from '../models/UserModel.js'; 
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (user) => {
    console.log(process.env.JWT_EXPIRES_IN)
    return jwt.sign({ id: user.id, user_name: user.user_name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN, 
    });
};

const signUp = async (req, res) => {
    try {
        const existingUser = await findUserByUserName(req.body.user_name);
        if (existingUser) {
            return res.status(400).json({ message: 'username already exists' });
        }

        const user = await createUser(req.body);
        console.log(user)
        const token = generateToken(user);
        console.log(token)
        res.status(201).json({ token, id: user.id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const login = async (req, res) => {
    try {
        const user = await findUserByUserName(req.body.user_name);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log(user)
        console.log(req)
        console.log(req.body.password)

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        console.log(token)
        res.status(200).json({ token, id: user.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export { login, signUp };
