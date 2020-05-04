exports.up = function (knex) {
  return knex.schema.createTable('list', item => {
    item.increments()

    item.string('name', 128).notNullable()

    item.boolean('completed', 128).defaultTo(false)
  })
}

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('list')
}
