import Popup from "reactjs-popup";
import "./Filters.css";
import { t } from "i18next";
import { Button } from "@mui/material";
function FilterToggle({
  filters,
  setFilters,
}: {
  filters: { alpha: boolean; search: string };
  setFilters: any;
}) {
  return (
    <div className="filters">
      <div>
        <input
          placeholder={t("search")}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>
      <Popup
        trigger={
          <Button variant="outlined" className="filter">
            {t("ldapFilters")}
          </Button>
        }
        position="left center"
      >
        <div>
          <label id="alpha-label">{t("alphabetical")}</label>
          <input
            type="checkbox"
            aria-labelledby="alpha-label"
            onChange={() => setFilters({ ...filters, alpha: !filters.alpha })}
            checked={filters.alpha}
          />
        </div>
      </Popup>
    </div>
  );
}

export default FilterToggle;
