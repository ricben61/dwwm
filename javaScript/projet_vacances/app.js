
//variables

const character = document.querySelector("#character");
const circle = document.querySelector(".circle")

let urlApi = 'https://rickandmortyapi.com/api/character'
let url = document.location.href;
console.log(url);
if(url !== "http://127.0.0.1:5500/index.html") {
    urlApi = 'https://rickandmortyapi.com/api/character?page=2'
}

const API = fetch(urlApi)

.then( Response => Response.json() )
.then( data => {

    data.results.map(perso => {

        let article = document.createElement(`article`);
        let img = document.createElement(`img`);
        let h3 = document.createElement(`h3`);
        let status = document.createElement(`div`)
        let location = document.createElement(`div`)
        let span = document.createElement('span')

        status.setAttribute('id','status');
        location.setAttribute('id','location');
        article.classList.add('single-character');
        img.setAttribute('src', `${perso.image}`);

        character.append(article);
        article.append(img);
        article.append(h3);
        article.append(status);
        article.append(location);

        h3.textContent = `${perso.name}`;
        status.textContent = `Satus: ${perso.status}-${perso.species}`
        location.textContent = `Localisation: ${perso.location.name}`

        
        status.append(span);
        span.classList.add('circle');

        if (perso.status === "Alive") {
            span.style.background = "green"
        }
        if (perso.status === "Dead") {
            span.style.background = "red"
        }


    })  

} )

.catch(error =>console.error(error));



