import React, {Component} from 'react';
let now = new Date();
export default class extends Component {
	static propTypes = {
		/*props passed to main calendar*/
		elementProps = {},
		/* Current date value of the calendar, Determines visible view range*/
		date: PropTypes.instanceOf(Date),
		/* Current view of the, could be a dashboard if filter component passed in*/
		events: PropTypes.arrayOf(PropTypes.object),
		
		   /**
    * Callback fired when dragging a selection in the Time views.
    *
    * Returning `false` from the handler will prevent a selection.
    *
    * ```js
    * (range: { start: Date, end: Date }) => ?boolean
    * ```
    */
		onSelecting: PropTypes.func,
		/**
		 * The selected event, if any.
		 */
		selected: PropTypes.object,

		components: PropTypes.shape({
			filter: elementType,
			/*allow use to pass in any special type of date*/
		})		
	}
	static defaultProps = {
		elementProps: {},
		date = now,
	}
	render() {
		return(
			<div/>
		)
	}
}