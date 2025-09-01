// Importa o array de filmes do nosso "banco de dados"
const { filmes } = require('../data/db');
let proximoId = filmes.length > 0 ? Math.max(...filmes.map(f => f.id)) + 1 : 1;

// Função para LER todos os filmes (GET)
exports.listarTodosFilmes = (req, res) => {
  res.status(200).json(filmes);
};

// Função para LER um filme específico pelo ID (GET)
exports.buscarFilmePorId = (req, res) => {
  const filme = filmes.find(f => f.id === parseInt(req.params.id));
  if (!filme) {
    // Se o filme não for encontrado, retorna erro 404
    return res.status(404).json({ message: 'Filme não encontrado.' });
  }
  res.status(200).json(filme);
};

// Função para CRIAR um novo filme (POST)
exports.criarFilme = (req, res) => {
  const { titulo, ano, diretor } = req.body;

  // Validação simples dos dados recebidos
  if (!titulo || !ano || !diretor) {
    return res.status(400).json({ message: 'Todos os campos (titulo, ano, diretor) são obrigatórios.' });
  }

  const novoFilme = {
    id: proximoId++,
    titulo,
    ano,
    diretor
  };

  filmes.push(novoFilme);
  // Retorna o filme criado com o status 201 (Created)
  res.status(201).json(novoFilme);
};

// Função para EDITAR um filme existente (PUT)
exports.editarFilme = (req, res) => {
  const id = parseInt(req.params.id);
  const filmeIndex = filmes.findIndex(f => f.id === id);

  if (filmeIndex === -1) {
    return res.status(404).json({ message: 'Filme não encontrado.' });
  }

  const { titulo, ano, diretor } = req.body;
  if (!titulo || !ano || !diretor) {
    return res.status(400).json({ message: 'Todos os campos (titulo, ano, diretor) são obrigatórios.' });
  }

  const filmeAtualizado = { id, titulo, ano, diretor };
  filmes[filmeIndex] = filmeAtualizado;

  res.status(200).json(filmeAtualizado);
};

// Função para DELETAR um filme (DELETE)
exports.deletarFilme = (req, res) => {
  const id = parseInt(req.params.id);
  const filmeIndex = filmes.findIndex(f => f.id === id);

  if (filmeIndex === -1) {
    return res.status(404).json({ message: 'Filme não encontrado.' });
  }

  filmes.splice(filmeIndex, 1);
  // Retorna status 204 (No Content) para indicar sucesso na exclusão
  res.status(204).send();
};