import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const DrugAvailability = () => {
    const [drugName, setDrugName] = useState('');
    const [stores, setStores] = useState([
        { id: 1, name: 'Store A', location: { lat: 37.7749, lng: -122.4194 } },
        { id: 2, name: 'Store B', location: { lat: 37.7849, lng: -122.4294 } },
    ]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.GOOGLE_MAP_KEY // Replace with your API key
    });

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };

    const center = {
        lat: 37.7749,
        lng: -122.4194,
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md text-black mt-4">
            <input
                type="text"
                placeholder="Enter drug name"
                value={drugName}
                onChange={(e) => setDrugName(e.target.value)}
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={13}
            >
                {stores.map((store) => (
                    <Marker key={store.id} position={store.location} />
                ))}
            </GoogleMap>
            <div className='text-center m-5 font-bold text-2xl text-blue-700'>List of Nearby Stores</div>
            <ul className="mt-6 space-y-4">
                {stores.map((store) => (
                    <li key={store.id} className="p-4 bg-white rounded-lg shadow-sm">
                        {store.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DrugAvailability;