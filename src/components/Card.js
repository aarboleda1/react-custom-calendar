import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {defaultEvents} from '../utils/utils';

export default class Card extends Component {
	static propTypes = {
		onChangeView: PropTypes.func,
	}	
	constructor(props) {
		super(props)
	}
	renderItems = () => {
		return this.props.events.map((event, index) => {
			return(
				<div key={index} className="rc-event-list-item">
					<span style={{backgroundColor: 'blue', height: '100%', width: '5px'}}>
					</span>
					<div className="rc-event-title">
						{event.name}
					</div>
					<div className="rc-event-date">
						{event.month} {event.date}
					</div>
					<div className="rc-event-time">
						{event.hour}{event.minute}
					</div>					
				</div>
		  )
		}) 
	}
	render(){
		const {onChangeView, title} = this.props;
		return(
			<div className="rc-snap-shot-card">	
				<div className="rc-card-header">
					<span className="title">{title}</span>
					<span>X</span>				
				</div>
				<div className="rc-card-body-section">
					{this.renderItems()}
				</div>
				<div className="rc-card-footer">
					<span onClick={onChangeView}>
						View all in Calendar
					</span>
				</div>
			</div>
		)
	}
}