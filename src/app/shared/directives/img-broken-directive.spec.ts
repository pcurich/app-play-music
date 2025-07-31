import { ElementRef } from '@angular/core';
import { ImgBrokenDirective } from './img-broken-directive';

describe('ImgBroken', () => {
  it('should create an instance', () => {
    const mockElement = new ElementRef('')
    const directive = new ImgBrokenDirective(mockElement);
    expect(directive).toBeTruthy();
  });
});
