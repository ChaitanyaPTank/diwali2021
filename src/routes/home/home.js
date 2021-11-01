// import { h } from 'preact';
import style from './style.css';
import apiService from '../../services/api';
import { useState, useEffect } from 'preact/hooks';
import { price } from '../../data.json'

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
      {data.length
        ? <div className={style.tabl}>
          {data}
        </div>
        : "No order found"}
    </div >
  )
};

const SearchBar = (props) => {
  const { handlers } = props;
  const {
    handleSearch,
    toggleOrdered,
    setLimit,
    searchOrdered
  } = handlers;

  return (
    <div className={style.top}>
      <div>
        <input placeholder="Search..." type="text" onKeyUp={handleSearch} />
      </div>
      <div style="display: flex; align-items: center; justify-content: center;">
        <input type="checkbox" checked={searchOrdered} onChange={toggleOrdered} />
        <label htmlFor="ordered">Search Ordered</label>
      </div>
      <ul>
        <li onClick={() => { setLimit(5) }}>5</li>
        <li onClick={() => { setLimit(10) }}>10</li>
        <li onClick={() => { setLimit(15) }}>15</li>
        <li onClick={() => { setLimit(20) }}>20</li>
        <li onClick={() => { setLimit(25) }}>25</li>
      </ul>
    </div>
  )
}

const Order = (props) => {
  const { item, index } = props;
  const { _id, name, mobile, ordered, ...orderData } = item;
  const [isOrderVisible, setVisibility] = useState(false);

  return (
    <div>
      <div className={ordered ? style.isordered : style.order}>
        <div className={style.grid}>
          <p className={style.row}>{index + 1}</p>
          <p className={style.row}>{item.name.toLowerCase()}</p>
          <p className={style.row}>{item.mobile || '-'}</p>
        </div>
        <div className={style.expand} onClick={() => { setVisibility(isOrderVisible ? false : true) }}>
          {isOrderVisible ? "Collapse" : "Expand"}
        </div>
      </div>
      {isOrderVisible && <Details data={orderData} orderStatus={ordered} id={_id} />}
    </div>
  );
}

const Details = (props) => {
  const { data, id, orderStatus } = props;
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSubmitOrder = async () => {
    const { code, result } = await apiService.submitOrder(id);
    if (code === 200) {
      window.print();
    }
  }

  // const printReciept = () => {
  // const my_window = window.open('', 'mywindow', 'status=1,width=350,height=150');
  // my_window.document.write('<html><head><title>Print Me</title></head>');
  // my_window.document.write('<body onafterprint="self.close()">');
  // my_window.document.write('<p>When you print this window, it will close afterward.</p>');
  // my_window.document.write('</body></html>');
  // }

  useEffect(() => {
    let total = 0;
    setOrder(Object.entries(data).map(([item, weight]) => {
      if (weight) {
        total += weight * price[item] * 2;
        return (
          <p>
            <strong>{item.split("_").join(" ").toUpperCase()} </strong>
            : {weight} Kg
            = {weight * price[item] * 2} Rs
          </p>
        )
      }
    }));
    setTotal(total);
  }, [data]);

  return (
    <>
      <div className={style.print}>
        <div className={style.orderinfo}>
          {order}
          <p><strong>TOTAL</strong> : {total}</p>
          {orderStatus !== true
            ? <button onClick={handleSubmitOrder}>SUBMIT</button>
            : <button onCLick={() => window.print()}>PRINT</button>}
        </div>
      </div>
    </>
  )
}

export default Home;
