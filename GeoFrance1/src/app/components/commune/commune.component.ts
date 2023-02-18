import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Departement } from 'src/app/models/departement.model';
import { Commune } from 'src/app/models/commune.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.css']
})
export class CommuneComponent implements OnInit {

  departements: Departement [] = []; //j'initialise un tableau poyur stocker les infos de l'api
  departementsIsloading: boolean = false; //pour definir le chargement des informations
  departementsIsloaded: boolean = false;// si les departements sont charger
 
  communesForGraph:{name:string, value:number}[] = [];//model pour le graphique on aurait pu le crée dans model et juste le declarer en tableau
  communes: Commune [] = [];
  communesIsloading: boolean = true;
  communesIsloaded: boolean = true;



  // pour realiser un get, je dois déclarer en PRIVATE le service HttpClient dans le constructor
  constructor(private HttpClient: HttpClient, private toastr:ToastrService ) { } 
  

  //fonction qui permet le chargement des departements.
    loadDepartements (): void{     // nom de la fonction est logique et de type void car il y a plusieur inscription a la suite.
      this.departementsIsloading = true; //permet de gerer l'etat du spinner de chargement
      this.toastr.success('liste des départements chargés, chargement OK')
      
      // recuperation des donnees de l'api grace a une requete GET
      this.HttpClient.get<Departement[]> ("https://geo.api.gouv.fr/departements")
      .subscribe( //on dois souscrire aux informations de l'api
        data => {  // 
          // this.toastr.success('liste des départements chargés, chargement OK')
          this.departements = data; // je transfert les donnees de l'api dans mon tableau vide
          this.departementsIsloaded = true; // le bouton de chargement disparait
          this.departementsIsloading = false; //une fois les données charger le chargement passe a faux
        }
      ) ;

    }

    loadCommunes (codeDepartement:string): void {
      this.toastr.success('liste des communes chargées, merci')  
      this.communesIsloading=true;
      this.HttpClient.get<Commune[]> (`https://geo.api.gouv.fr/departements/${codeDepartement}/communes`)
      
      
      .subscribe(
        data =>{
        
        this.communes= data;
        this.communesForGraph = data 
        .filter (commune => commune.population > 5000) 
        .map(commune =>{
          return{
            name: commune.nom,
            value: commune.population
          }
        } ) ;
        this.communesIsloaded=true;
        this.communesIsloading=false;}

      )


    }


  ngOnInit(): void {
  }

}
