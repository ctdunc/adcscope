import React, { Component } from "react";
import io from "socket.io-client";
import { ParentSize }from "@vx/responsive";
import ChannelLine from "./channel-line";

//TODO:
//Take in channels as prop from contro

var socket = io.connect("http://"+document.domain+":"+location.port);

export default class Scope extends Component {
	constructor(props, context){
		super(props,context);
	}

	render(){
		const { width, height } = this.props;
		return(
				<ParentSize className="left-80">
				{({width: w, height:h}) => {
					return(
						<ChannelLine w={w} h={h} socket={socket} vScale={1}/>
					);
							   }
				}
				</ParentSize>
		);
	}
}
