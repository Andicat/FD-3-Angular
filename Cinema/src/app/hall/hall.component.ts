import { Component} from '@angular/core';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent {

  public tickets:Array<boolean> = [];
  
  constructor(ticketsService:TicketsService) {
    ticketsService.getTickets().subscribe((_tickets:Array<boolean>) => { this.tickets = _tickets; });
  }

  getTicketsInfo():string {
    let count:number = this.tickets.length;
    let availableCount:number = this.tickets.filter(t => true).length;
    return 'Tickets count: ' + count + ' (available: ' + availableCount + ')';
  };

}
