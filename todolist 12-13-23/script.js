let task = document.getElementById("task");
let todoList = document.getElementById("todoList");
let todoListArray = JSON.parse(localStorage.getItem("todos")) || [];

displayTodo();

function addTodo() {
    if (task.value === "") {
        alert("please write something!");
    } else {
        todoListArray.push({isCompleted: false, text: task.value})
        displayTodo();
        }
        task.value = "";
        saveData();
    }


function displayTodo() { //create, render()
    todoList.innerHTML = "";
    for (let i = 0; i < todoListArray.length; i++) { // you are looping through each item in the array
        let todo = document.createElement("li");
             todo.innerHTML = todoListArray[i].text;   

             todo.setAttribute("data-id", i)
        
            let removeBtn = document.createElement("button");
            removeBtn.setAttribute("data-id", i)
            removeBtn.innerHTML = "Remove";

            if(todoListArray[i].lineThrough === true){
                todo.style.textDecoration = "line-through";   
            }
            
            todo.appendChild(removeBtn);
            todoList.appendChild(todo);
    }   
}


todoList.addEventListener("click", function(e) {

    let targetId =  e.target.getAttribute("data-id");
  

    if (e.target.tagName === "LI") {
        
            
                todoListArray[targetId].lineThrough = true //targetId represents 0 - x ;
            if (e.target.classList.toggle("checked")) {
                e.target.style.textDecoration = "line-through";
            } else {
            e.target.style.textDecoration = "none";
        }
    }
    if (e.target.tagName === "BUTTON") {
        let tempArray = []; //i made a array to hold everything i want to include

        for(let i = 0; i < todoListArray.length; i++){
            console.log("comparing", i , targetId)
            if(i != targetId){ //not invited to party
                tempArray.push(todoListArray[i]) //add the rest to the party
            }
        }
        console.log(1,tempArray)
         todoListArray = tempArray;

         console.log(2,todoListArray)


        e.target.parentElement.remove();
    }
    saveData();
});


function saveData() {
    localStorage.setItem("todos", JSON.stringify(todoListArray));
}