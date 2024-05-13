import { useTranslation } from "react-i18next";
import "./NavBar.css";
import { useAppSelector } from "../app/hooks";
import "./Footer.css";
export function Footer() {
  const { t } = useTranslation();
  const cfgVersion = useAppSelector(
    (state) => state.config.data.metadata.cfgVersion
  );

  return (
    <footer className="footer">
      <strong> {t("cfgVersion")}</strong>
      <span>{cfgVersion}</span>
    </footer>
  );
}
