import { combineReducers } from 'redux';

const place = (state = 'Tokyo Tower', action) => {
  switch (action.type) {
    case 'CHANGE_PLACE':
      return action.place;
    default:
      return state;
  }
};

const geocodeResult = (
  state = {
    address: '',
    location: {
      lat: 35.6489643,
      lng: 139.7429376,
    },
  },
  action,
) => {
  switch (action.type) {
    case 'GEOCODE_FETCHED':
      return {
        address: action.address,
        location: action.location,
      };
    default:
      return state;
  }
};

export default combineReducers({ place, geocodeResult });
