import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records/records.component';
import { RecordComponent } from './record/record.component';
import { RecordEditComponent } from './record-edit/record-edit.component';
import { RecordNewComponent } from './record-new/record-new.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VaccinesComponent } from './components/vaccines/vaccines.component';


@NgModule({
  declarations: [
    RecordsComponent,
    RecordComponent,
    RecordEditComponent,
    RecordNewComponent,
    VaccinesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    
    RecordsRoutingModule
  ]
})
export class RecordsModule { }
