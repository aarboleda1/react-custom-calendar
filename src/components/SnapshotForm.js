import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {uniqueID, months, eventTypes} from '../utils/utils';
import Modal from './Modal';

export default class SnapshotForm extends Component {
	static propTypes = {}
	constructor(props) {
		super(props)
		this.state = {
			cardName: ''
		}
	}
	handleChange = (event) => {
		this.setState({
			cardName: event.target.value
		})
	}
	handleClick = () => {
		this.props.onAddToDashboard(this.state.cardName);
		this.setState({
			cardName: '',
		})
	}
	render() {
		const {showModal, closeModal, onAddToDashboard} = this.props;
		return(
			<Modal showModal={showModal}>
				<div className="rc-popup rc-snapshot-popup">
		      <div style={{float: 'right'}}>x</div>				
				  <div onClick={closeModal} className="rc-popup-title">
					  <span>Give this calendar a snapshot name</span>
					</div>
					<span>The name will show up in the dashboard for each snapshot card</span>
					<form>
						<label>Name</label> <br/>
						<input type="text" onChange={this.handleChange} value={this.state.cardName}/>
					</form>				
					<div className="rc-popup-footer">
						<button onClick={closeModal}>x Cancel</button>
						<button  className="rc-button-primary" onClick={this.handleClick}>Add</button>
					</div>
				</div>
			</Modal>
		)
	}
}