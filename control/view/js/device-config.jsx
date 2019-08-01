import React, { Component } from 'react';

export default class DeviceConfig extends Component{
	constructor(props,context){
		super(props,context);
		this.makeConfigByChannelType = this.makeConfigByChannelType.bind(this);
	}

	makeConfigByChannelType(type, options){
		return(
			<div className="channel-type-config" key={type}>
				<h3> {type} </h3>
				{options.channels.map((c)=>{
					return(
						<div key={c}>
						/* TODO each channel needs
						 *	- mode (read/write, if enabled)
						 *	- enabled (set read/write/none)
						 *	- trigger
						 *	- role (i.e. aux trigger orsomething, might b nice for metadata).
						 */	
						<b className="channel-label">{c}</b>
						<input type="checkbox" className="enable-channel"/>
						<input type="checkbox" className="is-trigger"/>
						</div>
					);
				})}
			</div>
		);
	}

	setChannelAsTrigger(event){
		// TODO: write
	}

	toggleChannel

	render(){
		var conf_opts = this.props.conf_vars;
		if(conf_opts.is_currently_running){
			return(<div> currently running</div>)
		}else{
			delete conf_opts.is_currently_running;
		return(
			<div className={this.props.className}> 
			apt
			{Object.keys(conf_opts).map(k => {return(this.makeConfigByChannelType(k, conf_opts[k]))})} 
			</div>
		);
		}
	}
}
