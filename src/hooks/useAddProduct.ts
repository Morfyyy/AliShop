import { useDispatch } from 'react-redux';
import { fetchAddItems } from '../redux/cart/slice';

type obj = {
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
};
const useAddProduct = () => {
  const dispatch = useDispatch();

  const addProduct = async (obj: obj) => {
    try {
      dispatch(
        //@ts-ignore
        fetchAddItems({ obj }),
      );
    } catch (error) {
      console.error(error);
      alert('Не удалось добавить товар в корзину');
    }
  };

  return { addProduct };
};

export default useAddProduct;
