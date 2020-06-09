import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavbarItem, NavbarItemPosition, NavbarItemPresentationMode, NavbarStyle} from './navbar.metadata';

@Component({
  selector: 'ai-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  @Input() items: NavbarItem[] = [];
  @Input() type: NavbarStyle = NavbarStyle.LIGHT;
  @Input() style: string = '';

  @Output() onItemSelected: EventEmitter<NavbarItem>;

  isShowing = false;

  get brandItem() {
    return this.items.find(i => i.position === NavbarItemPosition.BRAND);
  }

  get leftItems() {
    return this.items.filter(i => i.position === NavbarItemPosition.LEFT);
  }

  get rightItems() {
    return this.items.filter(i => i.position === NavbarItemPosition.RIGHT);
  }

  get navbarClass() {
    switch (this.type) {
      case NavbarStyle.DARK:
        return 'navbar-dark bg-dark';
      case NavbarStyle.LIGHT:
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

  // Presentation mode
  iconClass = (item: NavbarItem) => {
    switch (item.mode) {
      case NavbarItemPresentationMode.ONLY_TEXT:
        return 'd-md-none d-lg-none d-xl-none';
      default:
        return '';
    }
  };
  textClass = (item: NavbarItem) => {
    switch (item.mode) {
      case NavbarItemPresentationMode.ONLY_ICON:
        return 'd-md-none d-lg-none d-xl-none';
      default:
        return '';
    }
  };

}
