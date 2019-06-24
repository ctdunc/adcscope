import React, { Component } from "react";
import Scope from "./scope";

import "../css/main.css";

export default class ADCScope extends Component {
	constructor(props, context){
		super(props,context);
	}

	render(){
		return(
			<div className="container">
				<div className="left-80">
					<ScopeView w={100} h={100}/>
				</div>
				<div className="right-20">
				</div>
			</div>
		);
	}
}
