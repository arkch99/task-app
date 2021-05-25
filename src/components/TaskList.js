import React, { Component } from 'react';
import "./tasklist.css";

class Overview extends Component {	
	render(){	
		let c = 1;
		const taskItems = this.props.tasks.map((task) => {
			return (
				<span>
					<input type="checkbox" value={task.id} onClick={this.props.checkhandler}/>
					<li id={task.id} key={task.id}>
						<span className="task-number">{`${c++}:`}</span> 
						<span className="task-text">{`${task.text}`}</span>
					</li>
					<button 
						type="button" 
						value={task.id} 
						onClick={this.props.edithandler}>
							Edit
					</button>
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