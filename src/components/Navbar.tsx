import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./NavBar.css";
import i18n from "../i18n";
import { useAppDispatch } from "../app/hooks";
import { push } from "redux-first-history";
import {
  AppBar,
  Typography,
  Toolbar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Button,
  ButtonGroup,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    console.log(`Language changed to ${language}`);
  };

  return (
    <AppBar color="secondary" className="navbar">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          <img
            src={require("../static/llng-logo-32.png")}
            alt="LemonLogo"
            style={{ backgroundColor: "white" }}
          />
        </Typography>
        <Divider />
        <Typography
          variant="h6"
          component="div"
          onClick={() => dispatch(push("/manager.html"))}
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
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => setMenuOpen(true)}
          color="inherit"
          sx={{ flexGrow: 1 }}
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
          <MenuItem onClick={() => console.log("portal")}>
            {t("backtoportal")}
          </MenuItem>
          <MenuItem onClick={() => console.log("logout")}>
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
