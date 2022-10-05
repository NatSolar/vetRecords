import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AboutComponent } from './about/about.component';
import { OwnersModule } from './owners/owners.module';
import { RecordsModule } from './records/records.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    
    OwnersModule,
    RecordsModule,
    AppointmentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}