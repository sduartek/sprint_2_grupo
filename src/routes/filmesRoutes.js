const express = require('express');
const router = express.Router();
const filmesController = require('../controllers/filmesController');

router.get('/filmes', filmesController.listarTodosFilmes);
router.get('/filmes/:id', filmesController.buscarFilmePorId);
router.post('/filmes', filmesController.criarFilme);
router.put('/filmes/:id', filmesController.editarFilme);
router.delete('/filmes/:id', filmesController.deletarFilme);

module.exports = router;