const {filmes, reviews} = require('../../data/db');
let proximoReviewId = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) + 1 : 1;

const verificarFilmeExistente = (filmeId) => {
    return filmes.some(f => f.id === filmeId);

};

exports.criarReview = (req, res) => {
    const filmeId = parseInt(req.params.filmeId);
    const { autor, nota, comentario } = req.body;
    if (!verificarFilmeExistente(filmeId)) {
        return res.status(404).json({ message: 'Filme não encontrado para adicionar a review.' });
    }
    if (!autor || !nota) {
        return res.status(400).json({ message: 'Autor e nota são campos obrigatórios.' });
    }

    const novaReview = {
        id: proximoReviewId++,
        filmeId,
        autor,
        nota,
        comentario: comentario || ""
    };
    reviews.push(novaReview);
    res.status(201).json(novaReview);
};