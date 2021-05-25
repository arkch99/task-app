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
			typedVal: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleProjSel = this.handleProjSel.bind(this);
		this.handleTaskEdit = this.handleTaskEdit.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
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
		const newTask = {
			id:uniqid(), 
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
		alert("placeholder checkbox");
	}

	handleProjSel(event){
		alert("placeholder project sel");
	}


	render(){
		const projList = this.state.projects.map(proj => <option value={proj.id}> {proj.name}</option>);
		return (
		<div className="App">
			<div className="side-pane-wrapper">
				<ProjectPane projects={this.state.projects} projSelHandler={this.handleProjSel}/>
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
				<Overview tasks={this.state.tasks} delhandler={this.handleDelete} edithandler={this.handleTaskEdit} checkhandler={this.handleCheck}/>
			</div>			
		</div>
		);
  	}
}

export default App;