const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo") //input değeri
const todoList = document.querySelector(".list-group") // todo ların ekleneceği liste
const firsCardBody = document.querySelector(".card-body")[0]
const secondCardBody = document.querySelector(".card-body")[1]
const filter = document.querySelector("#filter")
const clearButton = document.querySelector("#clear-todos")

eventListeners()

function eventListeners(){
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    todoList.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(){

    if (confirm("Tümünü silmek istediğinize emin misiniz?")){
         //Arayüzden todoları temizleme
        //console.log(todoList.firstElementChild);

        while (todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }

   



}


function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1){
            //Bulamadı
            listItem.setAttribute("style", "display : none !important");
        }
        else{
            listItem.setAttribute("style", "display : block");
        }

    });



}

function deleteTodo(e){

    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo başarıyla silindi...")
    }
}

function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo, index){
        if (todo === deletetodo){
            todos.splice(index, 1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI(){

    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })



}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    
    if(newTodo === ""){
        /*
            <div class="alert alert-danger" role="alert">
                        This is a danger alert—check it out!
                      </div>
        */
        showAlert("danger", "Lütfen bir todo girin");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo)
        showAlert("success", "Todo başarıyla eklendi")
    }

    e.preventDefault();
}

function getTodosFromStorage(){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


function addTodoToStorage(newTodo){

    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message){

    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    
    form.appendChild(alert)
    //firsCardBody.appendChild(alert);
    // //setTimeout
    setTimeout(function(){
        alert.remove();
    }, 1000);

}

function addTodoToUI(newTodo){

    /*
        <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>
    */

    const listItem = document.createElement("li");
    // link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = `<i class = "fa fa-remove"></i>`

    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo))
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    todoInput.value = "";
    
}