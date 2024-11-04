import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import { Stop } from "../interfaces/Stop";
import { MarkerMap } from "./MarkerMap";

const MapComponent: React.FC = () => {
  const [stops, setStops] = useState<Stop[]>([]);

  useEffect(() => {
    fetch("data/stop.json").then((response) =>
      response.json().then((data) => {
        setStops(data);
      })
    );
  }, []);

  return (
    <MapContainer
      center={[47.218371, -1.553621]}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
      maxZoom={19}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />
      <MarkerClusterGroup
        animate={true}
        disableClusteringAtZoom={16}
        spiderfyOnMaxZoom={false}
        showCoverageOnHover={true}
        zoomToBoundsOnClick={true}
      >
        {stops.map((stop, index) => {
          return <MarkerMap stop={stop} key={index}></MarkerMap>;
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapComponent;
