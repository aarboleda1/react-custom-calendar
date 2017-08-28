import React, { Component } from 'react';
import PropTypes from 'prop-types';

const options = ['Birthdays', 'Holidays', 'Company Events', 'Miscellaneous'];

export default class Filter extends Component {
	static propTypes = {
		handleSelect: PropTypes.func,
	};
	static defaultProps = {};
	constructor(props) {
		super(props)
		this.state = {	
			Birthdays: true,
			Holidays: true,
			'Company Events': true,
			Miscellaneous: true,			
		}
	}
	handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		this.props.handleSelect(name);
    // this.setState({
    //   [name]: !this.state[name],
		// });
	}
	renderFilterOptions = () => {
		let isChecked
		return options.map((option) => {
			return(
				<div key={option} className="rc-filter-list-item">
					{option}
					<input 
						className="rc-checkbox" 
						name={option} 
						type="checkbox"
						onChange={this.handleInputChange}
						checked={this.props.filters[option]}
						// ref={(input) => this[option] = input}
					/>
				</div>
			)
		})
	}
  render() {
		const {openModal} = this.props;
    return (
			<div className="rc-filter">
				<span>Show</span>
				<div className="rc-filter-list-wrapper">
					{this.renderFilterOptions()}
				</div>
				<div className="rc-filter-bottom-wrapper">
					<button onClick={openModal}className="rc-button-primary">Add Events To Dashboard</button>
				</div>
			</div>
    );
  }
}
