import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { Stop, stopLines } from "../interfaces/Stop";
import "../styles/markerMap.css";

interface MarkerMapProps {
  stop: Stop;
}

export const MarkerMap = ({ stop }: MarkerMapProps) => {
  const customIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const lineBus = stop.stop_lines.filter((line) => line.route_type === 3);
  const lineTram = stop.stop_lines.filter((line) => line.route_type === 0);

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
    <Marker
      position={[stop.stop_lat, stop.stop_lon]}
      title={stop.stop_name}
      icon={customIcon}
    >
      <Popup minWidth={90}>
        <span>{stop.stop_name}</span>
        <div className="popup-content">
          {lineBus.length > 0 &&
            showLine(
              lineBus,
              "https://cdn.icon-icons.com/icons2/3260/PNG/512/bus_transport_icon_206614.png"
            )}
          {lineTram.length > 0 &&
            showLine(
              lineTram,
              "https://cdn-icons-png.flaticon.com/512/66/66462.png"
            )}
        </div>
      </Popup>
    </Marker>
  );
};
