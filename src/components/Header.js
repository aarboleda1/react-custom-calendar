import React, { Component } from 'react';
// import './stylesheets/main.css';

export default class Header extends Component {
  render() {
    return (
      <div className="rc-header">
        <div className="rc-title">
          <h4>Schedule</h4>
        </div>
        <div className="rc-header-list">
          <h5>Dashboard</h5>
          <h5>Calendar</h5>
        </div>
      </div>
    );
  }
}
