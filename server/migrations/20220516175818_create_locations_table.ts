import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('locations', (table) => {
    table.increments('id');
    table.text('name');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('locations');
}
