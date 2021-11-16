import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('entries', (table) => {
    table.date('date').alter();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('entries', (table) => {
    table.string('date').alter();
  });
}
