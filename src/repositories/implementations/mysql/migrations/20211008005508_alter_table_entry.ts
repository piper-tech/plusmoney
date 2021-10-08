import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('entries', (table) => {
    table.integer('categoryId').unsigned().notNullable().references('id').inTable('categories');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('entries', (table) => {
    table.dropColumn('categoryId');
  });
}
