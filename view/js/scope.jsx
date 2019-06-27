import React, { Component } from "react";
import io from "socket.io-client";
import { ParentSize }from "@vx/responsive";
import Channels from "./channels";

//TODO:
//Take in channels as prop from contro
// const socket = io.connect("http://"+document.domain+":"+location.port);

//constant channels for testing.
const channels = { 
	0:	{ vScale: 1, enabled: true},
	1:	{ vScale: 1, enabled: true},
	2:	{ vScale: 1, enabled: true},
	3:	{ vScale: 1, enabled: true},
	4:	{ vScale: 1, enabled: true},
	5:	{ vScale: 1, enabled: true},
	6:	{ vScale: 1, enabled: true},
	7:	{ vScale: 1, enabled: true},
	8:	{ vScale: 1, enabled: true},
	9:	{ vScale: 1, enabled: true},
	10:	{ vScale: 1, enabled: true},
	11:	{ vScale: 1, enabled: true},
	12:	{ vScale: 1, enabled: true}
}

//series data for testing lines

export default class Scope extends Component {
	constructor(props, context){
		super(props,context);
		this.state = {channels, data:[]};

		this.toggleChannel = this.toggleChannel.bind(this);
		//socket.on("trace", (d)=>{this.handleUpdate(d)});
	}
	
	toggleChannel(e){
		let channel = e.target.name;
		let ch = this.state.channels;
		ch[channel].enabled = !ch[channel].enabled;
		this.setState({
			channels:  ch
		});
	}
	
	handleUpdate(d){
		this.setState({
			data: d
		});
	}

	render(){
		const { width, height } = this.props;

		return(
			<div className="grid-container">
				<div className="dashboard">
				{Object.keys(channels).map((channel)=> {return(
					<label className="channel-container" key={channel}>{channel}
						<input 
							type="checkbox" 
							name={channel}
							onChange={this.toggleChannel} 
							checked={this.state.channels[channel].enabled}
						/>
					</label>
				);})}
				</div>
				<div className="readout">
				<ParentSize className="graph-container">
					{({width:w, height: h}) => {
						return(
							<Channels
								chans={channels}
								width={w}
								height={h}
							/>
						)
					}}
				</ParentSize>
				</div>
			</div>
		);
	}
}

