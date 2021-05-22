import React, { Component } from 'react';
import uniqid from 'uniqid';

class Overview extends Component {	
	render(){	
		const taskItems = this.props.tasks.map((task) => <li key={uniqid()}>{task}</li>);
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