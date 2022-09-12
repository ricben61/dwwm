import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { faCoffee,faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})



export class SeriesListComponent implements OnInit {
  faCircleCheck = faCircleCheck
  faCoffee = faCoffee;
  faSpinner = faSpinner;


  @Input() series: string []= [];
  @Input() newSerieAdded: boolean = false;
  @Input() seriesIsLoading: boolean = false;
  @Input() seriesIsLoaded: boolean = false;
  @Output() addSerie :EventEmitter<string> = new EventEmitter();

  newSerie: string = "";

  checkForm(): boolean {
  return this.newSerie ==="";

  }

  submit(): void{
    this.addSerie.emit(this.newSerie);
    this.newSerie = "";
  }

  constructor() { }

  ngOnInit(): void {
  }

}
