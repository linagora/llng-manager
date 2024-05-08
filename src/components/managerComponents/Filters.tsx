import "./Filters.css";
import { t } from "i18next";
import { Button, Checkbox, Menu, MenuItem, TextField } from "@mui/material";
import React from "react";
function FilterToggle({
  filters,
  setFilters,
}: {
  filters: { alpha: boolean; search: string };
  setFilters: any;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
        variant="outlined"
        className="filter"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {t("ldapFilters")}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => setFilters({ ...filters, alpha: !filters.alpha })}
        >
          <label id="alpha-label">{t("alphabetical")}</label>
          <Checkbox
            aria-labelledby="alpha-label"
            onChange={() => setFilters({ ...filters, alpha: !filters.alpha })}
            checked={filters.alpha}
          />
        </MenuItem>
      </Menu>
    </div>
  );
}

export default FilterToggle;
