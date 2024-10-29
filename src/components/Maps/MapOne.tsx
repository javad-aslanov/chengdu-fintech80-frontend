import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapOne = () => {
  const position = [37.4419, -122.1430]; // Palo Alto coordinates

  // Example customizations
  const circleCenter = [37.4419, -122.1430];
  const polygonPositions = [
    [37.4500, -122.1600],
    [37.4500, -122.1300],
    [37.4300, -122.1300],
    [37.4300, -122.1600],
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Macro Overview
      </h4>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '90vh', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Example Marker */}
        <Marker position={position}>
          <Popup>Palo Alto City Center</Popup>
        </Marker>

        {/* Example Circle */}
        <Circle
          center={circleCenter}
          radius={500}
          pathOptions={{ color: 'blue' }}
        />

        {/* Example Polygon */}
        <Polygon
          positions={polygonPositions}
          pathOptions={{ color: 'red' }}
        />
      </MapContainer>
    </div>
  );
};

export default MapOne;
