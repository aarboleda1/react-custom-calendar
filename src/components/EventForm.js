import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {uniqueID, months, eventTypes} from '../utils/utils';
import Modal from './Modal';
export default class EventForm extends Component {
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
			name: this.props.name,
			month: this.props.month, // default this to props
			date: this.props.date,
			type: 'Company Events',
			start_hour: 8,
			start_minute: '30',
			start_amPm: 'AM',
			end_hour: '9',
			end_minute: '30',
			end_amPm: 'AM'
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
		this.setState({
			name: ''
		}) 
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
		let days = new Array(numDates).fill(1); // no calendar view yet
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
	componentWillReceiveProps = (nextProps) => {
		
		if (nextProps.month !== this.state.month) {
			this.setState({
				month: nextProps.month,
			})
		} else if (nextProps.dateClicked !== this.state.date && nextProps.name === '') {
				this.setState({
					date: nextProps.dateClicked,
					name: '',
				})	
		} else if (nextProps.dateClicked !== this.state.date || nextProps.name !== this.state.name) {
			this.setState({
				date: nextProps.dateClicked,
				name: nextProps.name,
			})			
		} 
	}
	
	render() {
		const {onAddEvent, closeModal} = this.props;
		let modalClass = classNames({
			'rc-popup-background': true,
			'show': this.props.showModal,
		})
		return(
			<Modal showModal={this.props.showModal}>
				<div className="rc-popup">
					<i onClick={closeModal} style={{right: '0', position: 'absolute'}} className="material-icons clear">clear</i>
					<div className="rc-popup-title">
						<span>Event</span>
					</div>
					<span>
						Event your event information here
					</span>
					
					{/*Body*/}
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
							<select value={this.state.date === null ? '' : this.state.date} name="date" onChange={this.handleChange}>
								{this.renderDates()}
							</select>
						</div>	
					</div>	
					
					<div className="rc-popup-block-wrapper">
						<div className="rc-popup-block">
							<span>Hour</span>
							<select value={this.state.start_hour} name="start_hour" onChange={this.handleChange}>
								{this.renderHours()}
							</select>
						</div>
						<div className="rc-popup-block">
							<span>Minute</span>
							<select 
								name="start_minute" 
								value={this.state.start_minute} 
								onChange={this.handleChange} 								
							>
								{this.renderMinutes()}
							</select>
						</div>
						<div className="rc-popup-block">										
							<select name="start_amPm" onChange={this.handleChange} value={this.state.start_amPm}>
								<option>{'AM'}</option>
								<option>{'PM'}</option>							
							</select>
						</div>	
						<span style={{width: '10px', textAlign: 'center'}}> to </span>
						<div className="rc-popup-block">
							<span>Hour</span>
							<select value={this.state.end_hour} name="end_hour" onChange={this.handleChange}>
								{this.renderHours()}
							</select>
						</div>
					<div className="rc-popup-block">
						<span>Minute</span>
						<select 
							name="end_minute" 
							value={this.state.end_minute} 
							onChange={this.handleChange} 								
						>
							{this.renderMinutes()}
						</select>
					</div>
					<div className="rc-popup-block">										
						<select name="end_amPm" onChange={this.handleChange} value={this.state.end_amPm}>
							<option>{'AM'}</option>
							<option>{'PM'}</option>							
						</select>
					</div>																
					</div>
					{/*Footer*/}					
					<div className="rc-popup-footer">
						<button className="rc-button" onClick={closeModal}> x Cancel </button>
						<button className="rc-button-primary" onClick={this.handleSave}>Save</button>
					</div>
				</div>
			</Modal>
		)
	}
}