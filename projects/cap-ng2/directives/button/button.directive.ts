import {Directive, HostBinding, Input, OnInit} from '@angular/core';
import {CapButtonType} from './button.model';
import {CapButtonModifier} from './button.constants';

@Directive({
  selector: 'button[cap-button]',
})
export class CapButtonDirective implements OnInit {
  @HostBinding('class')
  public hostClass: string;
  @Input()
  public capButtonType: CapButtonType;

  constructor() {}

  public ngOnInit(): void {
    this.hostClass = `cap-button ${CapButtonModifier[this.capButtonType]}`;
  }

}
