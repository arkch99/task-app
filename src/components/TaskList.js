import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TaskItem from './TaskItem';
import "./tasklist.css";

class Overview extends Component {	
	render(){	
		let c = 1;
		const projList = this.props.projects.filter(proj => proj.id !== "all").map(proj => <MenuItem key={proj.id} value={proj.id}> {proj.name}</MenuItem>);		

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
					projEditHandler={this.props.projEditHandler}
					cancelHandler={this.props.cancelHandler}
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