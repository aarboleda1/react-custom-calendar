import React, { Component } from 'react';
// import './stylesheets/main.css';

const Header = ({changeView}) => (
	<div className="rc-header">
		<div className="rc-title">
			<h4>Schedule</h4>
		</div>
		<div className="rc-header-list">
			<span onClick={changeView}>
				<h5>Dashboard</h5>
			</span>
			<span onClick={changeView}>						
				<h5>Calendar</h5>
			</span>
		</div>
	</div>	
)
export default Header;
