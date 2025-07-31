import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]',
  standalone: true
})
export class ImgBrokenDirective {
  @Input() customImg: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png'
  @HostListener('error') handleError(): void {
    const elNative = this.elHost.nativeElement
    elNative.src = this.customImg
  }

  constructor(private elHost: ElementRef) {


  }

}
