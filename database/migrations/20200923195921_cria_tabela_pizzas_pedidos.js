
exports.up = function(knex) {
  return knex.schema.createTable('pizzas_pedidos', table => {
    table.increments('id')
      .primary()
      .notNullable();

    table.integer('pedido_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('pedidos')
      .onDelete('CASCADE')
      .onUpdate('NO ACTION');

    table.integer('pizza_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('pizzas')
      .onDelete('RESTRICT')
      .onUpdate('NO ACTION');

    table.integer('quantidade')
      .notNullable()
      .defaultTo(1);

    table.text('observacoes')
      .nullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pizzas_pedidos');
};
