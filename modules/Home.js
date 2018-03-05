import React from 'react';

export default class Home extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			topics: ['news', 'python'],
			data: {},
			show: null
		}
		this.init();

		this.select = this.select.bind(this);
		this.add = this.add.bind(this);
	}

	init(){
		//load default subreddit
		let {topics} = this.state;
		for(var t of topics){
			$.ajax({
			    url: 'https://www.reddit.com/r/' + t + '.json',
			    data: {q: null, restrict_sr: 'true', sort: 'top'},
			    type: "GET",
			    dataType : "json",
			}).done(res => {
				let subreddit = res.data.children[0].data.subreddit.toLowerCase();
			    this.setState(prev => {
			    	prev['data'][subreddit] = res['data']['children'];
			    	prev['show'] = 'news';
			    	return prev;
			    })
			}).fail(() => console.log('err'))
		}
	}

	manage(){
		$("#myModalLabel").text("Manage");
     	$('#myModal').modal();
	}

	add(event){
		if(event.key == "Enter"){
			let newTopic = event.target.value;
			if (this.state.topics.includes(newTopic.toLowerCase())){
				alert('Subreddit already added');
				return
			}
			$.ajax({
			    url: 'https://www.reddit.com/r/' + newTopic + '.json',
			    data: {q: null, restrict_sr: 'true', sort: 'top'},
			    type: "GET",
			    dataType : "json",
			}).done(res => {
				let subreddit = res.data.children[0].data.subreddit.toLowerCase();
			    this.setState(prev => {
			    	prev.topics.push(subreddit);
			    	prev['data'][subreddit] = res['data']['children'];
			    	if (prev.topics.length == 1)
			    		prev.show = prev.topics[0]
			    	return prev;
			    }, () => {
			    	$('.selectpicker').selectpicker('refresh');
			    });
			    
			}).fail(() => alert("Subreddit doesn't exist"))
		}
	}

	del(i, event){
		this.setState(prev => {
	    	let t = prev.topics.splice(i,1)[0];
	    	delete prev.data[t];
	    	if(t == prev.show)
	    		prev.show = prev.topics[0] || null;
	    	return prev;
	    }, () => {
	    	$('.selectpicker').selectpicker('refresh');
	    });
	}

	componentDidMount(){
		// suppose to load personal info after authentication
	}

	select(event){
		this.setState({show: event.target.value})
	}

	render(){
		const POSTS = ({info}) => (
			<div style={styles.posts}>
				<a href={'https://www.reddit.com' + info.data.permalink}>
					<h3>{info.data.title}</h3>
				</a>
				by {info.data.author}
			</div>
		)
		let {show} = this.state;
		let l = this.state.data[show] || [];
		return(
			<div id="home" style={styles.block}>

				<div className="container">
					<h1 onClick={this.manage} style={styles.manage}>Subreddits</h1>
					<select className="selectpicker" data-live-search="true" onChange={this.select}>
						{
							this.state.topics.map((name, i) => (
								<option data-tokens={name.split(' ')} key={i}>{name}</option>
							))
						}
					</select>
					<hr />

					<div id="subreddit">
						{
							l.map((info, i) => (
								<POSTS key={i} info={info}/>
							))
						}
					</div>
				</div>

				<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
		            <div className="modal-dialog" role="document">
		                <div className="modal-content">
		                    <div className="modal-header">
		                    	<h2>Manage Subreddits</h2>
		                    </div>
		                    <div className="modal-body">
		                        <div className="form-group">
		                        	<input className="form-control" placeholder="Type in a topic and press Enter to add" onKeyDown={this.add}/>
		                        	{
		                        		this.state.topics.map((title, i) => (
		                        			<div style={styles.del} key={i}>
		                        				{title}
		                        				<i onClick={this.del.bind(this, i)} className="fa fa-times pull-right" aria-hidden="true"></i>
		                        			</div>
		                        		))
		                        	}
		                        </div>		                 
		                    </div>
			            </div>
		            </div>
		     	</div>

			</div>
		)
	}
}

const styles = {}

styles.posts = {
	background: 'rgba(40,40,40,0.25)',
	borderRadius: '1em',
	textAlign: 'left',
	border: '1px solid lightblue',
	padding: '10px',	
	margin: '5px'
}

styles.manage = {
	cursor: 'pointer',
	textDecoration: 'underline'
}

styles.del = {
	borderRadius: '0.5em',
	border: '1px solid balck',
	background: 'rgba(40,40,40,0.15)',
	fontSize: '25px',
	margin: '5px',
	pedding: '5px'
}

styles.block = {
	textAlign: 'center'
}