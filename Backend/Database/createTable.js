const db = require('../config/db');

async function createTable() {
  try {
    const exists = await db.schema.hasTable('todos');

    if (!exists) {
      await db.schema.createTable('todos', (table) => {
        table.increments('id').primary(); 
        table.string('titre').notNullable().unique(); 
        table.string('description').notNullable(); 
        table.boolean('completed').defaultTo(false); 
      });
      console.log('Table "todos" créée avec succès!');
    } else {
      console.log('La table "todos" existe déjà.');
    }
  } catch (error) {
    console.error('Erreur lors de la création de la table:', error.message);
  }
}

module.exports = createTable;
