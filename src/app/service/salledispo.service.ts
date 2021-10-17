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

// récupération les salle  disponible à partir de la date de heure debut et fin qui est selectionner par l'utilisateur et envoyer au serveur grâce à une requête http post
  async GetSalleDispo(date : any){
    try {
     
     console.log(date);  
      // je stocke la date et heure de debut et heure de fin  dans un localstorage  , qui va me permettre ensuite si l'utilisateur selectionne une salle je pourrai récuperer la date et heure pour pouvoir afficher la salle qui est réserver avec la date et heure
     localStorage.setItem('data', JSON.stringify(date));
     this.salledispo = await axios.post('http://localhost:3000/getreservation',date);
      return this.salledispo;
    }
    catch (error) {
       return error;
    }
  }

  //  Une fonction qui va permettre de reserver une salle qui est selectionner par l'utilisateur 
  async PostReservationSalle(getsalle : object){
    // récupération de la date et heure debut et fin dans le localstorage et puis rassembler les informations de la salle et la date selection dans une seul objet et ensuite je stocke à nouveau dans le localstorage "data" qui contient la date et heure debut et fin et les informations de salle selectionner
        this.parseelocalstorage = localStorage.getItem('data');
        const parse = JSON.parse(this.parseelocalstorage);
        const returnedTarget = Object.assign(getsalle,parse);
          localStorage.setItem('data', JSON.stringify(returnedTarget));
         this.getsalle = await axios.post('http://localhost:3000/createreservationsalle',returnedTarget);
         return this.getsalle;
   }
}
