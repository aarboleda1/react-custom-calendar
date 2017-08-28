import React, {Component} from 'react';
import PropTypes from 'prop-types';
import elementType from 'react-prop-types/lib/elementType';
import Card from './Card';
import Calendar from './Calendar';
import {
	uniqueID, 
	defaultEvents
} from '../utils/utils';
export default class Dashboard extends Component {
	static propTypes = {
		onChangeView: PropTypes.func,
	}
	constructor(props) {
		super(props)
	}
	componentDidMount = () => {
		localStorage.setItem('dashboard_events', this.props.snapShots)
	}
	renderCards = () => {
		const {snapShots, onChangeView} = this.props;
		let titles = Object.keys(snapShots);
		return titles.map((title) => {
			let eventsArray = snapShots[title] //all events associated with snapshot
			return (
				<Card
					key={uniqueID()}
					events={eventsArray}
					onChangeView={onChangeView}
					title={title}
				/>
			)
		})
	}
	render() {
		return (
			<div className="rc-dashboard">
				<Card
					events={defaultEvents}
					onChangeView={this.props.onChangeView}
					title={'TEst!!!'}
				/>	
				<Card
				key={uniqueID()}
				events={defaultEvents}
				onChangeView={this.props.onChangeView}
				title={'HELLO WORLD!'}
			/>								
				{/*{this.renderCards()}*/}
			</div>
		)
	}
}