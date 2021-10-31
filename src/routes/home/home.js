// import { h } from 'preact';
import style from './style.css';
import apiService from '../../services/api';
import { useState, useEffect } from 'preact/hooks';

const Home = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(15);
  const [search, setSearch] = useState('');
  let timeOut;

  useEffect(() => {
    const getOrders = async () => {
      const { data } = await apiService.getOrders(limit, search);
      setData(data.map((item, index) => {
        return (
          <Order item={item} index={index} />
        )
      }));
    };
    getOrders();
  }, [limit, search]);

  const handleSearch = (e) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setSearch(e.target.value);
    }, 250);
  }

  return (
    <div className={style.home}>
      <div className={style.top}>
        <div>
          <input placeholder="Search..." type="text" onKeyUp={handleSearch} />
        </div>
        <ul>
          <li onClick={() => { setLimit(5) }}>5</li>
          <li onClick={() => { setLimit(10) }}>10</li>
          <li onClick={() => { setLimit(15) }}>15</li>
          <li onClick={() => { setLimit(20) }}>20</li>
          <li onClick={() => { setLimit(25) }}>25</li>
        </ul>
      </div>
      {data.length
        ? <div className={style.tabl}>
          {data}
        </div>
        : "No order found"}
    </div >
  )
};

const Order = (props) => {
  const { item, index } = props;
  const { _id, name, mobile, ...orderData } = item;
  const orderArray = [];
  const [isOrderVisible, setVisibility] = useState(false);
  for (let orderItem in orderData) {
    if (orderData[orderItem]) {
      orderArray.push(<p><strong>{orderItem.split("_").join(" ").toUpperCase()}</strong> : {orderData[orderItem]} kg</p>);
    }
  }
  return (
    <div>
      <div className={style.order}>
        <div className={style.grid}>
          <p className={style.row}>{index + 1}</p>
          <p className={style.row}>{item.name.toLowerCase()}</p>
          <p className={style.row}>{item.mobile || '-'}</p>
        </div>
        <div className={style.expand} onClick={() => { setVisibility(isOrderVisible ? false : true) }}>
          {isOrderVisible ? "Collapse" : "Expand"}
        </div>
      </div>
      {isOrderVisible
        && <div className={style.orderinfo}>
          {orderArray}
          <button>Submit</button>
        </div>}
    </div>
  );
}

export default Home;
