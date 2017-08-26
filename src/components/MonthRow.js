import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {uniqueID} from '../utils/utils';
import DateCell from './DateCell';
export default class MonthRow extends Component{
	static PropTypes = {
		week: PropTypes.array.isRequired,
		extraRow: PropTypes.bool,
	}
	static defaultProps = {}
	constructor(props) {
		super(props);
	}
	componentWillReceiveProps = () => {
	}
	renderDays = () => {
		const {week} = this.props; 
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
			return <DateCell key={uniqueID()} date={date}/>
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