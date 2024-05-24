import MenuIcon from "@mui/icons-material/Menu";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import {
  Checkbox,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { push } from "redux-first-history";
import {
  toggleCAS,
  toggleGET,
  toggleOID2,
  toggleOIDC,
  toggleSAML,
} from "../../features/config/configSlice";
import ToggleButton from "../ToggleButton";
import { useAppDispatch, useAppSelector } from "./../../app/hooks";
import { IssuerAssistant } from "./IssuerAssistant";
import "./Issuers.css";

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setWarnings({
      samlWarning:
        !config.issuerDBSAMLActivation &&
        Boolean(
          Object.keys(config.samlSPMetaDataXML ? config.samlSPMetaDataXML : {})
            .length
        ),
      oidcWarning:
        !config.issuerDBOpenIDConnectActivation &&
        Boolean(
          Object.keys(
            config.oidcRPMetaDataOptions ? config.oidcRPMetaDataOptions : {}
          ).length
        ),
      casWarning:
        !config.issuerDBCASActivation &&
        Boolean(
          Object.keys(
            config.casAppMetaDataOptions ? config.casAppMetaDataOptions : {}
          ).length
        ),
    });
  }, [config]);
  return (
    <>
      <div className="issuersList">
        <div className="issuers" data-testid="issuer.saml">
          <div>
            <ToggleButton
              inputProps={{ role: "switch" }}
              data-testid="issuer.toggle.saml"
              color="secondary"
              className="switch"
              checked={Boolean(config.issuerDBSAMLActivation)}
              onChange={() => {
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
                    samlWarning:
                      !warnings.samlWarning &&
                      Boolean(config.samlSPMetaDataXML),
                  });
                }
              }}
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
              setWarnings({
                ...warnings,
                samlWarning:
                  !warnings.samlWarning && Boolean(config.samlSPMetaDataXML),
              });
              dispatch(toggleSAML());
            }}
          />

          <label
            onClick={() => {
              dispatch(push("#issuer/saml"));
            }}
          >
            {t("issuerDBSAML")}
          </label>
          <Tooltip
            title={Object.keys(
              config.samlSPMetaDataXML ? config.samlSPMetaDataXML : {}
            ).map((name) => (
              <div key={name}>{name}</div>
            ))}
          >
            <WarningTwoToneIcon
              color="warning"
              data-testid="warning"
              style={{
                visibility: warnings.samlWarning ? "visible" : "hidden",
              }}
            />
          </Tooltip>
        </div>
        <div className="issuers" data-testid="issuer.oidc">
          <ToggleButton
            inputProps={{ role: "switch" }}
            color="secondary"
            data-testid="issuer.toggle.oidc"
            checked={Boolean(config.issuerDBOpenIDConnectActivation)}
            onChange={() => {
              if (
                !config.issuerDBOpenIDConnectActivation &&
                !config.oidcServicePrivateKeySig &&
                !config.oidcServicePublicKeySig
              ) {
                triggerOIDCIssuerAssistant(!issuerOIDCAssistant);
              } else {
                dispatch(toggleOIDC());
                setWarnings({
                  ...warnings,
                  oidcWarning:
                    !warnings.oidcWarning &&
                    Boolean(config.oidcRPMetaDataOptions),
                });
              }
            }}
          />

          <IssuerAssistant
            visible={issuerOIDCAssistant}
            type="oidc"
            onIgnore={() => {
              triggerOIDCIssuerAssistant(!issuerOIDCAssistant);
            }}
            setVisible={(e) => {
              triggerOIDCIssuerAssistant(e);
              setWarnings({
                ...warnings,
                oidcWarning:
                  !warnings.oidcWarning &&
                  Boolean(config.oidcRPMetaDataOptions),
              });
              dispatch(toggleOIDC());
            }}
          />

          <label
            onClick={() => {
              dispatch(push("#issuer/oidc"));
            }}
          >
            {t("issuerDBOpenIDConnect")}
          </label>
          <Tooltip
            title={Object.keys(
              config.oidcRPMetaDataOptions ? config.oidcRPMetaDataOptions : {}
            ).map((name) => (
              <div key={name}>{name}</div>
            ))}
          >
            <WarningTwoToneIcon
              color="warning"
              data-testid="warning"
              style={{
                visibility: warnings.oidcWarning ? "visible" : "hidden",
              }}
            />
          </Tooltip>
        </div>
        <div className="issuers" data-testid="issuer.cas">
          <ToggleButton
            inputProps={{ role: "switch" }}
            color="secondary"
            data-testid="issuer.toggle.cas"
            checked={Boolean(config.issuerDBCASActivation)}
            onChange={() => {
              setWarnings({
                ...warnings,
                casWarning:
                  !warnings.casWarning && Boolean(config.casAppMetaDataOptions),
              });
              dispatch(toggleCAS());
            }}
          />
          <label
            onClick={() => {
              dispatch(push("#issuer/cas"));
            }}
          >
            {t("issuerDBCAS")}
          </label>
          <Tooltip
            title={Object.keys(
              config.casAppMetaDataOptions ? config.casAppMetaDataOptions : {}
            ).map((name) => (
              <div key={name}>{name}</div>
            ))}
          >
            <WarningTwoToneIcon
              color="warning"
              data-testid="warning"
              style={{ visibility: warnings.casWarning ? "visible" : "hidden" }}
            />
          </Tooltip>
        </div>
        <div className="issuers" data-testid="issuer.others">
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
            sx={{ flexGrow: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem>
              <span
                onClick={() => {
                  dispatch(push("#issuer/oid"));
                }}
              >
                {t("issuerDBOpenID")}
              </span>
              <Checkbox
                checked={Boolean(config.issuerDBOpenIDActivation)}
                onClick={() => dispatch(toggleOID2())}
              />
            </MenuItem>
            <Divider />
            <MenuItem>
              <span
                onClick={() => {
                  dispatch(push("#issuer/get"));
                }}
              >
                {t("issuerDBGet")}
              </span>
              <Checkbox
                checked={Boolean(config.issuerDBGetActivation)}
                onClick={() => dispatch(toggleGET())}
              />
            </MenuItem>
            <Divider />
            <MenuItem>
              <span
                onClick={() => {
                  dispatch(push("#issuer/jitsi"));
                }}
              >
                {t("issuerJitsi")}
              </span>
              <Checkbox checked={Boolean(false)} />
            </MenuItem>
          </Menu>
        </div>
      </div>
    </>
  );
}

export default Issuers;
