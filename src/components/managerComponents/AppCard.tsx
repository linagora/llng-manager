import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  CasAppMetaDataOptions,
  oidcRPMetaDataOptions,
  samlSPMetaDataXML,
} from "../../utils/types";
import { toggleMaintenance } from "../../features/config/configSlice";
import ToggleButton from "../ToggleButton";
import "./AppCard.css";
import { t } from "i18next";
import { push } from "redux-first-history";

function Maintenance(
  type: string,
  info: {
    name: string;
    config:
      | oidcRPMetaDataOptions
      | CasAppMetaDataOptions
      | samlSPMetaDataXML
      | Record<string, boolean | number | string>;
  }
): boolean {
  const maintenanceToggled = useAppSelector(
    (state) => state.config.data.config.vhostOptions[info.name]
  );

  if (type === "native") {
    return Boolean(maintenanceToggled.vhostMaintenance);
  }
  return false;
}

function AppCard({
  info,
  type,
  issuer,
  rule,
}: {
  info: {
    name: string;
    config:
      | oidcRPMetaDataOptions
      | CasAppMetaDataOptions
      | samlSPMetaDataXML
      | Record<string, boolean | number | string>;
  };
  type: string;
  issuer?: boolean | number;
  rule: boolean;
}) {
  const dispatch = useAppDispatch();
  const maintenanceToggled = Maintenance(type, info);

  return (
    <div
      data-testid="appcard"
      onClick={() => dispatch(push(`#app/${type}/${info.name}`))}
    >
      <div
        className={`card ${
          (!issuer && !(type === "native")) || !rule ? "issue" : ""
        }${maintenanceToggled ? "Maintenance" : ""}`}
        data-testid={info.name}
      >
        <p>
          <strong className="title2">
            {info.name} <span> {!rule ? "⚠️" : ""}</span>
          </strong>
        </p>
        {type === "native" ? (
          <div className="maintenanceToggle">
            <p>{t("maintenance")}</p>
            <div
              data-testid={`maintenanceButton.${info.name}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ToggleButton
                toggled={maintenanceToggled}
                setToggled={() =>
                  dispatch(toggleMaintenance(String(info.name)))
                }
                testid={`maintenance.${info.name}`}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AppCard;