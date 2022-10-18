import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Departement } from 'src/app/models/departement.model';
import {faMagnifyingGlass} from"@fortawesome/free-solid-svg-icons";



@Component({
  selector: 'app-departement-table',
  templateUrl: './departement-table.component.html',
  styleUrls: ['./departement-table.component.css']
})

export class DepartementTableComponent implements OnInit {

  // permet de gerer les entrées et sorties dans la balise HTML de commune.coponent.html
  faMagnifyingGlass=faMagnifyingGlass
  @Input() departements: Departement []= [];
  @Input() departementsIsloading: boolean = false;
  @Input() departementsIsloaded: boolean = false;
  @Output() loadDepartements: EventEmitter<{}> = new EventEmitter();
  @Output() loadCommunes: EventEmitter <string>  = new EventEmitter();


  currentPage: number = 1; // currentPage cest la premiere page donc pour la pagination, l'etat de la page actuelle qui commence a un
  search: string = "" ; //on met vide car on ne sait pas ce que le client va mettre.  c'est linput de la barre de recherche quon met vide


  constructor() { }

  ngOnInit(): void {
  }

  // cette fonction permet d'optenir la longueur du tableau departements et de convertir en lowerCase les données pour faire fonctioner la barre de recherche
  getLenth():number{ 
    return this.departements
    .filter(departement => departement.nom.toLowerCase().includes(this.search.toLowerCase()) ||
    departement.code.includes(this.search))
    .length;
  }


  getDepartements():Departement[]{
    return this.departements
    .filter(departement => departement.nom.toLowerCase().includes(this.search.toLowerCase()) || departement.code.includes(this.search)
    )
    .slice((this.currentPage - 1 ) * 10, this.currentPage * 10  )
  }


}
