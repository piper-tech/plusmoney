import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('entries', (table) => {
    table.increments('id');
    table.text('description').notNullable();
    table.double('value').notNullable();
    table.text('date').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('entries');
}
