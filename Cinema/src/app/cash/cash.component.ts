import { Component, Input } from '@angular/core';
import { TicketsService } from '../tickets.service';

@Component({
  selector: 'cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent {

  constructor(private tickets:TicketsService) { }

  public bookInfo:string = '';

  @Input("cash-name")
  public name!: string;

  
  getName():string {
    return this.name;
  };

  bookTickets(cnt:string):void {
    let ticketCount = parseInt(cnt);
    if (!ticketCount) {
      this.bookInfo = 'Please, enter the correct number of tickets';
      return;
    }
    let bookingResult = this.tickets.bookTickets(parseInt(cnt));
    this.bookInfo = bookingResult?'Your tickets: ' + bookingResult.join(', '):'There are no available tickets';
  }
}
