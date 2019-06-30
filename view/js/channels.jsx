import React, { Component } from 'react';
import { Group } from '@vx/group';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
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
			domain: [-50, 50] // set voltage range to be objectively +/- 50V, we will scale incoming data relative to this threshold and display that scale.
			});
		return(
			<svg width={this.props.width} height={this.props.height}>
				<rect height={this.props.height} width={this.props.width} fill="#242424"/>
				{Object.keys(this.props.chans).map(key => {
					if(this.props.chans[key].enabled==true){
						const scalar = this.props.chans[key].vScale;
						const toRender = data[key].map(el => {
							return({time: el.time, volt: el.volt*scalar})
						});
						return(
							<Group key={key}>
								<LinePath
									data={toRender}
									x={d => xScale(t(d))}
									y={d => yScale(v(d))}
									stroke="#FFFFFF"
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

