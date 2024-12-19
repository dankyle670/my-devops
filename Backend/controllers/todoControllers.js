const todoModel = require('../models/Todo');


async function createTodo(req, res) {
  const { title, description } = req.body;
  
  if (!title || !description) {
    return res.status(400).json({ error: 'Le titre et la description sont obligatoires' });
  }

  try {
    const newTodo = await todoModel.addTodo(title, description);
    res.status(201).json(newTodo); // Répond avec la tâche créée
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de la tâche' });
  }
}


async function getTodos(req, res) {
  try {
    const todos = await todoModel.getAllTodos();
    res.status(200).json(todos); // Répond avec toutes les tâches
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
  }
}

// Mettre à jour une tâche
async function updateTodo(req, res) {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  if (!title && !description && completed === undefined) {
    return res.status(400).json({ error: 'Au moins un champ doit être mis à jour' });
  }

  try {
    const updatedTodo = await todoModel.updateTodo(id, { title, description, completed });
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
    res.status(200).json(updatedTodo); // Répond avec la tâche mise à jour
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la tâche' });
  }
}

// Supprimer une tâche
async function deleteTodo(req, res) {
  const { id } = req.params;

  try {
    const result = await todoModel.deleteTodo(id);
    res.status(200).json(result); // Répond avec un message de succès
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la tâche' });
  }
}

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
