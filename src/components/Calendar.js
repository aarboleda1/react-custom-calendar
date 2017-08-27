import React, {Component} from 'react';
import PropTypes from 'prop-types';
import elementType from 'react-prop-types/lib/elementType';
import moment from 'moment';
import Popover from './Popover';
import _ from 'lodash';
import {
	daysOfWeek, 
	getDaysArray, 
	uniqueID, 
	months, 
	daysInMonth, 
	now
} from '../utils/utils';
import Month from './Month';
export default class Calendar extends Component {
	static propTypes = {
		/*props passed to main calendar*/
		
		// elementProps: {}, throwing weird error not sure why
		
		/* Current date value of the calendar, Determines visible view range*/
		date: PropTypes.instanceOf(Date),
		/* Current view of the, dashboard or calendar view could be a dashboard if filter component passed in*/
		view: PropTypes.string,
		// events: PropTypes.arrayOf(PropTypes.object),
		
		/* Call back to add event to calendar and return new event */
		onAddEvent: PropTypes.func,
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
	constructor (props) {
		super(props)
		this.state = {
			month: 'August',
			view: 'Calendar', // change these to be repsective of props
			weeks: [],
			year: null,
			daysThisMonth: 30,
			dateClicked: null,
			events: [],
			newEvent: {},
			showModal: false,
		}
	}

	componentWillMount = () => {	
		const {defaultCalView} = this.props;
		let date = this.props.date || new Date;
		let monthInt = defaultCalView ? defaultCalView[1] : date.getMonth() + 1; // gives it back from months 0 - 11
		let year = defaultCalView ? defaultCalView[0] : moment().year();
		let weeks = getDaysArray(year, monthInt);
		let daysThisMonth = daysInMonth(year, monthInt)
		this.setState({
			weeks: weeks,
			monthInt: monthInt, 
			month: months[monthInt],
			year: year,
			daysThisMonth: daysThisMonth,
			events: [{amPm: "AM", date: "6", hour: 8, minute: "30", month: "January", name: "1st event", type: "Company Events", month: "January"}],
		})
	}
	componentDidMount = () => {
		let context = this;
		window.onclick = function(event) {
			if(event.target.className === 'rc-popup-background show') {
				context.closeModal();
			} 
			event.preventDefault();
		}
	}	

	openModal = (date) => {
		this.setState({
			showModal: true,
			dateClicked: date,
		})
	}
	renderMonthHeader = () => {
		return daysOfWeek.map((day) => {
			return <div key={day} className="rc-header-title">{day}</div>
		})
	}
	onNavigate = (e) => {
		let direction = e.target.dataset.direction
				,weeks 
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
			weeks = getDaysArray(_year, _month);
		} else if (direction === 'back') {
			if (this.state.monthInt === 1) {
				_year = this.state.year - 1;	
				_month = 12; 
			} else {
				_year = this.state.year;
				_month = this.state.monthInt - 1;
			}
			weeks = getDaysArray(_year, _month);
		} else if (direction === 'today') {
			let date = new Date;
			_year = moment().year();
			_month = date.getMonth() + 1;			
			weeks = getDaysArray(_year, _month);
		}
		this.setState({
			weeks: weeks,
			month: months[_month],
			monthInt: _month,
			year: _year,
		})
		e.preventDefault();
	}
	closeModal = () => {
		this.setState({
			showModal: false,
		})
	}	
	onAddEvent = (event) => {
		this.setState({
			events: [...this.state.events, event],
			newEvent: event,
		})
		this.closeModal();
	}
	render() {
		// let Filter = components.filter || Filter;
		const {
			month, 
			year, 
			showModal, 
			events
		} = this.state;
		const Filter = this.props.elementProps.filter;
		return(
			<div className="rc-calendar">
				{/*{this.props.elementProps.filter && <Filter/>}*/}
				<Popover
					showModal={showModal}
					closeModal={this.closeModal}
					month={month}
					date={20}
					onAddEvent={this.onAddEvent}
					dateClicked={this.state.dateClicked}
				/>
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
				<Month
					weeks={this.state.weeks}
					month={this.state.month}
					openModal={this.openModal}
					events={this.state.events}
					newEvent={this.state.newEvent}						
				/>
			</div>
		)
	}
}