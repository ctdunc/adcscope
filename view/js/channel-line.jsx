import React, { Component } from "react";
import { Group } from "@vx/group";
import { LinePath } from "@vx/shape";
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max, min } from 'd3-array';


const t = d => d.time
const v = d => d.volt

export default class ChannelLine extends Component {
	constructor(props,context){
		super(props,context);
		this.state = {
			data: []
		}
		this.props.socket.on('trace', (data) => {this.handleUpdate(data);});
	}
	
	handleUpdate(data){
		this.setState({ 
				data: data
				}
		);
	}
	
	render(){
		const d = this.state.data
		const tScale  = scaleLinear({
			range:	[0, this.props.w],
			domain:	extent(d, t)
		});
		const vScale = scaleLinear({
			range: [0,this.props.h],
			domain: [min(d, v),max(d, v)]
		});
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
