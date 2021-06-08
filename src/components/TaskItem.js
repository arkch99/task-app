import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import './tasklist.css';

class TaskItem extends Component{
	render(){		
		const strikethrough = {
			true:"line-through",
			false:"none"
		};

		const editDisplay = !this.props.edit ? "none": "block";
		const dateDisplay = this.props.edit ? "none": "block";
		const today = new Date().toISOString().slice(0, 10);		
		const isOverDue = this.props.task.dueDate < today;		
		
		return (
		<span key={this.props.task.id} className="todo-item">			
			<ListItem 
				id={this.props.task.id} 
				key={this.props.task.id} 				
				button={true}
				style={{textDecoration: strikethrough[this.props.task.done]}}
			>
				<Checkbox 
					value={this.props.task.id} 
					onClick={this.props.checkhandler} 
					checked={this.props.task.done?true:false}			
				/>
				<span className="task-number">{`${this.props.taskNo}:`}</span> 
				<span className="task-text" contentEditable={this.props.edit}>{`${this.props.task.text}`}</span>
				<span 
					className={isOverDue ? "task-date-due" : "task-date-ok"} 
					style={{display:dateDisplay}}
				>
					{this.props.task.dueDate}
				</span>
				<TextField 
					type="date" 
					id={`${this.props.task.id}-date-edit`}
					defaultValue={this.props.task.dueDate}
					style={{display:editDisplay}}
				/>
			</ListItem>
			
			<div 
				className="proj-edit-wrapper" 
				id={`${this.props.task.id}-proj-edit-wrapper`}
				style={{display:editDisplay}}
			>
				<InputLabel id="sel-proj-label" variant="outlined">Project</InputLabel>
				<Select 
					name="proj-edit-sel" 
					id={`${this.props.task.id}-proj-edit-sel-menu`}
					defaultValue={this.props.task.projectId}
					labelId="sel-proj-label"
					onChange={this.props.projEditHandler}
					variant="outlined"
				>
					{this.props.projList}
				</Select>
			</div>
			<ButtonGroup className="task-edit-btns">
				<IconButton 
					value={this.props.task.id} 
					onClick={this.props.edithandler}
				>
					{this.props.edit ? <CheckIcon/> : <EditIcon/>}
				</IconButton>
				<IconButton style={{display: this.props.edit ? "block" : "none"}}><CloseIcon/></IconButton>
			</ButtonGroup>			
			<IconButton 
				value={this.props.task.id} 
				onClick={this.props.delhandler}
			>
				<DeleteIcon/>
			</IconButton>
		</span>)
	}
}

export default TaskItem;