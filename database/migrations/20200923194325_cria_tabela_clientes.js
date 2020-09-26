
exports.up = function(knex) {
  return knex.schema.createTable('clientes', table => {
    table.increments('id')
      .primary()
      .notNullable();

    table.string('nome', 100)
      .notNullable();

    table.string('email', 255)
      .notNullable();

    table.string('whatsapp', 20)
      .notNullable();

    table.string('cpf', 11)
      .nullable();

    table.boolean('cpf_na_nota')
      .notNullable()
      .defaultTo(false);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('clientes')
};
