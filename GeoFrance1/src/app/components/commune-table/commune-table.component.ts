import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Commune } from 'src/app/models/commune.model';
import {  AfterViewInit } from '@angular/core';

declare var anime: any;

@Component({
  selector: 'app-commune-table',
  templateUrl: './commune-table.component.html',
  styleUrls: ['./commune-table.component.css'],
 

})


export class CommuneTableComponent implements OnInit,AfterViewInit {

  @Input() communes: Commune []= [];
  
  @Input() communesIsloading: boolean = false;
  @Input() communesIsloaded: boolean = false;
  // @Output() loadCommunes: EventEmitter<{}> = new EventEmitter();

  currentPage: number = 1; 
  search: string = "" 


  constructor() { }


  ngAfterViewInit(): void {
      

    anime.timeline({loop: true})
    .add({
      targets: '.c2 .word',
      scale: [40,1],
      opacity: [0,1],
      easing: "easeOutCirc",
      duration: 1500,
      delay: (el:any, i:any)  => 1000 * i
    }).add({
      targets: '.c2',
      opacity: 0,
      duration: 2000,
      easing: "easeOutExpo",
      delay: 1000
    });
}
















  ngOnInit(): void {
  }

    getCommunes(): Commune []{
      return this.communes
      .filter(communes => communes.nom.toLowerCase().includes(this.search.toLowerCase()) || communes.codesPostaux.includes(this.search))
      .slice((this.currentPage - 1 ) * 10, this.currentPage * 10 )
      
    }

      



    getLenth():number{ 
      return this.communes
      .filter(commune => commune.nom.toLowerCase().includes(this.search.toLowerCase()) ||
     commune.codesPostaux.includes(this.search))
      .length;
      
    }
  
//-------les 2 fonctions triPop cest pour que ça trie la population dans un sans et l'autre il y a .reverse pour faire dans l'autre sans
        triPop(): Commune [] {
        
          return this.communes.sort((a:Commune,b:Commune) => { 
          return a.population - b.population 
        })
        

      }


      triPop1(): Commune [] {
        
        return this.communes.sort((a:Commune,b:Commune) => { 
        return   a.population - b.population
      })
        .reverse()

    }





  }
