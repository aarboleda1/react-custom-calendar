import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {uniqueID} from '../utils/utils';
import Popover from './Popover';
export default class DateCell extends Component {
	static PropTypes = {};
	static defaultProps = {};
	state = {
		isHovered: false,
		displayPopover: false,
	}
	onHover = () => {
		this.setState({
			isHovered: true,
		})
	}
	handleMouseLeave = () => {
		this.setState({
			isHovered: false,
		})
	}
	openModal = (e) => {
		console.log(e.clientX)
		console.log(e.clientY)
		this.setState({
			displayPopover: true,
		})		
	}
  render() {
		const {date} = this.props;
		const {isHovered, displayPopover} = this.state;
    return (
			<div 
				key={uniqueID()} 
				onMouseEnter={this.onHover}
				onMouseOut={this.handleMouseLeave}
				className="rc-date-cell"

			>
				<span className="rc-date-cell-header">
					{date}
				</span>
				{isHovered && 
					<div 
						className="rc-date-add-event"
						onClick={this.openModal}
					>
						+
					</div>
				}
				{displayPopover && 
					<Popover/>
				}
				
			</div>
    )
  }
}