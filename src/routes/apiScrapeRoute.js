import { Router } from 'express';
import dadosController from '../controller/dadosController.js';

const router = new Router();

router.get('/:id', dadosController.show);

export default router;