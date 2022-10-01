import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnersRoutingModule } from './owners-routing.module';
import { OwnersComponent } from './owners/owners.component';
import { OwnerComponent } from './owner/owner.component';
import { OwnerEditComponent } from './owner-edit/owner-edit.component';
import { OwnerNewComponent } from './owner-new/owner-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    OwnersComponent,
    OwnerComponent,
    OwnerEditComponent,
    OwnerNewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    OwnersRoutingModule
  ]
})
export class OwnersModule { }
