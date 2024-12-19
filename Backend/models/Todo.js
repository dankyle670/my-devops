const knex = require('../config/db');

// Ajouter une nouvelle tâche
async function addTodo(titre, description) {
  // Vérification si les données obligatoires sont présentes
  if (!titre || !description) {
    throw new Error('Le titre et la description sont obligatoires');
  }

  try {
    // Insertion de la nouvelle tâche
    const [result] = await knex('todos').insert({
      titre,
      description,
      completed: false, // Par défaut, la tâche est non terminée
    });

    // Récupération de la tâche insérée en utilisant l'ID généré
    const [newTodo] = await knex('todos').where({ id: result }).select('*');

    return newTodo; // Retourner la tâche ajoutée
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la tâche:', error.message);
    throw new Error(`Impossible d'ajouter la tâche: ${error.message}`);
  }
}

// Récupérer toutes les tâches
async function getAllTodos() {
  try {
    const todos = await knex('todos').select('*');
    return todos;
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error.message);
    throw new Error(`Impossible de récupérer les tâches: ${error.message}`);
  }
}

// Mettre à jour une tâche
async function updateTodo(id, updates) {
  try {
    // Mise à jour de la tâche
    await knex('todos').where({ id }).update(updates);

    // Récupérer la tâche mise à jour
    const updatedTodo = await knex('todos').where({ id }).first();

    if (!updatedTodo) {
      throw new Error(`Aucune tâche trouvée avec l'ID: ${id}`);
    }

    return updatedTodo; // Retourner la tâche mise à jour
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la tâche:', error.message);
    throw new Error(`Impossible de mettre à jour la tâche: ${error.message}`);
  }
}

// Supprimer une tâche
async function deleteTodo(id) {
  try {
    const rowsAffected = await knex('todos').where({ id }).del();

    if (rowsAffected === 0) {
      throw new Error(`Aucune tâche trouvée avec l'ID: ${id}`);
    }

    return { message: 'Tâche supprimée avec succès' };
  } catch (error) {
    console.error('Erreur lors de la suppression de la tâche:', error.message);
    throw new Error(`Impossible de supprimer la tâche: ${error.message}`);
  }
}

module.exports = {
  addTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
};
