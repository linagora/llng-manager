import TuneIcon from "@mui/icons-material/Tune";
import { Breadcrumbs, IconButton, Link } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { push } from "redux-first-history";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AddApp from "../components/managerComponents/AddApp";
import { AdvancedAuthParams } from "../dashboards/AdvancedAuthParams";
import { ApplicationDashboard } from "../dashboards/ApplicationDashboard";
import { HomePage } from "../dashboards/HomePage";
import { IssuerDashboard } from "../dashboards/IssuerDashboard";
import { SimpleAuthParams } from "../dashboards/SimpleAuthParams";
import SaveButton from "./../components/SaveButton";
import Manager from "./../dashboards/Manager";
export function Configuration({
  location,
}: {
  location: { type: string; info: { name: string; type?: string } };
}) {
  const metadata = useAppSelector((state) => state.config.data.metadata);
  const dispatch = useAppDispatch();
  const [authSimple, setAuthSimple] = useState(true);

  switch (location.type) {
    case "app":
      return (
        <div className="main">
          <Breadcrumbs>
            <Link underline="hover" color="inherit">
              <span onClick={() => dispatch(push(``))}>{t("conf")}</span>
            </Link>
            <Link underline="hover" color="inherit">
              <span onClick={() => dispatch(push(`#conf/${metadata.cfgNum}`))}>
                {metadata.cfgNum}
              </span>
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
          <Breadcrumbs>
            <Link underline="hover" color="inherit">
              <span onClick={() => dispatch(push(``))}>{t("conf")}</span>
            </Link>
            <Link underline="hover" color="text.primary">
              <span onClick={() => dispatch(push(`#conf/${metadata.cfgNum}`))}>
                {metadata.cfgNum}
              </span>
            </Link>
          </Breadcrumbs>
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
            <Link underline="hover" color="inherit">
              <span onClick={() => dispatch(push(``))}>{t("conf")}</span>
            </Link>
            <Link underline="hover" color="inherit">
              <span onClick={() => dispatch(push(`#conf/${metadata.cfgNum}`))}>
                {metadata.cfgNum}
              </span>
            </Link>
            <Link underline="none" color="text.primary">
              {t(location.type)}
            </Link>
          </Breadcrumbs>
          <div>
            <strong className="title">{t("authParams")}</strong>
            <IconButton onClick={() => setAuthSimple(!authSimple)}>
              <TuneIcon />
            </IconButton>
          </div>
          {authSimple && <SimpleAuthParams />}
          {!authSimple && <AdvancedAuthParams />}
          <div>
            <SaveButton />
          </div>
        </div>
      );
    case "issuer":
      return (
        <div className="main">
          <Breadcrumbs>
            <Link underline="hover" color="inherit">
              <span onClick={() => dispatch(push(``))}>{t("conf")}</span>
            </Link>
            <Link underline="hover" color="inherit">
              <span onClick={() => dispatch(push(`#conf/${metadata.cfgNum}`))}>
                {metadata.cfgNum}
              </span>
            </Link>
            <Link underline="none" color="inherit">
              {t(location.type)}
            </Link>

            <Link underline="hover" color="text.primary">
              {t(location.info.name)}
            </Link>
          </Breadcrumbs>
          <IssuerDashboard type={location.info.name} />
          <SaveButton />
        </div>
      );
    default:
      return (
        <div className="main">
          <Breadcrumbs>
            <Link underline="hover" color="text.primary">
              <span onClick={() => dispatch(push(``))}>{t("conf")}</span>
            </Link>
          </Breadcrumbs>
          <HomePage />
        </div>
      );
  }
}
