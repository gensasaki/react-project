import React, { Component } from 'react';
import SearchForm from './SearchForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handlePlaceSubmit(place) {
    console.log(place);
  }

  render() {
    return (
      <div>
        <h1>Latitude Longitude Search</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)}/>
      </div>
    );
  }
}

export default App;
