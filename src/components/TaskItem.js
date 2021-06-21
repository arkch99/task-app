import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './taskitem.css';

class TaskItem extends Component{
	constructor(props){
		super(props);
		this.state = {
			colourAnchor: null,
			colourMenuOpen: false,
			selectedColour: this.props.task.colour
		};
		
		this.cancelHandlerInt = this.cancelHandlerInt.bind(this);
		this.handleColourEditMenu = this.handleColourEditMenu.bind(this);
		this.handleColourMenuClose = this.handleColourMenuClose.bind(this);	
		this.handleColourSel = this.handleColourSel.bind(this);
		this.handTaskEditInt = this.handTaskEditInt.bind(this);
	}

	cancelHandlerInt(event){
		document.getElementById(`${this.props.task.id}-text-edit`).value = this.props.task.text;
		document.getElementById(`${this.props.task.id}-date-edit`).value = this.props.task.dueDate;
		document.getElementById(`${this.props.task.id}-proj-edit-sel-menu`).value = this.props.task.projectId;
		this.props.cancelHandler(event);
	}

	handleColourEditMenu(event){
		this.setState({
			colourAnchor: this.state.colourAnchor ? null : event.currentTarget,
			colourMenuOpen: !this.state.colourMenuOpen
		});
	}

	handleColourMenuClose(event){
		this.setState({
			colourAnchor: null,
			colourMenuOpen: false
		});
	}

	handleColourSel(event){
		this.setState({
			selectedColour: event.currentTarget.dataset.colourName,
			colourMenuOpen: false,
			colourAnchor: null
		});
	}

	handTaskEditInt(event){
		console.log(this.state.selectedColour);
		this.props.edithandler(event, this.state.selectedColour);
	}

	render(){		
		const strikethrough = {
			true:"line-through",
			false:"none"
		};

		const colours = ["red", "yellow", "green"];
		const colourCodes = {
			red: "#ff5252",
			yellow: "#fff176",
			green: "#b2ff59"
		};
		const colourText = {
			red: "High",
			yellow: "Medium",
			green: "Low"
		};

		const colourItems = colours.map(colour =>(
			<MenuItem
				key={colour}
				data-colour-name={colour}
				onClick={this.handleColourSel}
			>
				<div className="colour-menu-item" style={{backgroundColor:colourCodes[colour]}}>
					{colourText[colour]}
				</div>
			</MenuItem>
		));

		const editDisplay = !this.props.edit ? "none": "block"; // controls if edit fields are displayed
		const origDisplay = this.props.edit ? "none": "block"; // controls if original data elements are displayed
		const today = new Date().toISOString().slice(0, 10);		
		const isOverDue = this.props.task.dueDate < today;		
		const colourAnchor = <Button onClick={this.handleColourEditMenu}>Priority</Button>;

		return (		
		<span key={this.props.task.id} className="todo-item">			
			<ListItem 
				id={this.props.task.id} 
				className="todo-item-container"
				key={this.props.task.id} 				
				button={true}
				style={{
					textDecoration: strikethrough[this.props.task.done],
					backgroundColor: colourCodes[this.props.task.colour]
				}}
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
				<div className="task-edit-wrapper">
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
						{colourAnchor}
						<Menu
							anchorEl={this.state.colourAnchor}
							open={this.state.colourMenuOpen && this.props.edit}
							onClose={this.handleColourMenuClose}
						>
							{colourItems}
						</Menu>
					
					</div>

				<ButtonGroup className="task-edit-btns">
					<IconButton 
						value={this.props.task.id} 
						onClick={this.handTaskEditInt}//{this.props.edithandler}
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
			</div>
		</ListItem>			
			
		</span>)
	}
}

export default TaskItem;