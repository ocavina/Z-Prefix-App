const bcrypt = require('bcrypt');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  const testPassword1 = await bcrypt.hash('password1', 10);
  const testPassword2 = await bcrypt.hash('password2', 10);

  await knex('users').insert([
    {first_name: 'Joe', last_name: 'Dirt', username: 'manager1', password: testPassword1},
    {first_name: 'Jane', last_name: 'Doe', username: 'manager2', password: testPassword2}
  ]);
};
