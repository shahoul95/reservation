import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-successpage',
  templateUrl: './successpage.component.html',
  styleUrls: ['./successpage.component.css']
})
export class SuccesspageComponent implements OnInit {
  storagereservation: any;
  parsestoragereservation: any;
  constructor() {

  }

  ngOnInit(): void {
    this.storagereservation = localStorage.getItem('data');
    this.parsestoragereservation = JSON.parse(this.storagereservation);
    
  }

}
