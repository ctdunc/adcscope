import React, { Component } from "react";
import io from "socket.io-client";
import { ParentSize }from "@vx/responsive";
import Channels from "./channels";
import Octicon, { TriangleUp, TriangleDown} from "@primer/octicons-react";

//TODO:
//Take in channels as prop from contro
// const socket = io.connect("http://"+document.domain+":"+location.port);

//constant channels for testing. 
// Treat this as immutable (I initialize it explicitly in state for this purpose).
const channels = [ 
	{ vScale: 1, enabled: true, color:"#cc342b"},
	{ vScale: 1, enabled: true, color:"#198844"},
	{ vScale: 1, enabled: true, color:"#fba922"},
	{ vScale: 1, enabled: true, color:"#778899"},
	{ vScale: 1, enabled: true, color:"#3971ed"},
	{ vScale: 1, enabled: true, color:"#a36ac7"},
	{ vScale: 1, enabled: true, color:"#33ff00"},
	{ vScale: 1, enabled: true, color:"#ff0000"},
	{ vScale: 1, enabled: true, color:"#ff0099"},
	{ vScale: 1, enabled: true, color:"#0066ff"},
	{ vScale: 1, enabled: true, color:"#cc00ff"},
	{ vScale: 1, enabled: true, color:"#00ffff"},
	{ vScale: 1, enabled: true, color:"#808080"}
]

const scales = [
	0.00001,
	0.00002,
	0.00005,
	0.00010,
	0.00050,
	0.00100,
	0.00200,
	0.00500,
	0.01000,
	0.02000,
	0.05000,
	0.10000,
	0.20000,
	0.50000,
	1,
	2,
	5,
	10,
	20,
	50
]


const chan_keys = Object.keys(channels);

export default class Scope extends Component {
	constructor(props, context){
		super(props,context);
		this.state = { channels: 
			[
				{ vScale: 1, enabled: true, color:"#cc342b"},
				{ vScale: 1, enabled: true, color:"#198844"},
				{ vScale: 1, enabled: true, color:"#fba922"},
				{ vScale: 1, enabled: true, color:"#969896"},
				{ vScale: 1, enabled: true, color:"#3971ed"},
				{ vScale: 1, enabled: true, color:"#a36ac7"},
				{ vScale: 1, enabled: true, color:"#33ff00"},
				{ vScale: 1, enabled: true, color:"#ff0000"},
				{ vScale: 1, enabled: true, color:"#ff0099"},
				{ vScale: 1, enabled: true, color:"#0066ff"},
				{ vScale: 1, enabled: true, color:"#cc00ff"},
				{ vScale: 1, enabled: true, color:"#00ffff"},
				{ vScale: 1, enabled: true, color:"#808080"}
			]
		}

		this.toggleChannel = this.toggleChannel.bind(this);
	}
	
	toggleChannel(e){
		const channel = e.target.name;
		let ch = this.state.channels;

		if(ch[channel].enabled){
			ch[channel].enabled = false;
			ch[channel].color ="#d3d3d3"; // light gray for channel = disabled
		}else{
			ch[channel].enabled = true;
			ch[channel].color = channels[channel].color;
		}

		this.setState({
			channels:  ch
		});
	}

	scaleUp(channel){
		let ch = this.state.channels;
		let scaleIndex = scales.indexOf(ch[channel].vScale)+1;
		if(scaleIndex < scales.length){
			ch[channel].vScale = scales[scales.indexOf(ch[channel].vScale)+1];
		}
		this.setState({
			channels: ch
		});
	}

	scaleDown(channel){

		let ch = this.state.channels;
		let scaleIndex = scales.indexOf(ch[channel].vScale)+1;
		if(scaleIndex > -1){
			ch[channel].vScale = scales[scales.indexOf(ch[channel].vScale)-1];
		}
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
						return(
							<div className="channel-container" key={channel} style={{"backgroundColor": this.state.channels[channel].color}}>
								<div className="channel-name">
									<b>{channel}</b>
								</div>
								<div className="channel-control">
									<input 
										className="channel-toggle"
										type="checkbox" 
										name={channel}
										onChange={this.toggleChannel} 
										checked={this.state.channels[channel].enabled}
										
									/>
									Scale: {this.state.channels[channel].vScale}
									<div className="channel-scalar">
										<button className="scale-up" onClick={this.scaleUp.bind(this, channel)}>
											<Octicon verticalAlign="middle" icon={TriangleUp}/>
										</button>
										<button className="scale-down" onClick={this.scaleDown.bind(this, channel)}>
											<Octicon icon={TriangleDown} verticalAlign="middle"/>
										</button>
									</div>
								</div>
							</div>
						);
						<div className="dt-controller">
							
						</div>
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
