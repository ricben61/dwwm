"use strict";
// Les types
//let id = 20 ; // JavaScript
// let id: number = 20;  //TypeScript pour des nombres
// let username: string = "Bocar"; // TypeScript pour des chaine de caractere
// let isAdmin: boolean = false;
// let x: any = "ça prend tous les types";
// console.log(id);
//Tableau en javaScripte
//let ids = [1,2,3,4,5]
//Tableau en TypeScript
// let ids : number[] = [1,2,3,4,5]
// let array: any[] = [1, false, "coucou"]
// ids.push(6);
// array.push("bye", true)
// console.log(ids,array);
// Tuples
// let user: [number, string, boolean] = [5,"salut", false]
// console.table(user)
// Tuples sur un tableau
// let salaries: [number, string] [];
// salaries = [
//         [1,"bocar"],
//         [2,"John"],
//         [3, "Pierre"],
//         [4,"Louis"],
// ]
//console.table(salaries)
// Union 
// let uid: string | number 
// uid = 22;
// Enum
// enum Direction{
//     haut = 5 ,
//     droite,
//     bas,
//     gauche
// }
// console.log(Direction);
//-------------- Objets----------
//objet
//  en js
// const admin = {
//     id:1,
//     pseudo: "Benoit"
// }
// en TS ----------------
// premiere methode
//    const admin: {
//     id: number,
//     pseudo: string
//    } = {
//     id:1,
//     pseudo:"Benoit"
//    }
// deuxieme methode que je recomande fortement
//  type Admin = {
//     id: number,
//     pseudo: string
//  }
//  const admin: Admin = {
//     id:1,
//     pseudo:"Benoit"
//  }
// type Joueur = {
//     id:number,
//     username:string,
//     isAdmin:boolean,
//     LastLogin:Date,
// }
// const joueur: Joueur = {
//     id:1,
//     username:"Benoit",
//     isAdmin: true,
//     LastLogin:  new Date,
// }
// console.log(joueur);
//----Type Assertion----
// let cid : any  = 1 
//deux syntaxe
//1ere 
// let customerId = <number>cid
// console.log(customerId);
//2eme syntaxe
// let customerId = cid as number
// console.log(customerId);
//-------Fonctions------
// function addition (a: number,b: number):number {
//     return a + b 
// }
// console.log(addition(25,90));
// function log(message: string| number):void{
//     console.log(message);
// }
// log("Coucou toi!")
//------------Interfaces--------------
// interface AdminInterface  {
//     id: number,
//     pseudo: string
// }
// interface AdminInterface{
//     age:number
// }
// const admin: AdminInterface = {
//     id:2,
//     pseudo:"Marat",
//     age:45
// }
//Les interfacesne fonctionne pas avec les union
// type Message = number| string
// const mess: Message = 2
//interface Union
//Erreur
// interface Message = number |string
//pour rendre optionnel une proprieté on ajoute un ?
// exemple : 
// interface AdminInterface{
//     id: number
//     pseudo: string
//     age?:number
// }
// const admin: AdminInterface = {
//     id:2,
//     pseudo:"Marat",
//     
// }
//---------fonctions-----------
// interface MathfuncInterface{
//         (a:number,b:number): number
// }
// const addition: MathfuncInterface = (a, b) => a + b
// const multiplication: MathfuncInterface = (a, b) => a*b
// const sous: MathfuncInterface = (a, b) => a-b
// const div: MathfuncInterface = (a, b) => a/b
// console.log(addition(5,9));
// console.log(multiplication(5,9));
// console.log(sous(5,9));
// console.log(div(5,9));
// Classes
class User {
    constructor(id, pseudo) {
        this.id = id,
            this.pseudo = pseudo;
    }
    //Méthode register
    register() {
        return `${this.pseudo} est desormais inscrit`;
    }
}
const bocar = new User(1, "bocar");
const jerome = new User(2, "jerome");
//  Heritage Class
class Salarie extends User {
    constructor(id, pseudo, role) {
        super(id, pseudo);
        this.role = role;
    }
}
const benoit = new Salarie(4, "benoit", "admin");
console.log(benoit.pseudo, benoit.role);
console.log(benoit.register());
//--------Les Generics----------
function getArray(items) {
    return new Array().concat(items);
}
let numArray = getArray([1, 2, 3, 4, 5]);
let strArray = getArray(["louis", "jean", "pierre"]);
numArray.push(6);
strArray.push("jaques");
console.log(numArray);
console.table(numArray);
console.table(strArray);
