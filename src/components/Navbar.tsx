import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { push } from "redux-first-history";
import { useAppDispatch } from "../app/hooks";
import i18n from "../i18n";
import "./NavBar.css";

function Navbar({ partial }: { partial?: number }) {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    console.debug(`Language changed to ${language}`);
  };
  return (
    <AppBar color="secondary" className="navbar">
      <Toolbar>
        <Typography>
          <img
            src={require("../static/llng-logo-32.png")}
            alt="LemonLogo"
            style={{ backgroundColor: "white" }}
          />
        </Typography>
        <Divider />
        {!partial && (
          <div className="navbarOptions">
            <Typography
              variant="h6"
              component="div"
              onClick={() => dispatch(push(""))}
              style={{ cursor: "pointer", marginRight: "15px" }}
              sx={{ flexGrow: 1 }}
            >
              {t("Configuration")}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              style={{ cursor: "pointer", marginRight: "15px" }}
              sx={{ flexGrow: 1 }}
            >
              {t("sessions")}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              style={{ cursor: "pointer", marginRight: "15px" }}
              sx={{ flexGrow: 1 }}
            >
              {t("notifications")}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              style={{ cursor: "pointer", marginRight: "15px" }}
              sx={{ flexGrow: 1 }}
            >
              {t("secondFactors")}
            </Typography>
          </div>
        )}

        <IconButton
          size="large"
          edge="end"
          className="menuBurger"
          aria-label="menu burger"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => setMenuOpen(true)}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        >
          <MenuItem
            onClick={() => {
              (window as any).menulinks.map(
                (el: { title: string; target: string }) => {
                  if (el.title === "backtoportal") {
                    window.location.href = el.target;
                  }
                }
              );
            }}
          >
            {t("backtoportal")}
          </MenuItem>
          <MenuItem
            onClick={() => {
              (window as any).menulinks.map(
                (el: { title: string; target: string }) => {
                  if (el.title === "logout") {
                    window.location.href = el.target;
                  }
                }
              );
            }}
          >
            {t("logout")}
          </MenuItem>
          <Divider />
          <MenuItem>
            <ButtonGroup
              variant="text"
              color="secondary"
              aria-label="Basic button group"
            >
              <Button onClick={() => handleLanguageChange("fr")}>🇫🇷</Button>
              <Button onClick={() => handleLanguageChange("en")}>🇬🇧</Button>
              <Button onClick={() => handleLanguageChange("es")}>🇪🇸</Button>
            </ButtonGroup>
          </MenuItem>
          <Divider />
          <MenuItem>{t("version")} 0.0.1</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
