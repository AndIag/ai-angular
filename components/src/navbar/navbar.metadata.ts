export enum NavbarStyle {
  DARK,
  LIGHT,
}

export enum NavbarItemPosition {
  BRAND,
  LEFT,
  RIGHT,
}

export enum NavbarItemPresentationMode {
  ONLY_ICON,
  ONLY_TEXT,
  BOTH,
}

export interface NavbarItem {
  title: string;
  icon: string;  // Material icon
  position: NavbarItemPosition;
  mode?: NavbarItemPresentationMode;
  image: string;
  style: string;
  path?: string;
}
