

let todos = []

const filters = {
  searchText: '',
  hideCompleted: false
}

const todosJSON = localStorage.getItem('todos')

if (todosJSON !== null) {
  todos = JSON.parse(todosJSON)
}







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
  


  const pendingTodos = filteredTodos.filter(function (todo) {
    return (!todo.completed) 
  })


  document.querySelector('#todos-div').innerHTML = ''
  
  const message = document.createElement('h2')
  message.textContent = `You have ${pendingTodos.length} todos left`
  document.querySelector('#todos-div').appendChild(message)


  filteredTodos.forEach(function (filtTodo) {
    const todoEl = document.createElement('p')
    todoEl.textContent = filtTodo.text
    document.querySelector('#todos-div').appendChild(todoEl)
  })
  
  
}

console.log(renderTodos(todos, filters));



document.querySelector('#search-input').addEventListener('input', function (e) {
  filters.searchText = e.target.value
  renderTodos(todos, filters)
  
})

document.querySelector('#todo-form').addEventListener('submit', function (e) {
  e.preventDefault()
  todos.push({
    text: e.target.elements.newTodo.value,
    completed: false
  })
  
  
  localStorage.setItem('todos', JSON.stringify(todos))

  renderTodos(todos, filters)

  

  e.target.elements.newTodo.value = ''  
})



// 1. Create a checkbox and setup event listener -> "Hide completed"
// 2. Create new hideCompleted filter (default false)
// 3. Update hideCompleted an rerender list on checkbox change
// 4. Setup renderTodos to remove completed items

document.querySelector('#hide-completed').addEventListener('change', function (e) {
  // if (e.target.checked) {
  //   filters.hideCompleted = true
  //   } else {
  //   filters.hideCompleted = false
  //   }

  // The below is more elegant 
  filters.hideCompleted = e.target.checked


  console.log(renderTodos(todos, filters));

})


























