import React, { Component } from "react";
import Overview from "./components/Overview";

class App extends Component {
  render(){
	return (
	  <div className="App">   
		  <form>
			<input type="text" id="task-field"/>
			<button id="submit-btn">Submit</button>
		  </form>
		  <Overview/>
	  </div>
	);
  }
}

export default App;