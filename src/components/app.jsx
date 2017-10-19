import React, { Component } from 'react';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';
import HotelsTable from './HotelsTable';

import { geocode } from '../domain/Geocoder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        lat: 37.8199286,
        lng: -122.4782551,
      },
      hotels: [
        {
          id: 111,
          name: 'Disney Hotel',
          url: 'https://google.com',
        },
        {
          id: 112,
          name: 'Hotel Tonight',
          url: 'http://google.com',
        },
      ],
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
      <div className="app">
        <h1>Search Hotel</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <div className="result-area">
          <Map location={this.state.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.state.address}
              location={this.state.location}
            />
            <h2>Hotel Search Results</h2>
            <HotelsTable hotels={this.state.hotels} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
