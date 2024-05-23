import { Breadcrumbs, Link } from "@mui/material";
import { t } from "i18next";
import { useAppSelector } from "../app/hooks";
import AddApp from "../components/managerComponents/AddApp";
import { ApplicationDashboard } from "../dashboards/ApplicationDashboard";
import { AuthParams } from "../dashboards/AuthParams";
import { HomePage } from "../dashboards/HomePage";
import { IssuerDashboard } from "../dashboards/IssuerDashboard";
import SaveButton from "./../components/SaveButton";
import Manager from "./../dashboards/Manager";

export function Configuration({
  location,
}: {
  location: { type: string; info: { name: string; type?: string } };
}) {
  const metadata = useAppSelector((state) => state.config.data.metadata);
  switch (location.type) {
    case "app":
      return (
        <div className="main">
          <Breadcrumbs>
            <Link underline="hover" color="inherit">
              {t("conf")} {metadata.cfgNum}
            </Link>
            <Link underline="none" color="inherit">
              {location.type}
            </Link>
            <Link underline="none" color="inherit">
              {location.info.type}
            </Link>
            <Link underline="hover" color="text.primary">
              {location.info.name}
            </Link>
          </Breadcrumbs>
          <ApplicationDashboard
            name={location.info.name}
            type={location.info.type ? location.info.type : ""}
          />
          <SaveButton />
        </div>
      );
    case "conf":
      return (
        <div className="main">
          <Manager />
          <div>
            <SaveButton />
            <AddApp />
          </div>
        </div>
      );
    case "authParams":
      return (
        <div className="main">
          <Breadcrumbs>
            <Link underline="none" color="inherit">
              {location.info.name === "latest"
                ? `${t(location.info.name)} ${t("conf")}`
                : `${t("conf")} ${t(location.info.name)}`}
            </Link>
            <Link underline="none" color="text.primary">
              {t(location.type)}
            </Link>
          </Breadcrumbs>
          <AuthParams />
          <div>
            <SaveButton />
          </div>
        </div>
      );
    case "issuer":
      return (
        <div className="main">
          <IssuerDashboard type={location.info.name} />
        </div>
      );
    default:
      return <HomePage />;
  }
}
