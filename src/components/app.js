import { Router } from 'preact-router';

import Header from './header/header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home/home';
import Stock from '../routes/stock/stock';
import AddOrder from './add-order/add-order';

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      <Stock path="/stock" />
      <AddOrder path="/add-order" />
    </Router>
  </div>
)

export default App;
