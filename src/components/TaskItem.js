import React, { Component } from 'react';
import './tasklist.css';

class TaskItem extends Component{
	render(){		
		const strikethrough = {
			true:"line-through",
			false:"none"
		};

		const editDisplay = !this.props.edit ? "none": "block";
		const editOrSave = !this.props.edit ? "Edit": "Save";
		const today = new Date().toISOString().slice(0, 10);		
		const isOverDue = this.props.task.dueDate < today;
		
		return (
		<span key={this.props.task.id} className="todo-item">
			<input 
				type="checkbox" 
				value={this.props.task.id} 
				onClick={this.props.checkhandler} 
				checked={this.props.task.done?true:false}
			
			/>
			<li 
				id={this.props.task.id} 
				key={this.props.task.id} 
				style={{textDecoration: strikethrough[this.props.task.done]}}
			>
				<span className="task-number">{`${this.props.taskNo}:`}</span> 
				<span className="task-text">{`${this.props.task.text}`}</span>
				<span className={isOverDue ? "task-date-due" : "task-date-ok"}>{this.props.task.dueDate}</span>
			</li>
			<div 
				className="proj-edit-wrapper" 
				id={`${this.props.task.id}-proj-edit-wrapper`}
				style={{display:editDisplay}}
			>

				<label htmlFor="proj-edit-sel">Project:</label>
				<select name="proj-edit-sel" id={`${this.props.task.id}-proj-edit-sel-menu`}>
					{this.props.projList}
				</select>
			</div>
			<button 
				type="button" 
				value={this.props.task.id} 
				onClick={this.props.edithandler}>
					{editOrSave}
			</button>
			<button 
				type="button" 
				value={this.props.task.id} 
				onClick={this.props.delhandler}>
					Delete
			</button>
		</span>)
	}
}

export default TaskItem;