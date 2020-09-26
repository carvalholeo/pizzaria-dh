const connection = require('../database/connection');

const PizzasController = {
  index: async (req, res) => {
    const title = 'Lista de Pizzas';

    const pizzas = await connection('pizzas')
      .select('*');

    return res.render('pizzas/lista', {title, pizzas})
  },

  delete: async (req, res) => {
    const { id } = req.params;

    await connection('pizzas')
      .where({id: Number(id)})
      .delete()

    return res.redirect('/pizzas')
  },

  show: async (req, res) => {
    const { id } = req.params;
    const [pizza] = await connection('pizzas')
      .where({ id: Number(id) })
      .select('*');

    const title = `Editar pizza ${id} - ${pizza.sabor}`;

    return res.render('pizzas/editar', {title, pizza})
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const { sabor, ingredientes, preco, tempo } = req.body
    const infosAtualizadas = { sabor, ingredientes, preco, tempo }

    await connection('pizzas')
      .where({id: Number(id)})
      .update(infosAtualizadas);


    return res.redirect('/pizzas')
  },

  store: async (req, res) => {
    const { sabor, ingredientes, preco, tempo } = req.body
    const novaPizza = { sabor, ingredientes, preco, tempo }

    await connection('pizzas')
      .insert(novaPizza);

    return res.redirect('/pizzas')
  }
}

module.exports = PizzasController