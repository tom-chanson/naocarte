import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

import { useEffect, useState } from "react";
import iconPointerMap from "../assets/pointer-map.png";
import { Stop, stopLines } from "../interfaces/Stop";
import "../styles/markerMap.css";

interface MarkerMapProps {
  stop: Stop;
  showBus: boolean;
  showTram: boolean;
  showBoat: boolean;
}

export const MarkerMap = (props: MarkerMapProps) => {
  const lineBus = props.stop.stop_lines.filter((line) => line.route_type === 3);
  const lineTram = props.stop.stop_lines.filter(
    (line) => line.route_type === 0
  );
  const lineBoat = props.stop.stop_lines.filter(
    (line) => line.route_type === 4
  );
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
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25332.png"
          alt="accessible"
        />
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
            {lineBus.length > 0 &&
              props.showBus &&
              showLine(
                lineBus,
                "https://cdn.icon-icons.com/icons2/3260/PNG/512/bus_transport_icon_206614.png"
              )}
            {lineTram.length > 0 &&
              props.showTram &&
              showLine(
                lineTram,
                "https://cdn-icons-png.flaticon.com/512/66/66462.png"
              )}
            {lineBoat.length > 0 &&
              props.showBoat &&
              showLine(
                lineBoat,
                "https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/Travel-pict-boat.png"
              )}
          </div>
        </Popup>
      </Marker>
    )
  );
};
