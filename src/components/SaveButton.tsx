import SaveIcon from "@mui/icons-material/Save";
import { Fab } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { saveConfigAsync } from "../features/config/configSlice";
import { ruleOIDC, ruleSAML } from "../utils/rules";
import "./SaveButton.css";
import { SavePopup } from "./SavePopup";
export default function SaveButton() {
  const [openSavePopup, setOpenSavePopup] = useState(false);
  const [openErrorPopup, setOpenErrorPopup] = useState(false);
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.config);
  const data = useAppSelector((state) => state.config.data.config);
  return (
    <div>
      <Fab
        className="saveButton"
        style={{ position: "fixed", bottom: "2%", left: "2%" }}
        color="primary"
        onClick={async () => {
          let stateOk = true;
          if (data.oidcRPMetaDataOptions) {
            Object.keys(data.oidcRPMetaDataOptions).forEach((app) => {
              if (
                !ruleOIDC(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[app]
                    : {}
                )
              ) {
                stateOk = false;
              }
            });
          }
          if (data.samlSPMetaDataXML) {
            Object.keys(data.samlSPMetaDataXML).forEach((app) => {
              if (
                !ruleSAML(
                  data.samlSPMetaDataXML ? data.samlSPMetaDataXML[app] : {}
                )
              ) {
                stateOk = false;
              }
            });
          }
          if (stateOk) {
            dispatch(saveConfigAsync(config.data.config));
            setOpenSavePopup(true);
          } else {
            setOpenErrorPopup(true);
            setTimeout(() => {
              setOpenErrorPopup(false);
            }, 2000);
          }
        }}
      >
        <SaveIcon fontSize="large" />
      </Fab>
      <SavePopup
        config={config}
        dispatch={dispatch}
        openSavePopup={openSavePopup}
        setOpenSavePopup={setOpenSavePopup}
      />
      <div className={`notif red ${openErrorPopup ? "visible" : "hidden"}`}>
        {t("Cannot save with app warnings")}
      </div>
    </div>
  );
}
