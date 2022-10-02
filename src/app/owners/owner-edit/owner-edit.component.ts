import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/interfaces/owner'; 
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OwnerService } from 'src/app/services/owners.service'; 
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {

  owner: Owner = {
    firstname: '',
    lastnameF: '',
    lastnameM: '',
    address: '',
    email: '',
    telephone: '',
    cedula: 0
  }
  ownerForm! : FormGroup

  constructor(private location: Location, 
              private activatedRouter : ActivatedRoute, 
              private ownersService: OwnerService,
              private readonly toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id}) => {
      this.ownersService.getById(id).subscribe({
        next: data => this.owner = data[0],
        error: err => console.warn(err)
      })
    })
  }

  editOwner(contactForm: any){
    let ownerEdit: Owner = contactForm.value
    this.activatedRouter.params.subscribe(({id}) => {
      this.ownersService.updateOwner(ownerEdit, id).subscribe({
        complete: () => this.toastr.success('Se ha modificado el propietario con éxito.'),
        error: err => this.toastr.error('Ha ocurrido un error: ', err)
      })
    })
    
  }

  goBack() : void{
    this.location.back();
  }
  
}
