import Popup from "reactjs-popup";
import "./FilterToggle.css";
function FilterToggle({
  filters,
  setFilters,
}: {
  filters: { alpha: boolean };
  setFilters: any;
}) {
  return (
    <div className="filters">
      <Popup
        trigger={<button className="filter">Filters</button>}
        position="left center"
      >
        <div>
          <label id="alpha-label">Alphabetical</label>
          <input
            type="checkbox"
            aria-labelledby="alpha-label"
            onChange={() => setFilters({ alpha: !filters.alpha })}
            checked={filters.alpha}
          />
        </div>
      </Popup>
    </div>
  );
}

export default FilterToggle;
