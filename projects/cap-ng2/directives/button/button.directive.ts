import {Directive, HostBinding, Input, OnInit} from '@angular/core';
import {CapButtonColor, CapButtonType} from './button.model';
import {CapButtonColorModifier, CapButtonTypeModifier} from './button.constants';

@Directive({
  selector: 'button[cap-button]',
})
export class CapButtonDirective implements OnInit {
  @HostBinding('class')
  public hostClass: string;
  @Input()
  public capButtonType: CapButtonType;
  @Input()
  public color: CapButtonColor;

  constructor() {}

  public ngOnInit(): void {
    this.hostClass = `cap-button ${CapButtonColorModifier[this.color]} ${CapButtonTypeModifier[this.capButtonType]}`;
  }

}
