import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('bikes', (table) => {
    table.increments('id');
    table.text('type');
    table.integer('price_per_day');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('bikes');
}
