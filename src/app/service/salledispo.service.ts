import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SalledispoService {

  salledispo= new Array<object>();
  getsalle= new Array<object>();
  parseelocalstorage: any;

  constructor() { }


  async GetSalleDispo(date: object) {
    try {

      localStorage.setItem('data', JSON.stringify(date));
      this.salledispo = await axios.post('http://localhost:3000/getreservation', date);
      return this.salledispo;
    }
    catch (error) {
      return error;
    }
  }


  async PostReservationSalle(getsalle: object) {
    try {

      this.parseelocalstorage = localStorage.getItem('data');
      const parse = JSON.parse(this.parseelocalstorage);
      const getsalles = Object.assign(getsalle, parse);
      localStorage.setItem('data', JSON.stringify(getsalles));

      this.getsalle = await axios.post('http://localhost:3000/createreservationsalle', getsalles);
      return this.getsalle;


    } catch (error) {
      return error;
    }

  }
}
