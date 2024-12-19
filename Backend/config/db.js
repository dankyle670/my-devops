const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'HKdfnbb6-op',
    database: 'todo_db',  
    charset: 'utf8mb4' 
  }
});

async function testConnection() {
  try {
  
    const result = await db.raw('SELECT 1+1 AS result');
    console.log('Connexion à la base de données réussie !');
    console.log('Résultat du test :', result[0][0]);
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
  } finally {
  
    await db.destroy();
  }
}

testConnection();

module.exports = db;
