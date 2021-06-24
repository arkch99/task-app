import React, { Component } from "react";
import TaskList from "./components/TaskList";
import ProjectPane from "./components/ProjectPane";

import "./index.css";

// import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import uniqid from 'uniqid';
import { ButtonGroup } from "@material-ui/core";
import '@fontsource/roboto';

import {parseISO, isThisWeek, isToday } from "date-fns";

class App extends Component {
	constructor(){
		super();
		this.state = {
			tasks: [],
			projects:[
				{id:"today",name:"Today"},
				{id:"week",name:"This week"},
				{id:"all", name:"All"},
				{id:"default", name:"Unclassified"}], 
			selectedProj: "default",
			typedVal: "",
			delEnabled: false,
			editedTask: "none",
			changedProj: "none",
			editedProject: "none",
			newProjInput: false,
			colourAnchor: null,
			colourMenuOpen: false,
			selectedColour: "yellow"
		};
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
		this.handleCancel = this.handleCancel.bind(this);
		this.handleTaskClear = this.handleTaskClear.bind(this);
		this.handleColourMenu = this.handleColourMenu.bind(this);
		this.handleColourMenuClose = this.handleColourMenuClose.bind(this);
		this.handleColourSel = this.handleColourSel.bind(this);
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
		const specialProjs = new Set(["all", "today", "week"]);
		const ip = document.getElementById("task-field");
		const projId = specialProjs.has(this.state.selectedProj) ? "default" : this.state.selectedProj;//document.getElementById("proj-sel-menu").value;
		const dueDate = document.getElementById("task-submit-date").value;
		const newTask = {
			id:uniqid(), 
			projectId: projId,
			done: false,
			dueDate: dueDate,
			text: this.state.typedVal,
			colour: this.state.selectedColour
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

	handleTaskEdit(event, colour){
		const taskId = event.currentTarget.value;
		const taskEle = document.getElementById(`${taskId}-text-edit`);
		const dateEle = document.getElementById(`${taskId}-date-edit`);

		console.log(colour);
		
		if(this.state.editedTask !== "none"){ // if save button has been pressed
			console.log(`Save pressed on ${taskId}`);
			const changedTaskPos = this.state.tasks.findIndex((task) => {return task.id === taskId});			
			const editedTask = this.state.tasks[changedTaskPos];
			const newProj = this.state.changedProj === "none" ? editedTask.projectId : this.state.changedProj;
			const newDate = dateEle.value;
			const newTask = taskEle.value;

			console.log("newProj "+ newProj);
			const changedTask = {
				id: taskId,
				projectId: newProj,
				done: false,
				text: newTask,	
				dueDate: newDate,
				colour: colour
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
			text: checkedTask.text,
			colour: checkedTask.colour
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
		if(projId === "default" || projId === "all" || projId === "today" || projId === "week"){ // prevent deletion of unclassified and all
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
		console.log("editedProject: " + editedProject);
		console.log(event);
		if(this.state.editedProject === "none")
		{
			this.setState({
				editedProject: editedProject
			});
		}
		else {
			const newProjName = document.getElementById(`${editedProject}-name-edit`).value;
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

	handleCancel(event){
		this.setState({
			editedTask: "none",
			editedProject: "none",
			changedProj: "none",
			newProjInput: false
		});
	}

	handleTaskClear(event){
		document.getElementById("task-field").value="";
	}

	handleColourMenu(event){
		this.setState({
			colourAnchor: this.state.colourAnchor ? null : event.currentTarget,
			colourMenuOpen: !this.state.colourMenuOpen
		});
	}

	handleColourMenuClose(event){
		this.setState({
			colourAnchor: null,
			colourMenuOpen: false
		});
	}

	handleColourSel(event){
		this.setState({
			selectedColour: event.currentTarget.dataset.colourName,
			colourMenuOpen: false,
			colourAnchor: null
		});
	}

	render(){
		
		let tasksInProject = this.state.tasks;
		let projName = "all";
		let nTaskMap = new Map();

		const specialProjs = new Set(["all", "today", "week"]);
		
		const colours = ["red", "yellow", "green"];

		const colourCodes = {
			red: "#ff5252",
			yellow: "#fff176",
			green: "#b2ff59"
		};
		const colourText = {
			red: "High",
			yellow: "Medium",
			green: "Low"
		};

		const colourAnchor = <Button onClick={this.handleColourMenu} style={{marginLeft: 20}}>
			Priority:
			<div className="colour-menu-item" style={{
				backgroundColor: colourCodes[this.state.selectedColour],				
				marginLeft: 10
			}}>			
				{colourText[this.state.selectedColour]}
			</div>
		</Button>;
		

		const colourItems = colours.map(colour =>(
			<MenuItem
				key={colour}
				data-colour-name={colour}
				onClick={this.handleColourSel}
			>
				<div className="colour-menu-item" style={{backgroundColor:colourCodes[colour]}}>
					{colourText[colour]}
				</div>
			</MenuItem>
		));
		
		if(this.state.selectedProj !== "all"){
			if(!specialProjs.has(this.state.selectedProj)){//this.state.selectedProj !== "all"){
				tasksInProject = this.state.tasks.filter(task => {return task.projectId === this.state.selectedProj});			
				projName = this.state.projects.find(proj => proj.id === this.state.selectedProj).name;
			}
			else{
				if(this.state.selectedProj === "today"){
					tasksInProject = this.state.tasks.filter(task => {console.log(`parsed date: ${parseISO(task.dueDate)}`); return isToday(parseISO(task.dueDate))});
					
				}

				else{
					tasksInProject = this.state.tasks.filter(task => isThisWeek(parseISO(task.dueDate)));
				}
			}
		}

		this.state.projects.forEach(project => {
			if(project.id === "all"){
				nTaskMap.set(project.id, this.state.tasks.length);
			}
			else if(!specialProjs.has(project.id)){//project.id !== "today" && project.id !== "week"){
				nTaskMap.set(project.id, this.state.tasks.filter(task => task.projectId === project.id).length);
			}
			else{ // today and week
				if(project.id === "today")
				{
					nTaskMap.set("today", this.state.tasks.filter(task => isToday(parseISO(task.dueDate))).length);
				}
				else{
					nTaskMap.set("week", this.state.tasks.filter(task => isThisWeek(parseISO(task.dueDate))).length);
				}
			}
		});

		return (
		<div className="App">
			<div className="side-pane-wrapper">
				<Drawer variant="permanent" open={true} className="side-pane">					
					<ProjectPane 
						projects={this.state.projects}
						//tasks={this.state.tasks}
						nTaskMap={nTaskMap}
						selectedProj={this.state.selectedProj}
						projSelHandler={this.handleProjSel} 
						newprojhandler={this.handleNewProj}
						newprojsubmithandler={this.handleNewProjSubmit}
						projdelhandler={this.handleProjDel}
						delEnabled={this.state.delEnabled}
						editedProject={this.state.editedProject}
						projEditHandler={this.handleProjEdit}
						newProjInput = {this.state.newProjInput}
						cancelHandler = {this.handleCancel}
					/>
				</Drawer>
			</div>
			<div className="content">
			{/* <Container> */}			
				<div className="new-task-wrapper">					
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
							<ButtonGroup className="task-submit-btns">
								<Button 
									type="submit"
									id="submit-btn"
									color="primary"
									variant="contained"
								>
									Submit
								</Button>
								<Button 
									type="button"
									id="clr-btn"
									color="secondary"
									variant="outlined"
									onClick={this.handleTaskClear}
								>
									Clear
								</Button>
							</ButtonGroup>
						</span>

						<div className="date-priority-wrapper">
							<label htmlFor="task-submit-date">Due Date:</label>
							<Input 
								type="date" 
								name="task-submit-date" 
								defaultValue={(new Date()).toISOString().slice(0, 10)}
								id="task-submit-date"
								color="secondary"
							/>
							{colourAnchor}
							<Menu
								anchorEl={this.state.colourAnchor}
								open={this.state.colourMenuOpen}
								onClose={this.handleColourMenuClose}
							>
								{colourItems}
							</Menu>
						</div>					
					</form>
					<TaskList 
						tasks={tasksInProject} 
						projects={this.state.projects}
						selProjName={projName}		
						editedTask={this.state.editedTask}
						delhandler={this.handleDelete} 
						edithandler={this.handleTaskEdit} 
						checkhandler={this.handleCheck}
						defaultValue={(new Date()).toISOString()}
						projEditHandler={this.handleTaskProjChange}
						cancelHandler={this.handleCancel}
					/>
				</div>
					
				
			{/* </Container>	 */}
		</div>		
		</div>
		);
  	}
}

export default App;