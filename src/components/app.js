import { Router } from 'preact-router';

import Header from './header/header.js';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home/home.js';
import Stock from '../routes/stock/stock.js';
import NewOrder from '../routes/new-orders/new-orders.js';
import { useEffect, useState } from 'preact/hooks';

import apiService from '../services/api';
// import Details from './details/details.js';


import '../style/index.css';


// import style from './details/details.css';
import { price } from '../data.json';

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      <Stock path="/stock" />
      <NewOrder path="/new-order" />
      <AllOrders path="/all" />
    </Router>
  </div>
)

export default App;

// function Print() {
//
//   const [orders, setOrders] = useState();
//
//   useEffect(async () => {
//     const res = await apiService.getOrders();
//     setOrders(res.data.map(e => ({ ...e, ordered: true })));
//   }, []);
//
//   useEffect(() => { console.log(orders); }, [orders]);
//
//   if (!orders) {
//     <p>No Orders Found</p>
//   }
//
//   return (
//     <div style={{ marginTop: '100px' }}>
//       {orders && orders.map((item) => <Details data={item} />)}
//     </div>
//   )
// }

function AllOrders() {

  const [orders, setOrders] = useState([]);

  useEffect(async () => {
    const res = await apiService.getOrders();
    setOrders(res.data);
  }, []);

  return (
    <div className='total-page'>
      {orders.map(e => <DetailsView data={e} />)}
    </div>
  )
}


const DetailsView = (props) => {
  const { data } = props;
  const { name, mobile, _id, ordered, ...rest } = data;
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    let total = 0;
    setOrder(
      Object.entries(rest).map(([item, weight]) => {
        // if (weight || weight === 0) {
        if (true) {
          total += (weight * price[item] * 2) || 0;
          return (
            <p style={{ position: 'relative' }}>
              <strong>{item.split("_").join(" ").toUpperCase()}: </strong>
              <span style={{ width: '50px' }}> {weight} {item === 'swami_rotli' ? 'No' : 'Kg'} </span>
              = {weight ? (weight * price[item] * 2) : 0} Rs
            </p>
          )
        }
      })
    );
    setTotal(total);
  }, [data]);

  return (
    <>
      <div className='details-block'>
        <div>
          <p>
            <strong>
              {name && name.toUpperCase()}
            </strong>
          </p>
          {order}
          <p><strong>TOTAL</strong> : {total}</p>
        </div >
      </div >
    </>
  )
}
