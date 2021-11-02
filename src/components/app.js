import { Router } from 'preact-router';

import Header from './header/header.js';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home/home.js';
import Stock from '../routes/stock/stock.js';
import NewOrder from '../routes/new-orders/new-orders.js';

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      <Stock path="/stock" />
      <NewOrder path="/new-order" />
    </Router>
  </div>
)

export default App;
