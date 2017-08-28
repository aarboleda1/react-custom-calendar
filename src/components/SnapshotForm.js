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
			value: ''
		}
	}
	handleChange = (event) => {
		console.log(event.target.value)
		this.setState({
			value: event.target.value
		})
	}
	render() {
		const {showModal, closeModal} = this.props;
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
						<input type="test" onChange={this.handleChange} value={this.state.value}/>
					</form>				
					<div className="rc-popup-footer">
						<button onClick={closeModal}>x Cancel</button>
						<button  className="rc-button-primary">Add</button>
					</div>
				</div>
			</Modal>
		)
	}
}