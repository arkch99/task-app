import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TaskItem from './TaskItem';
import Menu from '@material-ui/core/Menu';
import SortIcon from '@material-ui/icons/Sort';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import "./tasklist.css";

class Overview extends Component {	
	constructor(props){
		super(props);
		this.state = {
			sortAnchor: null,
			sortMenuOpen: false,
			selectedSort: "",
			filterAnchor: null,
			filterMenuOpen: false,
			selectedFilter: "All",
		};
		this.handleSortMenu = this.handleSortMenu.bind(this);
		this.handleSortMenuClose = this.handleSortMenuClose.bind(this);
		this.handleSortItemSel = this.handleSortItemSel.bind(this);
		this.handleFilterMenu = this.handleFilterMenu.bind(this);
		this.handleFilterMenuClose = this.handleFilterMenuClose.bind(this);
		this.handleFilterItemSel = this.handleFilterItemSel.bind(this);
		this.filterTasks = this.filterTasks.bind(this);
		this.sortTasks = this.sortTasks.bind(this);
	}

	handleSortMenu(event){		
		this.setState({
			sortAnchor: this.state.sortAnchor ? null : event.currentTarget,
			sortMenuOpen: !this.state.sortMenuOpen
		});
	}

	handleSortMenuClose(event){
		this.setState({
			sortAnchor: null,
			sortMenuOpen: false
		});
	}

	handleSortItemSel(event){
		this.setState({
			selectedSort: event.currentTarget.dataset.sortType,
			sortMenuOpen: false,
			sortAnchor: null
		});
	}

	handleFilterMenu(event){		
		this.setState({
			filterAnchor: this.state.filterAnchor ? null : event.currentTarget,
			filterMenuOpen: !this.state.filterMenuOpen
		});
	}

	handleFilterMenuClose(event){
		this.setState({
			filterAnchor: null,
			filterMenuOpen: false
		});
	}

	handleFilterItemSel(event){
		this.setState({
			selectedFilter: event.currentTarget.dataset.filterType,
			filterMenuOpen: false,
			filterAnchor: null
		});
	}

	filterTasks(task){
		const today = new Date().toISOString().slice(0, 10);		
		const isOverDue = task.dueDate < today;
		if(this.state.selectedFilter === "All"){
			return true;
		}
		else if(this.state.selectedFilter === "Done"){
			return task.done;
		}
		else if(this.state.selectedFilter === "Pending"){
			return !isOverDue && !task.done; // skip tasks which have been completed
		}
		else{
			return isOverDue && !task.done;
		}
	}

	sortTasks(task1, task2){		
		if(this.state.selectedSort === "A-Z") {
			return task1.text > task2.text;
		}
		else if(this.state.selectedSort === "Z-A") {
			return task1.text < task2.text;
		}
		else if(this.state.selectedSort === "Date"){
			return task2.dueDate < task1.dueDate;
		}
		else{
			return false;
		}
	}


	render(){	
		let c = 1;
		const projList = this.props.projects
		.filter(proj => proj.id !== "all")
		.map(proj => <MenuItem key={proj.id} value={proj.id}> {proj.name} </MenuItem>);
		
		const sortAnchor = <Button startIcon={<SortIcon/>} onClick={this.handleSortMenu}>Sort</Button>;
		const filterAnchor = <Button startIcon={<FilterListIcon/>} onClick={this.handleFilterMenu}>Filter</Button>;
		const sorts = ["None", "A-Z", "Z-A","Date"];
		const filters = ["All", "Done", "Pending", "Overdue"];
		const sortMenuItems = sorts.map(sortCrit => (
			<MenuItem 
				key={sortCrit} 
				data-sort-type={sortCrit} 
				onClick={this.handleSortItemSel}
			>
				{sortCrit}
			</MenuItem>
		));
		const filterMenuItems = filters.map(filterCrit => (
			<MenuItem 
				key={filterCrit} 
				data-filter-type={filterCrit} 
				onClick={this.handleFilterItemSel}
			>
				{filterCrit}
			</MenuItem>
		));

		const taskItems = this.props.tasks
		.filter(task => this.filterTasks(task))
		.sort((task1, task2) => this.sortTasks(task1, task2))
		.map((task) => {
			return (
				<TaskItem 
					key={task.id}
					projList={projList} 
					task={task} 
					taskNo={c++} 
					edithandler={this.props.edithandler}
					checkhandler={this.props.checkhandler}
					delhandler={this.props.delhandler}
					edit={task.id === this.props.editedTask}
					projEditHandler={this.props.projEditHandler}
					cancelHandler={this.props.cancelHandler}
				/>
			);
		});

		return (
			<div>
				<ButtonGroup className="task-view-btns" variant="text">
					{sortAnchor}				
					<Menu 
						anchorEl={this.state.sortAnchor} 
						open={this.state.sortMenuOpen}	
						onClose={this.handleSortMenuClose}
					>					
						{sortMenuItems}
					</Menu>
					{filterAnchor}
					<Menu 
						anchorEl={this.state.filterAnchor} 
						open={this.state.filterMenuOpen}	
						onClose={this.handleFilterMenuClose}
					>					
						{filterMenuItems}
					</Menu>
				</ButtonGroup>
				<h1 id="n-task-display">{`Showing ${taskItems.length} of ${this.props.tasks.length} tasks`}</h1>
				<ul className="todo-list">
					{taskItems}
				</ul>
			</div>
		);
	}
}

export default Overview;