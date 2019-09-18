
exports.seed = function(knex) {
      return knex('users').insert([
        {id: 1, username: 'ehalsmer', password: '$2a$08$bvIG6Nmid91Mu9RcmmWZfO5HJIMCT8riNW0hEp8f6/FuA2/mHZFpe', department: 'Engineering'},
        {id: 2, username: 'ajmoore', password: '$2a$08$bvIG6Nmid91Mu9RcmmWZfO5HJIMCT8riNW0hEp8f6/FuA2/mHZFpe', department: 'QA'},
        {id: 3, username: 'pmccarthy', password: '$2a$08$bvIG6Nmid91Mu9RcmmWZfO5HJIMCT8riNW0hEp8f6/FuA2/mHZFpe', department: 'DevOps'}
      ]);
};
