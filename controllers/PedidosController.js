const connection = require('../database/connection');

const PedidosController = {
  index: async (req, res) => {
    const title = 'Lista de Pedidos';

    const pedidos = await connection('pedidos')
      .join('clientes', 'clientes.id', '=', 'pedidos.cliente_id')
      .select([
        "pedidos.id",
        "clientes.nome",
        "pedidos.cliente_id",
        "pedidos.observacoes",
        "pedidos.pedido_preferencial",
        "pedidos.custo",
        "pedidos.data_hora"
      ])
      .orderBy('pedidos.id', 'asc');

    const pizzas = await connection('pizzas')
      .select('*');

    const clientes = await connection('clientes')
      .select('*');

    return res.render('pedidos/lista', { title, pedidos, pizzas, clientes })
  },

  show: async (req, res) => {
    const { id } = req.params;

    const pedido = await connection('pedidos')
      .join('clientes', 'clientes.id', '=', 'pedidos.cliente_id')
      .where('pedidos.id', '=', id)
      .select([
        "pedidos.id",
        "clientes.nome",
        "pedidos.cliente_id",
        "pedidos.observacoes",
        "pedidos.pedido_preferencial",
        "pedidos.custo",
        "pedidos.data_hora"
      ])
      .first();

    const pizzasPedidas = await connection('pizzas_pedidos')
      .join('pizzas', 'pizzas.id', '=', 'pizzas_pedidos.pizza_id')
      .join('pedidos', 'pedidos.id', '=', 'pizzas_pedidos.pedido_id')
      .where('pedido_id', '=', id)
      .select([
        "pizzas_pedidos.id",
        "pizzas.sabor",
        "pizzas_pedidos.quantidade"
      ]);

    const title = `Detalhes do pedido ${id} - cliente ${pedido.nome}`;

    return res.render('pedidos/detalhes', { title, pedido, pizzasPedidas })
  },

  store: async (req, res) => {
    const { cliente_id, observacoes, pedido_preferencial, custo, pizzas } = req.body;
    const data_hora = new Date();
    const novoPedido = {
      cliente_id,
      observacoes,
      pedido_preferencial: Boolean(Number(pedido_preferencial)),
      custo,
      data_hora
    };

    const pedidoId = await connection('pedidos')
      .insert(novoPedido);

    await pizzas.forEach(async pizza => {
      const pedido = {
        pedido_id: pedidoId,
        pizza_id: pizza
      }

      await connection('pizzas_pedidos').insert(pedido)
    })

    return res.redirect('/pedidos');
  },

  destroy: async (req, res) => {
    const { id } = req.params;

    await connection('pedidos')
      .where({ id: Number(id) })
      .delete();

      return res.redirect('/pedidos');
  }
}

module.exports = PedidosController