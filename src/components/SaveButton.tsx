import { t } from "i18next";
import "./SaveButton.css";

function SaveButton() {
  return (
    <div>
      <button
        className="saveButton"
        onClick={() => {
          console.log("saved");
        }}
      >
        {t("save")}
      </button>
    </div>
  );
}

export default SaveButton;
