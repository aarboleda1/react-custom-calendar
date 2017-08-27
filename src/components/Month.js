import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {uniqueID} from '../utils/utils';
import _ from 'lodash';

import Week from './Week';

export default class Month extends Component {
	static propTypes = {
		weeks: PropTypes.arrayOf(PropTypes.array),
		month: PropTypes.string,
		openModal: PropTypes.func.isRequired,
		events: PropTypes.arrayOf(PropTypes.object),
	};
	static defaultProps = {};
	constructor(props) {
		super(props)
		this.state = {
			events: this.props.events,
		} 
	}
	componentWillReceiveProps = (newProps) => {
		if (!_.isEqual(this.props, newProps)) {
			let newEvent = _.difference(newProps.events, this.props.events);
			this.setState({
				events: [...this.state.events, newProps.events[newProps.events.length - 1]],
			})	
		}
	}

	renderWeeks = () => {
		let extraRow = this.props.weeks.length === 6 ? true : false;
		return this.props.weeks.map((week, index) => {
			return (
				<Week 
					extraRow={extraRow} 
					week={week} 
					key={uniqueID()}
					daysThisMonth={this.props.daysThisMonth}
					month={this.props.month}
					openModal={this.props.openModal}
					events={this.state.events}
					newEvent={this.props.newEvent}						
				/>
			)
		})		
	}
	render() {
		let extraRow = this.props.weeks.length === 6 ? true : false;		
		
		return (
			<div className="rc-elastic-month-view-wrapper">			
				<div className="rc-month-view">
					{this.renderWeeks()}											
				</div>
			</div>
		)
	}
}