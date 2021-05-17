import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numword',
  pure: true
})
export class NumwordPipe implements PipeTransform {

  transform(cnt:string,word1:string,word2:string,word5:string):string {
    let cntNumber:number=parseInt(cnt);
    let dd=cntNumber%100;
    if ((dd>=11) && (dd<=19)) return cnt + " " + word5;
    let d=cntNumber%10;
    if (d==1) return cnt + " " + word1;
    if ((d>=2) && (d<=4)) return cnt + " " + word2;
    return cnt + " " + word5;
  }
}
