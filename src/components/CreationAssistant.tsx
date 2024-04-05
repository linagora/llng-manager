import { useState } from "react";
import { MandatoryFields } from "./MandatoryFields";
import "./CreationAssistant.css";
import { t } from "i18next";
export function CreationAssistant() {
  const [appType, setAppType] = useState("None");
  return (
    <div className="createAssistant">
      <div>{t("newApp")}</div>
      <div>
        <span>{t("type")}</span>
        <select
          name="type"
          id="applicationType"
          onChange={(e) => setAppType(e.target.value)}
          defaultValue={""}
        >
          <option value="" disabled hidden>
            {t("chooseType")}
          </option>
          <option value="native">Native</option>
          <option value="saml">{t("saml")}</option>
          <option value="oidc">{t("OpenIDConnect")}</option>
          <option value="cas">{t("issuerDBCAS")}</option>
        </select>
      </div>
      <div>
        <div>
          <label title="test">{t("name")} </label>
          <input type="text" />
        </div>
        <MandatoryFields type={appType}></MandatoryFields>
        <button>{t("next")}</button>
      </div>
    </div>
  );
}
