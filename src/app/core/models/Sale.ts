import { ProductSale } from "./Product"

export interface Sale{
  product: ProductSale[];
  totalValue: number;
  address: string;
  neighborhood: string;
  number: number;
  referencePoint: string;
  phone: string;
  buyerName: string;
  sellerId: number;
  id: number;
  numberSale: string;
  deliveryStatus: number;
  withdrawal: boolean;
  paymentMehod: PaymentMehod;
}

export interface PaymentMehod{
  paymentMehodId: number;
  paid: boolean;
  txid: string;
  linkCard: string;
}
