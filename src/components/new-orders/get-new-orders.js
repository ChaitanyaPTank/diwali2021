import SearchBar from "../search/search";
import apiService from '../../services/api';
import { useState, useEffect } from 'preact/hooks';
import Order from "../order/order";
import style from "./get-new-orders.css";

const GetNewOrder = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(15);
  const [search, setSearch] = useState('');
  const [searchOrdered, setSearchOrdered] = useState(false);

  let timeOut;
  const handleSearch = (e) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setSearch(e.target.value);
    }, 300);
  }

  const toggleOrdered = () => {
    setSearchOrdered(!searchOrdered);
  }

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await apiService.getNewOrders({ limit, search });
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

  return (
    <div style="display: flex; flex-direction: column;">
      <div className={style.search}>
        <SearchBar handlers={{ handleSearch, setLimit, toggleOrdered, searchOrdered }} />
      </div>
      {data.length
        ? <div className={style.table}>
          {data}
        </div>
        : "No order found"}
    </div>
  )
}

export default GetNewOrder;