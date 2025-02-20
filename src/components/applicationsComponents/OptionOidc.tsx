import AddCircleIcon from "@mui/icons-material/AddCircle";
import { IconButton, List, ListItemText, Tooltip } from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  delOidcRPMetaDataOptionsExtraClaims,
  delOidcRPMetaDataScopeRules,
  newOidcRPMetaDataOptionsExtraClaims,
  newOidcRPMetaDataScopeRules,
  updateOidcMetaDataOptions,
  updateOidcRPMetaDataOptionsExtraClaims,
  updateOidcRPMetaDataScopeRules,
} from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";
import { TableVars } from "./TableVars";
import TextForm from "../../forms/TextForm";
import FileForm from "../../forms/FileForm";
import IntForm from "../../forms/IntForm";
import LongtextForm from "../../forms/LongtextForm";
import BoolForm from "../../forms/BoolForm";
import SelectForm from "../../forms/SelectForm";

export function OptionOidc({
  name,
  optionSelect,
}: {
  optionSelect: string;
  name: string;
}) {
  const data = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  return (
    <>
      {optionSelect === "advanced" && (
        <table>
          <tbody>
            <tr>
              <BoolForm
                fieldName="oidcRPMetaDataOptionsBypassConsent"
                value={Number(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsBypassConsent
                    : attributes.oidcRPMetaDataOptionsBypassConsent.default
                )}
                updateFunc={(e: number) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsBypassConsent",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="oidcRPMetaDataOptionsIDTokenForceClaims"
                value={Number(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsIDTokenForceClaims
                    : attributes.oidcRPMetaDataOptionsIDTokenForceClaims.default
                )}
                updateFunc={(e: number) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsIDTokenForceClaims",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="oidcRPMetaDataOptionsAccessTokenJWT"
                value={Number(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAccessTokenJWT
                    : attributes.oidcRPMetaDataOptionsAccessTokenJWT.default
                )}
                updateFunc={(e: number) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsAccessTokenJWT",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="oidcRPMetaDataOptionsAccessTokenClaims"
                value={Number(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAccessTokenClaims
                    : attributes.oidcRPMetaDataOptionsAccessTokenClaims.default
                )}
                updateFunc={(e: number) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsAccessTokenClaims",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="oidcRPMetaDataOptionsRefreshToken"
                value={Number(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsRefreshToken
                    : attributes.oidcRPMetaDataOptionsRefreshToken.default
                )}
                updateFunc={(e: number) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsRefreshToken",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <TextForm
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsUserIDAttr
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsUserIDAttr
                      : ""
                    : ""
                )}
                fieldName="oidcRPMetaDataOptionsUserIDAttr"
                updateFunc={(e: string) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsUserIDAttr",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <TextForm
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAdditionalAudiences
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAdditionalAudiences
                      : ""
                    : ""
                )}
                fieldName="oidcRPMetaDataOptionsAdditionalAudiences"
                updateFunc={(e: string) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsAdditionalAudiences",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "scope" && (
        <div className="scopes">
          <div>
            <strong className="title3">
              {t("oidcRPMetaDataOptionsExtraClaims")}
            </strong>
            <table id="oidcRPMetaDataOptionsExtraClaims">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.oidcRPMetaDataOptionsExtraClaims
                          ? definitions.oidcRPMetaDataOptionsExtraClaims
                          : ""}
                      </Markdown>
                    }
                  >
                    <th>{t("values")}</th>
                  </Tooltip>
                  <th>
                    <IconButton
                      className="plus"
                      onClick={() =>
                        dispatch(newOidcRPMetaDataOptionsExtraClaims(name))
                      }
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                  </th>
                </tr>
              </thead>
              <TableVars
                appName={name}
                vars={
                  data.oidcRPMetaDataOptionsExtraClaims
                    ? data.oidcRPMetaDataOptionsExtraClaims[name]
                    : {}
                }
                tableID={"oidcRPMetaDataOptionsExtraClaims"}
                dispatch={dispatch}
                delFunction={delOidcRPMetaDataOptionsExtraClaims}
                updateFunction={updateOidcRPMetaDataOptionsExtraClaims}
              />
            </table>
            <IconButton
              className="plus"
              onClick={() =>
                dispatch(newOidcRPMetaDataOptionsExtraClaims(name))
              }
            >
              <AddCircleIcon color="success" />
            </IconButton>
          </div>
          <div>
            <strong className="title3">{t("oidcRPMetaDataScopeRules")}</strong>
            <table id="oidcRPMetaDataScopeRules">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <Tooltip
                    title={
                      <Markdown>
                        {definitions.oidcRPMetaDataScopeRules}
                      </Markdown>
                    }
                  >
                    <th>{t("values")}</th>
                  </Tooltip>
                  <th>
                    <IconButton
                      className="plus"
                      onClick={() =>
                        dispatch(newOidcRPMetaDataScopeRules(name))
                      }
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                  </th>
                </tr>
              </thead>
              <TableVars
                appName={name}
                vars={
                  data.oidcRPMetaDataScopeRules
                    ? data.oidcRPMetaDataScopeRules[name]
                    : {}
                }
                tableID={"oidcRPMetaDataScopeRules"}
                dispatch={dispatch}
                delFunction={delOidcRPMetaDataScopeRules}
                updateFunction={updateOidcRPMetaDataScopeRules}
              />
            </table>
            <IconButton
              className="plus"
              onClick={() => dispatch(newOidcRPMetaDataScopeRules(name))}
            >
              <AddCircleIcon color="success" />
            </IconButton>
          </div>
        </div>
      )}
      {optionSelect === "security" && (
        <table>
          <tbody>
            <tr>
              <SelectForm
                fieldName="oidcRPMetaDataOptionsIDTokenSignAlg"
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsIDTokenSignAlg
                    : attributes.oidcRPMetaDataOptionsIDTokenSignAlg.default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsIDTokenSignAlg",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <SelectForm
                fieldName="oidcRPMetaDataOptionsAccessTokenSignAlg"
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAccessTokenSignAlg
                    : attributes.oidcRPMetaDataOptionsAccessTokenSignAlg.default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsAccessTokenSignAlg",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <SelectForm
                fieldName="oidcRPMetaDataOptionsUserInfoSignAlg"
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsUserInfoSignAlg
                    : attributes.oidcRPMetaDataOptionsUserInfoSignAlg.default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsUserInfoSignAlg",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="oidcRPMetaDataOptionsRequirePKCE"
                value={Number(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsRequirePKCE
                    : attributes.oidcRPMetaDataOptionsRequirePKCE.default
                )}
                updateFunc={(e: number) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsRequirePKCE",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="oidcRPMetaDataOptionsAllowOffline"
                value={Number(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAllowOffline
                    : attributes.oidcRPMetaDataOptionsAllowOffline.default
                )}
                updateFunc={(e: number) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsAllowOffline",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="oidcRPMetaDataOptionsAllowPasswordGrant"
                value={Number(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAllowPasswordGrant
                    : attributes.oidcRPMetaDataOptionsAllowPasswordGrant.default
                )}
                updateFunc={(e: number) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsAllowPasswordGrant",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="oidcRPMetaDataOptionsAllowClientCredentialsGrant"
                value={Number(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAllowClientCredentialsGrant
                    : attributes
                        .oidcRPMetaDataOptionsAllowClientCredentialsGrant
                        .default
                )}
                updateFunc={(e: number) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option:
                        "oidcRPMetaDataOptionsAllowClientCredentialsGrant",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <TextForm
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsRequestUris
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsRequestUris
                      : ""
                    : ""
                )}
                fieldName="oidcRPMetaDataOptionsRequestUris"
                updateFunc={(e: string) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsRequestUris",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <TextForm
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAuthnLevel
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAuthnLevel
                      : ""
                    : ""
                )}
                fieldName="oidcRPMetaDataOptionsAuthnLevel"
                updateFunc={(e: string) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsAuthnLevel",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <TextForm
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name].oidcRPMetaDataOptionsRule
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsRule
                      : ""
                    : ""
                )}
                fieldName="oidcRPMetaDataOptionsRule"
                updateFunc={(e: string) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsRule",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <SelectForm
                fieldName="oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg"
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg
                    : ""
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <SelectForm
                fieldName="oidcRPMetaDataOptionsAccessTokenEncContentEncAlg"
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAccessTokenEncContentEncAlg
                    : attributes
                        .oidcRPMetaDataOptionsAccessTokenEncContentEncAlg
                        .default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option:
                        "oidcRPMetaDataOptionsAccessTokenEncContentEncAlg",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <SelectForm
                fieldName="oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg"
                value={String(
                  (data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg
                    : "") || ""
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <SelectForm
                fieldName="oidcRPMetaDataOptionsIdTokenEncContentEncAlg"
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsIdTokenEncContentEncAlg
                    : attributes.oidcRPMetaDataOptionsIdTokenEncContentEncAlg
                        .default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsIdTokenEncContentEncAlg",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <SelectForm
                fieldName="oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg"
                value={String(
                  (data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg
                    : "") || ""
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <SelectForm
                fieldName="oidcRPMetaDataOptionsUserInfoEncContentEncAlg"
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsUserInfoEncContentEncAlg
                    : attributes.oidcRPMetaDataOptionsUserInfoEncContentEncAlg
                        .default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsUserInfoEncContentEncAlg",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <SelectForm
                fieldName="oidcRPMetaDataOptionsLogoutEncKeyMgtAlg"
                value={String(
                  (data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsLogoutEncKeyMgtAlg
                    : "") || ""
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsLogoutEncKeyMgtAlg",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <SelectForm
                fieldName="oidcRPMetaDataOptionsLogoutEncContentEncAlg"
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsLogoutEncContentEncAlg
                    : attributes.oidcRPMetaDataOptionsLogoutEncContentEncAlg
                        .default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsLogoutEncContentEncAlg",
                      value: e,
                    })
                  )
                }
              />
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "keys" && (
        <table>
          <tbody>
            <tr>
              <TextForm
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsJwksUri
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsJwksUri
                      : ""
                    : ""
                )}
                fieldName="oidcRPMetaDataOptionsJwksUri"
                updateFunc={(e: string) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsJwksUri",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <FileForm
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name].oidcRPMetaDataOptionsJwks
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsJwks
                      : ""
                    : ""
                )}
                fieldName="oidcRPMetaDataOptionsJwks"
                updateFunc={(e: string) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsJwks",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "timouts" && (
        <table>
          <tbody>
            <tr>
              <TextForm
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAuthorizationCodeExpiration
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAuthorizationCodeExpiration
                      : ""
                    : ""
                )}
                fieldName="oidcRPMetaDataOptionsAuthorizationCodeExpiration"
                updateFunc={(e: string) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option:
                        "oidcRPMetaDataOptionsAuthorizationCodeExpiration",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <TextForm
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsIDTokenExpiration
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsIDTokenExpiration
                      : ""
                    : ""
                )}
                fieldName="oidcRPMetaDataOptionsIDTokenExpiration"
                updateFunc={(e: string) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsIDTokenExpiration",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <IntForm
                value={Number(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsAccessTokenExpiration
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAccessTokenExpiration
                      : 0
                    : 0
                )}
                fieldName="oidcRPMetaDataOptionsAccessTokenExpiration"
                updateFunc={(e: string) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsAccessTokenExpiration",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <IntForm
                value={Number(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsOfflineSessionExpiration
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsOfflineSessionExpiration
                      : 0
                    : 0
                )}
                fieldName="oidcRPMetaDataOptionsOfflineSessionExpiration"
                updateFunc={(e: string) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsOfflineSessionExpiration",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "logout" && (
        <table>
          <tbody>
            <tr>
              <BoolForm
                fieldName="oidcRPMetaDataOptionsLogoutBypassConfirm"
                value={Number(
                  (data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsLogoutBypassConfirm
                    : attributes.oidcRPMetaDataOptionsLogoutBypassConfirm
                        .default) ||
                    attributes.oidcRPMetaDataOptionsLogoutBypassConfirm.default
                )}
                updateFunc={(e: number) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsLogoutBypassConfirm",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="oidcRPMetaDataOptionsLogoutSessionRequired"
                value={Number(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsLogoutSessionRequired
                    : attributes.oidcRPMetaDataOptionsLogoutSessionRequired
                        .default
                )}
                updateFunc={(e: number) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsLogoutSessionRequired",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <SelectForm
                fieldName="oidcRPMetaDataOptionsLogoutType"
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsLogoutType
                    : attributes.oidcRPMetaDataOptionsLogoutType.default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsLogoutType",
                      value: e,
                    })
                  )
                }
              />
            </tr>
            <tr>
              <TextForm
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsLogoutUrl
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsLogoutUrl
                      : ""
                    : ""
                )}
                fieldName="oidcRPMetaDataOptionsLogoutUrl"
                updateFunc={(e: string) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsLogoutUrl",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <TextForm
                value={String(
                  data.oidcRPMetaDataOptions
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsPostLogoutRedirectUris
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsPostLogoutRedirectUris
                      : ""
                    : ""
                )}
                fieldName="oidcRPMetaDataOptionsPostLogoutRedirectUris"
                updateFunc={(e: string) => {
                  dispatch(
                    updateOidcMetaDataOptions({
                      name,
                      option: "oidcRPMetaDataOptionsPostLogoutRedirectUris",
                      value: e,
                    })
                  );
                }}
              />
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "comment" && (
        <table>
          <tbody>
            <LongtextForm
              value={String(
                data.oidcRPMetaDataOptions
                  ? data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsComment
                    ? data.oidcRPMetaDataOptions[name]
                        .oidcRPMetaDataOptionsComment
                    : ""
                  : ""
              )}
              fieldName="oidcRPMetaDataOptionsComment"
              updateFunc={(e: string) => {
                dispatch(
                  updateOidcMetaDataOptions({
                    name,
                    option: "oidcRPMetaDataOptionsComment",
                    value: e,
                  })
                );
              }}
            />
          </tbody>
        </table>
      )}
    </>
  );
}
export function OidcOptionSelection({
  optionSelect,
  setOptionSelected,
}: {
  optionSelect: string;
  setOptionSelected: Function;
}) {
  return (
    <List className="optionNavbar sub">
      <ListItemText
        data-testid="oidcRPMetaDataOptionsAdvanced"
        className={`suboption ${optionSelect === "advanced" ? "selected" : ""}`}
        onClick={() => setOptionSelected("advanced")}
      >
        {t("oidcRPMetaDataOptionsAdvanced")}
      </ListItemText>
      <ListItemText
        data-testid="oidcRPMetaDataOptionsScopes"
        className={`suboption ${optionSelect === "scope" ? "selected" : ""}`}
        onClick={() => setOptionSelected("scope")}
      >
        {t("oidcRPMetaDataOptionsScopes")}
      </ListItemText>
      <ListItemText
        data-testid="security"
        className={`suboption ${optionSelect === "security" ? "selected" : ""}`}
        onClick={() => setOptionSelected("security")}
      >
        {t("security")}
      </ListItemText>
      <ListItemText
        data-testid="keys"
        className={`suboption ${optionSelect === "keys" ? "selected" : ""}`}
        onClick={() => setOptionSelected("keys")}
      >
        {t("keys")}
      </ListItemText>
      <ListItemText
        data-testid="oidcRPMetaDataOptionsTimeouts"
        className={`suboption ${optionSelect === "timouts" ? "selected" : ""}`}
        onClick={() => setOptionSelected("timouts")}
      >
        {t("oidcRPMetaDataOptionsTimeouts")}
      </ListItemText>
      <ListItemText
        data-testid="logout"
        className={`suboption ${optionSelect === "logout" ? "selected" : ""}`}
        onClick={() => setOptionSelected("logout")}
      >
        {t("logout")}
      </ListItemText>
      <ListItemText
        data-testid="oidcRPMetaDataOptionsComment"
        className={`suboption ${optionSelect === "comment" ? "selected" : ""}`}
        onClick={() => setOptionSelected("comment")}
      >
        {t("oidcRPMetaDataOptionsComment")}
      </ListItemText>
    </List>
  );
}
