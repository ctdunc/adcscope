import React, { Component } from 'react';
import d3 from 'd3';
export default class Scope extends Component{
	constructor(props,context){
		super(props,context);

	}

	

	render() {
		return(
			<div>
			<canvas ref="canvas" width={100} height={100}/>
			</div>
		);
	}
}
