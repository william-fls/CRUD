const express = require('express');
const testeController = require('../controllers/capivaraController');
const router = express.Router();

router.get('/', capivaraController.getAllTeste);
router.get('/search', capivaraController.searchTeste);
router.get('/new', capivaraController.renderCreateForm);
router.post('/', capivaraController.createTeste);
router.get('/:id', capivaraController.getTesteById);
router.get('/:id/edit', capivaraController.renderEditForm);
router.put('/:id', capivaraController.updateTeste);
router.delete('/:id', capivaraController.deleteTeste);

module.exports = router;
