'use strict'

let todos = getSavedTodos()

const filters = {
  searchText: '',
  hideCompleted: false
}

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value
  renderTodos(todos, filters)  
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim()
    e.preventDefault()
  
    if (text.length > 0) {
        todos.push({
            id: uuidv4(),
            text,   // ES6 -> When the property and the value have the same name ( text: text,)
            completed: false
        })
        saveTodos(todos)
        renderTodos(todos, filters)
        e.target.elements.text.value = ''  
    }


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

























