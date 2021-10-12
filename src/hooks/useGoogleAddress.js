import { useState, useEffect } from 'react';
import axios from 'axios';
import { GMAPS_API_KEY } from '../constants/keys';

const useGoogleAddress = (address) => {
	const [ map, setMap ] = useState(null);
	const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GMAPS_API_KEY}`;

	useEffect(async () => {
		const response = await axios(API);
		setMap(response.data.results[0].geometry.location);
	}, []);
	return map;
};

export default useGoogleAddress;
