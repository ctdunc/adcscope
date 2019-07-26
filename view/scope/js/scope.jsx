import React, { Component } from "react";
import { ParentSize }from "@vx/responsive";
import Channels from "./channels";
import Octicon, { TriangleUp, TriangleDown} from "@primer/octicons-react";

//TODO:
//Take in channels as prop from contro
// const socket = io.connect("http://"+document.domain+":"+location.port);

//constant channels for testing. 
// Treat this as immutable (I initialize it explicitly in state for this purpose).
const channels = [ 
	{ vScale: 1, offset: 0, enabled: true, color:"#cc342b"},
	{ vScale: 1, offset: 0, enabled: true, color:"#198844"},
	{ vScale: 1, offset: 0, enabled: true, color:"#fba922"},
	{ vScale: 1, offset: 0, enabled: true, color:"#778899"},
	{ vScale: 1, offset: 0, enabled: true, color:"#3971ed"},
	{ vScale: 1, offset: 0, enabled: true, color:"#a36ac7"},
	{ vScale: 1, offset: 0, enabled: true, color:"#33ff00"},
	{ vScale: 1, offset: 0, enabled: true, color:"#ff0000"},
	{ vScale: 1, offset: 0, enabled: true, color:"#ff0099"},
	{ vScale: 1, offset: 0, enabled: true, color:"#0066ff"},
	{ vScale: 1, offset: 0, enabled: true, color:"#cc00ff"},
	{ vScale: 1, offset: 0, enabled: true, color:"#00ffff"},
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
		this.state = { 
			channels: 
			[
				{ vScale: 1, offset: 0, enabled: true, color:"#cc342b"},
				{ vScale: 1, offset: 0, enabled: true, color:"#198844"},
				{ vScale: 1, offset: 0, enabled: true, color:"#fba922"},
				{ vScale: 1, offset: 0, enabled: true, color:"#778899"},
				{ vScale: 1, offset: 0, enabled: true, color:"#3971ed"},
				{ vScale: 1, offset: 0, enabled: true, color:"#a36ac7"},
				{ vScale: 1, offset: 0, enabled: true, color:"#33ff00"},
				{ vScale: 1, offset: 0, enabled: true, color:"#ff0000"},
				{ vScale: 1, offset: 0, enabled: true, color:"#ff0099"},
				{ vScale: 1, offset: 0, enabled: true, color:"#0066ff"},
				{ vScale: 1, offset: 0, enabled: true, color:"#cc00ff"},
				{ vScale: 1, offset: 0, enabled: true, color:"#00ffff"},
			],
			squareDisplay: true,
			acquire: true
		};

		this.toggleChannel = this.toggleChannel.bind(this);
		this.toggleAcquire = this.toggleAcquire.bind(this);
		this.offset = this.offset.bind(this);
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

	toggleAcquire(){
		this.setState({acquire:!this.state.acquire});
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
	offset(e){
		let ch = this.state.channels;
		ch[e.target.name].offset=e.target.value;
		this.setState({channels:ch});
	}

	render(){
		const enabledChans = this.state.channels;
		return(
			<div className="grid-container">
				<div className="dashboard">
					<div className="layout-panel">
						<button onClick={this.toggleAcquire}>{this.state.acquire ? "Stop" : "Start"}</button>
					</div>
					<div className="channel-panel">
						{chan_keys.map((channel)=> {
							return(
								<div 
									className="channel-container" 
									key={channel} 
									style={{"backgroundColor": this.state.channels[channel].color}}
								>
									<div className="channel-name">
										<b>{channel}</b>
									</div>
									<table className="channel-state">
										<tbody>
											<tr>
												<th>scale:</th>
												<td>{this.state.channels[channel].vScale}V</td>
											</tr>
											<tr>
												<th>offset:</th>
												<td>{this.state.channels[channel].offset}V</td>
											</tr>
										</tbody>
									</table>
									<div className="channel-control">
										<button 
											className="channel-toggle"
											name={channel}
											onClick={this.toggleChannel} 
										>{this.state.channels[channel].enabled ? "Hide" : "Show"}
										</button>
										<div className="channel-scalar">
											<button className="scale-down" onClick={this.scaleDown.bind(this, channel)}>
												<Octicon verticalAlign="middle" icon={TriangleUp}/>
											</button>
											<button className="scale-up" onClick={this.scaleUp.bind(this, channel)}>
												<Octicon icon={TriangleDown} verticalAlign="middle"/>
											</button>
										</div>
										<div className="channel-offset">
											<input
												type="range"
												orient="vertical"
												name={channel}
												min={-5*this.state.channels[channel].vScale}
												max={5*this.state.channels[channel].vScale}
												onChange={this.offset}
												value={this.state.channels[channel].offset}
												step={this.state.channels[channel].vScale/10}
											/>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<ParentSize className="readout">
					{({width:w, height: h}) => {
						h = w < h ? w : h
						return(
							<Channels
								chans={enabledChans}
								width={w}
								height={h}
								acquire={this.state.acquire}
							/>
						)
					}}
				</ParentSize>
			</div>
		);
	}
}
