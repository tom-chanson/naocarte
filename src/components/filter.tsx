import accessibleIcon from "../assets/accessible.png";
import boatIcon from "../assets/boat.png";
import busIcon from "../assets/bus.webp";
import markerMap from "../assets/pointer-map.png";
import tramIcon from "../assets/tram.png";
import "../styles/filter.css";
interface FilterProps {
  setShowBus: (showBus: boolean) => void;
  setShowTram: (showTram: boolean) => void;
  setShowBoat: (showBoat: boolean) => void;
  setShowAccessible: (showAccessible: boolean) => void;
}

export const Filter = (props: FilterProps) => {
  return (
    <div className="filter">
      <div className="filter-container">
        <div className="filter-title">
          <h2>Filtre</h2>
        </div>
        <div className="filter-content">
          <div className="filter-item">
            <span className="filter-text">Bus: </span>
            <input
              type="checkbox"
              className="checkbox"
              id="bus"
              name="bus"
              value="bus"
              defaultChecked
              onChange={(e) => {
                props.setShowBus(e.target.checked);
              }}
            />
            <label htmlFor="bus" className="toggle">
              <span />
            </label>
          </div>
          <div className="filter-item">
            <span className="filter-text">Tram: </span>
            <input
              className="checkbox"
              type="checkbox"
              id="tram"
              name="tram"
              value="tram"
              defaultChecked
              onChange={(e) => {
                props.setShowTram(e.target.checked);
              }}
            />
            <label htmlFor="tram" className="toggle">
              <span />
            </label>
          </div>
          <div className="filter-item">
            <span className="filter-text">Navibus: </span>
            <input
              className="checkbox"
              type="checkbox"
              id="boat"
              name="boat"
              value="boat"
              defaultChecked
              onChange={(e) => {
                props.setShowBoat(e.target.checked);
              }}
            />
            <label htmlFor="boat" className="toggle">
              <span />
            </label>
          </div>
        </div>
        <div className="filter-content">
          <div className="filter-item">
            <span className="filter-text">
              Accessible aux personnes à mobilité réduite:{" "}
            </span>
            <input
              className="checkbox"
              type="checkbox"
              id="accessible"
              name="accessible"
              value="accessible"
              onChange={(e) => {
                props.setShowAccessible(e.target.checked);
              }}
            />
            <label htmlFor="accessible" className="toggle">
              <span />
            </label>
          </div>
        </div>
      </div>
      <div className="legend-container">
        <div className="filter-title">
          <h2>Légende</h2>
        </div>
        <div className="legend">
          <div className="filter-item">
            <img src={markerMap} alt="marker" className="marker" />
            <span className="filter-text">Arrêt (Bus, Tram, Navibus)</span>
          </div>
          <div className="filter-item">
            <img className="accessible" src={accessibleIcon} alt="accessible" />
            <span className="filter-text">
              Arrêt accessible aux personnes à mobilité réduite
            </span>
          </div>
          <div className="filter-item">
            <img src={busIcon} alt="bus" className="icon" />
            <span className="filter-text">Bus</span>
          </div>
          <div className="filter-item">
            <img src={tramIcon} alt="tram" className="icon" />
            <span className="filter-text">Tram</span>
          </div>
          <div className="filter-item">
            <img src={boatIcon} alt="boat" className="icon" />
            <span className="filter-text">Navibus</span>
          </div>
        </div>
      </div>
    </div>
  );
};
