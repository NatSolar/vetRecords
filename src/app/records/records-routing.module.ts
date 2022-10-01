import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordEditComponent } from './record-edit/record-edit.component';
import { RecordNewComponent } from './record-new/record-new.component';
import { RecordComponent } from './record/record.component';
import { RecordsComponent } from './records/records.component';

const routes: Routes = [
  { path: '', component: RecordsComponent},
  { path: 'records/:id', component: RecordComponent},
  { path: 'record-new', component: RecordNewComponent},
  { path: 'record-edit/:id', component: RecordEditComponent},
  { path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecordsRoutingModule { }
