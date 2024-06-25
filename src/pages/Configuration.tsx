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
import TreeRender from "../dashboards/Tree";
import ctree from "../static/ctrees.json";
import tree from "../static/tree.json";
import SaveButton from "./../components/SaveButton";
import Manager from "./../dashboards/Manager";

export function Configuration({
  location,
}: {
  location: { type: string; info: { name: string; type?: string } };
}) {
  const metadata = useAppSelector((state) => state.config.data.metadata);
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  const [authSimple, setAuthSimple] = useState(true);

  switch (location.type) {
    case "app":
      return (
        <div className="main">
          <Breadcrumbs>
            <Link underline="hover" color="inherit">
              <span onClick={() => dispatch(push(`#conf/${metadata.cfgNum}`))}>
                {t("conf")} {metadata.cfgNum}
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
              <span onClick={() => dispatch(push(`#conf/${metadata.cfgNum}`))}>
                {t("conf")} {metadata.cfgNum}
              </span>
            </Link>
            <Link underline="none" color="inherit">
              {location.type}
            </Link>
            <Link underline="none" color="text.primary">
              {location.info.name}
            </Link>
          </Breadcrumbs>
          <IssuerDashboard type={location.info.name} />
          <SaveButton />
        </div>
      );
    case "tree":
      return (
        <div className="main">
          <Breadcrumbs>
            <Link underline="hover" color="inherit">
              <span onClick={() => dispatch(push(`#tree/${metadata.cfgNum}`))}>
                {t("conf")} {metadata.cfgNum}
              </span>
            </Link>
            <Link underline="none" color="inherit">
              {t(location.type)}
            </Link>

            <Link underline="hover" color="text.primary">
              {t(location.info.name)}
            </Link>
          </Breadcrumbs>
          <TreeRender tree={tree} ctree={ctree} config={config} />
          <SaveButton />
        </div>
      );
    default:
      return <HomePage />;
  }
}
