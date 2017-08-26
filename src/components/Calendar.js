import React, {Component} from 'react';
import PropTypes from 'prop-types';
import elementType from 'react-prop-types/lib/elementType';
import moment from 'moment';
import {daysOfWeek, getDaysArray, uniqueID, months} from '../utils/utils';


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
		year: null,
	}
	componentWillMount = () => {		
		const {defaultCalView} = this.props;
		let date = this.props.date || new Date;
		let monthInt = defaultCalView ? defaultCalView[1] : date.getMonth() + 1; // gives it back from months 0 - 11
		let year = defaultCalView ? defaultCalView[0] : moment().year();
		let daysForMonth = getDaysArray(year, monthInt);
		this.setState({
			daysForMonth: daysForMonth,
			monthInt: monthInt, //  subtract one beca
			month: months[monthInt],
			year: year,
		})
	}

	renderMonthHeader = () => {
		return daysOfWeek.map((day) => {
			return <div key={day} className="rc-header-title">{day}</div>
		})
	}
	renderWeeks = () => {
		let extraRow = this.state.daysForMonth.length === 6 ? true : false;
		return this.state.daysForMonth.map((week, index) => {
			return <MonthRow extraRow={extraRow} week={week} key={uniqueID()}/>
		})
	}
	onNavigate = (e) => {
		let direction = e.target.dataset.direction
				,daysForMonth 
				,_month //used to calculate new month and then set the state
				,_year; 
		const {monthInt, month, year} = this.state;		
		if (direction === 'forward') {			
			/* If we get to end of year, increase month */
			// _month = this.state.monthInt === 12 ? 1 : this.state.monthInt + 1;
			if (this.state.monthInt === 12) {
				_month = 1;
				_year = this.state.year + 1;
			} else {
				_month = this.state.monthInt + 1;
				_year = this.state.year;
			}
			daysForMonth = getDaysArray(_year, _month);
		} else if (direction === 'back') {
			if (this.state.monthInt === 1) {
				_year = this.state.year - 1;	
				_month = 12; 
			} else {
				_year = this.state.year;
				_month = this.state.monthInt - 1;
			}
			daysForMonth = getDaysArray(_year, _month);
		} else if (direction === 'today') {
			let date = new Date;
			_year = moment().year();
			_month = date.getMonth() + 1;			
			daysForMonth = getDaysArray(_year, _month);
		}
		this.setState({
			daysForMonth: daysForMonth,
			month: months[_month],
			monthInt: _month,
			year: _year,
		})
	}
	render() {
		// let Filter = components.filter || Filter;
		const {month, year} = this.state;
		return(
			<div className="rc-calendar">
				{/*  Contitional filter toolbar to render
					{filter && <Filter/>}
				*/}
				<div className="rc-calendar-toolbar">
					<span className="rc-toolbar-label">
						{month} {year}
					</span>
					<span className="rc-button-group">
             <button className="rc-button" data-direction="back" onClick={this.onNavigate}>{'<'}</button>
						 <button className="rc-button" data-direction="today" onClick={this.onNavigate}>Today</button>
						 <button className="rc-button" data-direction="forward" onClick={this.onNavigate}>{'>'}</button>
					</span>
				</div>
				<div className="rc-month-row-header">
					{this.renderMonthHeader()}
				</div>
        <div className="rc-elastic-month-view-wrapper">				
					<div className="rc-month-view">
						{this.renderWeeks()}											
					</div>
				</div>
			</div>
		)
	}
}