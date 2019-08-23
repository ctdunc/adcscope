import React, { Component } from 'react';
import { Select, MenuItem } from "@material-ui/core";
import ConfigByType from "./type-config";
export default class DeviceConfig extends Component{
	constructor(props,context){
		super(props,context);
	}
	
	/****** Render Full Component ******/
	render(){
		return(
			<div className={this.props.className}> 
			{Object.keys(this.props.value).map(key =>
				{return(
					<ConfigByType 
					key={key}
					name={key}
					onChange={this.props.onChange}
					value={this.props.value[key].restriction}/>
				)})}
			</div>
		);
	}
}
