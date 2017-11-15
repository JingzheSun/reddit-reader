import React from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends React.Component{
	constructor(props){
		super(props);
		this.state={selected:""}
	}

	click(s){
		this.setState({selected: s})
	}

	render(){
		return(
			<nav className="navbar navbar-inverse" role="navigation" id="nav">
			    <div className="container-fluid">
				    <div className="navbar-header" onClick={this.click.bind(this, "")}>
				        <Link to="/" className="navbar-brand">Nav bar for future use</Link>
				    </div>
				    <div>
				        <ul className="nav navbar-nav navbar-right">
				            <li className={("o"==this.state.selected) && "active"} onClick={this.click.bind(this,"o")}><Link to='/other'>Other</Link></li>
				        </ul>
				    </div>
			    </div>
			</nav>
		)
	}
}