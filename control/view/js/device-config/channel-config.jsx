import React, { Component } from 'react';
import { Select, MenuItem } from "@material-ui/core";

export default class ChannelConfig extends Component {
	constructor(props,context){
		super(props,context);
	}
	render(){
		return(
			<div className="channel-config">
			<b> {this.props.name} </b>
			<Select
			value={this.props.value}
			inputProps={{name: this.props.name}}
			onChange={this.props.onChange}>
				<MenuItem value="off">Off</MenuItem>
				<MenuItem value="read">Read</MenuItem>
				<MenuItem value="write">Write</MenuItem>
			</Select>
			</div>
		);
	}
}
