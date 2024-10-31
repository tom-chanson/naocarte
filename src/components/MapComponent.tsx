import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Papa from 'papaparse';
import { LocationData } from '../interfaces/LocationData';

const MapComponent: React.FC = () => {
    const [locations, setLocations] = useState<LocationData[]>([]);

    useEffect(() => {
        fetch('data/arret.csv')
            .then(response => response.text())
            .then(data => {
                Papa.parse<LocationData>(data, {
                    header: true,
                    dynamicTyping: true,
                    complete: (results) => {
                        setLocations(results.data);
                        console.log(locations);
                    },
                    error: (error: Error) => {
                        console.error('Error parsing CSV:', error);
                    },
                });
            });
    }, []);

    const getColor = (routeType: number) => {
        switch (routeType) {
            case 0:
                return 'red';
            case 3:
                return 'blue';
            default:
                return 'green';
        }
    };

    return (
        <MapContainer center={[47.218371, -1.553621]} zoom={12} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location, index) => {
                const position: LatLngExpression = [Number(location.stop_lat), Number(location.stop_lon)];
                console.log(position);
                return (
                    <Marker key={index} position={position} icon={L.divIcon({
                        className: 'custom-icon',
                        html: `<div style="background-color: ${getColor(location.route_type)}; width: 10px; height: 10px; border-radius: 50%;"></div>`
                    })}>
                        <Popup>
                            {location.stop_name}
                        </Popup>
                    </Marker>
                );
            })}
        </MapContainer>
    );
};

export default MapComponent;
