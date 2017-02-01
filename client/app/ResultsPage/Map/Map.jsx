import React, { PropTypes } from 'react';

const Map = props => (
  <div className="map container-fluid" ref={map => props.setMapRef(map, props.entities)} />
  );

Map.propTypes = {
  handleInitMapRender: PropTypes.func,
};
export default Map;
