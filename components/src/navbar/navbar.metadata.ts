export enum NavbarType {
  DARK,
  LIGHT,
}

export enum NavbarItemType {
  BRAND,
  LEFT,
  RIGHT,
}

export interface NavbarItem {
  title: string;
  icon: string;
  menuType: NavbarItemType;
  image?: string;
  style?: string;
  path?: string;
}
