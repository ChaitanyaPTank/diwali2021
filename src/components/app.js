import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header/header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home/home';

const App = () => (
	<div id="app">
		<Header />
		<Router>
			<Home path="/" />
			{/* <Profile path="/dashboard/" />
			<Profile path="/stock" /> */}
		</Router>
	</div>
)

export default App;
