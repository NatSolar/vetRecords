import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records/records.component';
import { RecordComponent } from './record/record.component';
import { RecordEditComponent } from './record-edit/record-edit.component';
import { RecordNewComponent } from './record-new/record-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VaccinesComponent } from './components/vaccines/vaccines.component';
import { AddInfoRecordComponent } from './add-info-record/add-info-record.component';
import { DewormingComponent } from './components/deworming/deworming.component';
import { ObservationComponent } from './components/observation/observation.component';
import { ExamComponent } from './components/exam/exam.component';
import { InjectablesComponent } from './components/injectables/injectables.component';


@NgModule({
  declarations: [
    RecordsComponent,
    RecordComponent,
    RecordEditComponent,
    RecordNewComponent,
    VaccinesComponent,
    AddInfoRecordComponent,
    DewormingComponent,
    ObservationComponent,
    ExamComponent,
    InjectablesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    //ReactiveFormsModule,
    
    RecordsRoutingModule
  ]
})
export class RecordsModule {}