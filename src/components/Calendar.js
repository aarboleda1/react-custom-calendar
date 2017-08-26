import React, {Component} from 'react';
import PropTypes from 'prop-types';
import elementType from 'react-prop-types/lib/elementType';
import moment from 'moment';
import {daysOfWeek, getDaysArray, uniqueID} from '../utils/utils';


import MonthRow from './MonthRow';
let now = new Date();
export default class Calendar extends Component {
	static propTypes = {
		/*props passed to main calendar*/
		
		// elementProps: {}, throwing weird error not sure why
		
		/* Current date value of the calendar, Determines visible view range*/
		date: PropTypes.instanceOf(Date),
		/* Current view of the, dashboard or calendar view could be a dashboard if filter component passed in*/
		view: PropTypes.string,
		// events: PropTypes.arrayOf(PropTypes.object),
		
		   /**
    * Callback fired when dragging a selection in the Time views.
    *
    * Returning `false` from the handler will prevent a selection.
    *
    * ```js
    * (range: { start: Date, end: Date }) => ?boolean
    * ```
    */
		// onSelecting: PropTypes.func,
		/**
		 * The selected event, if any.
		 */
		// selected: PropTypes.object,

		components: PropTypes.shape({
			filter: elementType,
			/*allow use to pass in any special type of date*/
		}),
		/* Default CalendarView [year, month] year: 2017, month: 7*/
		defaultCalView: PropTypes.array

	}
	static defaultProps = {
		elementProps: {},
		date: now, 
		components: {
			filter: null,
		},
		view: 'calendar',
	}
	state = {
		month: 'August',
		view: 'Calendar', // change these to be repsective of props
		daysForMonth: null,
	}
	componentWillMount = () => {
		const {defaultCalView} = this.props;
		let date = this.props.date || new Date;
		let monthInt = defaultCalView[1] || date.getMonth() + 1; // gives it back from months 0 - 11
		let year = defaultCalView[0] || moment().year();
		let daysForMonth = getDaysArray(year, monthInt);
		this.setState({
			daysForMonth: daysForMonth,
			monthInt: monthInt - 1, //  subtract one beca
		})
	}

	renderMonthHeader = () => {
		return daysOfWeek.map((day) => {
			return <div key={day} className="rc-header-title">{day}</div>
		})
	}
	renderWeeks = () => {
		return this.state.daysForMonth.map((week ,index) => {
			return <MonthRow week={week} key={uniqueID()}/>
		})
	}
	onCalendarNavigation = (e) => {
		let direction = e.target.dataset.direction;
		const {monthInt, month} = this.state;
		let daysForMonth;
		const months = [
			'January', 
			'February',
			'March', 
			'April', 
			'May', 
			'June', 
			'July', 
			'August',
			'September',
			'October',
			'November',
			'December'
		];
		if (direction === 'forward') {
			daysForMonth = getDaysArray(2017, this.state.monthInt + 1);			
			this.setState({
				daysForMonth: daysForMonth,
				monthInt: this.state.monthInt < 12 ? this.state.monthInt + 1 : 1,
				month: months[this.state.monthInt],
			})
		} else if (direction === 'back') {
			console.log(months[this.state.monthInt])
			daysForMonth = getDaysArray(2017, this.state.monthInt - 1);
			this.setState({
				daysForMonth: daysForMonth,
				month: months[this.state.monthInt - 1],
				monthInt: this.state.monthInt - 1,
			})				
		}
		// let daysForMonth = getDaysArray(2017, 9);
		// let month = 0;
		// this.setState({
		// 	daysForMonth: daysForMonth,
		// 	month: months[month]
		// })
	}
	render() {
		// let Filter = components.filter || Filter;
		const {month} = this.state;
		return(
			<div className="rc-calendar">
				{/*  Contitional filter toolbar to render
					{filter && <Filter/>}
				*/}
				<div className="rc-calendar-toolbar">
					<span className="rc-toolbar-label">
						{month} 2017
					</span>
					<span className="rc-button-group">
             <button className="rc-button" data-direction="back" onClick={this.onCalendarNavigation}>{'<'}</button>
						 <button className="rc-button" data-direction="today" onClick={this.onCalendarNavigation}>Today</button>
						 <button className="rc-button" data-direction="forward" onClick={this.onCalendarNavigation}>{'>'}</button>
					</span>
				</div>
				<div className="rc-month-view">
					<div className="rc-month-row-header">
            {this.renderMonthHeader()}
					</div>
					{this.renderWeeks()}											
				</div>
			</div>
		)
	}
}