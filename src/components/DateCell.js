import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {uniqueID} from '../utils/utils';
import Popover from './Popover';
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
			events: [],
		}		
	}

	componentWillReceiveProps = (nextProps) => {
		console.log('hay!')
		let event = this.props.events[this.props.events.length - 1];
		let {date, month} = event;
		if (date === this.state.date  && this.state.month === month) {
			// this.setState({
			// 	events: this.state.events.concat([event]),
			// })
		}
	}
	componentDidMount = () => {
		let event = this.props.events[0];
		let {date, month} = event;
		if (date === this.state.date  && this.state.month === month) {
			this.setState({
				events: this.state.events.concat([event]),
			})
		}
	}
	shouldComponentUpdate = (newProps) => {
		// let newEvent = _.difference(newProps.events, this.props.events);	 
		// if (newEvent.date === this.state.date && newEvent.month === this.state.month) {
		// 	return true;
		// } else {
		// 	return  false;
		// }
		return true;
	}
	componentWillUpdate = (nextProps, nextState) => {
		// // this.setState({test: true})
		// console.log(nextProps.events, this.props.events)
		// let newEvent = _.difference(nextProps.events, this.props.events);
		// // console.log(newEvent, 'is the new event')
		// let ev = this.props.events[this.props.events.length - 1]
		// if (this.props.newEvent.date === this.state.date && this.props.newEvent.month === this.state.month) {
		// 	this.events = [...this.events, this.props.newEvent];
		// }
	}

	handleClick = (event) => {
		this.props.openModal(this.props.date)
		event.preventDefault();		
	}
	renderEvents = () => {
		return this.state.events.map((event) => {
			return (
				<div key={uniqueID()}>	
					{event.name}
				</div>
			);
		})
	}
  render() {
		const {date, month} = this.props;
		const {isHovered, displayPopover, showModal} = this.state;
    return (
			<div 
				key={uniqueID()} 
				className="rc-date-cell"
			>
				<span className="rc-date-cell-header">
					{date}
				</span>

				{this.state.events.length > 0? this.renderEvents(): null}
				 
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