import "../styles/filter.css";

interface FilterProps {
  setShowBus: (showBus: boolean) => void;
  setShowTram: (showTram: boolean) => void;
  setShowBoat: (showBoat: boolean) => void;
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
      </div>
    </div>
  );
};
