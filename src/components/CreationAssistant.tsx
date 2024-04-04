import { useState } from "react";
import { MandatoryFields } from "./MandatoryFields";
import "./CreationAssistant.css";
export function CreationAssistant() {
  const [appType, setAppType] = useState("None");
  return (
    <div className="createAssistant">
      <div>Create a New application</div>
      <div>
        <span>Select a type of application : </span>
        <select
          name="type"
          id="applicationType"
          onChange={(e) => setAppType(e.target.value)}
          defaultValue={""}
        >
          <option value="" disabled hidden>
            Choose here
          </option>
          <option value="native">Native</option>
          <option value="saml">SAML</option>
          <option value="oidc">OpenID Connect</option>
          <option value="cas">CAS</option>
        </select>
      </div>
      <div>
        <div>
          <label title="test">Nom </label>
          <input type="text" />
        </div>
        <MandatoryFields type={appType}></MandatoryFields>
        <button>next</button>
      </div>
    </div>
  );
}
