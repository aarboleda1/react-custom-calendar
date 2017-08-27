import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {uniqueID, months, eventTypes} from '../utils/utils';

export default class Popover extends Component {
	static PropTypes = {
		daysThisMonth: PropTypes.number,
		showModal: PropTypes.bool,
		closeModal: PropTypes.func,
		date: PropTypes.string,		
		onAddEvent: PropTypes.func.isRequired,
	};
	static defaultProps = {};
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			month: this.props.month, // default this to props
			date: this.props.date,
			type: 'Company Events',
			hour: 8,
			minute: '30',
			amPm: 'AM',
		}
	}
	
	handleChange = (event) => {
		let attribute = event.target.name;
		this.setState({
			[attribute]: event.target.value,
		})
		event.preventDefault();
	}
	handleSave = () => {
		this.props.onAddEvent(this.state);
	}
	renderMonths = () => {
		let monthCopy = months.slice();
		monthCopy.shift();
		return monthCopy.map((month) => {
			return <option key={month}>{month}</option>
		})
	}
	renderDates = () => {
		/*FILL THE NUM OF DATES WITH */
		let numDates = 30; // fill this with the number of dates from props
		let days = new Array(numDates).fill(null); // no calendar view yet
		return days.map((nullVal, index) => {
			return <option key={uniqueID()}>{index + 1}</option>
		})
	}
	renderHours = () => {
		let hours = new Array(12).fill(null);
		return hours.map((nullVal, index) => {
			return <option key={uniqueID()}>{index + 1}</option>
		})
	}
	renderMinutes = () => {
		let minutes = ['00', '10', '20', '30', '40', '50'];
		return minutes.map((minute) => {
			return <option key={uniqueID()}>{minute}</option>
		})
	}
	renderEventTypes = () => {
		return eventTypes.map((eventType) => {
			return <option key={uniqueID()}>{eventType}</option>
		})
	}
	closeModal = () => {
		this.props.closeModal();
	}
	componentWillReceiveProps = (nextProps) => {
		if (nextProps.month !== this.state.month) {
			this.setState({
				month: nextProps.month,
			})
		} else if (nextProps.dateClicked !== this.state.date) {
			this.setState({
				date: nextProps.dateClicked,
			})			
		}
	}
	
	render() {
		const {onAddEvent} = this.props;
		let modalClass = classNames({
			'rc-popup-background': true,
			'show': this.props.showModal,
		})
		return(
			<div 
				name="rc-popup-background show"
				className={modalClass}
				ref={(el) => {this.popOver = el}}
			>
				<div className="rc-popup">
					<div style={{float: 'right'}}>x</div>
					<div onClick={this.closeModal} className="rc-popup-title">
						<span>Event</span>
					</div>
					<span>
						Event your event information here
					</span>
					<div className="rc-popup-block">
						<span>Event type</span>
						<select value={this.state.type} name="type" onChange={this.handleChange}>
							{this.renderEventTypes()}
						</select>
					</div>
					<div className="rc-popup-block">
						<span>Name</span>
						<input type="text" value={this.state.name} name="name" onChange={this.handleChange} autoFocus/>
					</div>
					<div className="rc-popup-block-wrapper">
						<div className="rc-popup-block">
							<span>Month</span>
							<select value={this.state.month} name="month" onChange={this.handleChange}>
								{this.renderMonths()}
							</select>
						</div>
						<div className="rc-popup-block">
							<span>Date</span>
							<select value={this.state.date} name="date" onChange={this.handleChange}>
								{this.renderDates()}
							</select>
						</div>	
					</div>			
					<div className="rc-popup-block-wrapper">
						<div className="rc-popup-block">
							<span>Hour</span>
							<select value={this.state.hour} name="hour" onChange={this.handleChange}>
								{this.renderHours()}
							</select>
						</div>
						<div className="rc-popup-block">
							<span>Minute</span>
							<select 
								name="minute" 
								value={this.state.minute} 
								onChange={this.handleChange} 								
							>
								{this.renderMinutes()}
							</select>
						</div>
						<div className="rc-popup-block">										
							<select name="amPm" onChange={this.handleChange} value={this.state.amPm}>
								<option>{'AM'}</option>
								<option>{'PM'}</option>							
							</select>
						</div>											
					</div>
					<div className="rc-popup-footer">
						<button className="rc-button" onClick={this.closeModal}> X Cancel </button>
						<button className="rc-button" onClick={this.handleSave}>Save</button>
					</div>				
				</div>
			</div>
		)
	}
}