import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import { OwnerComponent } from './owner/owner.component';
import { OwnerEditComponent } from './owner-edit/owner-edit.component';
import { OwnerNewComponent } from './owner-new/owner-new.component';
import { OwnerSelectComponent } from './owner-select/owner-select.component';
import { OwnersRoutingModule } from './owners-routing.module';
import { OwnersComponent } from './owners/owners.component';

@NgModule({
  declarations: [
    OwnerComponent,
    OwnerEditComponent,
    OwnerNewComponent,
    OwnerSelectComponent,
    OwnersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    
    OwnersRoutingModule
  ]
})
export class OwnersModule { }
