import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SalledispoService } from '../service/salledispo.service';
import { DateFilterFn } from '@angular/material/datepicker';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message_validation = false;
  heures = [
    { value: "", viewValue: "", disabled: true },
    { value: '09:00', viewValue: '09:00', disabled: false },
    { value: '10:00', viewValue: '10:00', disabled: false },
    { value: '11:00', viewValue: '11:00', disabled: false },
    { value: '12:00', viewValue: '12:00', disabled: false },
    { value: '13:00', viewValue: '13:00', disabled: false },
    { value: '14:00', viewValue: '14:00', disabled: false },
    { value: '15:00', viewValue: '15:00', disabled: false },
    { value: '16:00', viewValue: '16:00', disabled: false },
    { value: '17:00', viewValue: '17:00', disabled: false }
  ];

  equipement = [

    { value: 'PC', viewValue: 'PC' },
    { value: 'Projecteur', viewValue: 'Projecteur' },
  ];
  menu: any;
  getsalle: any;
  today = new Date()


  constructor(private salledisponible: SalledispoService, private router: Router) { }

  ngOnInit(): void {
  }
//  Bloquage des dates qui est déja passer et commence la date actuelle
  DateFilter = (m: Date | null): boolean => {
    const dateNum = m?.getDay();
    if (dateNum !== undefined) {
      const date = m !== null ? m : ' ';
      return dateNum !== 0 && dateNum !== 6 && date > this.today
    }
    return false;

  }

// Récupération des salles disponibles à partir une date et l'heure de debut et l'heure de fin
  async onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    console.log(f.value.datefin);
    try {

      if (parseInt(f.value.datefin) <= parseInt(f.value.datedebut)) {
        this.message_validation = true;
      } else {

        await this.salledisponible.GetSalleDispo(f.value).then((res: any) => this.menu = res.data).catch(() => console.error('Failed!'));
        console.log(this.menu)
      }
    } catch (error) {
      console.log(error);
    }


  }

//redirection dans la page success 
  RedirectSuccessPage() {
    this.router.navigateByUrl('successpage');
  }

// Fonction qu va permetrrre de récupérer  la salle sélectionner et de envoyer dans la fonction PostReservationSalle pour créer la réservation dans la base de donnée
  async Reserver(value: object) {
    console.dir(value);
    console.log(value);
    try {
      this.getsalle = await this.salledisponible.PostReservationSalle(value).then((res: any) => { return res }).catch(() => console.error('Failed!'));
      switch (this.getsalle.status) {
        case 200:
          this.RedirectSuccessPage();
          break;

        default:
          console.log("Erreur de réservation");
      }

    } catch (error) {
      console.log(error);
    }
  }
}
