import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
  <header class={style.header}>
    {/* <h1>Orders</h1> */}
    <h1> || SWAMI SHREEJI || </h1>
    <nav>
      <Link activeClassName={style.active} href="/">Home</Link>
      <Link activeClassName={style.active} href="/new-order">New Order</Link>
      {/* <Link activeClassName={style.active} href="/stock">Stock</Link> */}
      <Link activeClassName={style.active} href="/all">Print All</Link>
    </nav>
  </header>
);

export default Header;
