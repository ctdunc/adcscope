import React, { Component } from "react";
import { Select, MenuItem, IconButton} from "@material-ui/core";
import { AddBox } from "@material-ui/icons";

export default class ControlPanel extends Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			device: "otherdevice"
		}

		this.handleChange = this.handleChange.bind(this);
		this.addDevice = this.addDevice.bind(this);
	}
	
	handleChange(event){
		this.setState({[event.target.name]: event.target.value});	
	}
	addDevice(event){
		/* TODO: Write device adder */
		console.log("device to be added!")
	}
	render(){
		return(
		<div className="config-container">
			<div className="titlebar">
				<h1 className="title"> DAQ Configuration </h1>
				<Select 
				value={this.state.device}
				onChange={this.handleChange}
				autoWidth={true}
				inputProps={{name:"device", id:"device"}}
				className="dev-select"
				>	
					/* TODO: get existing devices from DB */
					<MenuItem value={"otherdevice"}> Other Device </MenuItem>
					<MenuItem value={"otd1"}> Alpha </MenuItem>
					<MenuItem value={"otd2"}> OODO</MenuItem>
				</Select>
				<IconButton 
				variant="outlined" 
				onClick={this.addDevice}
				>
					<AddBox/>
				</IconButton>
			</div>
			<div className="submenu">
			ac
			</div>
			<div className="submenu">
			an
			</div>
			<div className="submenu">
			sv
			</div>
		</div>
		);
	}
}
