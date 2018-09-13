import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import Navbar from './components/Navbar';

//redux stuff

import {BrowserRouter, Route, Switch} from 'react-router-dom';



ReactDOM.render(
	<BrowserRouter>
		<div>
			<Navbar />
			<Switch>
				<Route exact={true} path="/upload" component={Main}/>
			</Switch>
		</div>
	</BrowserRouter>
	,
	document.getElementById('root')
);




