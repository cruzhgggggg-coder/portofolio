export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  status: string;
  hasModel?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}
