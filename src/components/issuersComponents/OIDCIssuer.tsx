import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  delModuleOpt,
  newModuleOpt,
  toggleOIDC,
  updateConfigParams,
  updateModuleOpt,
} from "../../features/config/configSlice";
import OidcKeyForm from "../../forms/OidcKeyForm";
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";
import { llngConfig } from "../../utils/types";
import { TableVars } from "../applicationsComponents/TableVars";
export function OIDCIssuer() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  const [option, setOption] = useState("basic");

  return (
    <div>
      <strong className="title">{t("OIDCServiceMetaData")}</strong>
      <div className="optionNavbar">
        <label
          className={`option ${option === "basic" ? "selected" : ""}`}
          onClick={() => {
            setOption("basic");
          }}
        >
          {t("Basic Option")}
        </label>
        <label
          className={`option ${
            option === "oidcServiceDynamicRegistration" ? "selected" : ""
          }`}
          onClick={() => setOption("oidcServiceDynamicRegistration")}
        >
          {t("oidcServiceDynamicRegistration")}
        </label>
        <label
          className={`option ${
            option === "oidcServiceMetaDataSecurity" ? "selected" : ""
          }`}
          onClick={() => setOption("oidcServiceMetaDataSecurity")}
        >
          {t("oidcServiceMetaDataSecurity")}
        </label>
        <label
          className={`option ${
            option === "oidcServiceMetaDataTimeouts" ? "selected" : ""
          }`}
          onClick={() => setOption("oidcServiceMetaDataTimeouts")}
        >
          {t("oidcServiceMetaDataTimeouts")}
        </label>
        <label
          className={`option ${
            option === "oidcServiceMetaDataSessions" ? "selected" : ""
          }`}
          onClick={() => setOption("oidcServiceMetaDataSessions")}
        >
          {t("oidcServiceMetaDataSessions")}
        </label>
      </div>
      <div className="appDesc">
        {option === "basic" && (
          <div className="box">
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.issuerDBOpenIDConnectActivation
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th>{t("issuerDBOIDCActivation")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.issuerDBOpenIDConnectActivation ||
                          attributes.issuerDBOpenIDActivation.default
                        }
                        onChange={() => dispatch(toggleOIDC())}
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label={t("on")}
                        />
                        <FormControlLabel
                          value={0}
                          control={<Radio />}
                          label={t("off")}
                        />
                      </RadioGroup>
                    </FormControl>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {option === "oidcServiceMetaDataSecurity" && (
          <>
            <OidcKeyForm
              value={{
                type: config.oidcServiceKeyTypeSig
                  ? config.oidcServiceKeyTypeSig
                  : attributes.oidcServiceKeyTypeSig.default,
                hash: config.oidcServiceKeyIdSig || "",
                priv: config.oidcServicePrivateKeySig || "",
                pub: config.oidcServicePublicKeySig || "",
              }}
              fieldNames={{
                type: "oidcServiceKeyTypeSig",
                hash: "oidcServiceKeyIdSig",
                priv: "oidcServicePrivateKeySig",
                pub: "oidcServicePublicKeySig",
              }}
              updateFunc={<K extends keyof llngConfig>(e: {
                param: K;
                value: llngConfig[K];
              }) => dispatch(updateConfigParams(e))}
            />

            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.oidcServiceAllowAuthorizationCodeFlow
                          ? definitions.oidcServiceAllowAuthorizationCodeFlow
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("oidcServiceAllowAuthorizationCodeFlow")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.oidcServiceAllowAuthorizationCodeFlow
                            ? config.oidcServiceAllowAuthorizationCodeFlow
                            : attributes.oidcServiceAllowAuthorizationCodeFlow
                                .default
                        }
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param: "oidcServiceAllowAuthorizationCodeFlow",
                              value: e.target.value,
                            })
                          )
                        }
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label={t("on")}
                        />
                        <FormControlLabel
                          value={0}
                          control={<Radio />}
                          label={t("off")}
                        />
                      </RadioGroup>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.oidcServiceAllowImplicitFlow
                          ? definitions.oidcServiceAllowImplicitFlow
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("oidcServiceAllowImplicitFlow")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.oidcServiceAllowImplicitFlow
                            ? config.oidcServiceAllowImplicitFlow
                            : attributes.oidcServiceAllowImplicitFlow.default
                        }
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param: "oidcServiceAllowImplicitFlow",
                              value: e.target.value,
                            })
                          )
                        }
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label={t("on")}
                        />
                        <FormControlLabel
                          value={0}
                          control={<Radio />}
                          label={t("off")}
                        />
                      </RadioGroup>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.oidcServiceAllowHybridFlow
                          ? definitions.oidcServiceAllowHybridFlow
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("oidcServiceAllowHybridFlow")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.oidcServiceAllowHybridFlow
                            ? config.oidcServiceAllowHybridFlow
                            : attributes.oidcServiceAllowHybridFlow.default
                        }
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param: "oidcServiceAllowHybridFlow",
                              value: e.target.value,
                            })
                          )
                        }
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label={t("on")}
                        />
                        <FormControlLabel
                          value={0}
                          control={<Radio />}
                          label={t("off")}
                        />
                      </RadioGroup>
                    </FormControl>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        {option === "oidcServiceDynamicRegistration" && (
          <table>
            <tbody>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {definitions.oidcServiceAllowDynamicRegistration}
                    </Markdown>
                  }
                >
                  <th>{t("oidcServiceAllowDynamicRegistration")}</th>
                </Tooltip>
                <td>
                  <FormControl>
                    <RadioGroup
                      row
                      value={
                        config.oidcServiceAllowDynamicRegistration
                          ? config.oidcServiceAllowDynamicRegistration
                          : attributes.oidcServiceAllowDynamicRegistration
                              .default
                      }
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "oidcServiceAllowDynamicRegistration",
                            value: e.target.value,
                          })
                        )
                      }
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={t("on")}
                      />
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label={t("off")}
                      />
                    </RadioGroup>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {t("oidcServiceDynamicRegistrationExportedVars")}
                    </AccordionSummary>
                    <table id="oidcServiceDynamicRegistrationExportedVars">
                      <thead>
                        <tr>
                          <th>{t("keys")}</th>
                          <th>{t("values")}</th>
                          <th>
                            <IconButton
                              className="plus"
                              onClick={() =>
                                dispatch(
                                  newModuleOpt(
                                    "oidcServiceDynamicRegistrationExportedVars"
                                  )
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </th>
                        </tr>
                      </thead>
                      <TableVars
                        appName="oidcServiceDynamicRegistrationExportedVars"
                        vars={
                          config.oidcServiceDynamicRegistrationExportedVars
                            ? config.oidcServiceDynamicRegistrationExportedVars
                            : {}
                        }
                        tableID="oidcServiceDynamicRegistrationExportedVars"
                        dispatch={dispatch}
                        delFunction={delModuleOpt}
                        updateFunction={updateModuleOpt}
                      />
                    </table>
                  </Accordion>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {t("oidcServiceDynamicRegistrationExtraClaims")}
                    </AccordionSummary>
                    <table id="oidcServiceDynamicRegistrationExtraClaims">
                      <thead>
                        <tr>
                          <th>{t("keys")}</th>
                          <th>{t("values")}</th>
                          <th>
                            <IconButton
                              className="plus"
                              onClick={() =>
                                dispatch(
                                  newModuleOpt(
                                    "oidcServiceDynamicRegistrationExtraClaims"
                                  )
                                )
                              }
                            >
                              <AddCircleIcon color="success" />
                            </IconButton>
                          </th>
                        </tr>
                      </thead>
                      <TableVars
                        appName="oidcServiceDynamicRegistrationExtraClaims"
                        vars={
                          config.oidcServiceDynamicRegistrationExtraClaims
                            ? config.oidcServiceDynamicRegistrationExtraClaims
                            : {}
                        }
                        tableID="oidcServiceDynamicRegistrationExtraClaims"
                        dispatch={dispatch}
                        delFunction={delModuleOpt}
                        updateFunction={updateModuleOpt}
                      />
                    </table>
                  </Accordion>
                </td>
              </tr>
            </tbody>
          </table>
        )}
        {option === "oidcServiceMetaDataTimeouts" && (
          <table>
            <tbody>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {definitions.oidcServiceAuthorizationCodeExpiration
                        ? definitions.oidcServiceAuthorizationCodeExpiration
                        : ""}
                    </Markdown>
                  }
                >
                  <th>{t("oidcServiceAuthorizationCodeExpiration")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    fullWidth
                    type="number"
                    className="formInput"
                    value={
                      config.oidcServiceAuthorizationCodeExpiration ||
                      attributes.oidcServiceAuthorizationCodeExpiration.default
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "oidcServiceAuthorizationCodeExpiration",
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </td>
              </tr>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {definitions.oidcServiceIDTokenExpiration
                        ? definitions.oidcServiceIDTokenExpiration
                        : ""}
                    </Markdown>
                  }
                >
                  <th>{t("oidcServiceIDTokenExpiration")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    fullWidth
                    type="number"
                    className="formInput"
                    value={
                      config.oidcServiceIDTokenExpiration ||
                      attributes.oidcServiceIDTokenExpiration.default
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "oidcServiceIDTokenExpiration",
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </td>
              </tr>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {definitions.oidcServiceAccessTokenExpiration
                        ? definitions.oidcServiceAccessTokenExpiration
                        : ""}
                    </Markdown>
                  }
                >
                  <th>{t("oidcServiceAccessTokenExpiration")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    fullWidth
                    type="number"
                    className="formInput"
                    value={
                      config.oidcServiceAccessTokenExpiration ||
                      attributes.oidcServiceAccessTokenExpiration.default
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "oidcServiceAccessTokenExpiration",
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </td>
              </tr>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {definitions.oidcServiceOfflineSessionExpiration
                        ? definitions.oidcServiceOfflineSessionExpiration
                        : ""}
                    </Markdown>
                  }
                >
                  <th>{t("oidcServiceOfflineSessionExpiration")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    fullWidth
                    type="number"
                    className="formInput"
                    value={
                      config.oidcServiceOfflineSessionExpiration ||
                      attributes.oidcServiceOfflineSessionExpiration.default
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "oidcServiceOfflineSessionExpiration",
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}
        {option === "oidcServiceMetaDataSessions" && (
          <table>
            <tbody>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {definitions.oidcStorage ? definitions.oidcStorage : ""}
                    </Markdown>
                  }
                >
                  <th>{t("oidcStorage")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    fullWidth
                    className="formInput"
                    value={config.oidcStorage || ""}
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "oidcStorage",
                          value: e.target.value,
                        })
                      )
                    }
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={2}>{t("oidcStorageOptions")}</th>
              </tr>
              <tr>
                <td colSpan={2}>
                  <table id="oidcStorageOptions">
                    <thead>
                      <tr>
                        <th>{t("keys")}</th>
                        <th> {t("values")}</th>
                        <th>
                          <IconButton
                            className="plus"
                            onClick={() =>
                              dispatch(newModuleOpt("oidcStorageOptions"))
                            }
                          >
                            <AddCircleIcon color="success" />
                          </IconButton>
                        </th>
                      </tr>
                    </thead>
                    <TableVars
                      appName="oidcStorageOptions"
                      vars={
                        config.oidcStorageOptions
                          ? config.oidcStorageOptions
                          : {}
                      }
                      tableID="oidcStorageOptions"
                      dispatch={dispatch}
                      delFunction={delModuleOpt}
                      updateFunction={updateModuleOpt}
                    />
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
