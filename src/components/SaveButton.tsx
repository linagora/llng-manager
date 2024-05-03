import { t } from "i18next";
import "./SaveButton.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getConfigAsync, saveConfigCall } from "../features/config/configSlice";
import { ruleOIDC, ruleSAML } from "../utils/rules";
import { Fab } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
export default function SaveButton() {
  const [openSavePopup, setOpenSavePopup] = useState(false);
  const [openSavingPopup, setOpenSavingPopup] = useState(false);
  const [openErrorPopup, setOpenErrorPopup] = useState(false);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.config.data.config);
  return (
    <div>
      <Fab
        style={{ position: "fixed", bottom: "2%", left: "2%" }}
        color="primary"
        className="saveButton"
        onClick={() => {
          let stateOk = true;
          Object.keys(data.oidcRPMetaDataOptions).forEach((app) => {
            if (!ruleOIDC(data.oidcRPMetaDataOptions[app])) {
              stateOk = false;
            }
          });
          Object.keys(data.samlSPMetaDataXML).forEach((app) => {
            if (!ruleSAML(data.samlSPMetaDataXML[app])) {
              stateOk = false;
            }
          });
          if (stateOk) {
            dispatch(saveConfigCall());
            setOpenSavingPopup(true);
            setTimeout(() => {
              setOpenSavingPopup(false);
              dispatch(getConfigAsync());
              setOpenSavePopup(true);
              setTimeout(() => {
                setOpenSavePopup(false);
              }, 2000);
            }, 2000);
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
      <div className={`notif orange ${openSavingPopup ? "visible" : "hidden"}`}>
        {t("Saving...")}
      </div>
      <div className={`notif green ${openSavePopup ? "visible" : "hidden"}`}>
        {t("successfullySaved")}
      </div>
      <div className={`notif red ${openErrorPopup ? "visible" : "hidden"}`}>
        {t("Cannot save with app warnings")}
      </div>
    </div>
  );
}
