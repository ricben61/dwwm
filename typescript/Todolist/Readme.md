---------------------------------------------------------------------
Projet - Todo List  | TypeScript - LocalStorage
---------------------------------------------------------------------

############## Initialisation  #############


0 - On va créer dans notre environnement de travail 
0.1 - Créer dossiers dist et src
0.2 - Créer un fichier app.ts dans src 

1 - On va initialiser TypeScript dans notre dossier "TodoList" 

tsc --init 

2 - On va se rendre dans le nouveau fichier tsconfig.json on va modifier la target et mettre ES6 ou ES2016 

2.1 - On va décommenter la ligne outDir: "./" 
On va ajouter la sortie dans outDir: "./src"

Nous avons donc terminé l'initialisation, here we go! 
---------------------------------------------


############# HTML / CSS  #############

Comme toujours avant chaque projet que nous réalisons, nous devons réaliser d'abord l'ossature de notre application, on va donc commencer par réaliser le HTML et le CSS

Je propose une structure simple avec un CSS "universel", par la suite c'est à vous de personnaliser votre projet comme à chaque fois depuis le début de la formation.

------------------------------------------

0 - Connecter le fichier app.js et le index.html 
0.1 - Lier le ficher style.css et le index.html

--

Faire le HTML ... (je ne mets pas les étapes ici)

Faire le CSS ... (je ne mets pas les étapes ici)



############# TypeScript  #############

0 - Dans app.ts on va tester si on a bien lié tout ça avec un console.log("Test");

1 - On va sélectionner tous les éléments 

// On va sélectionner les éléments

const btnSubmit = document.querySelector('.todo-btn') as HTMLButtonElement;
const inputTask = document.querySelector('.todo-input') as HTMLInputElement;
const formTask = document.querySelector('.todo-form') as HTMLFormElement;
const taskList = document.querySelector('.todo-list') as HTMLElement;
const btnDeleteAll = document.querySelector('.todo-delete-all') as HTMLButtonElement;

2 - On va gérer EventListner sur le form

formTask.addEventListener('submit', e => {
    console.log('Submit')
})

// Ca ne marche pas,  car il faut qu'on ajoute un preventDefault

2.1 - formTask.addEventListener('submit', e => {
    e.preventDefault();
    console.log('Submit')
})

3 - On va mettre ça dans une const Handle Submit qui permet à chaque fois qu'on ajoute une tâche de ne pas rafraichir la page

On va le mettre en haut de l'EventListener

const handleSubmit = (e: Event) => {
    e.preventDefault();

 // Créer un nouvel objet newTask

    const newTask = {
        date: new Date(),
        task: inputTask.value,
        completed: false
    }

   

}

formTask.addEventListener('submit', e => handleSubmit(e));

// Explication LocalStorage

4 - On va créer la balise li et l'input permettant d'ajouter une nouvelle tâche 

4 - LocalStorage

const handleSubmit = (e: Event) => {
    e.preventDefault();

 // Créer un nouvel objet newTask

    const newTask = {
        date: new Date(),
        task: inputTask.value,
        completed: false
    }

    // Sauvegarde la tâche dans le LocalStorage
    
    // Ajout d'une nouvelle tâche


    const newLi = document.createElement("li");
    const checkB = document.createElement("input")
    checkB.type = "checkbox";
    check.addEventListener("change" () => {
        console.log("Vérification");
        newTask.completed = checkB.checked
    });
     newLi.append(newTask.task, checkB )
    taskList.prepend(newLi);

    //Vider l'input

    inputTask.value = "";
}

4 - On va créer une fonction qui va créer tous les éléments HTML

4 - const appendTask = (newTask) => {
    const newLi = document.createElement("li");
    const checkB = document.createElement("input")
    checkB.type = "checkbox";
    check.addEventListener("change" () => {
        console.log("Vérification");
        newTask.completed = checkB.checked
    });
     newLi.append(newTask.task, checkB )
    taskList.prepend(newLi);
}


4 - Mon handleSubmit devient donc 

    const newTask = {
        date: new Date(),
        task: inputTask.value,
        completed: false
    }

    // Sauvegarde la tâche dans le LocalStorage
    
    // Ajout de la fonction appendTask


appendTask(newTask)

    //Vider l'input

    inputTask.value = "";
}

4 - On va créer une interface 

interface Task{
    date: Date,
    task: string,
    completed: boolean
}

// Modifier la const newTask et lui ajouter l'interface Task


 const newTask: Task = {
        date: new Date(),
        task: inputTask.value,
        completed: false
    }

// Modifier la fonction appendTask et lui ajouter l'interface Task

const appendTask = (newTask: Task) => {
    const newLi = document.createElement("li");
    const checkB = document.createElement("input")
    checkB.type = "checkbox";
    check.addEventListener("change" () => {
        console.log("Vérification");
        newTask.completed = checkB.checked
    });
     newLi.append(newTask.task, checkB )
    taskList.prepend(newLi);
}

5 - À ajouter après l'interface

On va créer un tableau pour stocker toutes nos nouvelles taches
éaaa
const tasks: Task[] = JSON.parse(localStorage.getItem("task") ||  "[]");

// Ajouter les nouvelles tâches au démarrage du DOM

window.addEventListener("DOMContentLoaded", () =>{
    tasks.forEach(task => appendTask(task))
} )

// Pour le moment ça ne fait rien dans la console

6 - Il faut sauvegarder la tâche dans le LocalStorage
// À ajouter dans la const handleSubmit apres const NewTask

tasks.push(newTask);

// 

saveTasks();

------------

7 - Créer la fonction saveTasks avant l'interface Task

const saveTask = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Voir le résultat dans la console

// Léger problème, lorsque qu'on clique sur la checkbox, dans le localStorage l'état ne change pas.

8 - À ajouter dans checkB.addEventListener apres newTask.completed = checkB.checked; 

// saveTask();

9 - Il ne s'actualise pas de la bonne manière

9 - On ajoute après checkB.type = "checkbox";

checkB.checked = newTask.completed

// Voir résultat 

10 - Bouton TOUT EFFACER

const clearTasks = () =>{
    tasks.length = 0; 
    saveTasks();
    taskList.textContent = "";
}; 

btnDeleteAll.addEventListener("click", () => clearTasks());