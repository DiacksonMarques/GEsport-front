export interface Championship{
  name: string;
  acronym: string;
  responsible: {
    name: string;
    phone: string
  };
  city: {
    name: string;
    uf: string
  };
  categories: Array<{
    category: string;
    naipe: string;
  }>;
  id: number;
  enrollment: string;
}
