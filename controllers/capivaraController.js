const capivara = require('../models/capivaraModel');

const capivaraController = {
    createcapivara: (req, res) => {
        const newCapivara = {
            nome: req.body.nome,
            descricao: req.body.descricao,
        };

        capivara.create(newCapivara, (err, capivaraId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/capivara');
        });
    },

    getcapivaraById: (req, res) => {
        const capivaraId = req.params.id;

        capivara.findById(capivaraId, (err, capivaraEncontrada) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!capivaraEncontrada) {
                return res.status(404).json({ message: 'Capivara não encontrada' });
            }
            res.render('capivara/show', { capivara: capivaraEncontrada });
        });
    },

    getAllcapivara: (req, res) => {
        capivara.getAll((err, capivaras) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('capivara/index', { capivara: capivaras });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('capivara/create');
    },

    renderEditForm: (req, res) => {
        const capivaraId = req.params.id;

        capivara.findById(capivaraId, (err, capivaraEncontrada) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!capivaraEncontrada) {
                return res.status(404).json({ message: 'Capivara não encontrada' });
            }
            res.render('capivara/edit', { capivara: capivaraEncontrada });
        });
    },

    updatecapivara: (req, res) => {
        const capivaraId = req.params.id;
        const updatedCapivara = {
            nome: req.body.nome,
            descricao: req.body.descricao,
        };

        capivara.update(capivaraId, updatedCapivara, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/capivara');
        });
    },

    deletecapivara: (req, res) => {
        const capivaraId = req.params.id;

        capivara.delete(capivaraId, (err) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/capivara');
        });
    },

    searchcapivara: (req, res) => {
        const search = req.query.search || '';

        capivara.searchByName(search, (err, resultados) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('capivara/index', { capivara: resultados });
        });
    },
};

module.exports = capivaraController;
