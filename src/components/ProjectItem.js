import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
// import './projectpane.css';

class ProjectItem extends Component{
	render(){				
		const editOrSave = !this.props.edit ? "Edit": "Save";
		return ( 
		<ListItem		
			key={this.props.project.id} 
			className="todo-item"		
			
		>			
			<span 
				id={this.props.project.id} 				
				onClick={this.props.projSelHandler}
				contentEditable={this.props.edit}
			>
				{this.props.project.name}
			</span>
			<button 
				type="button" 
				value={this.props.project.id} 				
				onClick={this.props.edithandler}
				style={{display:(this.props.project.id === "default" ? "none":"block")}}
			>
					{editOrSave}
			</button>
		</ListItem>);
	}
}

export default ProjectItem;