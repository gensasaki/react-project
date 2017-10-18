import React, { Component } from 'react';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';

import { geocode } from '../domain/Geocoder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 37.8199286,
        lng: -122.4782551,
      },
    };
  }

  setErrorMessage(errorMessage) {
    this.setState({
      address: errorMessage,
      location: {
        lat: 0,
        lng: 0,
      },
    });
  }

  handlePlaceSubmit(place) {
    geocode(place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            this.setState({ address, location });
            break;
          }
          case 'ZERO_RESULTS': {
            this.setErrorMessage('Not found.');
            break;
          }
          default: {
            this.setErrorMessage('An error occured.');
          }
        }
      })
      .catch(() => {
        this.setErrorMessage('Failed to connect.');
      });
  }

  render() {
    return (
      <div>
        <h1>Latitude Longitude Search</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <GeocodeResult
          address={this.state.address}
          location={this.state.location}
        />
        <Map location={this.state.location} />
      </div>
    );
  }
}

export default App;
