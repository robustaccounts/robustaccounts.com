/**
 * Shared TypeScript interfaces for the application
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavDropdownItem extends NavLink {
  description?: string;
}

export interface MegaMenuItem {
  id: string;
  label: string;
  href: string;
  description: string;
  highlights: string[];
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}
