import { t } from "i18next";
import "./SaveButton.css";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { getConfigAsync, saveConfigCall } from "../features/config/configSlice";

export default function SaveButton() {
  const [openSavePopup, setOpenSavePopup] = useState(false);
  const dispatch = useAppDispatch();

  const tempSavePopup = () => {
    setOpenSavePopup(true);
    setTimeout(() => {
      setOpenSavePopup(false);
    }, 2000);
  };

  return (
    <div>
      <button
        className="saveButton"
        onClick={() => {
          dispatch(saveConfigCall());
          tempSavePopup();
          dispatch(getConfigAsync());
        }}
      >
        {t("save")}
      </button>
      <div className={`notif ${openSavePopup ? "visible" : "hidden"}`}>
        {t("confSaved")}
      </div>
    </div>
  );
}
