import React, { Component } from "react";
import io from "socket.io-client";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";

var socket = io.connect("http://" + document.domain + ":" + location.port);

export default class ScopeView extends Component {
	constructor(props, context){
		super(props,context);
		this.state = {
			data : [],
		}
		socket.on("trace", (data) => {this.handleUpdate(data)});
	}
	
	handleUpdate(data){
		console.log('recvd');
		this.setState(
			{ data: data }
		);
	}

	render(){
		return(
			<div className='ScopeView'>
				<VictoryChart
					theme = {VictoryTheme.material}
				>
					<VictoryLine
						data={this.state.data}
						style={{data:{strokeWidth:1}}}
						x={0}
						y={1}
					/>
				</VictoryChart>
			</div>
		);
	}
}
