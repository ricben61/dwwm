//------------------------------------
// projet 1 - generateur de citation
//------------------------------------

// Ce projet nécéssite des connaissances sur :
// querySelctor()
// addEventListener
// Objet Math
// innerText - textContent

//------------------------------------
// ####################################
//------------------------------------

const btn = document.querySelector("#new-citation")
const citation = document.querySelector(".citation")
const auteur = document.querySelector(".auteur")

const citations = [
    {
        citation: `"Dans une certaine mesure, si vous avez vu un bidonville, vous les avez tous vus."`,
        auteur:  `Spiro Theodore Agnew`,
        img:`"/projet_1/assets/img/pexels-1.jpg "`,

    },  {
        citation: `"L'expérience qui rend le plus heureux est celle qui a rendu le plus de gens heureux."`,
        auteur:  `Karl Marx`,
        img:`"/projet_1/assets/img/pexels-10.jpg "`,


    },  {
        citation: `"Les dîners de famille sont le plus souvent une épreuve d'indigestion nerveuse, précédée d'un ressentiment et d'un ennui cachés et accompagnée de tremblements psychosomatiques."`,
        auteur:  `M. F. K. Fisher`,
        img:`"/projet_1/assets/img/pexels-2.jpg "`,


    },  {
        citation: `"Nous voterions tous pour le meilleur homme, mais il n'est jamais candidat."`,
        auteur:  `Will Rogers`,
        img:`"/projet_1/assets/img/pexels-3.jpg " `,


    },  {
        citation: `"La seule chose qui cloche avec l'immortalité, c'est qu'elle a tendance à s'éterniser."`,
        auteur:  `Herb Caen`,
        img:`"/projet_1/assets/img/pexels-4.jpg "`,


    },  {
        citation: `"Tout le monde ne fait pas confiance aux peintures, mais les gens croient aux photographies."`,
        auteur:  `Ansel Adams`,
        img:`"/projet_1/assets/img/pexels-5.jpg "`,


    },  {
        citation: `"Apprendre, c'est découvrir ce que vous savez déjà. Faire, c'est démontrer que vous le savez. Enseigner, c'est rappeler aux autres qu'ils le savent tout aussi bien que vous. Vous êtes tous des apprenants, des exécutants et des enseignants."`,
        auteur:  `Richard David Bach`,
        img:`"/projet_1/assets/img/pexels-6.jpg "`,


    },  {
        citation: `"J'aime mieux être exposé aux inconvénients d'une trop grande liberté qu'à ceux d'un trop petit degré de liberté."`,
        auteur:  `Thomas Jefferson`,
        img:`"/projet_1/assets/img/pexels-7.jpg "`,


    },  {
        citation: `"Une hirondelle ne fait pas un été, mais un écheveau d'oies, fendant le brouillard du dégel de mars, c'est le printemps."`,
        auteur:  `Aldo Leopold`,
        img:`"/projet_1/assets/img/pexels-8.jpg "`,


    },  {
        citation: `"Lorsque je vais dans mon jardin avec une bêche et que je creuse un lit, je ressens une telle exaltation et une telle santé que je découvre que je me suis trompé pendant tout ce temps en laissant les autres faire pour moi ce que j'aurais dû faire de mes propres mains."`,
        auteur:  `Ralph Waldo Emerson`,
        img:`"/projet_1/assets/img/pexels-9.jpg "`,


    }
];

btn.addEventListener("click", () => {

    let random =  Math.floor(Math.random() * citations.length);

    citation.innerText = citations[random].citation;
    auteur.innerText = citations[random].auteur;
    // img.innerText = img[random].img;
    document.body.style.background = `url(${citations[random].img}) no-repeat center /cover`;

    
})




