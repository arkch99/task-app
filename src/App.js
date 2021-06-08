import React, { Component } from "react";
import Overview from "./components/TaskList";
import ProjectPane from "./components/ProjectPane";

import "./index.css";

import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import uniqid from 'uniqid';

class App extends Component {
	constructor(){
		super();
		this.state = {
			tasks: [],
			projects:[
				{id:"all", name:"All"},
				{id:"default", name:"Unclassified"}], 
			selectedProj: "default",
			typedVal: "",
			delEnabled: false,
			editedTask: "none",
			changedProj: "none",
			editedProject: "none",
			newProjInput: false
		}		
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleProjSel = this.handleProjSel.bind(this);
		this.handleTaskEdit = this.handleTaskEdit.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.handleNewProj = this.handleNewProj.bind(this);
		this.handleProjDel = this.handleProjDel.bind(this);
		this.handleNewProjSubmit = this.handleNewProjSubmit.bind(this);
		this.handleProjEdit = this.handleProjEdit.bind(this);
		this.handleTaskProjChange =  this.handleTaskProjChange.bind(this);
	}

	handleDelete(event){
		event.preventDefault();
		const idToDelete = event.currentTarget.value;
		const delPos = this.state.tasks.findIndex((task) => {
			if(task.id === idToDelete){
				return true;
			}
			return false;
		});
		const newArr = this.state.tasks.slice(0, delPos).concat(this.state.tasks.slice(delPos + 1));
		this.setState({
			tasks: newArr
		});
	}

	handleChange(event){
		this.setState({
			typedVal: event.target.value
		});
	}

	handleSubmit(event){
		const ip = document.getElementById("task-field");
		const projId = this.state.selectedProj === "all" ? "default" : this.state.selectedProj;//document.getElementById("proj-sel-menu").value;
		const dueDate = document.getElementById("task-submit-date").value;
		const newTask = {
			id:uniqid(), 
			projectId: projId,
			done: false,
			dueDate: dueDate,
			text:this.state.typedVal
		};
		console.log(newTask);
		
		/* actually send data to Overview */		
		this.setState(prevState => ({
			tasks: [...prevState.tasks, newTask],
			typedVal: ""
		}));		
		ip.value = "";		
		event.preventDefault();
	}

	handleTaskEdit(event){
		const taskId = event.currentTarget.value;
		const taskEle = document.getElementById(taskId).children[2]; // get the actual text, not the number		
		const dateEle = document.getElementById(`${taskId}-date-edit`);
		console.log(typeof taskEle.contentEditable);
		console.log(taskEle.contentEditable);

		if(this.state.editedTask !== "none"){ // if save button has been pressed
			console.log(`Save pressed on ${taskId}`);
			const changedTaskPos = this.state.tasks.findIndex((task) => {return task.id === taskId});			
			const editedTask = this.state.tasks[changedTaskPos];
			const newProj = this.state.changedProj === "none" ? editedTask.projectId : this.state.changedProj;
			const newDate = dateEle.value;

			console.log("newProj "+ newProj);
			const changedTask = {
				id: taskId,
				projectId: newProj,
				done: false,
				text: taskEle.textContent,	
				dueDate: newDate
			};
			
			const newTaskArr = this.state.tasks.slice(0, changedTaskPos).concat(changedTask).concat(this.state.tasks.slice(changedTaskPos + 1));
			this.setState({
				tasks:newTaskArr,
				editedTask: "none",
				changedProj: "none"	
			});
		}
		else{
			console.log(`Edit pressed on ${taskId}`);
			this.setState({
				editedTask: taskId
			});
		}

	}

	handleCheck(event){
		const checkedTaskId = event.target.value;
		const taskIndex =  this.state.tasks.findIndex(task => {return (task.id === checkedTaskId) ? true : false});
		const checkedTask = this.state.tasks[taskIndex];
		const newTask = {
			id: checkedTask.id,
			projectId: checkedTask.projectId,
			done: !checkedTask.done,
			dueDate: checkedTask.dueDate,
			text: checkedTask.text
		};
		const newTaskArr = this.state.tasks.slice(0, taskIndex).concat(newTask).concat(this.state.tasks.slice(taskIndex + 1));
		this.setState({
			tasks: newTaskArr
		});
	}

	handleTaskProjChange(event, child){
		const newProj = event.target.value;
		this.setState({
			changedProj: newProj
		});
	}

