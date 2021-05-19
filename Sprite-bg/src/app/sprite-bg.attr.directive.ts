/*
Разработать атрибутную директиву sprite-bg, который отображает CSS-спрайт на фоне элемента, к которому применена.
Реквизиты спрайта передаются в атрибутах sprite-url, sprite-offset-x, sprite-offset-y, sprite-width, sprite-height.
Все реквизиты должны иметь умолчательные значения; при неуказании атрибутов директива должна отображать смайлик.
В качестве спрайт-листа можно использовать: http://fe.it-academy.by/Examples/smileys.png
*/
import { Directive, HostBinding, HostListener, Attribute, AfterViewInit } from "@angular/core"; 

@Directive({ 
  selector: "[sprite-bg]", 
  exportAs: "spriteBg",
}) 
export class SpriteBgDirective implements AfterViewInit {

  private url:string; 
  private offsetX:number;
  private offsetY:number;
  private width:number;
  private height:number;


  constructor(@Attribute("sprite-url") _url:string, 
              @Attribute("sprite-offset-x") _offsetX:number,
              @Attribute("sprite-offset-y") _offsetY:number,
              @Attribute("sprite-width") _width:number,
              @Attribute("sprite-height") _height:number){
    this.url = _url; 
    this.offsetX = +_offsetX;
    this.offsetY = +_offsetY;
    this.width = _width/5;
    this.height = _height/4;
  }
  
  @HostBinding('style.background') 
  private hostBgStyle:string = '';

  ngAfterViewInit():void {
    this.hostBgStyle = this.createBgStyle();
  }

  createBgStyle():string {
    return 'url(' + this.url + ')' + (-this.offsetX*this.width) + 'px ' + (-this.offsetY*this.height) + 'px';
  }

  @HostListener("click")
  changeBgImage():void {
    this.offsetX = this.offsetX<4?this.offsetX+1:0;
    this.offsetY = this.offsetX==0?this.offsetY+1:this.offsetY;
    console.log('x',this.offsetX, typeof this.offsetX);
    this.hostBgStyle = this.createBgStyle();
  }

}
