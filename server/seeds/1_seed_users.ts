import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('users').del();

  await knex('users').insert([
    { id: 1, name: 'John', token: 'my_secret_token_123', coins: 100 },
    { id: 2, name: 'Maria', token: null, coins: 100 },
    { id: 3, name: 'Tomy', token: '1234', coins: 100 },
  ]);
}
