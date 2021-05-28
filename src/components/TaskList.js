import React, { Component } from 'react';
import "./tasklist.css";

class Overview extends Component {	
	render(){	
		let c = 1;
		const strikethrough = {
			true:"line-through",
			false:"none"
		}
		const taskItems = this.props.tasks.map((task) => {
			return (
				<span className="todo-item">
					<input type="checkbox" value={task.id} onClick={this.props.checkhandler} checked={task.done?true:false}/>
					<li id={task.id} key={task.id} style={{textDecoration: strikethrough[task.done]}}>
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
				<h1>Project '{this.props.selProjName}' selected</h1>
				<ul className="todo-list">
					{taskItems}
				</ul>
			</div>
		);
	}
}

export default Overview;