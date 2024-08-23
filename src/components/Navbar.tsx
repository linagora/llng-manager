import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
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
    <Drawer className="navbar" variant="permanent" anchor="left">
      <div className="navbarOptions">
        <Typography>
          <img
            src={require("../static/llng-logo-32.png")}
            alt="LemonLogo"
            style={{ backgroundColor: "white" }}
          />
        </Typography>
        {!partial && (
          <>
            <Typography
              variant="h6"
              component="div"
              onClick={() => dispatch(push("/manager.html"))}
              style={{ cursor: "pointer", marginRight: "15px" }}
            >
              {t("Configuration")}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              style={{ cursor: "pointer", marginRight: "15px" }}
            >
              {t("sessions")}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              style={{ cursor: "pointer", marginRight: "15px" }}
            >
              {t("notifications")}
            </Typography>
            <Typography
              variant="h6"
              component="div"
              style={{ cursor: "pointer", marginRight: "15px" }}
            >
              {t("secondFactors")}
            </Typography>
          </>
        )}
      </div>
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
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      >
        <MenuItem onClick={() => console.debug("portal")}>
          {t("backtoportal")}
        </MenuItem>
        <MenuItem onClick={() => console.debug("logout")}>
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
    </Drawer>
  );
}

export default Navbar;
