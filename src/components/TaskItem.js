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
	constructor(props){
		super(props);
		this.cancelHandlerInt = this.cancelHandlerInt.bind(this);
	}

	cancelHandlerInt(event){
		document.getElementById(`${this.props.task.id}-text-edit`).value = this.props.task.text;
		document.getElementById(`${this.props.task.id}-date-edit`).value = this.props.task.dueDate;
		document.getElementById(`${this.props.task.id}-proj-edit-sel-menu`).value = this.props.task.projectId;
		this.props.cancelHandler(event);
	}

	render(){		
		const strikethrough = {
			true:"line-through",
			false:"none"
		};

		const editDisplay = !this.props.edit ? "none": "block"; // controls if edit fields are displayed
		const origDisplay = this.props.edit ? "none": "block"; // controls if original data elements are displayed
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
					checked={this.props.task.done}	
					disabled={this.props.edit}		
				/>

				<span className="task-number">{`${this.props.taskNo}:`}</span> 

				<span className="task-text">
					<span 						
						style={{display:origDisplay}}
					>
						{`${this.props.task.text}`}
					</span>
					<span						
						style={{display:editDisplay}}
					>
						<TextField 
							type="text" 
							id={`${this.props.task.id}-text-edit`}
							variant="outlined" 
							defaultValue={this.props.task.text}
						/>
					</span>
				</span>

				<span className="task-date">
					<span 
						className={isOverDue ? "task-date-due" : "task-date-ok"} 
						style={{display:origDisplay}}
					>
						{this.props.task.dueDate}
					</span>
					<span style={{display:editDisplay}}>
						<TextField 
							type="date" 
							id={`${this.props.task.id}-date-edit`}
							defaultValue={this.props.task.dueDate}						
						/>
					</span>
				</span>
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
					disabled={this.props.task.done}
				>
					{this.props.edit ? <CheckIcon/> : <EditIcon/>}
				</IconButton>
				<IconButton 
					style={{display: this.props.edit ? "block" : "none"}}
					onClick={this.cancelHandlerInt}//{this.props.cancelHandler}
				>
						<CloseIcon/>
				</IconButton>
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