	handleProjSel(event){
		console.log("Project clicked!");
		const projId = event.currentTarget.id;		
		console.log(`Name: ${event.target.textContent}\nid: ${projId}`);
		this.setState({
			selectedProj: projId
		});
		if(projId === "default" || projId === "all"){ // prevent deletion of unclassified and all
			this.setState({
				delEnabled: false
			});
		}
		else{
			this.setState({
				delEnabled: true
			});
		}
	}

	handleNewProj(event){		
		this.setState({
			newProjInput: true
		});
	}

	handleNewProjSubmit(event){
		event.preventDefault();
		const ip = document.getElementById("proj-name-input")
		const projName = ip.value;
		const newProj = { 
			id: uniqid(),
			name:projName 
		};
		this.setState(prevState => ({
			projects: [...prevState.projects, newProj],
			newProjInput: false
		}));
		ip.value = "";
		document.getElementById("new-proj-btn").disabled = false;
	}

	handleProjDel(event){
		const projToDelete = this.state.selectedProj;
		console.log(projToDelete);
		const projPos = this.state.projects.findIndex(project => {return project.id === projToDelete});		
		const newProjArr = this.state.projects.slice(0, projPos).concat(this.state.projects.slice(projPos + 1));

		const taskArr = [];
		this.state.tasks.forEach(task => {
			if(task.projectId === projToDelete){
				task.projectId = "default";
			}
			taskArr.push(task);
		})

		this.setState({
			tasks: taskArr,
			projects: newProjArr,
			selectedProj: "default",
			delEnabled: false
		});
		
	}

	handleProjEdit(event){
		const editedProject = event.currentTarget.value;		
		// const mode = {"Save":false, "Edit":true};
		//const btnText = event.target.textContent;
		console.log("editedProject: " + editedProject);
		console.log(event);
		if(this.state.editedProject === "none")//if(btnText === "Edit")
		{
			this.setState({
				editedProject: editedProject
			});
		}
		else {
			const newProjName = document.getElementById(editedProject).textContent;
			const editedProjPosn = this.state.projects.findIndex((project => project.id === editedProject));
			const newProj = {
				id: editedProject,
				name: newProjName
			};
			const newProjArr = this.state.projects.slice(0, editedProjPosn).concat(newProj).concat(this.state.projects.slice(editedProjPosn + 1));
			this.setState({
				editedProject: "none",
				projects: newProjArr
			});
			console.log(this.state.projects);
		}

	}

	render(){
		let tasksInProject = this.state.tasks;
		let projName = "all";
		const today = new Date().toISOString().slice(0, 10);

		if(this.state.selectedProj !== "all"){
			// console.log(this.state.projects);
			tasksInProject = this.state.tasks.filter(task => {return task.projectId === this.state.selectedProj});			
			projName = this.state.projects.find(proj => proj.id === this.state.selectedProj).name;
		}
		
		return (
		<div className="App">
			<div className="side-pane-wrapper">
				<Drawer variant="permanent" open={true}>					
					<ProjectPane 
						projects={this.state.projects}
						selectedProj={this.state.selectedProj}
						projSelHandler={this.handleProjSel} 
						newprojhandler={this.handleNewProj}
						newprojsubmithandler={this.handleNewProjSubmit}
						projdelhandler={this.handleProjDel}
						delEnabled={this.state.delEnabled}
						editedProject={this.state.editedProject}
						projEditHandler={this.handleProjEdit}
						newProjInput = {this.state.newProjInput}
					/>
				</Drawer>
			</div>
			<Container>
				<div className="content">				
					<form onSubmit={this.handleSubmit}>
						<span id="input-field">
							<TextField 
								type="text" 
								id="task-field" 
								color="primary" 
								variant="outlined" 
								placeholder="Task title"
								required={true}
								onChange={this.handleChange}
							/>
							<Button 
								type="submit"
								id="submit-btn"
								color="primary"
								variant="contained"
							>
								Submit
							</Button>
						</span>
						<div className="new-task-btns">
							<label htmlFor="task-submit-date">Due Date:</label>
							<Input 
								type="date" 
								name="task-submit-date" 
								defaultValue={today}
								id="task-submit-date"
								color="secondary"
								required={true}
							/>
						</div>
						
					</form>
					<Overview 
						tasks={tasksInProject} 
						projects={this.state.projects}
						selProjName={projName}		
						editedTask={this.state.editedTask}
						delhandler={this.handleDelete} 
						edithandler={this.handleTaskEdit} 
						checkhandler={this.handleCheck}
						defaultValue={today}
						projEditHandler={this.handleTaskProjChange}
					/>
				</div>
			</Container>			
		</div>
		);
  	}
}

export default App;