'use strict'

let todos = getSavedTodos()

const filters = {
  searchText: '',
  hideCompleted: false
}

renderTodos(todos, filters);

document.querySelector('#search-input').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderTodos(todos, filters)  
})

document.querySelector('#todo-form').addEventListener('submit', (e) => {
  e.preventDefault()
  todos.push({
    id: uuidv4(),
    text: e.target.elements.newTodo.value,
    completed: false
  })
  saveTodos(todos)
  renderTodos(todos, filters)
  e.target.elements.newTodo.value = ''  
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
  // if (e.target.checked) {
  //   filters.hideCompleted = true
  //   } else {
  //   filters.hideCompleted = false
  //   }

  // The below is more elegant 
  filters.hideCompleted = e.target.checked
  renderTodos(todos, filters);
})

























