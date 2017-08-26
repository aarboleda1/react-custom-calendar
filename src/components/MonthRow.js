import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {uniqueID} from '../utils/utils';

export default class MonthRow extends Component{
	static PropTypes = {
		week: PropTypes.array.isRequired,
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
		/*If It is the beginning of the month, append empty cells*/
		if (week.length < 7 && isBeginningOfMonth) {
			let diff = 7 - week.length;
			for (let i = 0; i < diff; i++) {
				week.unshift("-")
			}			
		}
		return week.map((date) => {
			date = date.split('-')[0];
			return <div key={uniqueID()} className="rc-date-cell">{date}</div>
		})
	}
  render(){
    return(
      <div className="rc-month-row">
				{this.renderDays()}
			</div>
    );
  }
}