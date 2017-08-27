import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {uniqueID} from '../utils/utils';
import MonthRow from './MonthRow';

import _ from 'lodash';

export default class Month extends Component {
	static propTypes = {
		daysForMonth: PropTypes.arrayOf(PropTypes.array),
		month: PropTypes.string,
		openModal: PropTypes.func.isRequired,
		events: PropTypes.arrayOf(PropTypes.object),
	};
	static defaultProps = {};
	constructor(props) {
		super(props) 
	}
	componentWillReceiveProps = (newProps) => {
		let newEvent = _.difference(newProps.events, this.props.events);	
		// console.log(newEvent,' does it make it down!')	
	}
	renderWeeks = () => {
		let extraRow = this.props.daysForMonth.length === 6 ? true : false;
		return this.props.daysForMonth.map((week, index) => {
			// console.log(this.props.events, 'are the new evetns, MAP')
			return (
				<MonthRow 
					extraRow={extraRow} 
					week={week} 
					key={uniqueID()}
					daysThisMonth={this.props.daysThisMonth}
					month={this.props.month}
					openModal={this.props.openModal}
					events={this.props.events}
					newEvent={this.props.newEvent}						
				/>
			)
		})		
	}

	render() {
		let extraRow = this.props.daysForMonth.length === 6 ? true : false;		
		return (
			<div className="rc-month-view">
				{this.renderWeeks()}
			</div>
		)
	}
}