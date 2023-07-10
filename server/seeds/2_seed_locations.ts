import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('locations').del();

  await knex('locations').insert([
    { id: 1, name: 'Harbor' },
    { id: 2, name: 'Airport' },
    { id: 3, name: 'Park' },
    { id: 4, name: 'Hall' },
  ]);
}
