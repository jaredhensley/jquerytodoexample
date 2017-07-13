$(document).ready(function () {

    // cached dom elements
    var $todoForm = $('#todo-form');
    var $todoInput = $('#todo-input');
    var $todoBtn = $('#todo-btn');
    var $todoList = $('#todo-list');

    // application state
    var state = {
        todos: []
    };

    // Todo constructor function, creates a new "todo" object
    function Todo(description) {
        this.description = description;
        this.completed = false;
    }

    // helper functions 
    function createTodo(state, description) {
        var todo = new Todo(description);
        state.todos.push(todo);
    }

    function deleteTodo(state, id) {
        state.todos.splice(id, 1);  
        renderTodos(state);
    }

    function toggleTodoStatus(state,id) {
        state.todos[id].completed = !state.todos[id].completed;
    }

    function renderTodos(state) {
        $todoList.html('');
        let listItems = state.todos.map(function (todo, index) {
            return $("<li class='todo-item'></li>")
                .addClass(function() {
                   return state.todos[index].completed ? 'todo-completed' : ''; 
                })
                .text(todo.description)
                .attr("id", index)
                .append('<i class="fa fa-trash-o delete-todo"></i>');
        });

        listItems.forEach(function (item) {
            $todoList.append(item);
        })
    }

    //event listeners
    $todoForm.on('submit', function (event) {
        event.preventDefault();
        if ($todoInput.val()) {
            let userInput = $todoInput.val();
            createTodo(state, userInput);
            renderTodos(state);
            $todoInput.val('');
        } else {
            console.log('input is empty');
        }
    });

    $todoList.on('click', 'li', function() {
        var id = parseInt($(this).attr('id'));
        toggleTodoStatus(state, id);
        $(this).toggleClass('todo-completed');
    });

    $todoList.on('click', '.delete-todo', function(event) {
        event.stopPropagation();
        var id = parseInt($(this).closest('li').attr('id'));
        deleteTodo(state, id);
    });

});