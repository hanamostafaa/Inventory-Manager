import pool from './db.js'; 
import bcrypt from 'bcryptjs'; 

const createUser = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const query = `
        INSERT INTO "User" (user_name, email, password, phone_number, full_name)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [user.user_name, user.email, hashedPassword, user.phone_number, user.full_name];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const findUserByUserName = async (user_name) => {
    const query = `SELECT * FROM "User" WHERE user_name = $1`;
    const result = await pool.query(query, [user_name]);
    return result.rows[0];
};

export { createUser, findUserByUserName };
