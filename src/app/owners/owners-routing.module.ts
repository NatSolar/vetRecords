import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnersComponent } from './owners/owners.component';
import { OwnerComponent } from './owner/owner.component';
import { OwnerEditComponent } from './owner-edit/owner-edit.component';
import { OwnerNewComponent } from './owner-new/owner-new.component';

const routes: Routes = [
  { path: '', component: OwnersComponent},
  { path: 'owners/:id', component: OwnerComponent},
  { path: 'owner-new', component: OwnerNewComponent},
  { path: 'owner-edit/:id', component: OwnerEditComponent},
  { path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnersRoutingModule { }
