import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SalledispoService {

 salledispo : any;
 getsalle : any;
 parseelocalstorage :any;

  constructor() { }


  async GetSalleDispo(date : any){
    try {
         
     localStorage.setItem('data', JSON.stringify(date));
     this.salledispo = await axios.post('http://localhost:3000/getreservation',date);
      return this.salledispo;
    }
    catch (error) {
       return error;
    }
  }

  
  async PostReservationSalle(getsalle : object){
   
        this.parseelocalstorage = localStorage.getItem('data');
        const parse = JSON.parse(this.parseelocalstorage);
        const returnedTarget = Object.assign(getsalle,parse);
          localStorage.setItem('data', JSON.stringify(returnedTarget));
         this.getsalle = await axios.post('http://localhost:3000/createreservationsalle',returnedTarget);
         return this.getsalle;
   }
}
