'use strict'


// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos')

  try {
    return (todosJSON) ? JSON.parse(todosJSON) : []
  } catch (e) {
    return []
  } 



}

// Save todos to localStorage
const saveTodos = (todos) => {
   localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove todo by id
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id)

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1)
  }

}

// Toggle the completed value for a given todo

const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id)
  
  if (todo) {
    todo.completed = !todo.completed
  }
  
  // alternative method using the findIndex which returns the index
  // const todoIndex = todos.findIndex(function (todo) {
  //   return (todo.id === id)
  // })

  // if (todoIndex > -1) {
  //   todos[todoIndex].completed = !todos[todoIndex].completed    
  // }
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {

  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed
            // the below is less elegant       
            // if (filters.hideCompleted) {
            //   return !todo.completed
            // } else {
            //   return true
            // }
    return searchTextMatch && hideCompletedMatch
  })
  
  
  const incompleteTodos = filteredTodos.filter((todo) => (!todo.completed))

  document.querySelector('#todos-div').innerHTML = ''
  
  document.querySelector('#todos-div').appendChild(generateSummaryDOM(incompleteTodos))
  
  filteredTodos.forEach((todo) => {
    document.querySelector('#todos-div').appendChild(generateTodoDOM(todo))
  })
}




// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement('div')
  const checkbox = document.createElement('input')
  const todoText = document.createElement('span')
  const removeButton = document.createElement('button')

  // setup todo checkbox
  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = todo.completed

  checkbox.addEventListener('change', () => {
    toggleTodo(todo.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })

  todoEl.appendChild(checkbox)


  
  // setup the todo text
  todoText.textContent = todo.text
  todoEl.appendChild(todoText)
  
  // setup the bottom
  removeButton.textContent = 'x'
  todoEl.appendChild(removeButton)
  removeButton.addEventListener('click', () => {
    
    removeTodo(todo.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })

  return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h2')
  summary.textContent = `You have ${incompleteTodos.length} todos left`
  return summary
}