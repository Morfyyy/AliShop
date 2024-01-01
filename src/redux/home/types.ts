export type HomeItemsType = [
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
type Status = 'loading' | 'success' | 'error';

export interface InitialStateType {
  items: HomeItemsType[];
  status: Status | number | any;
  searchValue: string;
}
