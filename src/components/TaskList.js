import React, { Component } from 'react';
import TaskItem from './TaskItem';
import "./tasklist.css";

class Overview extends Component {	
	render(){	
		let c = 1;
		const projList = this.props.projects.map(proj => <option key={proj.id} value={proj.id}> {proj.name}</option>);		

		const taskItems = this.props.tasks.map((task) => {
			return (
				<TaskItem 
					projList={projList} 
					task={task} 
					taskNo={c++} 
					edithandler={this.props.edithandler}
					checkhandler={this.props.checkhandler}
					delhandler={this.props.delhandler}
					edit={task.id === this.props.editedTask}
				/>
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