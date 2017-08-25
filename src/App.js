import React, { Component } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import './stylesheets/main.css';
class App extends Component {
  render() {
    return (
      <div className="rc-app-wrapper">
        <Header/>
        <section className="content rc-app-main">
          <div className="rc-container-wrapper">
            <Calendar/>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
