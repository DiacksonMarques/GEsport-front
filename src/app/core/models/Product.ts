export interface Product {
  id: number;
  description: string;
  value: number;
  followUpQuantity: number;
  followUps: Array<FollowUp>;
}

export interface ProductSale extends Product {
  followUpsPage: Array<FollowUp>;
  price: number;
}

export interface FollowUp {
  id: number;
  description: string;
  amount: number;
  value: number;
}
