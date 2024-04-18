import { t } from "i18next";
import "./SaveButton.css";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { getConfigAsync, saveConfigCall } from "../features/config/configSlice";

export default function SaveButton() {
  const [openSavePopup, setOpenSavePopup] = useState(false);
  const [openSavingPopup, setOpenSavingPopup] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        className="saveButton"
        onClick={() => {
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
        }}
      >
        {t("save")}
      </button>
      <div className={`notif orange ${openSavingPopup ? "visible" : "hidden"}`}>
        {t("Saving...")}
      </div>
      <div className={`notif green ${openSavePopup ? "visible" : "hidden"}`}>
        {t("confSaved")}
      </div>
    </div>
  );
}
