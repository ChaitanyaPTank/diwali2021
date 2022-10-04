// import { h } from 'preact';
import style from './home.css';
import apiService from '../../services/api';
import { useState, useEffect } from 'preact/hooks';
import Order from '../../components/order/order';
import SearchBar from '../../components/search/search';

const Home = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(15);
  const [search, setSearch] = useState('');
  const [searchOrdered, setSearchOrdered] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await apiService.getOrders({ limit, search, ordered: searchOrdered });
      setData(data);
    };
    getOrders();

    return () => {
      setData([]);
    }
  }, [limit, search, searchOrdered]);

  const toggleOrdered = () => {
    setSearchOrdered(!searchOrdered);
  }

  let timeOut;
  const handleSearch = (e) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setSearch(e.target.value);
    }, 300);
  }

  return (
    <div className={style.home}>
      <SearchBar handlers={{ handleSearch, setLimit, toggleOrdered, searchOrdered }} />
      {data.length
        ? <div className={style.tabl}>
          {data && data.map(
            (order, index) => <Order item={order} index={index} key={index} />
          )}
        </div>
        : "No order found"}
    </div >
  )
};

export default Home;
