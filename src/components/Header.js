import React, { Component } from 'react';
// import './stylesheets/main.css';
import classNames from 'classnames';

const Header = ({changeView, view}) => (
  <div className="rc-header">
    <div className="rc-title">
      <h4>Schedule</h4>
    </div>
    <div className="rc-header-list">
      <span onClick={changeView}>
        <h5 style={{color: view === 'Dashboard' ? '#2196f3' : null}}>Dashboard</h5>
      </span>
      <span style={{color: view === 'Calendar' ? '#2196f3' : null}} onClick={changeView}>						
        <h5>Calendar</h5>
      </span>
    </div>
  </div>	
);
export default Header;
