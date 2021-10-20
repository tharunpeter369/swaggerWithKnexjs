
exports.up = function(knex) {
    return knex.schema.createTable('users',table=>{
        table.increments('id');
        table.string("email").notNullable().unique();
        table.string("first_name").notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};