import Popup from "reactjs-popup";
import { useState } from "react";
import ToggleButton from "./ToggleButton";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  toggleCAS,
  toggleOIDC,
  toggleSAML,
} from "../features/config/configSlice";
import "./Issuers.css";

function Issuers() {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.config.data.config);
  const [warnings, setWarnings] = useState({
    samlWarning:
      !config.issuerDBSAMLActivation && Boolean(config.samlSPMetaDataXML),
    oidcWarning:
      !config.issuerDBOpenIDConnectActivation &&
      Boolean(config.oidcOPMetaDataOptions),
    casWarning:
      !config.issuerDBCASActivation && Boolean(config.casAppMetaDataOptions),
  });
  return (
    <div className="issuersList">
      <div className="issuers" data-testid="issuer.saml">
        <div>
          <ToggleButton
            toggled={config.issuerDBSAMLActivation}
            setToggled={() => {
              setWarnings({ ...warnings, samlWarning: !warnings.samlWarning });
              dispatch(toggleSAML());
            }}
            testid="issuer.toggle.saml"
          />
        </div>
        SAMl{" "}
        <Popup
          data-testid="issuer.popup.saml"
          trigger={<span> {warnings.samlWarning ? "⚠️" : ""}</span>}
          position={"right center"}
          on={"hover"}
          closeOnDocumentClick
        >
          <div className="warningPopup">
            {Object.keys(
              config.samlSPMetaDataXML ? config.samlSPMetaDataXML : {}
            ).map((name) => (
              <div key={name}>{name}</div>
            ))}
          </div>
        </Popup>
      </div>
      <div className="issuers" data-testid="issuer.oidc">
        <ToggleButton
          toggled={config.issuerDBOpenIDConnectActivation}
          setToggled={() => {
            setWarnings({ ...warnings, oidcWarning: !warnings.oidcWarning });
            dispatch(toggleOIDC());
          }}
          testid="issuer.toggle.oidc"
        />
        OIDC{" "}
        <Popup
          data-testid="issuer.popup.oidc"
          trigger={<span> {warnings.oidcWarning ? "⚠️" : ""}</span>}
          position={"right center"}
          on={"hover"}
          closeOnDocumentClick
          className="warningPopup"
        >
          {" "}
          <div className="warningPopup">
            {Object.keys(
              config.oidcRPMetaDataOptions ? config.oidcRPMetaDataOptions : {}
            ).map((name) => (
              <div key={name}>{name}</div>
            ))}{" "}
          </div>
        </Popup>
      </div>
      <div className="issuers" data-testid="issuer.cas">
        <ToggleButton
          toggled={config.issuerDBCASActivation}
          setToggled={() => {
            setWarnings({ ...warnings, casWarning: !warnings.casWarning });
            dispatch(toggleCAS());
          }}
          testid="issuer.toggle.cas"
        />
        CAS
        <Popup
          data-testid="issuer.popup.cas"
          trigger={<span> {warnings.casWarning ? "⚠️" : ""}</span>}
          position={"right center"}
          on={"hover"}
          closeOnDocumentClick
          className="warningPopup"
        >
          <div className="warningPopup">
            {Object.keys(
              config.casAppMetaDataOptions ? config.casAppMetaDataOptions : {}
            ).map((name) => (
              <div key={name}>{name}</div>
            ))}{" "}
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default Issuers;
