
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('list').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('list').insert([
        {
          id:'1',
          name: 'Bananas',
          completed: false
        },
        {
          id: '2',
          name: 'Eggs',
          completed: false
        },
      ]);
    });
};
