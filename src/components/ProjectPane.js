import React, { Component } from 'react';

import ProjectItem from './ProjectItem';
import List from '@material-ui/core/List';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';

import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
// import './projectpane.css';

class ProjectPane extends Component {	
	constructor(props){
		super(props);
		this.cancelHandlerInt = this.cancelHandlerInt.bind(this);
	}

	cancelHandlerInt(event){
		document.getElementById("proj-name-input").value="";
		this.props.cancelHandler(event);
	}

	render(){
		const projList = this.props.projects.map((project) => <ProjectItem 
			key={project.id} 
			project={project} 
			projSelHandler={this.props.projSelHandler} 
			edithandler={this.props.projEditHandler} 
			isSelected={this.props.selectedProj === project.id}
			edit={(project.id === this.props.editedProject) && (project.id !== "none")} 
			cancelHandler={this.props.cancelHandler}
		/>);

		return(
			<div className="side-pane">
			
				<div className="proj-controls-wrapper">
					<ButtonGroup className="proj-btns">
						<Button 
							variant="contained"
							color="primary"
							startIcon={<AddIcon/>}
							id="new-proj-btn" 	
							disabled={this.props.newProjInput}						
							onClick={this.props.newprojhandler}
						>
							New Project
						</Button>
						
						<Button 
							variant="contained"
							color="secondary"
							startIcon={<DeleteIcon/>}
							id="del-proj-btn" 
							disabled={!this.props.delEnabled}
							onClick={this.props.projdelhandler}>
								Delete
						</Button>
					</ButtonGroup>
					<div className="proj-input-wrapper" style={{display:this.props.newProjInput ? "block" : "none"}}>
						<form onSubmit={this.props.newprojsubmithandler} >

							<TextField 
								type="text" 
								id="proj-name-input" 
								color="secondary" 
								placeholder="Project name" 
								required={true} 
								variant="outlined"
							/>
							<ButtonGroup className="proj-submit-controls">
								<IconButton 
									type="submit" 
									id="proj-submit-btn"
								>
									<CheckIcon/>		
								</IconButton>
								<IconButton 
									type="button" 
									id="proj-clear-btn"
									onClick={this.cancelHandlerInt}
								>
									<CloseIcon/>		
								</IconButton>
							</ButtonGroup>
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