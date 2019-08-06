import React, { Component } from 'react';
import { Select, MenuItem } from "@material-ui/core";
import ChannelConfig from "./channel-config";

export default class ConfigByType extends Component {
	constructor(props,context){
		super(props,context);
		this.onChannelChange = this.onChannelChange.bind(this);
		this.onChange = this.onChange.bind(this);

	}
	
	onChange(event){
		let currentState = this.props.value;
		currentState[event.target.name]= event.target.value;
		this.props.onChange(this.props.name, currentState);
	}

	onChannelChange(event){
		let currentState = this.props.value;
		currentState.channels[event.target.name]=event.target.value;
		this.props.onChange(this.props.name, currentState);
	}

	render(){
		var channels = this.props.value.channels ? this.props.value.channels : [];
		return(
			<div className="type-config">
			<b> {this.props.name} </b>
			<input onChange={this.onChange} name="sample_rate" type="number"/>
			{Object.keys(channels).map(key=>{
				return(
					<ChannelConfig 
					name={key} 
					value={channels[key]} 
					key={key}
					onChange={this.onChannelChange}/>
				)})}
			</div>
		);
	}
}
