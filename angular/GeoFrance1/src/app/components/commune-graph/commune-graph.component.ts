import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-commune-graph',
  templateUrl: './commune-graph.component.html',
  styleUrls: ['./commune-graph.component.css'],
  


})
export class CommuneGraphComponent implements OnInit {

  @Input() communesForGraph: {name:string, value:number} [] = []
  @Input() communesIsloading: boolean = false;
  @Input() communesIsloaded: boolean = false;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
