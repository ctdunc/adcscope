import React, { Component } from 'react'; 
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { Grid } from '@vx/grid';
import { extent, max, min } from 'd3-array';
import io from "socket.io-client";
import { range } from "lodash";

const socket = io.connect("http://"+document.domain+":"+location.port);

// defines accessors for use by vx later.
const t = d => d.time
const v = d => d.volt

// fallback value for voltage
const fallback_voltage_data = [
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
	[0,0],
];

const fallback_time_data = [0,1]

export default class Channels extends Component {
	constructor(props, context){
		super(props, context);

		this.state = {
			data: fallback_voltage_data, 
			time: fallback_time_data,
			trlen: 2
		};

		this.handleVoltageUpdate = this.handleVoltageUpdate.bind(this);
		socket.on('newTrace', (d)=>{this.handleVoltageUpdate(d)});
	}

	handleVoltageUpdate(emitted){
		// check to make sure that our time, voltage arrays have the same length
		// NEVER EMIT DIFFERENT LENGTH VOLTAGE SERIES FROM THE SAME DEVICE. It will break the webpage.
		const l = emitted.l;
		var d = emitted.v.map((v)=>{return(Array.from(new Float32Array(v)))});
		if(this.state.trlen!==l){
			this.setState({time:range(l),trlen:l});	
		}
		this.setState({data:d});
	}
	
	render(){
		const data = this.state.data;
		const xScale = scaleLinear({
			range: [0, this.props.width],
			domain: [0,this.state.trlen]
		});
		const yScale = scaleLinear({
			range: [this.props.height, 0],
			domain: [-5, 5] // set voltage range to be +/- 5V. We scale voltage by this when it comes in (vScale = V/div).
		});
		return(
			<svg width={this.props.width} height={this.props.height}>
				<rect height={this.props.height} width={this.props.width} className="graph-rect"/>
				<Grid 
					xScale={xScale} 
					yScale={yScale} 
					width={this.props.width} 
					height={this.props.height}
					strokeDasharray="1,5" // makes the lines dashed
					stroke="#FF0"
				/>
				{Object.keys(this.props.chans).map(key => {
					if(this.props.chans[key].enabled==true){
						const scalar = 1/this.props.chans[key].vScale;
						const toRender = data[key].map((elt, ind) => {
								return({time: this.state.time[ind], volt: elt*scalar})
						})
						return(
							<Group key={key}>
								<LinePath
									data={toRender}
									x={d => xScale(t(d))}
									y={d => yScale(v(d))}
									stroke={this.props.chans[key].color}
									strokeWidth={2}
								/>
							</Group>
						);
					}
					else{
						return;
					}
				})}
			</svg>
		);
	}
}

