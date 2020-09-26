
exports.up = function(knex) {
  return knex.schema.createTable('pizzas', table => {
    table.increments('id')
      .primary()
      .notNullable();

    table.string('sabor', 100)
      .notNullable()

    table.string('ingredientes', 255)
        .notNullable();

    table.float('preco', 6, 2)
      .notNullable()

    table.integer('tempo')
      .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('pizzas');
};
