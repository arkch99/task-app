import React, { Component } from 'react';
import './projectpane.css';

class ProjectPane extends Component {	
	render(){
		const projList = this.props.projects.map((project) => <li className="project-item" key={project.id} id={project.id} onClick={this.props.projSelHandler}>{project.name}</li>);

		return(
			<div className="side-pane">
				<div className="proj-controls-wrapper">
					<div className="proj-btns">
						<button type="button" id="new-proj-btn" onClick={this.props.newprojhandler}>New Project</button>
						<button type="button" id="del-proj-btn" onClick={this.props.projdelhandler}>Delete</button>
					</div>
					<div className="proj-input-wrapper">
						<form onSubmit={this.props.newprojsubmithandler}>
							<input type="text" name="proj-name" id="proj-name-input"/>
							<button type="submit" id="proj-submit-btn">Submit</button>
						</form>
					</div>
				</div>
				<div className="proj-list-wrapper">
					<ul className="proj-list">
						<li className="project-item" key="all" id="all" onClick={this.props.projSelHandler}>All</li>
						{projList}
					</ul>
				</div>				
			</div>
		)
	}
}

export default ProjectPane;