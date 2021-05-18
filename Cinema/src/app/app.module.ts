import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CinemaComponent } from './cinema.component';
import { HallComponent } from './hall/hall.component';
import { CashComponent } from './cash/cash.component';
import { TicketsService } from './tickets.datasource';

@NgModule({
  declarations: [
    CinemaComponent,
    HallComponent,
    CashComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TicketsService],
  bootstrap: [CinemaComponent]
})
export class AppModule { }
