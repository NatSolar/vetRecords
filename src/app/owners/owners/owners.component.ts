import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Owner } from 'src/app/interfaces/owner';
import { OwnerService } from 'src/app/services/owners.service';
import { RecordsService } from '../../services/records.service';
import { AppointmentsService } from '../../services/appointments.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html'
})
export class OwnersComponent implements OnInit {

  owners: Owner[] = []

  constructor(private ownersService: OwnerService,
              private readonly toastr: ToastrService,
              private readonly recordsService: RecordsService,
              private readonly appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    this.ownersService.getAll().subscribe({
      next: data => this.owners = data.sort((a, b) => a.id! - b.id!),
      error: err => console.warn('Error: ', err)
      })
  }

  deleteOwner(owner: Owner){
    let deletedAll = false
    owner.useYn = false
    this.ownersService.deleteOwners(owner, owner.id!).subscribe({
      next: () => {
        this.recordsService.getAllPetsByOwnerId(owner.id!).subscribe({
          next: data => {
            let pets = data
            for (let pet of pets){
              pet.useYn = false
              this.recordsService.deleteRecords(pet.id!, pet).subscribe({
                next: data => {
                  this.appointmentService.deleteAppointmentByRecordId(pet.id!)
                }
              })
            }
          },
          complete: () => {
            this.toastr.success('Se ha eliminado exitosamente el propietario.')
            setTimeout(()=>{
              location.reload();
            }, 1000)
          }
        })
      },
      error: err => {
        console.warn('Error: ', err)
        this.toastr.error('Se ha producido un error! ', err)
      }
    })
  }
  
}