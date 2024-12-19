const knex = require('../knexFile'); // Importer la configuration Knex

// Ajouter une nouvelle tâche
async function addTodo(title, description) {
  try {
    const newTodo = await knex('todos').insert({
      title,
      description,
      completed: false, // Par défaut, la tâche est non terminée
    }).returning('*');
    return newTodo[0]; // Retourner la tâche ajoutée
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la tâche:', error.message);
    throw error;
  }
}

// Récupérer toutes les tâches
async function getAllTodos() {
  try {
    const todos = await knex('todos').select('*');
    return todos;
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error.message);
    throw error;
  }
}

// Mettre à jour une tâche
async function updateTodo(id, updates) {
  try {
    const updatedTodo = await knex('todos')
      .where({ id })
      .update(updates)
      .returning('*');
    return updatedTodo[0];
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error.message);
    throw error;
  }
}

// Supprimer une tâche
async function deleteTodo(id) {
  try {
    await knex('todos').where({ id }).del();
    return { message: 'Tâche supprimée avec succès' };
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error.message);
    throw error;
  }
}

module.exports = {
  addTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
};
