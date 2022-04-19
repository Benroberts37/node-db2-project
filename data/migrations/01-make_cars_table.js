exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.text('vin')
      .required()
      .notNullable()
      .unique()
    tbl.text('make')
      .required()
      .notNullable()
    tbl.text('model')
      .required()
      .notNullable()
    tbl.integer('mileage')
      .required()
      .notNullable()
    tbl.text('title')
    tbl.text('transmission')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
};
