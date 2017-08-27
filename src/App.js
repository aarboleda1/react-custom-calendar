import React, { Component } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Filter from './components/Filter';
import './stylesheets/main.css';
let now = new Date;
class App extends Component {

  render() {
    return (
      <div className="rc-app-wrapper">
        <Header/>
        <section className="content rc-app-main">
          <div className="rc-container-wrapper">
            {/*<Calendar
							onChangeView={() => 'hello'}
							view={'calendar'}
							date={now}
							defaultCalView={[2017, 1]}
							elementProps={
								{filter: Filter}
							}
						/>*/}
						<Filter/>

          </div>
        </section>
      </div>
    );
  }
}

export default App;
