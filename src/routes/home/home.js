// import { h } from 'preact';
import style from './style.css';
import apiService from '../../services/api';
import { useState, useEffect } from 'preact/hooks';

const price = {
  kaju_mesub: 450,
  kaju_kasata: 400,
  kaju_katri: 360,
  anjeer_patra: 400,
  surti_ghari: 320,
  ghughra: 210,
  khajur_roll: 200,
  adadiya: 200,
  mohanthal: 150,
  sata: 100,
  pauva_chevdo: 75,
  tikha_gathiya: 80,
  flower_gathiya: 80,
  alu_sev: 80,
  tikhi_papdi: 90,
  tikhu_chavanu: 80,
  nankhatai: 90,
  pista_biscuits: 90,
  pista_biscuit: 90,
  cholafali: 110,
  mathiya: 110
}

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
          <Order item={item} index={index} />
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
    }, 250);
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
  let total = 0;
  const orderArray = [];

  const handleSubmitOrder = async () => {
    console.log(id);
    const updated = apiService.submitOrder(id);
    console.log(updated);
  }

  const printReciept = () => {
    // const my_window = window.open('', 'mywindow', 'status=1,width=350,height=150');
    // my_window.document.write('<html><head><title>Print Me</title></head>');
    // my_window.document.write('<body onafterprint="self.close()">');
    // my_window.document.write('<p>When you print this window, it will close afterward.</p>');
    // my_window.document.write('</body></html>');
    window.print();
  }

  // iterating over object as objects are not valid as childrens
  for (let orderItem in data) {
    if (data[orderItem]) {
      total += data[orderItem] * price[orderItem] * 2;
      orderArray.push(
        <p>
          <strong>{orderItem.split("_").join(" ").toUpperCase()} </strong>
          : {data[orderItem]} Kg
          : {data[orderItem] * price[orderItem] * 2} Rs
        </p>
      );
    }
  }

  return (
    <>
      <div className={style.orderinfo} className={style.print}>
        {orderArray}
        <p><strong>Total</strong> : {total}</p>
        {orderStatus !== true && <button onClick={handleSubmitOrder}>Submit</button>}
        <button onCLick={printReciept}>Print</button>
      </div>
    </>
  )
}

export default Home;
