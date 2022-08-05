import { schemaReferences } from "../../constants/index.js"

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable(schemaReferences.roles, (table) => {
    table.increments('id').primary()
    table.string('name')
    table.json('permissions').defaultTo([])
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable(schemaReferences.roles)
};
