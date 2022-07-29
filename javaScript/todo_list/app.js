//---------------------------
//projet 4 - Todo List
//---------------------------

//variables

const addTask = document.querySelector("#add-task");
const taskContainer = document.querySelector("#task-container");
const inputTask = document.querySelector("#input-task")

//Event Listener pour le bouton + (ajouter une tache)

addTask.addEventListener("click" , () => {

    let task = document.createElement("div"); //je cée une div
    task.classList.add("task");//j'ajoute une classe "task" a  ma div

    let li = document.createElement("li");//crée une balise li
    li.innerText = `${inputTask.value}`;//je recupere la valeur de l'input

    task.appendChild(li); // cela rajoute une balise au sein de ma div

    let checkBtn = document.createElement("button");
    checkBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    checkBtn.classList.add("check-task");

    task.appendChild(checkBtn);
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
    deleteBtn.classList.add("delete-task");

    if(inputTask.value ===""){
        alert("veillez rentrer une tâche")
    }else{
        taskContainer.appendChild(task);
    }


    task.appendChild (deleteBtn);

    
    inputTask.value = "";           //permet de liberer le champs de l'input

    checkBtn.addEventListener("click", () => {

    //    checkBtn.previousSibling.style.textDecoration = "line-through";


       li.classList.toggle("toggle-task");

    })

    deleteBtn.addEventListener("click" , () => {

        deleteBtn.parentElement.remove();

    })


})



