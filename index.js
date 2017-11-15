import React from 'react';
import {render} from 'react-dom';
import {Route, HashRouter} from 'react-router-dom';
import Nav from './modules/Nav.js';
import Home from './modules/Home.js';
import Other from './modules/Other.js';

render((
	<HashRouter>
		<div>
			<Nav/>
			<div className="container">
				<Route exact path="/" component={Home}/>
		    	<Route path="/other" component={Other}/>
	    	</div>
	    </div>
	</HashRouter>
), document.getElementById('root'));