import React, { Component } from 'react';
import { Select, MenuItem } from "@material-ui/core";
import DeviceConfigDisplay from "./device-config-display";

export default class DeviceConfig extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {};

		this.makeConfigByChannelType = this.makeConfigByChannelType.bind(this);
		this.makeCentralConfigPane = this.makeCentralConfigPane.bind(this);
		this.makeAcquisitionConfigPanel = this.makeAcquisitionConfigPanel.bind(this);

		this.handleChannelModeChange = this.handleChannelModeChange.bind(this);
		this.handleTriggerModeChange = this.handleTriggerModeChange.bind(this);
		this.handleSampleRateChange = this.handleSampleRateChange.bind(this);
	}
	/****** Lifecycle Events ******/
	componentDidUpdate(prevProps){
		// updates channels from default value after parent GET request for info succeeds
		if(prevProps!==this.props){
			var channels = [];
			Object.entries(this.props.conf_vars).map((entry) => {
				channels.push(...entry[1].channels);
			})
			channels.map(c => {
				this.setState({[c]: "off"})
			})
		}
	}

	/****** Form Logic ******/
	handleTriggerModeChange(event){
		const channels = Object.keys(this.state);
		const index = channels.indexOf(event.target.value);
		console.log(event.target);
		if(index > -1){
			const c = channels[index]
			var cstate = this.state[c]
			cstate.mode = "read"
			this.setState({[c]: cstate, trig: event.target.value});
		}
		else{
			this.setState({trig: event.target.value});
		}
			
	}
	handleChannelModeChange(event){
		this.setState({[event.target.name]: event.target.value});
	}
	handleSampleRateChange(event){
		this.setState({[event.target.name]: event.target.value});
	}

	/****** Functional SubComponents ******/
	makeCentralConfigPane(){
		var conf_vars = this.props.conf_vars;
		if(conf_vars.is_currently_running){
			return(
				<div className={this.props.className}> Device is running! Please stop it before attempting to configure run settings </div>
			);
		}else{
			delete conf_vars.is_currently_running;
			return(
				<div className={this.props.className}>
				{Object.keys(conf_vars).map(k=>
					{return(this.makeConfigByChannelType(k, conf_vars[k]))}
				)}
				</div>
			);
		}
	}
	makeConfigByChannelType(type, options){
		return(
			<div key={type}>
				<div className="channel-config">
					<b> {type} </b>
					<div className="samplerate">
						<label htmlFor={type+".sample_rate"}> Sample Rate (S/s) </label>
						<input name={type+".sample_rate"} type="number" onChange={this.handleSampleRateChange}/>
					</div>
					<Select
					value="off"
					inputProps={{name:"trigger", id: type}}
					onChange={this.handleTriggerModeChange}
					>
					<MenuItem value="off"> None </MenuItem>
					{options.trigger_opts.map(opt =>{
						return(
							<MenuItem value={opt}> {opt} </MenuItem>
						)})}
					</Select>

				</div>
				{options.channels.map((c)=>{
					return(
						<div key={c} className="channel-config">
								<div className="title">
									<b> {c} </b>
								</div>
								<div className="mode">
									<Select
									value={this.state[c] ? this.state[c]: "off"}
									inputProps={{name:c, id: "channel"}}
									onChange={this.handleChannelModeChange}	
									>
										<MenuItem value="off">Off  </MenuItem>
										<MenuItem value="read">Read  </MenuItem>
										<MenuItem value="write">Write</MenuItem>
									</Select>
								</div>
								<div className="notes">	
									<label htmlFor="chan-notes">Notes</label>
									<input id="chan-notes"/>
								</div>
						</div>
					);
				})}
			</div>
		);
	}
	makeAcquisitionConfigPanel(){
		return(
			<div className="acquisitionconfig">
				<Select 
				value={this.state.acquisitionMode ? this.state.acquisitionMode : "continuous"}
				inputProps={{name: "acquisitionMode", id:"acqm"}}
				onChange={this.handleChannelModeChange}
				>
					<MenuItem value="continuous"> Continuous </MenuItem>
					<MenuItem value="triggered"> Triggered </MenuItem>
				</Select>
			</div>
		);
	}

	/****** Render Full Component ******/
	render(){
		return(
			<div className={this.props.className}> 
				<div className="channel-config-display">
					{this.makeAcquisitionConfigPanel()}
				</div>
				<div className="channel-config-container">
					{this.makeCentralConfigPane()}
				</div>
			</div>
		);
	}
}
