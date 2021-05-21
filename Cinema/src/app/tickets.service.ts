/* Разработать проект Cinema2 на основе проекта Cinema.
Доработать компонент Hall (зал), он должен также отображать (в виде прямоугольника) 
все места в кинозале с пометками "занято" или "свободно".
Служба Tickets (пул билетов) должна быть Observable<Array<boolean>>, 
в поток рассылаются изменения рассадки (при каждой продаже билета — 
в поток направляется новое событие с массивом boolean, которые показывают, занято каждое место или свободно).
*/

import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { from } from 'rxjs/observable/from';


@Injectable()
export class TicketsService {

  private ticketsCount:number = 20;
  private tickets:Array<boolean> = [];
  private freeTicketRanges:Array<any>=[];
  public events$:Observable<Array<boolean>> = from([this.tickets]);
    
  constructor() {
    for (let i=1; i<=this.ticketsCount; i++) {
      this.tickets.push(true);
    }
    this.findFreeRanges();  
  }

  getTickets():Observable<Array<boolean>> {
    return this.events$;
  };

  //find free ranges in a hall
  private findFreeRanges = () => {
    this.freeTicketRanges = [];
    let availableDiap = [];
    for (let i=0; i< this.tickets.length; i++) {
      if (this.tickets[i]) {
        availableDiap.push(i+1);
        continue;
      }
      if (availableDiap.length) {
        this.freeTicketRanges.push(availableDiap);
      }
      availableDiap = [];
    }
    if (availableDiap.length) {
      this.freeTicketRanges.push(availableDiap);
    }
  }

  bookTickets(cnt:number) {
    let ticketsBookedArr:Array<number> = [];
    //find suitable ranges from free ranges
    let suitRange = this.freeTicketRanges.filter (d => d.length>=cnt);
    if (!suitRange.length) {
      return;
    }
    //find most centered range in a hall
    suitRange.sort( (a,b) => Math.abs(a[0]-this.tickets.length/2)-Math.abs(b[0]-this.tickets.length/2));
    //find center of range for booking
    let firstTicketNum = suitRange[0][Math.floor(suitRange[0].length/2) - Math.floor(cnt/2)]-1;
    //set this ticket as unavailable
    this.tickets.forEach( (t,i,a) => {
      if (i>=firstTicketNum && i<firstTicketNum+cnt) {
        a[i] = false;
        ticketsBookedArr.push(i+1);
      }
    })
    //refresh free ranges
    this.findFreeRanges();
    return ticketsBookedArr;
  }
}
