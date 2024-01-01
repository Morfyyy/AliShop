export type CartItemsType = [
  {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    color: string;
    count: number;
    lifeBattery: string;
    timeCharging: string;
    rating: number;
    reviews: string;
    discount: number;
  },
];

export interface InitialStateType {
  items: CartItemsType[];
  status: string;
  totalPrice: number;
}
