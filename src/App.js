import React, { Component } from "react";
import Overview from "./components/TaskList";
import ProjectPane from "./components/ProjectPane";
import "./index.css";
import uniqid from 'uniqid';

class App extends Component {
	constructor(){
		super();
		this.state = {
			tasks: [],
			projects:[{id:"default", name:"Unclassified"}], 
			selectedProj: "default",
			typedVal: "",
			delEnabled: true,
			editedTask: "none",
			editedProject: "none"
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
	}

	handleDelete(event){
		event.preventDefault();
		const idToDelete = event.target.value;
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
		const projId = document.getElementById("proj-sel-menu").value;
		const newTask = {
			id:uniqid(), 
			projectId: projId,
			done: false,
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
		const mode = {"Save":false, "Edit":true};
		const btnText = {"Edit":"Save", "Save":"Edit"};		

		const taskId = event.target.value;
		const taskEle = document.getElementById(taskId).children[1]; // get the actual text, not the number
		const buttonLabel = event.target.textContent; // what's on the edit button

		taskEle.contentEditable = mode[buttonLabel];
		event.target.textContent = btnText[buttonLabel]; // change text on edit/save button

		console.log(typeof taskEle.contentEditable);
		console.log(taskEle.contentEditable);

		if(taskEle.contentEditable==='false'){ // if save button has been pressed
			console.log(`Save pressed on ${taskId}`);
			const changedTaskPos = this.state.tasks.findIndex((task) => {return task.id === taskId});			
			const newProj = document.getElementById(`${taskId}-proj-edit-sel-menu`).value;
			console.log(newProj);
			const changedTask = {
				id: taskId,
				projectId: newProj,
				text: taskEle.textContent,				
			};
			
			const newTaskArr = this.state.tasks.slice(0, changedTaskPos).concat(changedTask).concat(this.state.tasks.slice(changedTaskPos + 1));
			this.setState({
				tasks:newTaskArr,
				editedTask: "none"
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
			text: checkedTask.text
		};
		const newTaskArr = this.state.tasks.slice(0, taskIndex).concat(newTask).concat(this.state.tasks.slice(taskIndex + 1));
		this.setState({
			tasks: newTaskArr
		});
	}

	handleProjSel(event){
		console.log("Project clicked!");
		const projId = event.target.id;		
		console.log(`Name: ${event.target.textContent}\nid: ${projId}`);
		this.setState({
			selectedProj: projId
		});
		if(projId === "default" || projId === "all"){ // prevent deletion of unclassified and all
			this.setState({
				delEnabled: true
			});
		}
		else{
			this.setState({
				delEnabled: false
			});
		}
	}

	handleNewProj(event){
		event.target.disabled = true;
		document.getElementsByClassName("proj-input-wrapper")[0].style.display="block";
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
			projects: [...prevState.projects, newProj]
		}));
		ip.value = "";
		document.getElementsByClassName("proj-input-wrapper")[0].style.display="none";
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
			selectedProj: "default"
		});
		
	}

	handleProjEdit(event){
		const editedProject = event.target.value;		
		// const mode = {"Save":false, "Edit":true};
		const btnText = event.target.textContent;

		if(btnText === "Edit"){
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
		const projList = this.state.projects.map(proj => <option key={proj.id} value={proj.id}> {proj.name}</option>);
		let tasksInProject = this.state.tasks;
		let projName = "all";
		if(this.state.selectedProj !== "all"){
			// console.log(this.state.projects);
			tasksInProject = this.state.tasks.filter(task => {return task.projectId === this.state.selectedProj});			
			projName = this.state.projects.find(proj => proj.id === this.state.selectedProj).name;
		}
		
		return (
		<div className="App">
			<div className="side-pane-wrapper">
				<ProjectPane 
					projects={this.state.projects}
					projSelHandler={this.handleProjSel} 
					newprojhandler={this.handleNewProj}
					newprojsubmithandler={this.handleNewProjSubmit}
					projdelhandler={this.handleProjDel}
					delEnabled={this.state.delEnabled}
					editedProject={this.state.editedProject}
					projEditHandler={this.handleProjEdit}
				/>
			</div>
			<div className="content">				
				<form onSubmit={this.handleSubmit}>
					<span id="input-field">
						<input type="text" id="task-field" onChange={this.handleChange}/>
						<button id="submit-btn">Submit</button>
					</span>
					<div className="new-task-btns">
						<label htmlFor="proj-sel">Project:</label>
						<select name="proj-sel" id="proj-sel-menu">
							{projList}
						</select>						
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
				/>
			</div>			
		</div>
		);
  	}
}

export default App;