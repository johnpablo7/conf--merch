import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { GMAPS_API_KEY } from '../constants/keys';

const Map = ({ data }) => {
	const mapStyles = {
		height: '50vh',
		width: '100%'
	};

	const defaultCenter = {
		lat: data.lat,
		lng: data.lng
	};

	return (
		<GoogleMap
			mapContainerStyle={mapStyles}
			zoom={9}
			center={defaultCenter}
		>
			<Marker position={defaultCenter} />
		</GoogleMap>
	);
};

export default Map;
