"use strict";
//on recupere les elements html afin de les manipuler
const btnSubmit = document.querySelector(".todo-btn");
const inputTask = document.querySelector(".todo-input");
const formTask = document.querySelector(".todo-form");
const taskList = document.querySelector(".todo-list");
const btnDeleteAll = document.querySelector(".todo-delete-all");
//on crée un tableau pour stocker toutes les nouvelles tàches
const tasks = JSON.parse(localStorage.getItem("task") || "[]");
//Fonction de sauvegarde des elements dans le localstorage
const saveTasks = () => {
    localStorage.setItem("task", JSON.stringify(tasks));
};
//Ajouter les nouvelles taches au demarage du dom 
window.addEventListener("DOMContentLoaded", () => {
    tasks.forEach(task => AppendTask(task));
});
const handleSubmit = (e) => {
    e.preventDefault(); //cela evite a ma page de se rafraichir
    //Création d'un nouvel objet newTask
    const newTask = {
        date: new Date(),
        task: inputTask.value,
        completed: false
    };
    //Sauvegarde La tache dans le localStorage
    tasks.push(newTask);
    //ajout de la fonction appenTask
    AppendTask(newTask);
    // sauvegarder l'envoie des taches dans le Locastorages
    saveTasks();
    // Vider L'input
    inputTask.value = "";
};
//on va gere L'eventListener sur le form 
formTask.addEventListener("submit", e => handleSubmit(e));
const AppendTask = (newTask) => {
    //Ajpout d'une nouvelle tàche
    const newLi = document.createElement("li");
    const checkB = document.createElement("input");
    const btnDel = document.createElement("button");
    btnDel.classList.add("todo-delete-one");
    btnDel.textContent = "supprimer🔄️";
    checkB.type = "checkbox";
    checkB.checked = newTask.completed;
    if (newTask.completed === true) {
        newLi.style.textDecoration = "line-through";
        newLi.style.textDecorationColor = "red";
    }
    else {
        newLi.style.textDecoration = "none";
    }
    checkB.addEventListener("change", () => {
        //console.log("verification");
        newTask.completed = checkB.checked;
        if (newTask.completed === true) {
            newLi.style.textDecoration = "line-through  underline";
            newLi.style.textDecorationColor = "red";
        }
        else {
            newLi.style.textDecoration = "none";
        }
        saveTasks();
    });
    newLi.append(newTask.task, checkB, btnDel);
    taskList.prepend(newLi);
    btnDel.addEventListener("click", () => {
        newLi.remove();
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].task === newTask.task) {
                tasks.splice(i, 1);
            }
        }
        saveTasks();
    });
};
//Bouton tout effacer
const clearTasks = () => {
    const confirmDel = confirm("étes vous sur de vouloir tout éffacé?");
    if (confirmDel === true) {
        tasks.length = 0;
        taskList.textContent = "";
    }
    saveTasks();
};
btnDeleteAll.addEventListener("click", clearTasks);
