/*
Разработать компонент Sprite, который отображает CSS-спрайт.
Реквизиты спрайта передаются живыми входными свойствами url, offset-x, offset-y, width, height. При щелчке спрайт выдаёт событие clicked.
Хост-компонент при приёме события clicked должен переключать спрайт на отображение другого изображения.
В качестве спрайт-листа можно использовать: http://fe.it-academy.by/Examples/cards2.png
*/

import { Component, Input } from '@angular/core';

@Component({
  selector: 'sprite',
  templateUrl: 'sprite.component.html',
  styleUrls: ['sprite.component.scss']
})
export class SpriteComponent {

  constructor() {
  }

  @Input('url')
  public url:string = 'http://fe.it-academy.by/Examples/cards2.png';

  @Input('offset-x')
  private offsetX:number = 0;

  @Input('offset-y')
  private offsetY:number = 0;

  @Input('width')
  private width:number = 576/4;

  @Input('height')
  private height:number = 2712/14;

  getStyle():object {
    let style = {
      'width': this.width-5 + 'px',
      'height': this.height-6 + 'px',
      'background-image': 'url(' + this.url + ')',
      'background-position': (-this.offsetX*this.width) + 'px ' + (-this.offsetY*this.height) + 'px',
    }
    return style;
  };

  changeImage():void {
    this.offsetX = this.offsetX<3?this.offsetX+1:0;
    this.offsetY = this.offsetX==0?this.offsetY+1:this.offsetY;
  }

}
