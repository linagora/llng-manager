import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { Button, TextField, Divider } from "@mui/material";
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
          size="small"
          margin="normal"
          variant="outlined"
          placeholder={t("search")}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>
      <Button
        aria-labelledby="alpha-label"
        onClick={() => setFilters({ ...filters, alpha: !filters.alpha })}
        color={filters.alpha ? "primary" : "secondary"}
      >
        <SortByAlphaIcon />
        <label aria-label="alpha-label" hidden>
          alpha-label
        </label>
      </Button>
    </div>
  );
}

export default FilterToggle;
