import { Component, OnInit } from '@angular/core';
import { Vaccines } from 'src/app/interfaces/vaccines';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html',
  styleUrls: ['./vaccines.component.css']
})
export class VaccinesComponent implements OnInit {

  lineVaccine : Vaccines = 
    { petId: 0,
      yearsOld: 1,
      date: "",
      vaccines: [
        { id: 0, name: "Distemper", applied: false },
        { id: 1, name: "Hepatitis", applied: false },
        { id: 2, name: "Parainfluenza", applied: false },
        { id: 3, name: "Leptospirosis", applied: false },
        { id: 4, name: "Parvovirus", applied: false },
        { id: 5, name: "Bordetella", applied: false },
        { id: 6, name: "Giardia", applied: false },
        { id: 7, name: "Rabia", applied: false }
      ]
    }

  count: number = 0

  generalVaccines: Vaccines[] =[]

  constructor() { }

  ngOnInit(): void {
    
  }

  onSubmit(){
    this.generalVaccines.push(this.lineVaccine)
    this.count = this.generalVaccines.length
    this.lineVaccine = {
      petId: 0,
      yearsOld: 1,
      date: "",
      vaccines: [
        { id: 0, name: "Distemper", applied: false },
        { id: 1, name: "Hepatitis", applied: false },
        { id: 2, name: "Parainfluenza", applied: false },
        { id: 3, name: "Leptospirosis", applied: false },
        { id: 4, name: "Parvovirus", applied: false },
        { id: 5, name: "Bordetella", applied: false },
        { id: 6, name: "Giardia", applied: false },
        { id: 7, name: "Rabia", applied: false }
      ]
    }

    console.log(this.generalVaccines)

    
  }
}
