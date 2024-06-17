import { useTranslation } from "react-i18next";
import "./Footer.css";
import "./NavBar.css";
export function Footer({ cfgVersion }: { cfgVersion?: string }) {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <strong> {t("cfgVersion")}</strong>
      <span>{cfgVersion}</span>
    </footer>
  );
}
