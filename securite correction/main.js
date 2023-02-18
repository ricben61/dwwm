
// Je récupère mes éléments du DOM
const btnSubmit = document.querySelector('#login-button');
const form = document.querySelector("#login-form")
const nameInput = document.querySelector("#name")
const pwdInput = document.querySelector("#password")
const confirmPwdInput = document.querySelector("#confirmPassword")
const verifDom = document.querySelector(".verif")

const nameInfo = document.querySelector(".name-info")
const pwdInfo = document.querySelector(".pwd-info")
const confirmPwdInfo = document.querySelector(".confirmPwd-info")
const inputs = document.querySelectorAll("input")
// Dans le cadre d'un form, il faut le "soumettre" et PAS LE BOUTON



inputs.forEach(input =>{
    input.addEventListener("blur", ()=>{
        // On aurait pu utiliser un event "blur, change, focus ou input"
        // L'évènement submit déclanche l'envoie du formulaire et donc le rafraichissement de la page
        // e.preventDefault(); // La méthode preventDefault va bloquer l'action
        verifInput();
        
        
})
})
// inputs.addEventListener("focus", (e)=>{
// // L'évènement submit déclanche l'envoie du formulaire et donc le rafraichissement de la page
// e.preventDefault(); // La méthode preventDefault va bloquer l'action
// verifInput();

// })


const verifInput = () => {

    // La gestion de l'input Name, autorisant uniquement les caractères de l'alphabet (de A à Z min et maj compris)
    const nameVerif = new RegExp("^[a-zA-Z]+$");
    

    if(nameVerif.test(nameInput.value)){
        
        nameInfo.classList.add("valid")
        nameInfo.classList.remove("error")
        nameInfo.textContent = "Le nom est valide"

        console.log("Nom valide");
    } else {

        nameInfo.classList.add("error")
        nameInfo.classList.remove("valid")
        nameInfo.textContent = "Le nom est invalide"

        console.log("Nom invalide");
    }

    // En ternaire
    // nameVerif.test(nameInput.value) ? console.log("Nom valide") : console.log("Nom invalide");

    //Gestion du formatage du mot de passe
    const pwdVerif = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,32})")
    let valuePwd = pwdInput.value
    if(pwdVerif.test(valuePwd)){

        pwdInfo.classList.add("valid")
        pwdInfo.textContent = "Le mot de passe est OK"
        console.log("Mot de passe OK 8 caractères, Maj, Min et caract spé");
    }else{
       
        pwdInfo.classList.add("error")
        pwdInfo.textContent = "Le mot de passe est incorrecte, faut revoir la saisie!"
        console.log("Mot de passe incorrecte veuillez revoir votre saisie");
    }

    // En ternaire
    // pwdVerif.test(valuePwd) ? console.log("Mot de passe OK 8 caractères, Maj, Min et caract spé") : console.log("Mot de passe incorrecte veuillez revoir votre saisie");

    // Vérfication du champ confirmation de mot de passe et du mot de passe
    if(confirmPwdInput.value === pwdInput.value && pwdInput.value !== "" ){
      
        confirmPwdInfo.classList.add("valid")
        confirmPwdInfo.textContent = "Top, les mots de passe concordent"
        console.log("T'es trop fort, le mot de passe concorde");
    }else{
       
        confirmPwdInfo.classList.add("error")
        confirmPwdInfo.textContent = "Oops, une petite erreur!"
        console.log("Fais un effort, les mots de passe ne coincident pas!");
    }

    // En ternaire
    // confirmPwdInput.value === pwdInput.value && pwdInput.value !== ""  ? console.log("T'es trop fort, le mot de passe concorde") :  console.log("Fais un effort, les mots de passe ne coincident pas!");
    // console.log(nameVerif.test(nameInput.value));

}
