import React, { Component } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Filter from './components/Filter';
import Dashboard from './components/Dashboard';

/*TEsting*/
import {
	defaultEvents
} from './utils/utils';
import Card from './components/Card';

import './stylesheets/main.css';
let now = new Date;
class App extends Component {
	constructor() {
		super()
		this.state = {
			view: 'Calendar',
		}
	}
	changeView = () => {
		let view = this.state.view === 'Calendar' ? 'Dashboard' : 'Calendar';
		this.setState({
			view: view,
		}) 
	}
  render() {
    return (
      <div className="rc-app-wrapper">
        <Header changeView={this.changeView}/>
        <section className="content rc-app-main">
          <div className="rc-container-wrapper">
						<Calendar
							onChangeView={this.changeView}
							view={this.state.view}
							date={now}
							defaultCalView={[2017, 8]}
							elementProps={
								{
									filter: Filter,
									dashboard: Dashboard,
								}
							}
						/>
						{/*<Dashboard/> */}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
