import { useState } from "react";
import ToggleButton from "../ToggleButton";
import { useAppDispatch, useAppSelector } from "./../../app/hooks";
import {
  toggleCAS,
  toggleGET,
  toggleOID2,
  toggleOIDC,
  toggleSAML,
} from "../../features/config/configSlice";
import "./Issuers.css";
import { t } from "i18next";
import { IssuerAssistant } from "./IssuerAssistant";
import {
  Checkbox,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import React from "react";

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
  return (
    <div className="issuersList">
      <div className="issuers" data-testid="issuer.saml">
        <div>
          <ToggleButton
            color="secondary"
            className="switch"
            checked={config.issuerDBSAMLActivation}
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
                  samlWarning: !warnings.samlWarning,
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
            setWarnings({ ...warnings, samlWarning: !warnings.samlWarning });
            dispatch(toggleSAML());
          }}
        />

        <label>{t("issuerDBSAML")}</label>
        <Tooltip
          title={Object.keys(
            config.samlSPMetaDataXML ? config.samlSPMetaDataXML : {}
          ).map((name) => (
            <div key={name}>{name}</div>
          ))}
        >
          <WarningTwoToneIcon
            color="warning"
            style={{
              visibility: warnings.samlWarning ? "visible" : "hidden",
            }}
          />
        </Tooltip>
      </div>
      <div className="issuers" data-testid="issuer.oidc">
        <ToggleButton
          color="secondary"
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
              setWarnings({ ...warnings, oidcWarning: !warnings.oidcWarning });
            }
          }}
          // testid="issuer.toggle.oidc"
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
        <Tooltip
          title={Object.keys(
            config.oidcRPMetaDataOptions ? config.oidcRPMetaDataOptions : {}
          ).map((name) => (
            <div key={name}>{name}</div>
          ))}
        >
          <WarningTwoToneIcon
            color="warning"
            style={{
              visibility: warnings.oidcWarning ? "visible" : "hidden",
            }}
          />
        </Tooltip>
      </div>
      <div className="issuers" data-testid="issuer.cas">
        <ToggleButton
          color="secondary"
          checked={Boolean(config.issuerDBCASActivation)}
          onChange={() => {
            setWarnings({ ...warnings, casWarning: !warnings.casWarning });
            dispatch(toggleCAS());
          }}
          // testid="issuer.toggle.cas"
        />
        <label> {t("issuerDBCAS")}</label>
        <Tooltip
          title={Object.keys(
            config.casAppMetaDataOptions ? config.casAppMetaDataOptions : {}
          ).map((name) => (
            <div key={name}>{name}</div>
          ))}
        >
          <WarningTwoToneIcon
            color="warning"
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
            <span>{t("issuerDBOpenID")}</span>
            <Checkbox
              checked={Boolean(config.issuerDBOpenIDActivation)}
              onClick={() => dispatch(toggleOID2())}
            />
          </MenuItem>
          <Divider />
          <MenuItem>
            <span>{t("issuerDBGet")}</span>
            <Checkbox
              checked={Boolean(config.issuerDBGetActivation)}
              onClick={() => dispatch(toggleGET())}
            />
          </MenuItem>
          <Divider />
          <MenuItem>
            <span>{t("issuerJisty")}</span>
            <Checkbox checked={Boolean(false)} />
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Issuers;
