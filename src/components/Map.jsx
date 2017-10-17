import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const InnerMap = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={props.position}
    center={props.position}
  >
    <Marker
      position={props.position}
    />
  </GoogleMap>
));

const Map = ({ lat, lng }) => (
  <InnerMap
    containerElement={(<div />)}
    mapElement={(<div className="map" />)}
    position={{ lat, lng }}
  />
);

Map.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

Map.defaultProps = {
  lat: 37.8199286,
  lng: -122.4782551,
};

export default Map;
