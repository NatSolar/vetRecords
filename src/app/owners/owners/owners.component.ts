import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Owner } from 'src/app/interfaces/owner';
import { OwnerService } from 'src/app/services/owners.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  owners: Owner[] = []

  constructor(private ownersService: OwnerService,
              private readonly toastr: ToastrService) { }

  ngOnInit(): void {
    this.ownersService.getAll().subscribe({
      next: data => this.owners = data,
      error: err => console.warn('Error: ', err)
      })
  }

  deleteOwner(id: any){
    this.ownersService.deleteOwner(id).subscribe({
      next: () => {
        this.toastr.success('Se ha eliminado exitosamente el propietario.')
        setTimeout(()=>{
          location.reload();
        }, 2000)
      },
      error: err => {
        console.warn('Error: ', err)
        this.toastr.error('Se ha producido un error! ', err)
      }
    })
  }
  
}