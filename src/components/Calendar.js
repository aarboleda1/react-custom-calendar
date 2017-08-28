import React, {Component} from 'react';
import PropTypes from 'prop-types';
import elementType from 'react-prop-types/lib/elementType';
import moment from 'moment';
import EventForm from './EventForm';
import SnapshotForm from './SnapshotForm';
import _ from 'lodash';
import {
	daysOfWeek, 
	getDaysArray, 
	uniqueID, 
	months, 
	daysInMonth, 
	now,
	defaultEvents
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
			dashboard: elementType,
			/*allow use to pass in any special type of date*/
		}),
		/* Default CalendarView [year, month] year: 2017, month: 7*/
		defaultCalView: PropTypes.array,
		/* Allows changing of view to the optional dashbaord view. only works if a dashboard view is passed in */
		onChangeView: PropTypes.func

	}
	static defaultProps = {
		elementProps: {},
		date: now, 
		components: {
			filter: null,
		},
		view: 'Calendar',
	}
	constructor (props) {
		super(props)
		this.state = {
			month: 'August',
			view: this.props.view,
			weeks: [],
			year: null,
			daysThisMonth: 30,
			events: [],
			newEvent: {},
			showModal: false,
			showSnapShotForm: false,
			filters: {
				Birthdays: true,
				Holidays: true,
				'Company Events': true,
				Miscellaneous: true,
			},
			snapShots: {},
			dateClicked: null,
			nameClicked: '',
			editingExisting: false,
		}
	}

	componentWillMount = () => {	
		const {defaultCalView} = this.props;
		let date = this.props.date || new Date;
		let monthInt = defaultCalView ? defaultCalView[1] : date.getMonth() + 1; // gives it back from months 0 - 11
		let year = defaultCalView ? defaultCalView[0] : moment().year();
		let weeks = getDaysArray(year, monthInt);
		let daysThisMonth = daysInMonth(year, monthInt);
		this.setState({
			weeks: weeks,
			monthInt: monthInt, 
			month: months[monthInt],
			year: year,
			daysThisMonth: daysThisMonth,
			events: defaultEvents,
		})
	}
	componentDidMount = () => {
		let context = this;
		window.onclick = function(event) {
			if(event.target.className === 'rc-popup-background show') {
				context.closeModal();
				context.closeSnapShotForm();
			} 
			event.preventDefault();
		}
	}	
	openModal = (date, name, eventKey) => {
		let isEditingExisting = false;
		if (eventKey) isEditingExisting = true;
		this.setState({
			showModal: true,
			dateClicked: date,
			nameClicked: name,
			editingExisting: isEditingExisting,
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
	closeSnapShotForm = () => {
		this.setState({
			showSnapShotForm: false,
		})
	}
	onAddEvent = (event) => {
		console.log(this.state.editingExisting)
		let events;
		console.log(event.key)
		if (this.state.editingExisting) {
			events = this.state.events.map((_event) => {
				console.log(_event.key)
				if (_event.key === event.key) {
					console.log(_event, 'is teh event!')
					return event;
				} else {
					return _event;
				}
			})
		} else {
			event.key = uniqueID();
			events = [...this.state.events, event]
		}
		this.setState({
			events: events,
			newEvent: event,
		})
		this.closeModal();
	}
	handleSelect = (filter) => {
		this.setState((previousState, currentProps) => {
			return {
				...previousState,
				filters: {
					...this.state.filters,
					 [filter]: !this.state.filters[filter]
				}
			}
		});
	}
	openSnapShotForm = () => {
		this.setState({
			showSnapShotForm: !this.state.showSnapShotForm
		})
	}
	onAddToDashboard = (cardName) => {
		let filtered = this.state.events.filter((event) => {
			return this.state.filters[event.type];
		})
		if (cardName === '') cardName = '(No Title)';
		this.setState({
			view: 'Dashboard',
			snapShots: {
				...this.state.snapShots,
				[cardName]: {
					filters: this.state.filters,
					events: filtered,
				}
			}
		})
		this.closeSnapShotForm();
	}
	onChangeView = () => {
		console.log('called inside hre?')
		let view = this.state.view === 'Calendar' ? 'Dashboard' : 'Calendar';
		this.setState({
			view: view
		})
	}
	deleteCard = (cardName) => {
		let newSnapShots = _.omit(this.state.snapShots, [cardName]);
		this.setState({
			snapShots: newSnapShots
		});
	}
	applyFilters = (filters) => {
		this.setState({filters: filters});
	}
	render() {
		const  {
			onChangeView,
			elementProps,
		} = this.props;
		const {
			month, 
			year, 
			showModal, 
			events,
			showSnapShotForm,
			filters,
		} = this.state;
		const Filter = elementProps.filter;
		const Dashboard = elementProps.dashboard;
		return(
			<div className="rc-grid-container">
				{
					this.props.elementProps.filter && this.state.view === 'Calendar' &&
						<Filter 
							filters={this.state.filters} 
							handleSelect={this.handleSelect}
							openModal={this.openSnapShotForm}
						/>
				}
				<EventForm
					showModal={showModal}
					closeModal={this.closeModal}
					month={month}
					date={20}
					onAddEvent={this.onAddEvent}
					dateClicked={this.state.dateClicked}
					name={this.state.nameClicked}
				/>
				<SnapshotForm
					showModal={showSnapShotForm}
					closeModal={this.closeSnapShotForm}
					filters={filters}
					onAddToDashboard={this.onAddToDashboard}
				/>

				{this.state.view  === 'Calendar' ? <div className="rc-calendar">					
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
						filters={this.state.filters}
					/>			
					</div> :
					<Dashboard
						snapShots={this.state.snapShots}
						onChangeView={this.onChangeView}
						deleteCard={this.deleteCard}
						applyFilters={this.applyFilters}
					/>
			}
			</div>
		)
	}
}