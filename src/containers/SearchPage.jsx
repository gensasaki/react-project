import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import queryString from 'query-string';

import SearchForm from '../components/SearchForm';
// import GeocodeResult from './GeocodeResult';
// import Map from './Map';
// import HotelsTable from './HotelsTable';

import { geocode } from '../domain/Geocoder';
import { searchHotelByLocation } from '../domain/HotelRepository';

const sortedHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: this.getPlaceParam() || 'Keio University',
      location: {
        lat: 35.6489643,
        lng: 139.7429376,
      },
      sortKey: 'price',
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => {
      this.forceUpdate();
    });
    // const place = this.getPlaceParam();
    // if (place) {
    //   this.startSearch(place);
    // }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getPlaceParam() {
    const params = queryString.parse(this.props.location.search);
    const place = params.place;
    if (place && place.length > 0) {
      return place;
    }
    return null;
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

  handlePlaceChange(e) {
    e.preventDefault();
    this.props.store.dispatch({
      type: 'CHANGE_PLACE',
      place: e.target.value,
    });
  }

  handlePlaceSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/?place=${this.state.place}`);
    this.startSearch();
  }

  startSearch() {
    geocode(this.state.place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            this.setState({ address, location });
            return searchHotelByLocation(location);
          }
          case 'ZERO_RESULTS': {
            this.setErrorMessage('Not found.');
            break;
          }
          default: {
            this.setErrorMessage('An error occured.');
          }
        }
        return [];
      })
      .then((hotels) => {
        this.setState({ hotels: sortedHotels(hotels, this.state.sortKey) });
      })
      .catch(() => {
        this.setErrorMessage('Failed to connect.');
      });
  }

  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedHotels(this.state.hotels, sortKey),
    });
  }

  render() {
    const state = this.props.store.getState();
    return (
      <div className="search-page">
        <h1 className="app-title">Search Hotel in Japan</h1>
        <SearchForm
          place={state.place}
          onPlaceChange={e => this.handlePlaceChange(e)}
          onSubmit={e => this.handlePlaceSubmit(e)}
        />
        {/* <div className="result-area">
          <Map location={this.state.location} />
          <div className="result-right">
            <GeocodeResult
              address={this.state.address}
              location={this.state.location}
            />
            <h2>Hotel Search Results</h2>
            <HotelsTable
              hotels={this.state.hotels}
              sortKey={this.state.sortKey}
              onSort={sortKey => this.handleSortKeyChange(sortKey)}
            />
          </div>
        </div> */}
      </div>
    );
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  store: PropTypes.shape({
    subscribe: PropTypes.func,
    getState: PropTypes.func,
    dispatch: PropTypes.func,
  }).isRequired,
};

export default SearchPage;
