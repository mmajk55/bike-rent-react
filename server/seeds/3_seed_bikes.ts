import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('bikes').del();

  await knex('bikes').insert([
    { id: 1, type: 'electric', price_per_day: 10 },
    { id: 2, type: 'classic', price_per_day: 3 },
    { id: 3, type: 'modern', price_per_day: 5 },
    { id: 4, type: 'classic', price_per_day: 3 },
  ]);
}
