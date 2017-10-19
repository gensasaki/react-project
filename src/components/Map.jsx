import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const InnerMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={props.location}
    center={props.location}
  >
    <Marker
      position={props.location}
    />
  </GoogleMap>
));

const Map = ({ location }) => (
  <InnerMap
    containerElement={(<div />)}
    mapElement={(<div className="map" />)}
    location={location}
  />
);

Map.propTypes = {
  location: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Map;
