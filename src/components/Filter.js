import React, { Component } from 'react';
const options = ['Birthdays', 'Holidays', 'Company Events', 'Miscellaneous'];
export default class Filter extends Component {
	renderFilterOptions = () => {
		return options.map((option) => {
			return(
				<div key={option} className="rc-filter-list-item">
					{option}
					<input className="rc-checkbox" name={option} type="checkbox"/>
				</div>
			)
		})
	}
  render() {
    return (
			<div className="rc-filter">
				<span>Show</span>
				<div className="rc-filter-list-wrapper">
					{this.renderFilterOptions()}												
				</div>
				<div className="rc-filter-bottom-wrapper">
					<button>Add Events To Dashboard</button>
				</div>
			</div>
    );
  }
}
