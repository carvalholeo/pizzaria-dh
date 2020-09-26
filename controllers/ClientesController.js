const connection = require('../database/connection');

const ClientesController = {
  index: async (req, res) => {
    const title = 'Lista de Clientes';
    const clientes = await connection('clientes')
      .select('*');

    return res.render('clientes/lista', {title, clientes})
  },

  delete: async (req, res) => {
    const { id } = req.params;

    await connection('clientes')
      .where({ id: Number(id)})
      .delete();

    return res.redirect('/clientes');
  },

  create: async (req, res) => {
    const { nome, email, whatsapp, cpf, cpf_na_nota } = req.body
    const novoCliente = {
      nome,
      email,
      whatsapp,
      cpf,
      cpf_na_nota: Boolean(Number(cpf_na_nota))
    }

    await connection('clientes')
      .insert(novoCliente);

    return res.redirect('/clientes')
  },

  show: async (req, res) => {
    const { id } = req.params;
    const [cliente] = await connection('clientes')
      .where({ id: Number(id)})
      .select('*');

    const title = `Editar cliente ${id} - ${cliente.nome}`;

    return res.render('clientes/editar', {title, cliente})

  },

  edit: async (req, res) => {
    const { id } = req.params;
    const { nome, email, whatsapp, cpf, cpf_na_nota } = req.body
    const infosAtualizadas = {
      nome,
      email,
      whatsapp,
      cpf,
      cpf_na_nota: Boolean(Number(cpf_na_nota))
    }

    await connection('clientes')
      .where({ id: Number(id)})
      .update(infosAtualizadas);

    res.redirect('/clientes');
  }
}

module.exports = ClientesController