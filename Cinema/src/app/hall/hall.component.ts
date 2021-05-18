import { Component, OnInit } from '@angular/core';
import { TicketsService } from '../tickets.datasource';

@Component({
  selector: 'hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent {

  constructor(private tickets:TicketsService) { }

  getTickets():Array<{num:number,isAvailable:boolean}> {
    return this.tickets.getTickets();
  };

  getTicketsInfo():string {
    let count:number = this.tickets.getAllCount();
    let availableCount:number = this.tickets.getAvailableCount();
    return 'Tickets count: ' + count + ' (available: ' + availableCount + ')';
  };

}
