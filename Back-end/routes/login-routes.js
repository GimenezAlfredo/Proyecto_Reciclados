import express from 'express';
import { loginUser } from '../controllers/login-controller.js';
import { validateLogin } from '../middlewares/validate-login.js';
import { verifyToken } from '../middlewares/verify-token.js';
const router = express.Router();

router.post('/login', validateLogin, loginUser);
// router.post('/logout', logoutUser);

// Ruta protegida
router.get('/perfil', verifyToken, (req, res) => {
  res.json({
    message: 'Bienvenido al perfil privado',
    usuario: req.user // id y email del token
  });
});


export default router;
