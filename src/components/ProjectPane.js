import React, { Component } from 'react';
import './projectpane.css';

class ProjectPane extends Component {	
	render(){
		const projList = this.props.projects.map((project) => <li className="project-item" key={project.id} value={project.id} onClick={this.props.projSelHandler}>{project.name}</li>);
		return(
			<div className="side-pane">
				<div class="proj-btns">
					<button type="button">New Project</button>
					<button type="button">Delete</button>
				</div>
				<div className="proj-list-wrapper">
					<ul className="proj-list">
						{projList}
					</ul>
				</div>				
			</div>
		)
	}
}

export default ProjectPane;