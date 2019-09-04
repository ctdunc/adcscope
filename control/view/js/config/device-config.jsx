import React, { Component } from 'react';
import TaskConfigForm from './task-config';
import { Accordion, AccordionItem } from 'react-light-accordion';
import 'react-light-accordion/demo/css/index.css';
var $ = require('jquery');

export default class DeviceConfigContainer extends Component {
	constructor(props, context){
		super(props,context);
		this.state = { };
		this.getTasksFromRDB = this.getTasksFromRDB.bind(this);
	}

	componentDidMount(){
		this.getTasksFromRDB();
	}

	getTasksFromRDB(){
		$.get(window.location.href+"devices/"+this.props.deviceName, 
			(taskRestrictions) => {
				this.setState(taskRestrictions)});
	}
	
	render(){
		return(
			<Accordion>
			{Object.keys(this.state).map(key => {
				console.log(key);
				return(
					<AccordionItem key={key} title={key}>
					<TaskConfigForm 
						taskName={key} 
						deviceName={this.props.deviceName} 
						taskRestriction={this.state[key]} 
					/>
					</AccordionItem>
				)
			})}
			</Accordion>
		);
	}
}
