const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoControllers');

// Créer une tâche
router.post('/todos', todoController.createTodo);

// Récupérer toutes les tâches
router.get('/todos', todoController.getTodos);

// Mettre à jour une tâche
router.put('/todos/:id', todoController.updateTodo);

// Supprimer une tâche
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;
