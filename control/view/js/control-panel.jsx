import React, { Component } from "react";
import { Select, MenuItem } from "@material-ui/core";
import DeviceConfig from "./device-config/device-config";

var $ = require('jquery');
export default class ControlPanel extends Component {
	constructor(props, context){
		super(props, context);
		this.state = {
			devices: ["no devices found"],
			current_device: "no devices found",
			activeDeviceOpts: {},
		}
		this.submit = this.submit.bind(this);
		this.handleDeviceChange = this.handleDeviceChange.bind(this);
		this.updateActiveDeviceOpts= this.updateActiveDeviceOpts.bind(this);
	}
	/****** Lifecycle Events ******/
	componentDidMount(){
		$.get(window.location.href+'active-devices', (d) => {
				this.setState({devices:d});
				let e = {target: {name: d[0]}}; //basically a hack to get handleDeviceChange to think the user selected the 0th device
				this.handleDeviceChange(e);
		});	
	}
	
	/****** Device State Functions ******/
	handleDeviceChange(event){
		$.get(window.location.href+'device/'+event.target.name, (d) =>
			{
				if(d.is_currently_running){
					d = null;
				}else{
					delete d.is_currently_running;
					// sets default trigger mode
					Object.keys(d).map(key =>{
						d[key].trigger_opts = d[key].trigger_opts[0] ? d[key].trigger_opts : ["continuous"];
						d[key].sample_mode = d[key].trigger_opts[0];
					})
				}
				this.setState({current_device: event.target.name, activeDeviceOpts: d})
			});
	}
	
	updateActiveDeviceOpts(typeKey, newValue){
		let currentState = this.state.activeDeviceOpts; 
		currentState[typeKey] = newValue;
		this.setState({"activeDeviceOpts": currentState});
	}

	/****** Submit Form Function ******/
	submit(event){
		const c_dev = this.state.current_device;
		const activeOpts = this.state.activeDeviceOpts;
		let submitOpts = {};
		// reformat activeOpts so that we only send channels we want to activate, and make sure sample rates are defined.
		let should_submit = Object.keys(activeOpts).map(key => {
			const option_by_type = activeOpts[key]
			let activeChannels = {};
			Object.keys(option_by_type.channels).map(chan =>{
				if(option_by_type.channels[chan]!=="off"){
					activeChannels[chan] = option_by_type.channels[chan];
				}
			});
			if(Object.keys(activeChannels).length !== 0){
				// now, check sample rate is defined for any active channels.
				if(option_by_type.sample_rate && option_by_type.sample_mode){
					const sr = option_by_type.sample_rate;
					const sm = option_by_type.sample_mode;
					submitOpts[key] = {channels: activeChannels, sample_rate: sr, sample_mode: sm}
				}else{
					return(Object.keys(activeChannels));
				}
			}
		});

		// if any validation fails while mapping activeOpts, return error and exit.
		if(should_submit.some(sub => typeof(sub)!=="undefined")){
			let error_message = "Unable to find valid sample rate or mode for the following active channels: "
			should_submit.map(msg => {
				msg = msg ? msg : "";
				error_message = error_message + " " + msg +"\n";
			})
				alert(error_message);
			return;
		}

		//otherwise, submit data
		const data = JSON.stringify({current_device: c_dev, config_options: submitOpts});
		$.ajax(window.location.href+'start-run/', {
			type: "POST",
			data: data, 
			contentType: "application/json",
			dataType: "json"
		}
		);
	}

	render(){
		return(
		<div className="config-container">
			<div className="titlebar">
				<h1 className="title"> DAQ Configuration </h1>
				<Select 
				value={this.state.current_device}
				onChange={this.handleChange}
				inputProps={{name:"current_device", id:"device"}}
				className="dev-select"
				>	
				{this.state.devices.map((device)=>{
					return(
						<MenuItem value={device} key={device}> {device} </MenuItem>
					)
				})
				}
				</Select>
			</div>
			<DeviceConfig 
			value={this.state.activeDeviceOpts}
			onChange={this.updateActiveDeviceOpts}
			className="submenu"/>
			<div className="submenu">
			an
			</div>
			<div className="submenu">
			sv
			</div>
			<div className="action-bar">
				<button name="start" onClick={this.submit}> Start Run </button>
			</div>
		</div>
		);
	}
}
