import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {uniqueID} from '../utils/utils';
import DateCell from './DateCell';
export default class MonthRow extends Component{
	static PropTypes = {
		week: PropTypes.array.isRequired,
		extraRow: PropTypes.bool,
		daysThisMonth: PropTypes.number,
		month: PropTypes.string.isRequired,
		openModal: PropTypes.func,
		events: PropTypes.arrayOf(PropTypes.object)
	}
	static defaultProps = {}
	componentWillReceiveProps = (nextProps, nextState) => {
		console.log(nextProps.events, nextState,  'are new prosp!')
	}
	componentDidUpdate = () => {
		console.log('updated?!')
	}
	renderDays = () => {
		const {week, daysThisMonth, events} = this.props; 
		let isBeginningOfMonth = week.length > 0 ? week[0].split('-')[0] < 20 : false;
		/* If It is the beginning of the month, append empty cells */
		if (week.length < 7 && isBeginningOfMonth) {
			let diff = 7 - week.length;
			for (let i = 0; i < diff; i++) {
				week.unshift("-")
			}			
		}
		return week.map((date) => {
			date = date.split('-')[0];
			return (
				<DateCell 
					month={this.props.month} 
					daysThisMonth={daysThisMonth} 
					key={uniqueID()} 
					date={date}
					openModal={this.props.openModal}
					events={events}
					newEvent={this.props.newEvent}											
				/>
			)
		})
	}
  render(){
		var rowClass = classNames({
			'extra-row': this.props.extraRow,
			'rc-month-row': true,
    });
    return(
      <div className={rowClass}>
				{this.renderDays()}
			</div>
    );
  }
}