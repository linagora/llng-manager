import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
} from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getConfigAsync,
  saveConfigAsync,
} from "../features/config/configSlice";
import { ruleOIDC, ruleSAML } from "../utils/rules";
import "./SaveButton.css";
export default function SaveButton() {
  const [openSavePopup, setOpenSavePopup] = useState(false);
  const [openErrorPopup, setOpenErrorPopup] = useState(false);
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.config);
  const data = useAppSelector((state) => state.config.data.config);
  return (
    <div>
      <Fab
        style={{ position: "fixed", bottom: "2%", left: "2%" }}
        color="primary"
        className="saveButton"
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

      <Dialog open={openSavePopup}>
        <DialogTitle>{t("saveReport")}</DialogTitle>
        <Divider />
        <DialogContent>
          {config.saveResponse ? (
            <>
              {config.saveResponse.__warnings__ ? (
                <>
                  <strong>{t("warnings")}</strong>
                  <span>
                    {config.saveResponse.__warnings__?.map(
                      (el: Record<string, string>) => (
                        <ul key={el.message}>{el.message}</ul>
                      )
                    )}
                  </span>
                </>
              ) : (
                ""
              )}
              {config.saveResponse.__errors__ ? (
                <>
                  <strong>{t("errors")}</strong>
                  <span>
                    {config.saveResponse.__errors__?.map(
                      (el: Record<string, string>) => (
                        <ul key={el.message}>{el.message}</ul>
                      )
                    )}
                  </span>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )}
        </DialogContent>
        <Divider />

        <Button
          onClick={() => {
            dispatch(getConfigAsync());
            setOpenSavePopup(false);
          }}
        >
          {t("close")}
        </Button>
      </Dialog>
      <div className={`notif red ${openErrorPopup ? "visible" : "hidden"}`}>
        {t("Cannot save with app warnings")}
      </div>
    </div>
  );
}
