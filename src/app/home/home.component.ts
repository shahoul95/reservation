import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { SalledispoService } from '../service/salledispo.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalComponent}  from '../modal/modal.component'
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
  roomsfailed: boolean = false;
  sallelength: boolean = false;
  rooms = new Array();
  getsalle: any;
  today = new Date()


  constructor(private salledisponible: SalledispoService, private router: Router, private adapter: DateAdapter<any>,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.adapter.setLocale('fr');
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
        this.roomsfailed = false;
        this.sallelength = false;
      } else {
        this.roomsfailed = true;
        this.message_validation = false;
        this.sallelength = true;
        await this.salledisponible.GetSalleDispo(f.value).then((res : any) => this.rooms = res.data).catch((error) => console.error('Failed!', error));

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
      this.getsalle = await this.salledisponible.PostReservationSalle(value).then((res) => { return res }).catch((error) => console.error('Failed!', error));
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

  openDialog(value : object) {
    try{
      const dialogRef = this.dialog.open(ModalComponent,{data: value});
       dialogRef.afterClosed().subscribe(result => {
        if(result == true){
          this.Reserver(value);
        }
       
      });
    }catch(error){

    }
   
  }

}
