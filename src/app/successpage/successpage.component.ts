import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-successpage',
  templateUrl: './successpage.component.html',
  styleUrls: ['./successpage.component.css']
})
export class SuccesspageComponent implements OnInit {
  storagereservation: any;
  parsestoragereservation: any;
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.storagereservation = localStorage.getItem('data');
    this.parsestoragereservation = JSON.parse(this.storagereservation);
    console.log(this.parsestoragereservation);
  }

}
