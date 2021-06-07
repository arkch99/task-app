import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import { ButtonGroup } from '@material-ui/core';
// import './projectpane.css';

class ProjectItem extends Component{
	render(){				
		return ( 
		<ListItem		
			key={this.props.project.id} 
			id={this.props.project.id} 								
			className="project-item"		
			selected={this.props.isSelected}
			button={true}
			onClick={this.props.projSelHandler}
			contentEditable={this.props.edit}
		>			
			
			{this.props.project.name}
			<ButtonGroup>
				<IconButton
					value={this.props.project.id} 				
					className="proj-edit-btn"
					onClick={this.props.edithandler}
					style={{display:((this.props.project.id === "default" || this.props.project.id === "all")? "none":"block")}}
				>
						{!this.props.edit ? <EditIcon/> : <SaveIcon/>}
				</IconButton>
				<IconButton style={{display: this.props.edit ? "block" : "none"}}>
					<CloseIcon/>
				</IconButton>
			</ButtonGroup>
		</ListItem>);
	}
}

export default ProjectItem;