import React, {Component} from 'react';
import PropTypes from 'prop-types';
import elementType from 'react-prop-types/lib/elementType';
import {daysOfWeek} from '../utils/utils';
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
		})		
	}
	static defaultProps = {
		elementProps: {},
		date: now,
		components: {
			filter: null,
		},
		view: 'calendar',
	}
	componentDidMount = () => {
		console.log(daysOfWeek)
	}
	renderMonthHeader = () => {
		return daysOfWeek.map((day) => {
			return <div key={day} className="rc-header-title">{day}</div>
		})
	}
	render() {
		return(
			<div className="rc-calendar">
				<div className="rc-calendar-toolbar">
					<span className="rc-toolbar-label">
						August
					</span>
					<span className="rc-button-group">
             <button className="rc-button">{'<'}</button>
						 <button className="rc-button">Today</button>
						 <button className="rc-button">{'>'}</button>
					</span>
				</div>
				<div className="rc-month-view">
					<div className="rc-month-row rc-month-header">
            {this.renderMonthHeader()}
					</div>
					<div className="rc-month-row">
						<div className="rc-date-cell"></div>
						<div className="rc-date-cell"></div>
						<div className="rc-date-cell"></div>
						<div className="rc-date-cell"></div>
						<div className="rc-date-cell"></div>
						<div className="rc-date-cell"></div>
						<div className="rc-date-cell"></div>
					</div>
				</div>
			</div>
		)
	}
}