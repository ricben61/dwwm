import { Component,} from '@angular/core';
import {  AfterViewInit } from '@angular/core';


declare var anime: any; 

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],




})
export class AccueilComponent implements AfterViewInit  {
  
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
}