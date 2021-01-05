// All variables
const taskInput = document.querySelector('.task-input');
const todoInputForm = document.querySelector('form');
const taskTilesContainer = document.querySelector('.tasks');
const categoryOptions = document.querySelector('select');
const searchInput = document.querySelector('.search-box > input');




// filterTodo function for searching todos
const filterTodos = (searchedTerm) => {
    Array.from(taskTilesContainer.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(searchedTerm))
    .forEach((todo) => todo.classList.add('filtered-todo'));

    Array.from(taskTilesContainer.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(searchedTerm))
    .forEach((todo) => todo.classList.remove('filtered-todo'));
}
// Search event listeners
searchInput.addEventListener('keyup', () => {
    const searchedTerm = searchInput.value.trim().toLowerCase();
    filterTodos(searchedTerm);
})



// All event listeners 

document.addEventListener('DOMContentLoaded', () => {
    let todos;
    //checking do I already have things in there?
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo) => {
        const childOfTaskDiv = document.createElement("div");
        childOfTaskDiv.classList.add("task-tiles");
        taskTilesContainer.appendChild(childOfTaskDiv);

        const taskSpan = document.createElement("span");
        taskSpan.textContent = todo;
        childOfTaskDiv.appendChild(taskSpan);

        const checkButton = document.createElement("button")
        checkButton.classList.add("check-button");
        checkButton.innerHTML = '<img src="images/check.svg">';
        childOfTaskDiv.appendChild(checkButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = '<img src="images/bin-with-lid.svg">';
        childOfTaskDiv.appendChild(deleteButton);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let checkedTodos;
    //checking do I already have things in there?
    if(localStorage.getItem("checkedTodos") === null){
        checkedTodos = [];
    }else {
        checkedTodos = JSON.parse(localStorage.getItem("checkedTodos"));
    }
    checkedTodos.forEach((todo) => {
        const childOfTaskDiv = document.createElement("div");
        childOfTaskDiv.classList.add("task-tiles", "checking-task");
        taskTilesContainer.appendChild(childOfTaskDiv);

        const taskSpan = document.createElement("span");
        taskSpan.textContent = todo;
        childOfTaskDiv.appendChild(taskSpan);

        const checkButton = document.createElement("button")
        checkButton.classList.add("check-button");
        checkButton.innerHTML = '<img src="images/check.svg">';
        childOfTaskDiv.appendChild(checkButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = '<img src="images/bin-with-lid.svg">';
        childOfTaskDiv.appendChild(deleteButton);
    });
});

todoInputForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if(taskInput.value !== ""){
        const childOfTaskDiv = document.createElement("div");
        childOfTaskDiv.classList.add("task-tiles");
        taskTilesContainer.appendChild(childOfTaskDiv);

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskInput.value;
        childOfTaskDiv.appendChild(taskSpan);
        //Add todo to local storage
        saveLocalTodos(taskInput.value);

        const checkButton = document.createElement("button")
        checkButton.classList.add("check-button");
        checkButton.innerHTML = '<img src="images/check.svg">';
        childOfTaskDiv.appendChild(checkButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        deleteButton.innerHTML = '<img src="images/bin-with-lid.svg">';
        childOfTaskDiv.appendChild(deleteButton);

        // THE ABOVE CODE WILL GENERATE THE FOLLOWING HTML;
        
        // `<div class="task-tiles">
        //    <span>${taskInput.value}</span>
        //     <div class="check-button">
        //         <img src="images/check.svg">
        //     </div>
        //     <div class="delete-button">
        //         <img src="images/bin-with-lid.svg">
        //     </div>
        // </div>`

        taskInput.value = '';
        taskInput.style.pointerEvents = 'visible-stroke';
    }
});

taskTilesContainer.addEventListener('click', (e) => {
    if(e.target.className ===  'check-button') {
        const taskBar = e.target.parentElement;
        taskBar.classList.toggle('checking-task');
        if(taskBar.classList.contains('checking-task')){  
            savingCheckedTodos(taskBar);
            removeCheckedFromTodos(taskBar);

        }else {
            removeCheckedTodos(taskBar);
            saveLocalTodos(taskBar.childNodes[0].textContent);
        }

    }
    else if(e.target.className === 'delete-button'){
        const taskBar = e.target.parentElement;
        taskBar.classList.add('deleting-task');
        //removing the todos from local storge
        
        if(!taskBar.classList.contains("checking-task")){
            removeLocalTodos(taskBar);
        } else {
            removeCheckedTodos(taskBar);
        }
        setTimeout(() => taskBar.remove(), 1000);
    }
});

categoryOptions.addEventListener('click', (e) => {
    const todos = taskTilesContainer.childNodes;
    todos.forEach((todo) => {
        switch (true){   
            case e.target.value === 'all':
                todo.style.display = 'flex';
                break;
            case e.target.value === 'completed':
                if(todo.classList.contains('checking-task')){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
            case e.target.value === 'incompleted':
                if(!todo.classList.contains('checking-task')){
                    todo.style.display = 'flex';
                }else {
                    todo.style.display = 'none';
                }
                break;
        }   
    }) 
});

const saveLocalTodos = (todo) => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

const removeLocalTodos = (todo) => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
const removeCheckedTodos = (todo) => {
    let checkedTodos;
    if(localStorage.getItem("checkedTodos") === null){
        checkedTodos = [];
    }else {
        checkedTodos = JSON.parse(localStorage.getItem("checkedTodos"));
    }
    const todoIndex = todo.children[0].innerText;
    checkedTodos.splice(checkedTodos.indexOf(todoIndex), 1);
    localStorage.setItem("checkedTodos", JSON.stringify(checkedTodos));
}
let savingCheckedTodos = (taskBar) => {
    let checkedTodos;
    if(localStorage.getItem("checkedTodos") === null){
        checkedTodos = [];
    }else {
        checkedTodos = JSON.parse(localStorage.getItem("checkedTodos"));
    }
    checkedTodos.push(taskBar.textContent);
    localStorage.setItem("checkedTodos", JSON.stringify(checkedTodos));
}
let removeCheckedFromTodos = (taskBar) => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = taskBar.innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


