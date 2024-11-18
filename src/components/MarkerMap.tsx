import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import accessibleIcon from "../assets/accessible.png";
import boatIcon from "../assets/boat.png";
import busIcon from "../assets/bus.webp";
import tramIcon from "../assets/tram.png";

import { useEffect, useState } from "react";
import iconPointerMap from "../assets/pointer-map.png";
import {
  lineType,
  Stop,
  stopLines,
  wheelchairBoardingAccessibility,
} from "../interfaces/Stop";
import "../styles/markerMap.css";

interface MarkerMapProps {
  stop: Stop;
  showBus: boolean;
  showTram: boolean;
  showBoat: boolean;
  showAccessible: boolean;
}

export const MarkerMap = (props: MarkerMapProps) => {
  const [lineBus, setLineBus] = useState<stopLines[]>([]);
  const [lineTram, setLineTram] = useState<stopLines[]>([]);
  const [lineBoat, setLineBoat] = useState<stopLines[]>([]);

  useEffect(() => {
    const getLines = () => {
      let lineBusTemp = props.stop.stop_lines.filter(
        (line) => line.route_type === lineType.BUS
      );
      let lineTramTemp = props.stop.stop_lines.filter(
        (line) => line.route_type === lineType.TRAM
      );
      let lineBoatTemp = props.stop.stop_lines.filter(
        (line) => line.route_type === lineType.NAVIBUS
      );
      if (props.showAccessible) {
        lineBusTemp = lineBusTemp.filter(
          (line) =>
            line.wheelchair_boarding ===
            wheelchairBoardingAccessibility.ACCESSIBLE
        );
        lineTramTemp = lineTramTemp.filter(
          (line) =>
            line.wheelchair_boarding ===
            wheelchairBoardingAccessibility.ACCESSIBLE
        );
        lineBoatTemp = lineBoatTemp.filter(
          (line) =>
            line.wheelchair_boarding ===
            wheelchairBoardingAccessibility.ACCESSIBLE
        );
      }

      setLineBus(lineBusTemp);
      setLineTram(lineTramTemp);
      setLineBoat(lineBoatTemp);
    };

    getLines();
  }, [props.showAccessible, props.stop.stop_lines]);

  const [showPoint, setShowPoint] = useState(true);

  const customIcon = L.icon({
    iconUrl: iconPointerMap,
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    setShowPoint(
      (lineBus.length > 0 && props.showBus) ||
        (lineTram.length > 0 && props.showTram) ||
        (lineBoat.length > 0 && props.showBoat)
    );
  }, [
    props.showBus,
    props.showTram,
    props.showBoat,
    lineBus.length,
    lineTram.length,
    lineBoat.length,
  ]);

  const accessible = (wheelchair_boarding: number) => {
    return wheelchair_boarding === 1 ? (
      <div className="accessible">
        <img src={accessibleIcon} alt="accessible" />
      </div>
    ) : null;
  };

  const showLine = (stopLines: stopLines[], iconUrl: string) => {
    return (
      <div className="lines">
        <div className="type-line">
          <img src={iconUrl} />
          <span> : </span>
        </div>
        <div className="line-container">
          {stopLines.map((line, index) => {
            return (
              <div key={index} className="line">
                <span
                  style={{
                    backgroundColor: `#${line.route_color}`,
                    color: `#${line.route_text_color}`,
                  }}
                  className="line-name"
                >
                  {line.route_short_name}
                </span>
                {accessible(line.wheelchair_boarding)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    showPoint && (
      <Marker
        position={[props.stop.stop_lat, props.stop.stop_lon]}
        title={props.stop.stop_name}
        icon={customIcon}
      >
        <Popup minWidth={90}>
          <span>{props.stop.stop_name}</span>
          <div className="popup-content">
            {lineBus.length > 0 && props.showBus && showLine(lineBus, busIcon)}
            {lineTram.length > 0 &&
              props.showTram &&
              showLine(lineTram, tramIcon)}
            {lineBoat.length > 0 &&
              props.showBoat &&
              showLine(lineBoat, boatIcon)}
          </div>
        </Popup>
      </Marker>
    )
  );
};
