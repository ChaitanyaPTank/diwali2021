import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header/header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home/home';
import Stock from '../routes/stock/stock';

const App = () => (
	<div id="app">
		<Header />
		<Router>
			<Home path="/" />
			<Stock path="/stock" />
		</Router>
	</div>
)

export default App;
