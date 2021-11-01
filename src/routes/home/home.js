// import { h } from 'preact';
import style from './style.css';
import apiService from '../../services/api';
import { useState, useEffect } from 'preact/hooks';
import Order from '../../components/order/order';
import SearchBar from '../../components/search/search';
import AddOrder from '../../components/add-order/add-order';

const Home = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(15);
  const [search, setSearch] = useState('');
  const [searchOrdered, setSearchOrdered] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await apiService.getOrders({ limit, search, ordered: searchOrdered });
      setData(data.map((item, index) => {
        return (
          <Order item={item} index={index} key={index} />
        )
      }));
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
      {/* <div className={style.container}> */}
      {/* <div> */}
      {data.length
        ? <div className={style.tabl}>
          {data}
        </div>
        : "No order found"}
      {/* </div> */}
      {/* </div> */}
    </div >
  )
};

export default Home;
