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
			_events: this.props.events,
			_eventNames:{},
			_actionType: '',
		}		
	}

	componentDidMount = () => {
		let filtered = this.props.events.filter((event) => {
			return (event.date === this.state.date && event.month == this.state.month && this.props.filters[event.type]);
		})
		this.setState({
			_events: filtered,
			_actionType: this.props.actionType,
		})		
	}

	handleClick = (event) => {
		this.props.openModal(this.props.date)
		event.preventDefault();		
	}
	handleEditClick = (event) => {
		this.props.openModal(this.props.date, event.name, event.key, 'edit')
	}
	renderEvents = () => {
		if (this.state._events && this.state._events.length > 0) {
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
	}
  render() {
		const {date, month} = this.props;
		const {events} = this.state;
    return (
			<div 
				key={uniqueID()} 
				className="rc-date-cell"
			>
				<span className="rc-date-cell-header" style={{marginLeft: '3px'}}>
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