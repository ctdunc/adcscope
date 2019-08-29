import React, { Component } from 'react';
import Select from 'react-select';
import { AccordionItem } from 'react-light-accordion';
var $ = require('jquery');

function convertArrayToDicts(arr){
	const arrDict = [];
	for(const key in arr){
		let dictEntry = {value: key, label: arr[key]};
		arrDict.push(dictEntry);
	}
	return(arrDict);
}
export default class TaskConfigForm extends Component {
	constructor(props, context){
		super(props,context);
		this.state = {sample_rate: 0};
		this.getTaskFromRDB = this.getTaskFromRDB.bind(this);
		this.setStateInRDB = this.setStateInRDB.bind(this);
		this.updateChans = this.updateChans.bind(this);
		this.updateTiming = this.updateTiming.bind(this);
		this.updateSampleRate = this.updateSampleRate.bind(this);
		this.getTaskFromRDB();
	}
	getTaskFromRDB(){
		$.get(
			window.location.href+"devices/"+this.props.deviceName+"/"+this.props.taskName, 
			task => {this.setState(task.state)}
		);
	}
	setStateInRDB(e){
		const is_start = e.target.isstart;
		let post_data = {
			device: this.props.deviceName,
			task: this.props.taskName,
			options:{
			channels: this.state.channels,
			timing_mode: this.state.timing_mode,
			sample_rate: this.state.sample_rate,
			is_start: is_start
			}
		}
		$.ajax(window.location.href+"configure",
			{
				type: "POST",
				data: JSON.stringify(post_data),
				contentType: "application/json",
				dataType: "json"
		}
		);
	}
	updateTiming(timing){
		this.setState({timing_mode: timing.label});
	}
	updateChans(channels){
		this.setState({channels: Array.from(channels, c => c.label)});
	}
	updateSampleRate(e){
		const sr = e.target.value;
		if(this.props.taskRestriction.min_sample_rate <= sr && sr <= this.props.taskRestriction.max_sample_rate){
			this.setState({sample_rate: sr});
		}
	}
	
	render(){
		const channels = convertArrayToDicts(this.props.taskRestriction.valid_channels);
		const timings = convertArrayToDicts(this.props.taskRestriction.valid_timing);
		return(
			<div className="task">
			<div className="task-config">
				<label className='channels'>
					Channels
				<Select 
					value={convertArrayToDicts(this.state.channels)}
					isMulti
					name="channel-select"
					options={channels}
					onChange={this.updateChans}
					className="basic-multi-select"
					classNamePrefix="select"
				/>
				</label>
				<div className='opt'>
				<label>
					Timing
				<Select 
					value={this.state.timing}
					name="timing-select"
					options={timings}
					onChange={this.updateTiming}
					className="basic-multi-select"
					classNamePrefix="select"
				/>
				</label>
				<label htmlFor="sample_rate">
					Sample Rate
				</label>
				<input
					type="number"
					id="sample_rate"
					value={this.state.sample_rate}
					onChange={this.updateSampleRate}
				/>
				</div>
			</div>
			<div className="task-submit">
			<button onClick={this.setStateInRDB} isstart="true">
				Start
			</button>
			<button onClick={this.setStateInRDB} isstart="false">
				Update RDB
			</button>
			</div>
			</div>
		)
	}
}
