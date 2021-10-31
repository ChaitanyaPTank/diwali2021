import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

const Header = () => (
	<header class={style.header} style="display: none;">
		<h1>Orders</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			{/* <Link activeClassName={style.active} href="/dashboard">Dashboard</Link>
			<Link activeClassName={style.active} href="/stock">Stock</Link> */}
		</nav>
	</header>
);

export default Header;
