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
  Divider,
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
import TextForm from "../../forms/TextForm";
import BoolForm from "../../forms/BoolForm";
export function OIDCIssuer() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  const [option, setOption] = useState("basic");

  return (
    <div>
      <div className="top">
        <strong className="title">{t("OIDCServiceMetaData")}</strong>
      </div>
      <div className="app">
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
        <Divider className="divider" orientation="vertical" variant="middle" />
        <div className="appDesc">
          <div className="box">
            <table>
              <tbody>
                {option === "basic" && (
                  <tr>
                    <BoolForm
                      fieldName="issuerDBOpenIDConnectActivation"
                      value={Number(
                        config.issuerDBOpenIDConnectActivation ||
                          attributes.issuerDBOpenIDActivation.default
                      )}
                      updateFunc={() => dispatch(toggleOIDC())}
                    />
                  </tr>
                )}
                {option === "oidcServiceMetaDataSecurity" && (
                  <>
                    <tr>
                      <td colSpan={2}>
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
                      </td>
                    </tr>
                    <tr>
                      <BoolForm
                        fieldName="oidcServiceAllowAuthorizationCodeFlow"
                        value={Number(
                          config.oidcServiceAllowAuthorizationCodeFlow
                            ? config.oidcServiceAllowAuthorizationCodeFlow
                            : attributes.oidcServiceAllowAuthorizationCodeFlow
                                .default
                        )}
                        updateFunc={(e: number) =>
                          dispatch(
                            updateConfigParams({
                              param: "oidcServiceAllowAuthorizationCodeFlow",
                              value: e,
                            })
                          )
                        }
                      />
                    </tr>
                    <tr>
                      {" "}
                      <BoolForm
                        fieldName="oidcServiceAllowImplicitFlow"
                        value={Number(
                          config.oidcServiceAllowImplicitFlow
                            ? config.oidcServiceAllowImplicitFlow
                            : attributes.oidcServiceAllowImplicitFlow.default
                        )}
                        updateFunc={(e: number) =>
                          dispatch(
                            updateConfigParams({
                              param: "oidcServiceAllowImplicitFlow",
                              value: e,
                            })
                          )
                        }
                      />
                    </tr>
                    <tr>
                      <BoolForm
                        fieldName="oidcServiceAllowHybridFlow"
                        value={Number(
                          config.oidcServiceAllowHybridFlow
                            ? config.oidcServiceAllowHybridFlow
                            : attributes.oidcServiceAllowHybridFlow.default
                        )}
                        updateFunc={(e: number) =>
                          dispatch(
                            updateConfigParams({
                              param: "oidcServiceAllowHybridFlow",
                              value: e,
                            })
                          )
                        }
                      />
                    </tr>
                  </>
                )}
                {option === "oidcServiceDynamicRegistration" && (
                  <>
                    <tr>
                      <BoolForm
                        fieldName="oidcServiceAllowDynamicRegistration"
                        value={Number(
                          config.oidcServiceAllowDynamicRegistration
                            ? config.oidcServiceAllowDynamicRegistration
                            : attributes.oidcServiceAllowDynamicRegistration
                                .default
                        )}
                        updateFunc={(e: number) =>
                          dispatch(
                            updateConfigParams({
                              param: "oidcServiceAllowDynamicRegistration",
                              value: e,
                            })
                          )
                        }
                      />
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
                  </>
                )}
                {option === "oidcServiceMetaDataTimeouts" && (
                  <>
                    <tr>
                      <TextForm
                        fieldName="oidcServiceAuthorizationCodeExpiration"
                        value={String(
                          config.oidcServiceAuthorizationCodeExpiration ||
                            attributes.oidcServiceAuthorizationCodeExpiration
                              .default
                        )}
                        updateFunc={(e: string) =>
                          dispatch(
                            updateConfigParams({
                              param: "oidcServiceAuthorizationCodeExpiration",
                              value: e,
                            })
                          )
                        }
                      />
                    </tr>
                    <tr>
                      <TextForm
                        fieldName="oidcServiceIDTokenExpiration"
                        value={String(
                          config.oidcServiceIDTokenExpiration ||
                            attributes.oidcServiceIDTokenExpiration.default
                        )}
                        updateFunc={(e: string) =>
                          dispatch(
                            updateConfigParams({
                              param: "oidcServiceIDTokenExpiration",
                              value: e,
                            })
                          )
                        }
                      />
                    </tr>
                    <tr>
                      <TextForm
                        fieldName="oidcServiceAccessTokenExpiration"
                        value={String(
                          config.oidcServiceAccessTokenExpiration ||
                            attributes.oidcServiceAccessTokenExpiration.default
                        )}
                        updateFunc={(e: string) =>
                          dispatch(
                            updateConfigParams({
                              param: "oidcServiceAccessTokenExpiration",
                              value: e,
                            })
                          )
                        }
                      />
                    </tr>
                    <tr>
                      <TextForm
                        fieldName="oidcServiceOfflineSessionExpiration"
                        value={String(
                          config.oidcServiceOfflineSessionExpiration ||
                            attributes.oidcServiceOfflineSessionExpiration
                              .default
                        )}
                        updateFunc={(e: string) =>
                          dispatch(
                            updateConfigParams({
                              param: "oidcServiceOfflineSessionExpiration",
                              value: e,
                            })
                          )
                        }
                      />
                    </tr>
                  </>
                )}
                {option === "oidcServiceMetaDataSessions" && (
                  <>
                    <tr>
                      <TextForm
                        fieldName="oidcStorage"
                        value={config.oidcStorage || ""}
                        updateFunc={(e: string) =>
                          dispatch(
                            updateConfigParams({
                              param: "oidcStorage",
                              value: e,
                            })
                          )
                        }
                      />
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
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
