/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items', (table) => {
    table.increments('id').primary();
    table.integer('user_Id').notNullable();
    table.foreign('user_Id').references('users.id').onDelete('CASCADE');
    table.string('item_name').notNullable();
    table.string('description').notNullable();
    table.integer('quantity').notNullable();
  })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('items', (table) => {
    table.dropForeign('user_Id');
  })
  .then(function() {
    return knex.schema.dropTableIfExists('items');
  })

};
