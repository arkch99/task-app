import React, { Component } from 'react';
import './projectpane.css';

class ProjectItem extends Component{
	render(){				
		const editOrSave = !this.props.edit ? "Edit": "Save";
		return (
		<span key={this.props.project.id} className="todo-item">			
			<li 
				id={this.props.project.id} 
				key={this.props.project.id} 
				onClick={this.props.projSelHandler}
				contentEditable={this.props.edit}
			>
				{/* <span className="project-item-text">{`${this.props.project.name}`}</span> */}
				{this.props.project.name}
			</li>			
			<button 
				type="button" 
				value={this.props.project.id} 				
				onClick={this.props.edithandler}
				style={{display:(this.props.project.id === "default" ? "none":"block")}}
			>
					{editOrSave}
			</button>
		</span>)
	}
}

export default ProjectItem;