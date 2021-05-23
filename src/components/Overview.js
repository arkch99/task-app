import React, { Component } from 'react';

class Overview extends Component {	
	render(){	
		let c = 1;
		const taskItems = this.props.tasks.map((task) => {
			return (
				<span>
					<li key={task.id}>{`${c++}: ${task.text}`}</li>
					<button 
						type="button" 
						value={task.id} 
						onClick={this.props.delhandler}>
							Delete
					</button>
				</span>
			);	
		});
		
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