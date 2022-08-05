import { schemaReferences } from "../../constants/index.js"
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.createTable(schemaReferences.user, (table) => {
        table.increments('id').primary()
        table.string('username')
        table.string('password')
        table.integer('role')
        table.date('birthDate')
        table.string('gender')
        table.string('phone').defaultTo(null)
        table.string('email')
        table.boolean('deleted').defaultTo(false)
        table.string('country').defaultTo(null)
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    return knex.schema.dropTable(schemaReferences.user)
};
