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
		snapShots: PropTypes.object,
		deleteCard: PropTypes.func,
	}
	constructor(props) {
		super(props)
	}
	componentDidMount = () => {
		localStorage.setItem('dashboard_events', this.props.snapShots)
	}
	renderCards = () => {
		const {snapShots, onChangeView, deleteCard} = this.props;
		let titles = Object.keys(snapShots);
		return titles.map((title) => {
			return (
				<Card
					title={title}
					events={snapShots[title]}
					onChangeView={onChangeView}				
					key={uniqueID()}
					deleteCard={deleteCard}	
				/>
			)
		})	
	}
	render() {

		return (
			<div className="rc-dashboard">								
				{this.renderCards()}				
			</div>
		)
	}
}