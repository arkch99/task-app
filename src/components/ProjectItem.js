import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
// import './projectpane.css';

class ProjectItem extends Component{
	render(){				
		const editOrSave = !this.props.edit ? "Edit": "Save";
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
			
			<IconButton
				value={this.props.project.id} 				
				className="proj-edit-btn"
				onClick={this.props.edithandler}
				style={{display:((this.props.project.id === "default" || this.props.project.id === "all")? "none":"block")}}
			>
					{editOrSave === "Edit" ? <EditIcon/> : <SaveIcon/>}
			</IconButton>
		</ListItem>);
	}
}

export default ProjectItem;