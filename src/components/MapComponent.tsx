import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
import shapeData from "../data/shape.json";
import stopData from "../data/stop.json";
import { Shape } from "../interfaces/shape";
import { lineType, Stop } from "../interfaces/Stop";
import { Filter } from "./filter";
import { LineMap } from "./LineMap";
import { MarkerMap } from "./MarkerMap";

const MapComponent: React.FC = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [zoomLevel, setZoomLevel] = useState(12);
  const [showBus, setShowBus] = useState(true);
  const [showTram, setShowTram] = useState(true);
  const [showBoat, setShowBoat] = useState(true);
  const [showAccessible, setShowAccessible] = useState(false);

  const MapEvents = () => {
    useMapEvents({
      zoomend: (event) => {
        setZoomLevel(event.target.getZoom());
      },
    });
    return null;
  };

  useEffect(() => {
    setStops(stopData);
    setShapes(shapeData);
  }, []);

  return (
    <MapContainer
      center={[47.218371, -1.553621]}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
      maxZoom={19}
    >
      <MapEvents />
      <Filter
        setShowBus={setShowBus}
        setShowTram={setShowTram}
        setShowBoat={setShowBoat}
        setShowAccessible={setShowAccessible}
      />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
      />
      <MarkerClusterGroup
        animate={true}
        disableClusteringAtZoom={15}
        spiderfyOnMaxZoom={false}
        showCoverageOnHover={false}
        zoomToBoundsOnClick={true}
      >
        {stops.map((stop, index) => (
          <MarkerMap
            stop={stop}
            key={index}
            showBoat={showBoat}
            showBus={showBus}
            showTram={showTram}
            showAccessible={showAccessible}
          />
        ))}
      </MarkerClusterGroup>
      {zoomLevel > 13 &&
        shapes.map((shape, index) => {
          if (
            (shape.route_type === lineType.BUS && showBus) ||
            (shape.route_type === lineType.TRAM && showTram) ||
            (shape.route_type === lineType.NAVIBUS && showBoat)
          )
            return <LineMap shape={shape} key={index} />;
        })}
    </MapContainer>
  );
};

export default MapComponent;
