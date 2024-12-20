// Sélection des éléments du DOM
const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const todoTitre = document.getElementById('todo-titre');
const todoDescription = document.getElementById('todo-description');

// URL de base pour l'API
const API_URL = 'http://localhost:3000/api/todos';

// Fonction pour récupérer les tâches depuis l'API
const fetchTodos = async () => {
  try {
    const response = await fetch(API_URL);
    const todos = await response.json();
    renderTodos(todos);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches:', error);
  }
};

// Fonction pour afficher les tâches
const renderTodos = (todos) => {
  todoList.innerHTML = '';
  
  // Trier les tâches : non complétées en haut, complétées en bas
  todos.sort((a, b) => {
    if (a.completed === b.completed) {
      return b.id - a.id; // Nouvelles tâches en haut dans chaque catégorie
    }
    return a.completed ? 1 : -1;
  });

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleCompleted(${todo.id}, this.checked)">
      <span class="${todo.completed ? 'completed' : ''}">${todo.titre} - ${todo.description}</span>
      <button onclick="editTodo(${todo.id})">Modifier</button>
      <button onclick="deleteTodo(${todo.id})">Supprimer</button>
    `;
    todoList.appendChild(li);
  });
};

// Fonction pour ajouter une nouvelle tâche
const addTodo = async (event) => {
  event.preventDefault();
  const titre = todoTitre.value.trim();
  const description = todoDescription.value.trim();

  if (titre && description) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titre, description }),
      });

      if (response.ok) {
        todoTitre.value = '';
        todoDescription.value = '';
        fetchTodos();
      } else {
        throw new Error('Erreur lors de l\'ajout de la tâche');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche:', error);
    }
  }
};

// Fonction pour modifier une tâche
const editTodo = async (id) => {
  const todo = await fetchTodoById(id);
  const newTitre = prompt('Modifier le titre de la tâche:', todo.titre);
  const newDescription = prompt('Modifier la description de la tâche:', todo.description);

  if (newTitre && newDescription) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titre: newTitre, description: newDescription }),
      });

      if (response.ok) {
        fetchTodos();
      } else {
        throw new Error('Erreur lors de la mise à jour de la tâche');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
    }
  }
};

// Fonction pour supprimer une tâche
const deleteTodo = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchTodos();
      } else {
        throw new Error('Erreur lors de la suppression de la tâche');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la tâche:', error);
    }
  }
};

// Fonction pour marquer une tâche comme terminée/non terminée
const toggleCompleted = async (id, completedStatus) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: completedStatus }),
    });

    if (response.ok) {
      fetchTodos();
    } else {
      throw new Error('Erreur lors du changement du statut de la tâche');
    }
  } catch (error) {
    console.error('Erreur lors du changement du statut de la tâche:', error);
  }
};

// Fonction utilitaire pour récupérer une tâche par son ID
const fetchTodoById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

// Écouteurs d'événements
todoForm.addEventListener('submit', addTodo);
document.addEventListener('DOMContentLoaded', fetchTodos);

