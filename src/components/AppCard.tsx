import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  CasAppMetaDataOptions,
  VhostOption,
  oidcRPMetaDataOptions,
  samlSPMetaDataXML,
} from "../utils/types";
import { toggleMaintenance } from "../features/config/configSlice";
import ToggleButton from "./ToggleButton";
import "./AppCard.css";

function Maintenance(
  type: string,
  info: {
    name: string;
    config:
      | oidcRPMetaDataOptions
      | CasAppMetaDataOptions
      | samlSPMetaDataXML
      | VhostOption;
  }
) {
  const maintenanceToggled = useAppSelector(
    (state) => state.config.data.config.vhostOptions[info.name]
  );

  if (type === "native") {
    return maintenanceToggled.vhostMaintenance;
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
      | VhostOption;
  };
  type: string;
  issuer?: boolean | number;
  rule: boolean;
}) {
  const dispatch = useAppDispatch();

  const maintenanceToggled = Maintenance(type, info);

  return (
    <div data-testid="appcard">
      <div
        className={`card ${
          (!issuer && !(type === "native")) || !rule ? "issue" : ""
        }${maintenanceToggled ? "Maintenance" : ""}`}
        data-testid={info.name}
      >
        <p>
          <strong>
            {info.name} <span> {!rule ? "⚠️" : ""}</span>
          </strong>
        </p>
        <p>
          description mais pour l'instant c'est pas les vrais données parce que
          c'est moche
        </p>
        {type === "native" ? (
          <div className="maintenanceToggle">
            <p>Maintenance</p>
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
