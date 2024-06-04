import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { t } from "i18next";
import { ConfigState, getConfigAsync } from "../features/config/configSlice";
import "./SaveButton.css";

export function SavePopup({
  config,
  openSavePopup,
  setOpenSavePopup,
  dispatch,
}: {
  config: ConfigState;
  openSavePopup: boolean;
  setOpenSavePopup: Function;
  dispatch: Function;
}) {
  return (
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
  );
}
