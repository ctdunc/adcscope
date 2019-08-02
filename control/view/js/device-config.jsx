import React, { Component } from 'react';
import { Select, MenuItem } from "@material-ui/core";

export default class DeviceConfig extends Component{
	constructor(props,context){
		super(props,context);
		this.state = {};
		this.makeConfigByChannelType = this.makeConfigByChannelType.bind(this);
		this.makeCentralConfigPane = this.makeCentralConfigPane.bind(this);
		this.handleChannelModeChange = this.handleChannelModeChange.bind(this);
		this.handleTriggerModeChange = this.handleTriggerModeChange.bind(this);
	}

	componentDidUpdate(prevProps){
		// updates channels from default value after parent GET request for info succeeds
		if(prevProps!==this.props){
			var channels = [];
			Object.entries(this.props.conf_vars).map((entry) => {
				channels.push(...entry[1].channels);
			})
			channels.map(c => {
				this.setState({[c]: {mode: "off", trigger: false}})
			})
		}
	}
	makeConfigByChannelType(type, options){
		return(
			<div key={type}>
				<h3> {type} </h3>
				<div className="channel-config">
					<b className="title"> General Options </b>
				</div>
				{options.channels.map((c)=>{
					return(
						<div key={c} className="channel-config">
								<div className="title">
									<b> {c} </b>
								</div>
								<div className="mode">
									<Select
									value={this.state[c] ? this.state[c].mode: "off"}
									autoWidth={true}
									inputProps={{name:c, id: "channel"}}
									onChange={this.handleChannelModeChange}	
									>
										<MenuItem value="off">Off  </MenuItem>
										<MenuItem value="read">Read  </MenuItem>
										<MenuItem value="write">Write</MenuItem>
									</Select>
								</div>
								<div className="trigger">	
									<label htmlFor="trigger">Is Trigger</label>
									<input 
									type="radio" 
									name="trigger" 
									value={c} 
									onChange={this.handleTriggerModeChange}/>
								</div>
								<div>	
									<label htmlFor="chan-notes">Notes</label>
									<input id="chan-notes"/>
								</div>
						</div>
					);
				})}
			</div>
		);
	}

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
	handleTriggerModeChange(event){
		const channels = Object.keys(this.state);
		const index = channels.indexOf(event.target.value);
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
		var toUpdate = this.state[event.target.name];
		toUpdate.mode = event.target.value;
		this.setState({[event.target.name]: toUpdate});
	}


	render(){
		var conf_opts = this.props.conf_vars;
		if(conf_opts.is_currently_running){
			return(<div> currently running</div>)
		}else{
			delete conf_opts.is_currently_running;
		return(
			<div className={this.props.className}> 
				<div className="channel-config-container">
					{this.makeCentralConfigPane()}
				</div>
			</div>
		);
		}
	}
}
