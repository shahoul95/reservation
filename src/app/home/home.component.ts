import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SalledispoService } from '../service/salledispo.service';

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
 
    { value: 'TV', viewValue: 'TV' },
    { value: 'Retro Projecteur', viewValue: 'Retro Projecteur' },
  ];
  menu: any;
  getsalle: any;
  today = new Date()


  constructor(private salledisponible: SalledispoService, private router: Router) { }

  ngOnInit(): void {
  }

  DateFilter = (m: Date | null): boolean => {
    const dateNum = m?.getDay();
    if (dateNum !== undefined) {
      const date = m !== null ? m : ' ';
      return dateNum !== 0 && dateNum !== 6 && date > this.today
    }
    return false;

  }


  async onSubmit(f: NgForm) {
  
    try {

      if (parseInt(f.value.datefin) <= parseInt(f.value.datedebut)) {
        this.message_validation = true;
      } else {

        await this.salledisponible.GetSalleDispo(f.value).then((res: any) => this.menu = res.data).catch(() => console.error('Failed!'));
   
      }
    } catch (error) {
       return error;
    }


  }


  RedirectSuccessPage() {
    this.router.navigateByUrl('successpage');
  }


  async Reserver(value: object) {
   
    try {
      this.getsalle = await this.salledisponible.PostReservationSalle(value).then((res: any) => { return res }).catch(() => console.error('Failed!'));
      switch (this.getsalle.status) {
        case 200:
          this.RedirectSuccessPage();
          break;

        default:
         return "erreur de reservation";
      }

    } catch (error) {
    return error;
    }
  }
}
