import React, { Component } from "react";
import Overview from "./components/Overview";
import uniqid from 'uniqid';

class App extends Component {
	constructor(){
		super();
		this.state = {
			tasks: [],
			typedVal: ""
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
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

	
	render(){
		return (
		<div className="App">   
			<form onSubmit={this.handleSubmit}>
				<input type="text" id="task-field" onChange={this.handleChange}/>
				<button id="submit-btn">Submit</button>
			</form>
			<Overview tasks={this.state.tasks}/>
		</div>
		);
  	}
}

export default App;