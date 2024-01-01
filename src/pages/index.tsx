import React, { Suspense, lazy } from 'react';
import styles from '../styles/Home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../redux/home/slice';
import Loading from '../Loading/Loading';
import { RootState } from '../redux/store';

const Card = lazy(() => import('../components/Card/index'));

const Home: React.FC = () => {
  const { items, searchValue } = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch();

  React.useEffect(() => {
    //@ts-ignore
    dispatch(fetchItems());
  }, []);

  const filterProducts = items.filter((item: any) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <main className={styles.home}>
      <div className={styles.homeBody}>
        {filterProducts.map((items: any) => (
          <Suspense fallback={<Loading />}>
            <Card key={items.id} {...items} />
          </Suspense>
        ))}
      </div>
    </main>
  );
};
export default Home;
