import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AddInfoRecordComponent } from './add-info-record/add-info-record.component';
import { DewormingComponent } from './components/deworming/deworming.component';
import { ExamComponent } from './components/exam/exam.component';
import { InjectablesComponent } from './components/injectables/injectables.component';
import { ObservationComponent } from './components/observation/observation.component';
import { PhysicalExamComponent } from './components/physical-exam/physical-exam.component';
import { RecordComponent } from './record/record.component';
import { RecordEditComponent } from './record-edit/record-edit.component';
import { RecordNewComponent } from './record-new/record-new.component';
import { RecordsComponent } from './records/records.component';
import { RecordsRoutingModule } from './records-routing.module';
import { VaccinesComponent } from './components/vaccines/vaccines.component';

@NgModule({
  declarations: [
    AddInfoRecordComponent,
    DewormingComponent,
    ExamComponent,
    InjectablesComponent,
    ObservationComponent,
    PhysicalExamComponent,
    RecordComponent,
    RecordEditComponent,
    RecordNewComponent,
    RecordsComponent,
    VaccinesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    
    RecordsRoutingModule
  ]
})
export class RecordsModule {}