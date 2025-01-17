import { ChevronLeft, ChevronRight } from "@mui/icons-material";
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

function Navbar({
  partial,
  open,
  toggleNavbar,
}: {
  partial?: number;
  open: boolean;
  toggleNavbar: Function;
}) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <>
      <Drawer
        className={`navbar ${open ? "open" : "closed"}`}
        variant="persistent"
        open={open}
        anchor="left"
        sx={{
          width: "250px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: "250px", boxSizing: "border-box" },
        }}
      >
        <div className="drawer-header">
          <IconButton color="inherit" onClick={(e) => toggleNavbar()}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
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
              <OptionMenu />
            </>
          )}
        </div>
      </Drawer>
      <Drawer
        variant="persistent"
        className={`navbar ${!open ? "closed" : ""}`}
        open={!open}
        anchor="left"
        sx={{
          width: "40px",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: "40px", boxSizing: "border-box" },
        }}
      >
        <IconButton color="inherit" onClick={(e) => toggleNavbar()}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
        <OptionMenu />
      </Drawer>
    </>
  );
}

function OptionMenu() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    console.debug(`Language changed to ${language}`);
  };

  return (
    <>
      <IconButton
        edge="end"
        className={`menuBurger`}
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
    </>
  );
}

export default Navbar;
