const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'db',           // Name of the MySQL service in docker-compose.yml
    user: 'myuser',       // Matches MYSQL_USER in docker-compose.yml
    password: 'mypassword', // Matches MYSQL_PASSWORD in docker-compose.yml
    database: 'todo_db',  // Matches MYSQL_DATABASE in docker-compose.yml
    charset: 'utf8mb4',
    port: 3306,           // Internal port MySQL listens on
  },
  pool: {
    min: 2,
    max: 10,
  },
});

async function testConnection() {
  try {
    const result = await db.raw('SELECT 1+1 AS result');
    console.log('Connexion à la base de données réussie !');
    console.log('Résultat du test :', result[0][0]);
  } catch (error) {
    console.error('Erreur de connexion à la base de données :', error);
  }
}

testConnection();

module.exports = db;
