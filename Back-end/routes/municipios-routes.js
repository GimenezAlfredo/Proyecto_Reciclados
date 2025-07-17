import { Router } from 'express';
import { getMunicipios } from '../controllers/municipios-controller.js';

const router = Router();

router.get('/municipios', getMunicipios);

export default router;
