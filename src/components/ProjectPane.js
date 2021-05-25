import React, { Component } from 'react';

class ProjectPane extends Component {	
	render(){
		const projList = this.props.projects.map((project) => <li key={project.id} value={project.id} onClick={this.props.projSelHandler}>{project.title}</li>);
		return(
			<div id="side-pane">
				<ul>
					{projList}
				</ul>
			</div>
		)
	}
}

export default ProjectPane;