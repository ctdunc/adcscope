import React, { Component } from 'react';
import io from "socket.io-client"
import LinePath from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';

/* 
 * Channel class to handle rendering individual signals from NI device.
 *Props:
 *	- socket: socketio instance which should handle data aqcuisition
 *	- ns: namespace, tells which socket to listen on.
 *	- tScale: time scale with which to render wave.
 *	- vScale: voltage scale with which to render wave.
 */ 

//define accessors for vx component
const t = d => d.time
const v = d => d.volt

export class Channel extends LinePath{
	constructor(props,context){
		super(props,context);
		this.state = {
			data: [],
		}

		this.props.socket.on(this.props.ns, (data) => {this.handleUpdate(data)});
		this.tScale = this.props.tScale
		this.vScale = this.props.vScale
	}

	componentDidUpdate(prevProps){
		if(this.props.tScale !== prevProps.tScale){
			this.tScale = this.props.tScale;
		}
		if(this.props.vScale !== prevProps.vScale) {
			this.vScale = this.props.vScale
		}
	}

	handleUpdate(data){
		this.setState({
			data:	data
		});
	}
			

	render(){
		const d = this.state.data;
		return(
			<LinePath data={d}
				x={d => this.tScale(t(d))}
				y={d => this.vScale(v(d))}
				stroke="#000000"
				strokeWidth={1}
			/>
		);
	}
}
