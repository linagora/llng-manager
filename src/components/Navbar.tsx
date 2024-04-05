import { t } from "i18next";
import "./NavBar.css";
function Navbar() {
  return (
    <div className="navbar">
      <p> {t("Configuration")} </p>
      <p> {t("sessions")} </p>
      <p> {t("notifications")} </p>
      <p> {t("secondFactors")} </p>
    </div>
  );
}

export default Navbar;
