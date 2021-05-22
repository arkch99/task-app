import React, { Component } from 'react';
//import ReactDOM from 'react-dom';

class Overview extends Component {
	constructor(){
		super();
		this.state = {
			tasks:[]
		};
	}
	render(){	
		const taskItems = this.state.tasks.map((task) => <li key={task}>{task}</li>);
		return (
			<div>
				<ul>
					{taskItems}
				</ul>
			</div>
		);
	}
}

export default Overview;