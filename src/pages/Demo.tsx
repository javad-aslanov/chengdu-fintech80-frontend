import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FiSearch } from 'react-icons/fi';
import { FaRoute } from 'react-icons/fa';

function Demo() {
  const [showRoutes, setShowRoutes] = useState(false);
  const [shortestRouteData, setShortestRouteData] = useState(null);
  const [safestRouteData, setSafestRouteData] = useState(null);
  const [loading, setLoading] = useState(false);

  const currentPosition = [30.5585358, 104.0667355];
  const destinationPosition = [30.6627858, 104.1589016];

  // Fetch route data on component mount
  useEffect(() => {
    fetch('/shortest_route.geojson')
      .then((response) => response.json())
      .then((data) => setShortestRouteData(data))
      .catch((error) => console.error('Error fetching shortest route:', error));

    fetch('/safest_route.geojson')
      .then((response) => response.json())
      .then((data) => setSafestRouteData(data))
      .catch((error) => console.error('Error fetching safest route:', error));
  }, []);

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowRoutes(true);
    }, 750); // Loading spinner displays for 0.75 seconds
  };

  const optimalRouteStyle = {
    color: '#0a84ff',
    weight: 5,
    opacity: 0.9,
  };

  const shortestRouteStyle = {
    color: '#FF0000',
    weight: 5,
    opacity: 0.7,
  };

  const createIcon = (color) => {
    return L.divIcon({
      html: `<div style="color: ${color}; font-size: 36px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg></div>`,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 24],
    });
  };

  // Component to add zoom control
  function ZoomControlComponent() {
    const map = useMap();

    useEffect(() => {
      const zoomControl = L.control.zoom({ position: 'bottomleft' });
      zoomControl.addTo(map);
      return () => {
        map.removeControl(zoomControl);
      };
    }, [map]);

    return null;
  }

  // Component to render routes and adjust map bounds
  function Routes() {
    const map = useMap();

    useEffect(() => {
      if (shortestRouteData && safestRouteData) {
        const shortestLayer = L.geoJSON(shortestRouteData);
        const safestLayer = L.geoJSON(safestRouteData);
        const group = L.featureGroup([shortestLayer, safestLayer]);
        map.fitBounds(group.getBounds(), { padding: [50, 50] });
      }
    }, [map, shortestRouteData, safestRouteData]);

    return (
      <>
        <GeoJSON data={safestRouteData} style={optimalRouteStyle} />
        <GeoJSON data={shortestRouteData} style={shortestRouteStyle} />
      </>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-screen h-screen bg-[#09132F]">
      <div className="w-[375px] h-[812px] mx-auto border-[6px] border-gray-800 rounded-[40px] overflow-hidden relative shadow-xl">
        <div className="relative w-full h-full">
          {/* Map Container */}
          <MapContainer
            center={currentPosition}
            zoom={13}
            className="absolute inset-0 h-full w-full z-0"
            zoomControl={false}
          >
            <ZoomControlComponent />
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Markers */}
            <Marker position={currentPosition} icon={createIcon('#0a84ff')}>
              <Popup>Start: Marriott Hotels Chengdu</Popup>
            </Marker>
            <Marker position={destinationPosition} icon={createIcon('#FF0000')}>
              <Popup>End: Jiahonghua Supermarket</Popup>
            </Marker>

            {/* Routes */}
            {showRoutes && shortestRouteData && safestRouteData && (
              <Routes />
            )}
          </MapContainer>

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white bg-opacity-75">
              {/* Improved Spinner */}
              <svg
                className="animate-spin h-12 w-12 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
          )}

          {/* Search Bar */}
          <div className="absolute top-14 left-4 right-4 flex items-center z-10 space-x-2">
            <div className="flex-1 h-12 bg-white rounded-full flex items-center px-4 shadow-md">
              <FiSearch className="text-gray-500 mr-2" size={20} />
              <input
                type="text"
                value="Jiahonghua Supermarket"
                readOnly
                className="bg-transparent border-none text-gray-700 w-full text-sm outline-none"
              />
            </div>
            <button
              onClick={handleButtonClick}
              className="w-12 h-12 bg-[#0a84ff] rounded-full flex items-center justify-center cursor-pointer shadow-md"
            >
              <FaRoute className="text-white" size={20} />
            </button>
          </div>

          {/* Bottom Info Overlay with Animation */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[20px] p-6 z-10 shadow-lg transform transition-transform duration-500 ease-in-out ${
              showRoutes ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <h2 className="text-xl font-bold mb-4 text-center">Route Summary</h2>
            <div className="grid grid-cols-1 gap-4">
              {/* Optimal Route */}
              <div className="flex items-start">
                <div
                  className="w-3 h-3 rounded-full mt-1 mr-3"
                  style={{ backgroundColor: optimalRouteStyle.color }}
                ></div>
                <div>
                  <h3 className="text-lg font-semibold">Optimal Route</h3>
                  <ul className="mt-2 text-sm text-gray-700 space-y-1">
                    <li>
                      <strong>Premium:</strong> ¥175
                    </li>
                    <li>
                      <strong>Distance Increase:</strong> +15%
                    </li>
                    <li>
                      <strong>Estimated Time:</strong> 35 mins
                    </li>
                  </ul>
                </div>
              </div>
              {/* Shortest Route */}
              <div className="flex items-start">
                <div
                  className="w-3 h-3 rounded-full mt-1 mr-3"
                  style={{ backgroundColor: shortestRouteStyle.color }}
                ></div>
                <div>
                  <h3 className="text-lg font-semibold">Shortest Route</h3>
                  <ul className="mt-2 text-sm text-gray-700 space-y-1">
                    <li>
                      <strong>Premium:</strong> ¥350
                    </li>
                    <li>
                      <strong>Estimated Time:</strong> 30 mins
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Demo;
