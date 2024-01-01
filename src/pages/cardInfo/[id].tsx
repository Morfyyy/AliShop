import React from 'react';
import styles from './cardInfo.module.scss';
import { Image, Title } from '@mantine/core';
import { Rate } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardInfo } from '../../redux/cardInfo/slice';
import { fetchAddItems, fetchPayProduct } from '../../redux/cart/slice';
import { RootState } from '../../redux/store';

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
const CardInfo = () => {
  const { items } = useSelector((state: RootState) => state.cardInfo);
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    const id = router.query.id;
    //@ts-ignore
    dispatch(fetchCardInfo({ id }));
  }, []);
  const addToCart = (obj: obj) => {
    try {
      //@ts-ignore
      dispatch(fetchAddItems({ obj }));
      alert('Товар успешно добавлен в корзину:)');
      router.push('/');
    } catch (error) {
      console.log(error);
      alert('Не удалось добавить товар в корзину:(');
    }
  };

  const payProduct = async (items: obj) => {
    try {
      //@ts-ignore
      dispatch(fetchPayProduct(items));
      alert('Товары успешно оформел и добавлен в профиль:)');
      router.push('/');
    } catch (error) {
      alert('Не удалось добавить товары в профиль');
    }
  };

  return (
    <div className={styles.cardInfo}>
      {items.map((item: obj) => {
        return (
          <>
            <Title order={2}>{item.title}</Title>
            <div className={styles.cardBlock}>
              <div className={styles.productImage}>
                <Image width={328} height={329} src={item.imageUrl} />
              </div>
              <div className={styles.productPrice}>
                <div className={styles.price}>
                  <Title style={{ fontSize: 44 }}>{item.price} ₽</Title>
                  <Title className={styles.noDiscount} style={{ color: 'grey' }} order={2}>
                    {item.discount} ₽
                  </Title>
                </div>
                <div className={styles.addToCart}>
                  <button className={styles.addBtn} onClick={() => addToCart({ ...item })}>
                    Добавить в корзину
                  </button>
                  <button className={styles.payNow} onClick={() => payProduct(item)}>
                    Купить сейчас
                  </button>
                </div>
                <div className={styles.reviews}>
                  <Title className={styles.review} order={3}>
                    {item.reviews}
                  </Title>
                  <p className={styles.point}>•</p>
                  <Rate className={styles.rate} defaultValue={item.rating} />
                </div>
              </div>
            </div>
            <div className={styles.describe}>
              <Title order={3}>Цвет: {item.color}</Title>
              <Title order={3}>Питание</Title>
              <Title order={3}>
                Время зарядки <div className={styles.line}></div>
                {item.timeCharging}
              </Title>
              <Title order={3}>
                Время работы от аккумулятора <div className={styles.line}></div>
                {item.lifeBattery}
              </Title>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default CardInfo;
