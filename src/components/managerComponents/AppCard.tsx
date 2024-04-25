import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CasAppMetaDataOptions, samlSPMetaDataXML } from "../../utils/types";
import {
  changeAppName,
  delApp,
  dupApp,
  toggleMaintenance,
} from "../../features/config/configSlice";
import ToggleButton from "../ToggleButton";
import "./AppCard.css";
import { t } from "i18next";
import { push } from "redux-first-history";
import { useState } from "react";
import Popup from "reactjs-popup";

function Maintenance(
  type: string,
  info: {
    name: string;
    config:
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
  const [name, setName] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

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
        <div>
          <strong className="title2">
            {info.name} <span> {!rule ? "⚠️" : ""}</span>
          </strong>
          <Popup
            position="right center"
            nested
            on="hover"
            open={popupOpen}
            onOpen={() => setPopupOpen(true)}
            mouseLeaveDelay={300}
            mouseEnterDelay={0}
            trigger={
              <img
                src={require("../../static/more.png")}
                alt="More"
                className="more"
                onClick={(e) => {
                  e.stopPropagation();
                  setPopupOpen(true);
                }}
              />
            }
          >
            <div className="moreOptions">
              <Popup
                nested
                arrow={false}
                onClose={() => setPopupOpen(false)}
                overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
                trigger={<div className="menu-item">{t("rename")}</div>}
              >
                <div className="popupConf">
                  <label>
                    <span>{t("hostname")} : </span>
                    <input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </label>
                  <button
                    onClick={() => {
                      if (name) {
                        dispatch(
                          changeAppName({ name: info.name, newName: name })
                        );
                      }
                    }}
                  >
                    {t("confirm")}
                  </button>
                </div>
              </Popup>
              <Popup
                nested
                arrow={false}
                onClose={() => setPopupOpen(false)}
                overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
                trigger={<div className="menu-item">{t("duplicate")}</div>}
              >
                <div className="popupConf">
                  <label>
                    <span>{t("hostname")} : </span>
                    <input
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </label>
                  <button
                    onClick={() => {
                      if (name) {
                        dispatch(
                          dupApp({ oldName: info.name, newAppName: name })
                        );
                        setPopupOpen(false);
                      }
                    }}
                  >
                    {t("confirm")}
                  </button>
                </div>
              </Popup>
              <Popup
                nested
                arrow={false}
                onClose={() => setPopupOpen(false)}
                overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
                trigger={<div className="menu-item">{t("deleteEntry")}</div>}
              >
                <div className="popupConf">
                  <label>Are You Sure?</label>
                  <div>
                    <button onClick={() => dispatch(delApp(info.name))}>
                      confirm
                    </button>
                  </div>
                </div>
              </Popup>
            </div>
          </Popup>
        </div>
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
