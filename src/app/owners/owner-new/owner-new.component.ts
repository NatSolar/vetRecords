import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'; 
import { ToastrService } from 'ngx-toastr';

import { Owner } from 'src/app/interfaces/owner';
import { OwnerService } from 'src/app/services/owners.service'; 

@Component({
  selector: 'app-owner-new',
  templateUrl: './owner-new.component.html'
})
export class OwnerNewComponent implements OnInit {

  newOwner!: Owner
  ownerForm! : FormGroup

  constructor(private readonly ownersService: OwnerService, 
              private location: Location, 
              private readonly formBuilder: FormBuilder,
              private readonly toastr: ToastrService) { }

  ngOnInit(): void {
    this.ownerForm = this.initForm()
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastnameF: ['', [Validators.required]],
      lastnameM: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      address: ['', [Validators.required]]
    })
  }

  onSubmit(){
    this.newOwner = this.ownerForm.value
    this.ownersService.addOwner(this.newOwner).subscribe({
      next: () => {
        this.toastr.success('Se ha registrado exitosamente el propietario!')
        this.ownerForm.reset()
      },
      error: err => {
        console.warn('Error: ', err)
        this.toastr.error('Se ha producido un error! ', err)
      }
    })

  }

  goBack() : void{
    this.location.back();
  }

}
