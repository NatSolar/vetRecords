import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Owner } from 'src/app/interfaces/owner'; 
import { OwnerService } from 'src/app/services/owners.service'; 
import { Location } from '@angular/common';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {

  owner: Owner = {
    firstname: '',
    lastnameF: '',
    lastnameM: '',
    address: '',
    email: '',
    telephone: '',
    cedula: 0
  }
  
  urlAvatar!: string

  constructor(private activatedRouter : ActivatedRoute, private ownersService: OwnerService, private location: Location) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(({id}) => {
      this.ownersService.getById(id).subscribe({
        next: data => this.owner = data,
        error: err => console.warn(err)
      })
    })
  }

  goBack() : void{
    this.location.back();
  }

  getAvatar(breed: number){
    switch(breed) { 
      case 1: { 
         this.urlAvatar = "https://previews.123rf.com/images/nenilkime/nenilkime1705/nenilkime170500016/79067448-colecci%C3%B3n-de-perros-alaskan-malamute-estilo-geom%C3%A9trico-icono-de-avatar-conjunto-redondo.jpg?fj=1"
         break; 
      }
      default: { 
        this.urlAvatar = "https://previews.123rf.com/images/nenilkime/nenilkime1705/nenilkime170500016/79067448-colecci%C3%B3n-de-perros-alaskan-malamute-estilo-geom%C3%A9trico-icono-de-avatar-conjunto-redondo.jpg?fj=1" 
         break; 
      } 
   } 
   return this.urlAvatar;
  }

}
