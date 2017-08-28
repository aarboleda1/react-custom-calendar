import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {uniqueID, colorMap} from '../utils/utils';
import EventForm from './EventForm';
import  _ from 'lodash';


export default class DateCell extends Component {
	static PropTypes = {
		openModal: PropTypes.func,
		month: PropTypes.string,
		events: PropTypes.arrayOf(PropTypes.object),
	};
	static defaultProps = {};
	constructor(props) {
		super(props);
		this.state = {
			month: this.props.month,
			date: this.props.date,
			test: false,
			_events: [],
			_eventNames:{}
		}		
	}

	componentWillMount = () => {
		let events = this.props.events;
		let newEvent = this.props.events[this.props.events.length - 1];
		const {_eventNames} = this.state;
		let _events = [];
		for (let i = 0; i < events.length; i++) {
			let event = events[i];
			if (event.date === this.state.date && event.month === this.state.month && !_eventNames[event.name]) {
				let filters = this.props.filters;
				for (let filterType in filters) {
					if (filters[filterType] && event.type === filterType) {
						_events.push(event);
					}
				}
				_eventNames[event.name] = true;
			}
		}
		if (_events.length) {
			this.setState({
				_events: [...this.state._events, ..._events]
			})
		}
	}
	componentDidMount = () => {
		let event = this.props.newEvent;
		let {date, month} = event;
		if (date == this.state.date && this.state.month === month) {
			this.setState({
				events: [...this.state._events, event],
			})
		}
	}

	handleClick = (event) => {
		this.props.openModal(this.props.date)
		event.preventDefault();		
	}
	handleEditClick = (event) => {
		this.props.openModal(this.props.date, event.name, event.key)
	}
	renderEvents = () => {
		return this.state._events.map((event) => {
			return (
				<div onClick={() => this.handleEditClick(event)} style={{display: 'flex'}}className="rc-date-cell-event" key={uniqueID()}>	
					<div style={{height: '32px', width: '4px', backgroundColor: colorMap[event.type], 'marginRight': '4px'}}></div>
					<div className="rc-date-cell-event-info">
						<span>{event.name === '' ? '(No title)' : event.name}</span> <br/>
						<span>{event.start_hour}</span>:
						<span>{event.start_minute}</span>
						<span>{event.start_amPm.toLowerCase()}</span>
						<span>{' ' + 'to' + ' '}</span>
						<span>{event.end_hour}</span>:
						<span>{event.end_minute}</span>
						<span>{event.end_amPm.toLowerCase()}</span>							
					</div>				
				</div>
			);
		})
	}
  render() {
		const {date, month} = this.props;
		const {events} = this.state;
    return (
			<div 
				key={uniqueID()} 
				className="rc-date-cell"
			>
				<span className="rc-date-cell-header">
					{date}
				</span>
				<div className="rc-date-cell-events-wrapper">
					{this.renderEvents()}
				</div>
				<div 
					className="rc-date-add-event"
					onClick={this.handleClick}
				>
					<span className="rc-span-add">
					+
					</span>
				</div>
								 			
			</div>
    )
  }
}