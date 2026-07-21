import express from 'express'
import bcrypt from 'bcrypt'
import { pool }  from '../db.js'
import validator from 'validator'

export const loginUser = async(req, res) => {
    // Implementation for login
    let { username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({ message: "Username and password are required." });
    }
    username = username.trim();
    password = password.trim();
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if(user.rows.length === 0) {
        return res.status(400).json({ message: "Invalid username or password." });
    }
    const isMatch = bcrypt.compareSync(password, user.rows[0].password);
    if(!isMatch) {
        return res.status(400).json({ message: "Invalid username or password." });
    }
    req.session.userId = user.rows[0].id;
    res.status(200).json({ message: "Login successful." });

}

export const registerUser = async(req, res) => {
    // Implementation for registration
    let { username, password,email } = req.body;
    if(!username || !password || !email){
        return res.status(400).json({ message: "Username, password, and email are required." });
    }

    username = username.trim();
    password = password.trim();
    email = email.trim();

    if(!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    

    const hashedPassword = bcrypt.hashSync(password, 10);
    await pool.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL)");
    const result = await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id', [username, hashedPassword, email]);
    req.session.userId = result.rows[0].id; 
    res.status(201).json({ message: "User registered successfully." });



}

export const logoutUser = async(req, res) => {
    // Implementation for logout
    try {
        await req.session.destroy();
        res.status(200).json({ message: "Logout successful." });
    } catch (err) {
        res.status(500).json({ message: "Logout failed." });
    }

}
