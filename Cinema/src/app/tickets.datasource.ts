import { Injectable } from "@angular/core";

@Injectable()
export class TicketsService {

  constructor() {
    this.findFreeRanges();
  }

  private ticketsArr:Array<{num:number,isAvailable:boolean}>=[
    { num:1, isAvailable:true },
    { num:2, isAvailable:true },
    { num:3, isAvailable:true },
    { num:4, isAvailable:true },
    { num:5, isAvailable:true },
    { num:6, isAvailable:true },
    { num:7, isAvailable:true },
    { num:8, isAvailable:true },
    { num:9, isAvailable:true },
    { num:10, isAvailable:true },
    { num:11, isAvailable:true },
    { num:12, isAvailable:true },
    { num:13, isAvailable:true },
    { num:14, isAvailable:true },
    { num:15, isAvailable:true },
    { num:16, isAvailable:true },
    { num:17, isAvailable:true },
    { num:18, isAvailable:true },
    { num:19, isAvailable:true },
    { num:20, isAvailable:true },

  ];

  private freeTicketRanges:Array<any>=[];

  getTickets():Array<{num:number,isAvailable:boolean}> {
    return this.ticketsArr;
  };

  getAvailableCount():number {
    return this.ticketsArr.filter(t => t.isAvailable).length;
  }

  getAllCount():number {
    return this.ticketsArr.length;
  }

  //find free ranges in a hall
  private findFreeRanges = () => {
    this.freeTicketRanges = [];
    let availableDiap = [];
    for (let i=0; i< this.ticketsArr.length; i++) {
      if (this.ticketsArr[i].isAvailable) {
        availableDiap.push(this.ticketsArr[i].num);
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
    suitRange.sort( (a,b) => Math.abs(a[0]-this.ticketsArr.length/2)-Math.abs(b[0]-this.ticketsArr.length/2));
    //find center of range for booking
    let firstTicketNum = suitRange[0][Math.floor(suitRange[0].length/2) - Math.floor(cnt/2)];
    //set this ticket as unavailable
    this.ticketsArr.forEach( t => {
      if (t.num>=firstTicketNum && t.num<firstTicketNum+cnt) {
        t.isAvailable = false;
        ticketsBookedArr.push(t.num);
      }
    })
    //refresh free ranges
    this.findFreeRanges();
    return ticketsBookedArr;
  }
}
