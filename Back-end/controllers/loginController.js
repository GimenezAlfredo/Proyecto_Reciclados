import { connection  } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM usuario WHERE email = ?';
  connection.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error de servidor' });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

     const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );

      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // hablar por el tema de HTTPS
        sameSite: 'Lax',
        maxAge: 24 * 60 * 60 * 1000
      });

      res.json({ message: 'Login exitoso', token });
    });
  });
};

export const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout exitoso' });
};