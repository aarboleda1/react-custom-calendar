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
	state = {
		isHovered: false,
		displayPopover: false,
		showModal: false,
		month: this.props.month,
		events: [],
		date: this.props.date,
	}
	componentWillReceiveProps = (nextProps) => {
		let event = this.props.events[0];
		let {date, month} = event;
		if (date === this.state.date  && this.state.month === month) {
			this.setState({
				events: this.state.events.concat([event]),
			})
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
	componentWillReceiveProps = (nextProps) => {
		console.log(nextProps, 'are props!?')
		let event = this.props.events[0];
		let {date, month} = event;
		if (date === this.state.date  && this.state.month === month) {
			this.setState({
				events: this.state.events.concat([event]),
			})
		}
	}
	onHover = () => {
		this.setState({
			isHovered: true,
		})
	}
	handleMouseLeave = (event) => {
		this.setState({
			isHovered: false,
		})
		event.preventDefault();
	}

	handleClick = (event) => {

		this.props.openModal(this.props.date)
		event.preventDefault();		
	}
	closeModal = () => {
		this.setState({
			showModal: false,
		})
	}
	onAddEvent = (event) => {
		this.setState({
			events: this.state.events.concat([event]),
		})
		
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
				onMouseEnter={this.onHover}
				onMouseOut={this.handleMouseLeave}
				className="rc-date-cell"
			>
				<span className="rc-date-cell-header">
					{date}
				</span>

				{this.state.events.length > 0 ? this.renderEvents(): null}
				{isHovered && 
					<div 
						className="rc-date-add-event"
						onClick={this.handleClick}
					>
						+
					</div>
				}				 			
			</div>
    )
  }
}