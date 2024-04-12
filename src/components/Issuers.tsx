import Popup from "reactjs-popup";
import { useState } from "react";
import ToggleButton from "./ToggleButton";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  toggleCAS,
  toggleGET,
  toggleOID2,
  toggleOIDC,
  toggleSAML,
} from "../features/config/configSlice";
import "./Issuers.css";
import { t } from "i18next";
import { IssuerAssistant } from "./IssuerAssistant";

function Issuers() {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.config.data.config);
  const [warnings, setWarnings] = useState({
    samlWarning:
      !config.issuerDBSAMLActivation && Boolean(config.samlSPMetaDataXML),
    oidcWarning:
      !config.issuerDBOpenIDConnectActivation &&
      Boolean(config.oidcRPMetaDataOptions),
    casWarning:
      !config.issuerDBCASActivation && Boolean(config.casAppMetaDataOptions),
  });

  const [issuerSAMLAssistant, triggerSAMLIssuerAssistant] = useState(false);
  const [issuerOIDCAssistant, triggerOIDCIssuerAssistant] = useState(false);

  return (
    <div className="issuersList">
      <div className="issuers" data-testid="issuer.saml">
        <div>
          <ToggleButton
            toggled={config.issuerDBSAMLActivation}
            setToggled={() => {
              if (
                !config.issuerDBSAMLActivation &&
                !config.samlServicePrivateKeySig &&
                !config.samlServicePublicKeySig
              ) {
                triggerSAMLIssuerAssistant(!issuerSAMLAssistant);
              } else {
                dispatch(toggleSAML());
                setWarnings({
                  ...warnings,
                  samlWarning: !warnings.samlWarning,
                });
              }
            }}
            testid="issuer.toggle.saml"
          />
        </div>
        <IssuerAssistant
          visible={issuerSAMLAssistant}
          type="saml"
          onIgnore={() => {
            triggerSAMLIssuerAssistant(!issuerSAMLAssistant);
          }}
          setVisible={(e) => {
            triggerSAMLIssuerAssistant(e);
            setWarnings({ ...warnings, samlWarning: !warnings.samlWarning });
            dispatch(toggleSAML());
          }}
        />

        <label>{t("issuerDBSAML")}</label>
        <Popup
          data-testid="issuer.popup.saml"
          trigger={
            <span
              style={{
                visibility: warnings.samlWarning ? "visible" : "hidden",
              }}
            >
              ⚠️
            </span>
          }
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
            if (
              !config.issuerDBOpenIDConnectActivation &&
              !config.oidcServicePrivateKeySig &&
              !config.oidcServicePublicKeySig
            ) {
              triggerOIDCIssuerAssistant(!issuerOIDCAssistant);
            } else {
              dispatch(toggleOIDC());
              setWarnings({ ...warnings, oidcWarning: !warnings.oidcWarning });
            }
          }}
          testid="issuer.toggle.oidc"
        />

        <IssuerAssistant
          visible={issuerOIDCAssistant}
          type="oidc"
          onIgnore={() => {
            triggerOIDCIssuerAssistant(!issuerOIDCAssistant);
          }}
          setVisible={(e) => {
            triggerOIDCIssuerAssistant(e);
            setWarnings({ ...warnings, oidcWarning: !warnings.oidcWarning });
            dispatch(toggleOIDC());
          }}
        />

        <label>{t("issuerDBOpenIDConnect")}</label>
        <Popup
          data-testid="issuer.popup.oidc"
          trigger={
            <span
              style={{
                visibility: warnings.oidcWarning ? "visible" : "hidden",
              }}
            >
              ⚠️
            </span>
          }
          position={"right center"}
          on={"hover"}
          closeOnDocumentClick
          className="warningPopup"
        >
          <div className="warningPopup">
            {Object.keys(
              config.oidcRPMetaDataOptions ? config.oidcRPMetaDataOptions : {}
            ).map((name) => (
              <div key={name}>{name}</div>
            ))}
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
        <label> {t("issuerDBCAS")}</label>
        <Popup
          data-testid="issuer.popup.cas"
          trigger={
            <span
              style={{ visibility: warnings.casWarning ? "visible" : "hidden" }}
            >
              ⚠️
            </span>
          }
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
            ))}
          </div>
        </Popup>
      </div>
      <div className="issuers" data-testid="issuer.others">
        <Popup
          position="bottom center"
          arrow={false}
          trigger={
            <div>
              <img src={require("../static/more.png")} alt="More" />
            </div>
          }
        >
          <div className="otherIssuers">
            <div className="menu-item">
              <span>{t("issuerDBOpenID")}</span>
              <input
                type="checkbox"
                checked={Boolean(config.issuerDBOpenIDActivation)}
                onClick={() => dispatch(toggleOID2())}
              />
            </div>
            <div className="menu-item">
              <span>{t("issuerDBGet")}</span>
              <input
                type="checkbox"
                checked={Boolean(config.issuerDBGetActivation)}
                onClick={() => dispatch(toggleGET())}
              />
            </div>
            <div className="menu-item">
              <span>{t("issuerJisty")}</span>
              <input type="checkbox" checked={Boolean(false)} />
            </div>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default Issuers;
