import React, { Component } from 'react';
import ProjectItem from './ProjectItem';
import List from '@material-ui/core/List';
// import './projectpane.css';

class ProjectPane extends Component {	
	render(){
		const projList = this.props.projects.map((project) => <ProjectItem 
			key={project.id} 
			project={project} 
			projSelHandler={this.props.projSelHandler} 
			edithandler={this.props.projEditHandler} 
			isSelected={this.props.selectedProj === project.id}
			edit={(project.id === this.props.editedProject) && (project.id !== "none")} 
		/>);

		return(
			<div className="side-pane">
			
				<div className="proj-controls-wrapper">
					<div className="proj-btns">
						<button 
							type="button" 
							id="new-proj-btn" 
							onClick={this.props.newprojhandler}
						>
							New Project
						</button>
						
						<button type="button" 
							id="del-proj-btn" 
							disabled={this.props.delEnabled}
							onClick={this.props.projdelhandler}>
								Delete
						</button>
					</div>
					<div className="proj-input-wrapper" style={{display:this.props.newProjInput ? "block" : "none"}}>
						<form onSubmit={this.props.newprojsubmithandler} >
							<input type="text" name="proj-name" id="proj-name-input"/>
							<button type="submit" id="proj-submit-btn">Submit</button>
						</form>
					</div>
				</div>
			<List>
				<div className="proj-list-wrapper">					
						{projList}					
				</div>	
			</List>			
			</div>
		)
	}
}

export default ProjectPane;