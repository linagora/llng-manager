import { Breadcrumbs, Link } from "@mui/material";
import { push } from "redux-first-history";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ApplicationDashboard } from "../dashboards/ApplicationDashboard";
import { CatAndAppList } from "../dashboards/CatAndAppList";
import SaveButton from "../components/SaveButton";
import { useTranslation } from "react-i18next";
import PartialManager from "../dashboards/PartialManager";

export function PartialConfiguration({
  location,
}: {
  location: { type: string; info: { name: string; type?: string } };
}) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const config = useAppSelector((state) => state.config);
  const metadata = useAppSelector((state) => state.config.data.metadata);

  switch (location.type) {
    case "app":
      return (
        <div className="main">
          <Breadcrumbs className="breadcrumbs">
            <Link underline="hover" color="inherit">
              <span onClick={() => dispatch(push(``))}>{t("conf")}</span>
            </Link>
            <Link underline="hover" color="inherit">
              <span
                onClick={() =>
                  dispatch(push(`#conf/${config.data.config.cfgNum}`))
                }
              >
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
          <SaveButton partial={true} />
        </div>
      );
    default:
      return (
        <div className="main">
          <Breadcrumbs className="breadcrumbs">
            <Link underline="hover" color="text.primary">
              <span onClick={() => dispatch(push(``))}>{t("conf")}</span>
            </Link>
          </Breadcrumbs>
          <PartialManager />
          <SaveButton partial={true} />
        </div>
      );
  }
}
