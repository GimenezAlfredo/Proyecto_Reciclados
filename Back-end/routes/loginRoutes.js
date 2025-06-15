import express from 'express';
import { loginUser, logoutUser } from '../controllers/loginController.js';
import { validateLogin } from '../middlewares/validateLogin.js';
import { verifyToken } from '../middlewares/verifyToken.js';
const router = express.Router();

router.post('/login', validateLogin, loginUser);
router.post('/logout', logoutUser);

// Ruta protegida
router.get('/perfil', verifyToken, (req, res) => {
  res.json({
    message: 'Bienvenido al perfil privado',
    usuario: req.user // id y email del token
  });
});


export default router;
