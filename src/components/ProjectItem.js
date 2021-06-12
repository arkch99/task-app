import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { ButtonGroup } from '@material-ui/core';
// import './projectpane.css';
class ProjectItem extends Component{
	constructor(props){
		super(props);
		this.cancelHandlerInt = this.cancelHandlerInt.bind(this);
	}

	cancelHandlerInt(event){
		document.getElementById(`${this.props.project.id}-name-edit`).value = this.props.project.name;
		this.props.cancelHandler(event);
	}

	render(){	
		const editDisplay = this.props.edit ? "block" : "none";
		const nameDisplay = !this.props.edit ? "block" : "none";
		return ( 
		<ListItem		
			key={this.props.project.id} 
			id={this.props.project.id} 								
			className="project-item"		
			selected={this.props.isSelected}
			button={true}
			onClick={this.props.projSelHandler}
		>			
			<span className="project-name-wrapper">
				<span style={{display:editDisplay}}>
					<TextField type="text" defaultValue={this.props.project.name} id={`${this.props.project.id}-name-edit`}/>
				</span>
				<span id={`${this.props.project.id}-name-display`} style={{display:nameDisplay}}>
					{`${this.props.project.name} (${this.props.nTasks})`}
				</span>
			</span>
			<ButtonGroup>
				<IconButton
					value={this.props.project.id} 				
					className="proj-edit-btn"
					onClick={this.props.edithandler}
					style={{display:((this.props.project.id === "default" || this.props.project.id === "all")? "none":"block")}}
				>
						{!this.props.edit ? <EditIcon/> : <SaveIcon/>}
				</IconButton>
				<IconButton style={{display: this.props.edit ? "block" : "none"}} onClick={this.cancelHandlerInt}>
					<CloseIcon/>
				</IconButton>
			</ButtonGroup>
		</ListItem>);
	}
}

export default ProjectItem;