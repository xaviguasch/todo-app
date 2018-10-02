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
  const p = document.createElement('p')
  p.textContent = todo.text
  return p
}

// Get the DOM elements for list summary
const generateSummaryDOM = function (incompleteTodos) {
  const summary = document.createElement('h2')
  summary.textContent = `You have ${incompleteTodos.length} todos left`
  return summary
}