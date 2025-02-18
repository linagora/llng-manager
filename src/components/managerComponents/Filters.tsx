import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { Button, TextField, Divider, ToggleButton } from "@mui/material";
import { t } from "i18next";
import "./Filters.css";
function FilterToggle({
  filters,
  setFilters,
}: {
  filters: { alpha: boolean; search: string };
  setFilters: Function;
}) {
  return (
    <div className="filters">
      <div>
        <TextField
          className="filter"
          size="small"
          margin="normal"
          variant="outlined"
          placeholder={t("search")}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>
      <ToggleButton
        className="filter"
        aria-labelledby="alpha-label"
        data-testid="alpha-label"
        onClick={() => setFilters({ ...filters, alpha: !filters.alpha })}
        selected={filters.alpha}
        value={filters.alpha}
        color={filters.alpha ? "primary" : "secondary"}
        size="small"
      >
        <SortByAlphaIcon />
        <label aria-label="alpha-label" hidden>
          alpha-label
        </label>
      </ToggleButton>
    </div>
  );
}

export default FilterToggle;
