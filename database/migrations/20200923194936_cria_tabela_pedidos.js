
exports.up = function(knex) {
  return knex.schema.createTable('pedidos', table => {
    table.increments('id')
      .primary()
      .notNullable();

    table.integer('cliente_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('clientes')
      .onDelete('NO ACTION')
      .onUpdate('NO ACTION');

    table.text('observacoes')
      .nullable();

    table.boolean('pedido_preferencial')
      .notNullable()
      .defaultTo(false);

    table.float('custo', 7, 2)
      .notNullable();

    table.datetime('data_hora')
      .notNullable()
      .defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pedidos');
};
