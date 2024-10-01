export interface Role{
  role: string;
  menus: Menu[];
}

interface Menu{
  icon: string;
  name: string;
  route: string;
  children: [{
    name: string;
    route: string;
  }];
}
