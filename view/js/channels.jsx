import React, { Component } from 'react';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { Grid } from '@vx/grid';
import { extent, max, min } from 'd3-array';
import io from "socket.io-client";

const socket = io.connect("http://"+document.domain+":"+location.port);

var dt = [
[{volt:0,time:0},{volt:1,time:1}],
[{volt:0,time:0},{volt:1,time:1}],
[{volt:0,time:0},{volt:1,time:1}],
[{volt:0,time:0},{volt:1,time:1}],
[{volt:0,time:0},{volt:1,time:1}],
[{volt:0,time:0},{volt:1,time:1}],
[{volt:0,time:0},{volt:1,time:1}],
[{volt:0,time:0},{volt:1,time:1}],
[{volt:0,time:0},{volt:1,time:1}],
[{volt:0,time:0},{volt:1,time:1}],
[{volt:0,time:0},{volt:1,time:1}],
[{volt:0,time:0},{volt:1,time:1}],
[{volt:0,time:0},{volt:1,time:1}]
];

function handleUpdate(data){
	dt= data;
	console.log(dt)
	return;
}


const v = d => d.volt
const t = d => d.time

export default class Channels extends Component {
	constructor(props, context){
		super(props, context);

		this.state = {data: dt};

		socket.on('trace', (d)=>{this.handleUpdate(d)});
	}
	
	handleUpdate(dt){
		this.setState({data:dt})
	}

	render(){
		const data = this.state.data;
		const dat = data[0];
		const xScale = scaleLinear({
			range: [0, this.props.width],
			domain: [min(dat,t),max(dat,t)]
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
					stroke={"#FFFF00"}
				/>
				{Object.keys(this.props.chans).map(key => {
					if(this.props.chans[key].enabled==true){
						const scalar = 1/this.props.chans[key].vScale;
						const toRender = data[key].map(el => {
							return({time: el.time, volt: el.volt*scalar})
						});
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

