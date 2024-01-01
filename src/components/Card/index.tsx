import { Image, Title } from '@mantine/core';
import React from 'react';
import styles from './card.module.scss';
import { Rate } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useAddProduct from '../../hooks/useAddProduct';

type CardType = {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  color: string;
  rating: number;
  reviews: string;
  isAdded: boolean;
  count: number;
};

const Card: React.FC<CardType> = ({
  id,
  title,
  imageUrl,
  price,
  color,
  rating,
  reviews,
  isAdded,
  count,
}) => {
  const router = useRouter();
  const [checkAddProduct, setCheckAddProduct] = React.useState<boolean>(false);
  const { addProduct } = useAddProduct();
  const handleClick = () => {
    const obj = { id, title, imageUrl, price, color, rating, reviews, isAdded: !isAdded, count };
    obj;
    addProduct(obj);
    setCheckAddProduct(true);
  };

  return (
    <div key={id} className={styles.product}>
      {router.pathname === '/profile' ? (
        <div className={styles.productImage}>
          <Image width={161} height={156} src={imageUrl} />
        </div>
      ) : (
        <div className={styles.productImage}>
          <Link href={`/cardInfo/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Image width={161} height={156} src={imageUrl} />
          </Link>
        </div>
      )}

      <p className={styles.productTitle}>{title}</p>
      <div className={styles.addProductBlock}>
        <Title fw={400} order={2}>
          {price} ₽
        </Title>
        {router.pathname === '/profile' ? null : (
          <button className={styles.addProduct} onClick={handleClick}>
            <Image
              width={34}
              height={34}
              src={
                checkAddProduct
                  ? 'https://cdn-icons-png.flaticon.com/128/7244/7244723.png'
                  : 'https://cdn-icons-png.flaticon.com/128/6737/6737600.png'
              }
            />
          </button>
        )}
      </div>
      <div className={styles.reviewsBlock}>
        <p className={styles.reviews}>{reviews}</p>
        <Rate
          style={{ color: 'rgba(255, 170, 0, 1)', fontSize: 15 }}
          disabled
          defaultValue={rating}
        />
      </div>
    </div>
  );
};

export default Card;
