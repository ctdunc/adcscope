import React, { Component } from "react";
import io from "socket.io-client";
import { ParentSize }from "@vx/responsive";
import ChannelLine from "./channel-line";

//TODO:
//Take in channels as prop from contro

var socket = io.connect("http://"+document.domain+":"+location.port);

//constant channels for testing.
const channels = [
		{
		name:	"0",
		vScale: 1,
		enabled: true,
		},
		{
		name: "1",
		vScale: 1,
		enabled: true,
		},
		{
		name: "2",
		vScale: 1,
		enabled: true,
		},
		{
		name: "3",
		vScale: 1,
		enabled: true,
		},
		{
		name:	"4",
		vScale: 1,
		enabled: true,
		}
]

//series data for testing lines

export default class Scope extends Component {
	constructor(props, context){
		super(props,context);
		this.state = { channels };
		console.log(this.state);
	}

	render(){
		const { width, height } = this.props;
		return(
			<div className="grid-container">
				<div className="dashboard">
				{this.state.channels.map((channel)=> {return(
					<h1 key={channel.name}>
					{channel.name}
					</h1>
				);})}
				</div>
				<ParentSize className="readout">
				{({width: w, height:h}) => {
					return(
						<svg width={w} height={h}>
							<rect x={0} y={0} width={w} height={h} fill="#242424" rx={14}/>
							{this.state.channels.map((channel) =>{
									(channel.enabled === true) 
									? <ChannelLine w={w} h={h} socket={socket} vScale={1} key={channel.name} /> 
									: null
							})}
						</svg>
					);
					}
				}
				</ParentSize>
			</div>
		);
	}
}
