const Categoria = require('../models/Categoria');

const categoriaController = {
    createCategoria: async (req, res) => {
        try {
            const newCategoria = {
                nome: req.body.nome
            };

            await Categoria.create(newCategoria);
            res.redirect('/categorias');
        } catch (error) {
            console.error('Error creating categoria:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getCategoriaById: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const categoria = await Categoria.findByPk(categoriaId);

            if (!categoria) {
                return res.status(404).json({ message: 'Categoria not found' });
            }

            res.render('categorias/show', { categoria });
        } catch (error) {
            console.error('Error fetching categoria:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getAllCategorias: async (req, res) => {
        try {
            const categorias = await Categoria.findAll({
                order: [['id', 'ASC']]
            });
            res.render('categorias/index', { categorias });
        } catch (error) {
            console.error('Error fetching categorias:', error);
            res.status(500).json({ error: error.message });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('categorias/create');
    },

    renderEditForm: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const categoria = await Categoria.findByPk(categoriaId);

            if (!categoria) {
                return res.status(404).json({ message: 'Categoria not found' });
            }

            res.render('categorias/edit', { categoria });
        } catch (error) {
            console.error('Error fetching categoria for edit:', error);
            res.status(500).json({ error: error.message });
        }
    },

    updateCategoria: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const updatedCategoria = {
                nome: req.body.nome
            };

            const [updated] = await Categoria.update(updatedCategoria, {
                where: { id: categoriaId }
            });

            if (updated) {
                res.redirect('/categorias');
            } else {
                res.status(404).json({ message: 'Categoria not found' });
            }
        } catch (error) {
            console.error('Error updating categoria:', error);
            res.status(500).json({ error: error.message });
        }
    },

    deleteCategoria: async (req, res) => {
        try {
            const categoriaId = req.params.id;
            const deleted = await Categoria.destroy({
                where: { id: categoriaId }
            });

            if (deleted) {
                res.redirect('/categorias');
            } else {
                res.status(404).json({ message: 'Categoria not found' });
            }
        } catch (error) {
            console.error('Error deleting categoria:', error);
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = categoriaController;