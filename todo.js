var log = function() {
    console.log.apply(console, arguments)
}

var insertTodo = function(todo) {
    var todoContainer = e('#id-div-container')
    var t = templateTodo(todo)
    todoContainer.insertAdjacentHTML('beforeend', t)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var todos = []

var loadTodos = function() {
    todos = JSON.parse(localStorage.simpletodos)
    for (var i = 0; i < todos.length; i++) {
        var t = todos[i]
        insertTodo(t)
    }
}

var addButton = e('#id-button-add')
addButton.addEventListener('click', function(event) {
    var todoInput = e('#id-input-todo')
    var todo = todoInput.value
    todos.push(todo)
    localStorage.simpletodos = JSON.stringify(todos)
    e('#id-div-container').innerHTML = ''
    loadTodos()
})

var templateTodo = function(todo) {
    var t = `
        <div class='todo-cell'>
            <div class="todo-done"></div>
            <span contenteditable='true'>${todo}</span>
            <div class='todo-delete'>×</div>
        </div>
        `
    return t
}

var todoContainer = e('#id-div-container')

todoContainer.addEventListener('click', function(event) {
    var target = event.target
    if (target.classList.contains('todo-done')) {
        toggleClass(target, 'done-color')
        var todoDiv = target.parentElement
        toggleClass(todoDiv, 'done')
    } else if (target.classList.contains('todo-delete')) {
        var button = event.target
        var cell = button.parentElement
        var cells = cell.parentElement.children
        var index = 0
        for (var i = 0; i < cells.length; i++) {
            var c = cells[i]
            if (c == cell) {
                index = i
                break
            }
        }
        todos.splice(index, 1)
        localStorage.simpletodos = JSON.stringify(todos)
        var todoDiv = target.parentElement
        todoDiv.remove()
    }
})

var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

loadTodos()
