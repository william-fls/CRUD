const capivara = require('../models/capivaraModel'); // Corrigido

const capivaraController = {
    createcapivara: (req, res) => {
        const newcapivara = {
            nome: req.body.nome,
            descricao: req.body.descricao,
        };

        capivara.create(newcapivara, (err, capivaraId) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.redirect('/capivara');
        });
    },

    getcapivaraById: (req, res) => {
        const capivaraId = req.params.id;

        capivara.findById(capivara, (err, capivara) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!capivara) {
                return res.status(404).json({ message: 'capivara não encontrado' });
            }
            res.render('capivara/show', { capivara });
        });
    },

    getAllcapivara: (req, res) => {
        capivara.getAll((err, capivara) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.render('capivara/index', { capivara });
        });
    },

    renderCreateForm: (req, res) => {
        res.render('capivara/create');
    },

    renderEditForm: (req, res) => {
        const capivaraId = req.params.id;

        capivara.findById(capivaraId, (err, capivara) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            if (!capivara) {
                return res.status(404).json({ message: 'capivara não encontrado' });
            }
            res.render('capivara/edit', { capivara });
        });
    },

    updatecapivara: (req, res) => {
        const capivaraId = req.params.id;
        const updatedcapivara = {
            nome: req.body.nome,
            descricao: req.body.descricao,
        };

        capivara.update(capivaraId, updatedcapivara, (err) => {
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

        capivara.searchByName(search, (err, teste) => {
            if (err) {
                return res.status(500).json({ error: err });
            }
            res.json({ capivara });
        });
    },
};

module.exports = capivaraController;
