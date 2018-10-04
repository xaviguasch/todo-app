


// Fetch existing todos from localStorage
const getSavedTodos = function () {

  const todosJSON = localStorage.getItem('todos')

  if (todosJSON !== null) {
    return JSON.parse(todosJSON)
  } else {
    return []
  }
}

// Save todos to localStorage
const saveTodos = function (todos) {
   localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove todo by id
const removeTodo = function (id) {
  const todoIndex = todos.findIndex(function (todo) {
    return todo.id === id
  })

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1)
  }

}

// Toggle the completed value for a given todo

const toggleTodo = function (id) {
  const todo = todos.find(function (todo) { // find() returns the whole object
    return todo.id === id
  })
  
  if (todo !== undefined) {
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
const renderTodos = function (todos, filters) {

  const filteredTodos = todos.filter(function (todo) {
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
  
  
  const incompleteTodos = filteredTodos.filter(function (todo) {
    return (!todo.completed) 
  })

  document.querySelector('#todos-div').innerHTML = ''
  
  document.querySelector('#todos-div').appendChild(generateSummaryDOM(incompleteTodos))
  
  filteredTodos.forEach(function (todo) {
    document.querySelector('#todos-div').appendChild(generateTodoDOM(todo))

  })
}




// Get the DOM elements for an individual note
const generateTodoDOM = function (todo) {
  const todoEl = document.createElement('div')
  const checkbox = document.createElement('input')
  const todoText = document.createElement('span')
  const removeButton = document.createElement('button')

  // setup todo checkbox
  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = todo.completed

  checkbox.addEventListener('change', function () {
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
  removeButton.addEventListener('click', function () {
    
    removeTodo(todo.id)
    saveTodos(todos)
    renderTodos(todos, filters)
  })

  return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
  const summary = document.createElement('h2')
  summary.textContent = `You have ${incompleteTodos.length} todos left`
  return summary
}