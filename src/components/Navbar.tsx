import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./NavBar.css";
import i18n from "../i18n";
import Popup from "reactjs-popup";
import { useAppDispatch } from "../app/hooks";
import { push } from "redux-first-history";

function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    console.log(`Language changed to ${language}`);
  };

  return (
    <div className="navbar">
      <p onClick={() => dispatch(push("/manager.html"))}>
        {t("Configuration")}
      </p>
      <p> {t("sessions")} </p>
      <p> {t("notifications")} </p>
      <p> {t("secondFactors")} </p>
      <Popup
        open={menuOpen}
        trigger={<p>{t("menu")}</p>}
        onOpen={() => setMenuOpen(true)}
        onClose={() => setMenuOpen(false)}
        position={"bottom center"}
      >
        <div className="menu">
          <p onClick={() => console.log("portal")}> {t("backtoportal")} </p>
          <p onClick={() => console.log("logout")}> {t("logout")} </p>
          <div className="language-options">
            <span className="flag" onClick={() => handleLanguageChange("fr")}>
              🇫🇷
            </span>
            <span className="flag" onClick={() => handleLanguageChange("en")}>
              🇬🇧
            </span>
            <span className="flag" onClick={() => handleLanguageChange("es")}>
              🇪🇸
            </span>
          </div>
          <span> {t("version")} 0.0.1 </span>
        </div>
      </Popup>
    </div>
  );
}

export default Navbar;
