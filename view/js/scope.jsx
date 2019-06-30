import React, { Component } from "react";
import io from "socket.io-client";
import { ParentSize }from "@vx/responsive";
import Channels from "./channels";
import Slider from "@material-ui/lab/Slider";
//TODO:
//Take in channels as prop from contro
// const socket = io.connect("http://"+document.domain+":"+location.port);

//constant channels for testing.
const channels = [ 
		{ vScale: 1.2, enabled: true},
		{ vScale: 1, enabled: true},
		{ vScale: 1, enabled: true},
		{ vScale: 1, enabled: true},
		{ vScale: 1, enabled: true},
		{ vScale: 1, enabled: true},
		{ vScale: 1, enabled: true},
		{ vScale: 1, enabled: true},
		{ vScale: 1, enabled: true},
		{ vScale: 1, enabled: true},
		{ vScale: 1, enabled: true},
		{ vScale: 1, enabled: true},
		{ vScale: 1, enabled: true}
]

const scales = [
	{value: 0.00001},
	{value: 0.00002},
	{value: 0.00005},
	{value: 0.00010},
	{value: 0.00050},
	{value: 0.00100},
	{value: 0.00200},
	{value: 0.00500},
	{value: 0.01000},
	{value: 0.02000},
	{value: 0.05000},
	{value: 0.10000},
	{value: 0.20000},
	{value: 0.50000},
	{value: 1},
	{value: 2},
	{value: 5},
	{value: 10},
	{value: 20},
	{value: 50}
]


const chan_keys = Object.keys(channels);
//series data for testing lines

export default class Scope extends Component {
	constructor(props, context){
		super(props,context);
		this.state = {channels};

		this.toggleChannel = this.toggleChannel.bind(this);
	}
	
	toggleChannel(e){
		let channel = e.target.name;
		let ch = this.state.channels;
		ch[channel].enabled = !ch[channel].enabled;
		this.setState({
			channels:  ch
		});
	}

	scaleChannel(channel, e, newValue){
		let ch = this.state.channels;
		ch[channel].vScale = newValue;
		this.setState({
			channels: ch
		});
	}
	
	render(){
		const enabledChans = this.state.channels;
		
		return(
			<div className="grid-container">
				<div className="dashboard">
					{chan_keys.map((channel)=> {
						let vs = this.state.channels[channel].vScale;
						return(
							<div className="channel-container" key={channel}>
								{channel}
								<Slider 
									value={vs}
									valueLabelDisplay="auto"
									onChange={this.scaleChannel.bind(this,channel)}
									min={0}
									max={50}
									marks={scales}
									step={null}
								/>
								<input 
									type="checkbox" 
									name={channel}
									onChange={this.toggleChannel} 
									checked={this.state.channels[channel].enabled}
								/>
							</div>
						);
					})}
				</div>
				<div className="readout">
					<ParentSize className="graph-container">
						{({width:w, height: h}) => {
							return(
								<Channels
									chans={enabledChans}
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
