const db = require('../config/db');

async function createTable() {
  try {
    const exists = await db.schema.hasTable('todos');

    if (!exists) {
      await db.schema.createTable('todos', (table) => {
        table.increments('id').primary(); // Crée un champ "id" qui s'auto-incrémente
        table.string('titre').notNullable().unique(); // Crée un champ "titre" qui ne peut pas être nul et doit être unique
        table.string('description').notNullable(); // Crée un champ "description" qui ne peut pas être nul
        table.boolean('completed').defaultTo(false); // Crée un champ "completed" avec valeur par défaut false
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
