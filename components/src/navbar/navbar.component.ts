import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavbarItem, NavbarItemType, NavbarType} from './navbar.metadata';

@Component({
  selector: 'ai-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  @Input() items: NavbarItem[] = [];
  @Input() type: NavbarType = NavbarType.LIGHT;
  @Input() style?: string;

  @Output() onItemSelected: EventEmitter<NavbarItem>;

  isShowing = false;

  get brandItem() {
    return this.items.find(i => i.menuType === NavbarItemType.BRAND);
  }

  get leftItems() {
    return this.items.filter(i => i.menuType === NavbarItemType.LEFT);
  }

  get rightItems() {
    return this.items.filter(i => i.menuType === NavbarItemType.RIGHT);
  }

  get navbarClass() {
    switch (this.type) {
      case NavbarType.DARK:
        return 'navbar-dark bg-dark';
      case NavbarType.LIGHT:
        return 'navbar-light bg-light';
      default:
        return 'navbar-light bg-light';
    }
  }

  constructor() {
    this.onItemSelected = new EventEmitter();
  }

  // Toggles navbar on mobile view
  toggleNavbar = () => this.isShowing = !this.isShowing;

}
