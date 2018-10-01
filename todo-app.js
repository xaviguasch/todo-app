const todos = [{
  text: 'Finish this course',
  completed: false,
}, {
  text: 'Buy the groceries',
  completed: false
}, {
  text: 'Watch Eight Grade',
  completed: true
}, {
  text: 'Cut your hair',
  completed: true
}, {
  text: 'Accept the deal',
  completed: false
}]


 const filters = {
  searchText: '',
  hideCompleted: false
}





const renderTodos = function (todos, filters) {
  
  let filteredTodos = todos.filter(function (todo) {
    return todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) 
  })
  
  filteredTodos = filteredTodos.filter(function (todo) {
    return !filters.hideCompleted || !todo.completed
    // the below is less elegant
    
    // if (filters.hideCompleted) {
    //   return !todo.completed
    // } else {
    //   return true
    // }
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
  const newTodoObj = {
    text: '',
    completed: false
  }
  let newTodoFromForm = e.target.elements.newTodo.value  
  newTodoObj.text = newTodoFromForm
  todos.push(newTodoObj)
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


























