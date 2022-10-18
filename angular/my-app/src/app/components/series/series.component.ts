import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  faCircleCheck = faCircleCheck
  faCoffee = faCoffee;
  
  title = 'Ma premiere app Angular';
  series: string[] = []
  
  
  seriesIsLoading: boolean = false
  seriesIsLoaded: boolean = false



 addSerie(newSerie:string): void {
    this.series.push(newSerie);
    
    
 }

  constructor(private httpClient: HttpClient) { 
  console.log("component series bien fonctionnel");

   }
  ngOnInit(): void {
    this.seriesIsLoading = true;
   this.httpClient.get<string[]>("assets/series.json").pipe(delay(1000)). subscribe(data =>{
     this.series = data;
     this.seriesIsLoading = false;
     this.seriesIsLoaded = true;
   });//chargement des données via API

  }

}
