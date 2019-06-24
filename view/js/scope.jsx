import React, { Component } from "react";
import io from "socket.io-client";
import { Group } from "@vx/group";
import Channel from "./channel";

//TODO:
//Take in channels as prop from contro

export default class ScopeView extends Component {
	constructor(props, context){
		super(props,context);
		this.state = {
			data : [],
		}

		socket.on("trace", (data) => {this.handleUpdate(data)});
	}
	
	handleUpdate(data){
		console.log(data);
		this.setState({ 
				data: data
				}
		);
	}
	

	render(){

		const tScale  = scaleLinear({
			range:	[0, this.props.w],
			domain:	extent(this.state.data, t)
		});
		const vScale = scaleLinear({
			range: [0,this.props.h],
			domain: [0,max(this.state.data, v)]
		});
			
		const d = this.state.data;
		return(
			<svg width={this.props.w} height={this.props.h}>
				<Group>
					<LinePath
						data={d}
						x={d => tScale(t(d))}
						y={d => vScale(v(d))}
						stroke="#000000"
						strokeWidth={1}
					/>
				</Group>
			</svg>
		);
	}
}
