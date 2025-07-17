import { connection } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [results] = await connection.query('SELECT * FROM usuario WHERE email = ?', [email]);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }


    const token = jwt.sign(
    { id: user.idusuario, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );


    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({ message: 'Login exitoso', token });

  } catch (err) {
    console.error('❌ Error en loginUser:', err);
    res.status(500).json({ message: 'Error de servidor' });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout exitoso' });
};