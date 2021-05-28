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
			delEnabled: true
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
		const taskEle = document.getElementById(taskId).children[1];
		const buttonLabel = event.target.textContent;

		taskEle.contentEditable = mode[buttonLabel];
		event.target.textContent = btnText[buttonLabel];

		if(!taskEle.contentEditable){ // if save button has been pressed
			const changedTaskPos = this.state.findIndex((task) => {
				if(task.id === taskId)
				{
					return true;
				}
				return false;
			});
			const changedTask = {
				id: taskId,
				text: taskEle.textContent
			}
			const newTaskArr = this.state.tasks.slice(0, changedTaskPos).concat(changedTask).concat(this.state.tasks.slice(changedTaskPos + 1));
			this.setState({
				tasks:newTaskArr
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
		const projId = event.target.id;		
		this.setState({
			selectedProj: projId
		});
		//const delbtn = document.getElementById("del-proj-btn");
		if(projId === "default" || projId === "all"){
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
		// console.log()
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
		const projPos = this.state.projects.findIndex(project => {
			if(project.id === projToDelete){
				return true;
			}
			return false;
		});
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


	render(){
		const projList = this.state.projects.map(proj => <option value={proj.id}> {proj.name}</option>);
		let tasksInProject = this.state.tasks;
		let projName = "all";
		if(this.state.selectedProj !== "all"){
			tasksInProject = this.state.tasks.filter(task => {
				if(task.projectId === this.state.selectedProj){
					return true;
				}
				return false;
			});
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
				/>
			</div>
			<div className="content">				
				<form onSubmit={this.handleSubmit}>
					<span id="input-field">
						<input type="text" id="task-field" onChange={this.handleChange}/>
						<button id="submit-btn">Submit</button>
					</span>
					<div className="new-task-btns">
						<label for="proj-sel">Project:</label>
						<select name="proj-sel" id="proj-sel-menu">
							{projList}
						</select>						
					</div>
					
				</form>
				<Overview 
					tasks={tasksInProject} 
					selProjName={projName}
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