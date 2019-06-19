import React, { Component } from "react";
import control from "./ctl/control";
import ScopeView from "./scopeview";
import "../css/main.css";

export default class ADCScope extends Component {
	constructor(props, context){
		super(props,context);
	}

	render(){
		return(
			<div className="container">
				<div className="left-80">
					<ScopeView/>
				</div>
				<div className="right-20">
					<control />
				</div>
			</div>
		);
	}
}
