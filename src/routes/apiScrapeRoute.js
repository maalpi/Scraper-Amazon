import { Router } from 'express';

// Importando o controlador para manipular as requisições
import dadosController from '../controller/dadosController.js';

const router = new Router();

// Defini a rota GET com um parametro id e associa a função 'show' do controlador 'dadosController'
router.get('/:id', dadosController.show);

export default router;