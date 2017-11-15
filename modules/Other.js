import React from 'react';

export default class Other extends React.Component{
	constructor(props){
		super(props);
		this.state = {show: false}

		this.confirm = this.confirm.bind(this);
	}

	confirm(event){
		if(event.key == "Enter"){
			let v = event.target.value.toLowerCase();
			if (v == "s"){
				this.setState({show: true});
			}else{
				event.target.value = '';
			}
		}
	}

	render(){
		return(
			<div className="block">
				<h3>PassCode:</h3>
				<input className="form-control" placeholder="guess a letter" onKeyDown={this.confirm}/>
				<img src="https://ipost.files.wordpress.com/2012/05/long_cat1_2.gif?w=800" style={{"display": this.state.show ? "block" : "none"}}/>
			</div>
		)
	}
}