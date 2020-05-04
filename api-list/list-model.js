const db = require('../data/dbConfig')

module.exports = {
  getList,
  addItem,
  getById,
  editItem,
  removeItem
}

function getList () {
  return db('list')
}

function getById (id) {
  return db('list')
    .where('id', id)
    .first()
}

function addItem (item) {
  return db('list').insert(item, 'id')
}

function editItem (changes, id) {
  return db('list')
    .where({ id })
    .update(changes)
}

function removeItem (id) {
  return db('list')
    .where({ id })
    .del()
}
