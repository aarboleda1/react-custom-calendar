import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {uniqueID} from '../utils/utils';
export default class Popover extends Component {
	static PropTypes = {};
	static defaultProps = {};
	renderMonths = () => {

	}
	render() {
		return(
			<div className="rc-popup">
				<h6>Event</h6>
				<span>
					Event your event information here
				</span>
				<div className="rc-popup-block">
					<span>Event type</span>
					<input type="form"/>
				</div>
				<div className="rc-popup-block">
					<span>Name</span>
					<input type="form"/>
				</div>
				<div className="rc-popup-name-month">
					<input>
						{this.renderMonths()}
					</input>
				</div>
				<div className="rc-popup-name-month">
					
				</div>
			</div>
		)
	}
}