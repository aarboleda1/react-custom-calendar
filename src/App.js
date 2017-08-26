import React, { Component } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import './stylesheets/main.css';
let now = new Date;
class App extends Component {
  render() {
    return (
      <div className="rc-app-wrapper">
        <Header/>
        <section className="content rc-app-main">
          <div className="rc-container-wrapper">
            <Calendar
							date={now}
						/>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
