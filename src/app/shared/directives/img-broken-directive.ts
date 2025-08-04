import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]',
  standalone: true
})
export class ImgBrokenDirective {
  @Input() customImg: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png'
  @HostListener('error') handleError(): void {
    const elNative = this.elHost.nativeElement;
    if(this.customImg){
 elNative.src = this.customImg
    }else{
      elNative.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAAD9JREFUGFd1jCEOwAAIA1uFx/H/7/AGHMHhUSxMb665u5TuvqoKEcHMoLvBiNgbZoaqwgXMzAXwghMkf8qvzwd+HiyvgO88RwAAAABJRU5ErkJggg==";
    }

  }

  constructor(private elHost: ElementRef) {


  }

}
