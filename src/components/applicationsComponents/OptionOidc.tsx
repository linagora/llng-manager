import { t } from "i18next";
import { useState } from "react";
import attributes from "../../static/attributes.json";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleChangeFile } from "../../utils/readFiles";
import { URLLoader } from "../managerComponents/URLLoader";
import {
  delOidcRPMetaDataOptionsExtraClaims,
  delOidcRPMetaDataScopeRules,
  newOidcRPMetaDataOptionsExtraClaims,
  newOidcRPMetaDataScopeRules,
  updateOidcMetaDataOptions,
  updateOidcRPMetaDataOptionsExtraClaims,
  updateOidcRPMetaDataOptionsJwks,
  updateOidcRPMetaDataScopeRules,
} from "../../features/config/configSlice";
import { TableVars } from "./TableVars";

export function OptionOidc({ name }: { name: string }) {
  const [optionSelect, setOptionSelected] = useState("advanced");
  const data = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="optionNavbar">
        <label onClick={() => setOptionSelected("advanced")}>
          {t("oidcRPMetaDataOptionsAdvanced")}
        </label>
        <label onClick={() => setOptionSelected("scope")}>
          {t("oidcRPMetaDataOptionsScopes")}
        </label>
        <label onClick={() => setOptionSelected("security")}>
          {t("security")}
        </label>
        <label onClick={() => setOptionSelected("keys")}>{t("keys")}</label>
        <label onClick={() => setOptionSelected("timouts")}>
          {t("oidcRPMetaDataOptionsTimeouts")}
        </label>
        <label onClick={() => setOptionSelected("logout")}>{t("logout")}</label>
        <label onClick={() => setOptionSelected("comment")}>
          {t("oidcRPMetaDataOptionsComment")}
        </label>
      </div>
      {optionSelect === "advanced" && (
        <table>
          <tbody>
            <tr>
              <th>{t("oidcRPMetaDataOptionsBypassConsent")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsBypassConsent"
                      value={1}
                      checked={Boolean(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsBypassConsent
                      )}
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsBypassConsent",
                            value: 1,
                          })
                        );
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsBypassConsent"
                      value={0}
                      checked={
                        !Boolean(
                          data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsBypassConsent
                        )
                      }
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsBypassConsent",
                            value: 0,
                          })
                        );
                      }}
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsIDTokenForceClaims")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsIDTokenForceClaims"
                      value={1}
                      checked={Boolean(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsIDTokenForceClaims
                      )}
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsIDTokenForceClaims",
                            value: 1,
                          })
                        );
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsIDTokenForceClaims"
                      value={0}
                      checked={
                        !Boolean(
                          data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsIDTokenForceClaims
                        )
                      }
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsIDTokenForceClaims",
                            value: 0,
                          })
                        );
                      }}
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsAccessTokenJWT")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsAccessTokenJWT"
                      value={1}
                      checked={Boolean(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAccessTokenJWT
                      )}
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsAccessTokenJWT",
                            value: 1,
                          })
                        );
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsAccessTokenJWT"
                      value={0}
                      checked={
                        !Boolean(
                          data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAccessTokenJWT
                        )
                      }
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsAccessTokenJWT",
                            value: 0,
                          })
                        );
                      }}
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsAccessTokenClaims")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsAccessTokenClaims"
                      value={1}
                      checked={Boolean(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAccessTokenClaims
                      )}
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsAccessTokenClaims",
                            value: 1,
                          })
                        );
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsAccessTokenClaims"
                      value={0}
                      checked={
                        !Boolean(
                          data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAccessTokenClaims
                        )
                      }
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsAccessTokenClaims",
                            value: 0,
                          })
                        );
                      }}
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsRefreshToken")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsRefreshToken"
                      value={1}
                      checked={Boolean(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsRefreshToken
                      )}
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsRefreshToken",
                            value: 1,
                          })
                        );
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsRefreshToken"
                      value={0}
                      checked={
                        !Boolean(
                          data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsRefreshToken
                        )
                      }
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsRefreshToken",
                            value: 0,
                          })
                        );
                      }}
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsUserIDAttr")}</th>
              <td>
                <input
                  className="form"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsUserIDAttr
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsUserIDAttr
                      : ""
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsUserIDAttr",
                        value: e.target.value,
                      })
                    );
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsAdditionalAudiences")}</th>
              <td>
                <input
                  className="form"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsAdditionalAudiences
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAdditionalAudiences
                      : ""
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsAdditionalAudiences",
                        value: e.target.value,
                      })
                    );
                  }}
                />
              </td>
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
                  <th>{t("values")}</th>
                  <button
                    className="plus"
                    onClick={() =>
                      dispatch(newOidcRPMetaDataOptionsExtraClaims(name))
                    }
                  >
                    +
                  </button>
                </tr>
              </thead>
              {TableVars(
                name,
                data.oidcRPMetaDataOptionsExtraClaims
                  ? data.oidcRPMetaDataOptionsExtraClaims[name]
                  : {},
                "oidcRPMetaDataOptionsExtraClaims",
                delOidcRPMetaDataOptionsExtraClaims,
                updateOidcRPMetaDataOptionsExtraClaims
              )}
            </table>
            <button
              className="plus"
              onClick={() =>
                dispatch(newOidcRPMetaDataOptionsExtraClaims(name))
              }
            >
              +
            </button>
          </div>
          <div>
            <strong className="title3">{t("oidcRPMetaDataScopeRules")}</strong>
            <table id="oidcRPMetaDataScopeRules">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <th>{t("values")}</th>
                  <button
                    className="plus"
                    onClick={() => dispatch(newOidcRPMetaDataScopeRules(name))}
                  >
                    +
                  </button>
                </tr>
              </thead>
              {TableVars(
                name,
                data.oidcRPMetaDataScopeRules
                  ? data.oidcRPMetaDataScopeRules[name]
                  : {},
                "oidcRPMetaDataScopeRules",
                delOidcRPMetaDataScopeRules,
                updateOidcRPMetaDataScopeRules
              )}
            </table>
            <button
              className="plus"
              onClick={() => dispatch(newOidcRPMetaDataScopeRules(name))}
            >
              +
            </button>
          </div>
        </div>
      )}
      {optionSelect === "security" && (
        <table>
          <tbody>
            <tr>
              <th>{t("oidcRPMetaDataOptionsIDTokenSignAlg")}</th>
              <td>
                <select
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsIDTokenSignAlg
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsIDTokenSignAlg",
                        value: e.target.value,
                      })
                    );
                  }}
                >
                  {attributes.oidcRPMetaDataOptionsIDTokenSignAlg.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsAccessTokenSignAlg")}</th>
              <td>
                <select
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsAccessTokenSignAlg
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsAccessTokenSignAlg",
                        value: e.target.value,
                      })
                    );
                  }}
                >
                  {attributes.oidcRPMetaDataOptionsAccessTokenSignAlg.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsUserInfoSignAlg")}</th>
              <td>
                <select
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsUserInfoSignAlg
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsUserInfoSignAlg",
                        value: e.target.value,
                      })
                    );
                  }}
                >
                  {attributes.oidcRPMetaDataOptionsUserInfoSignAlg.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsRequirePKCE")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsRequirePKCE"
                      value={1}
                      checked={Boolean(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsRequirePKCE
                      )}
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsRequirePKCE",
                            value: 1,
                          })
                        );
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsRequirePKCE"
                      value={0}
                      checked={
                        !Boolean(
                          data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsRequirePKCE
                        )
                      }
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsRequirePKCE",
                            value: 0,
                          })
                        );
                      }}
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsAllowOffline")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsAllowOffline"
                      value={1}
                      checked={Boolean(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAllowOffline
                      )}
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsAllowOffline",
                            value: 1,
                          })
                        );
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsAllowOffline"
                      value={0}
                      checked={
                        !Boolean(
                          data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAllowOffline
                        )
                      }
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsAllowOffline",
                            value: 0,
                          })
                        );
                      }}
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsAllowPasswordGrant")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsAllowPasswordGrant"
                      value={1}
                      checked={Boolean(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAllowPasswordGrant
                      )}
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsAllowPasswordGrant",
                            value: 1,
                          })
                        );
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsAllowPasswordGrant"
                      value={0}
                      checked={
                        !Boolean(
                          data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAllowPasswordGrant
                        )
                      }
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsAllowPasswordGrant",
                            value: 0,
                          })
                        );
                      }}
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsAllowClientCredentialsGrant")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsAllowClientCredentialsGrant"
                      value={1}
                      checked={Boolean(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAllowClientCredentialsGrant
                      )}
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option:
                              "oidcRPMetaDataOptionsAllowClientCredentialsGrant",
                            value: 1,
                          })
                        );
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsAllowClientCredentialsGrant"
                      value={0}
                      checked={
                        !Boolean(
                          data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAllowClientCredentialsGrant
                        )
                      }
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option:
                              "oidcRPMetaDataOptionsAllowClientCredentialsGrant",
                            value: 0,
                          })
                        );
                      }}
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsRequestUris")}</th>
              <td>
                <input
                  className="form"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsRequestUris
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsRequestUris
                      : ""
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsRequestUris",
                        value: e.target.value,
                      })
                    );
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsAuthnLevel")}</th>
              <td>
                <input
                  className="form"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsAuthnLevel
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAuthnLevel
                      : ""
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsAuthnLevel",
                        value: e.target.value,
                      })
                    );
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsRule")}</th>
              <td>
                <input
                  className="form"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions[name].oidcRPMetaDataOptionsRule
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsRule
                      : ""
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsRule",
                        value: e.target.value,
                      })
                    );
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg")}</th>
              <td>
                <select
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg",
                        value: e.target.value,
                      })
                    );
                  }}
                >
                  {attributes.oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsAccessTokenEncContentEncAlg")}</th>
              <td>
                <select
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsAccessTokenEncContentEncAlg
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option:
                          "oidcRPMetaDataOptionsAccessTokenEncContentEncAlg",
                        value: e.target.value,
                      })
                    );
                  }}
                >
                  {attributes.oidcRPMetaDataOptionsAccessTokenEncContentEncAlg.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg")}</th>
              <td>
                <select
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg",
                        value: e.target.value,
                      })
                    );
                  }}
                >
                  {attributes.oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsIdTokenEncContentEncAlg")}</th>
              <td>
                <select
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsIdTokenEncContentEncAlg
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsIdTokenEncContentEncAlg",
                        value: e.target.value,
                      })
                    );
                  }}
                >
                  {attributes.oidcRPMetaDataOptionsIdTokenEncContentEncAlg.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg")}</th>
              <td>
                <select
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg",
                        value: e.target.value,
                      })
                    );
                  }}
                >
                  {attributes.oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsUserInfoEncContentEncAlg")}</th>
              <td>
                <select
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsUserInfoEncContentEncAlg
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsUserInfoEncContentEncAlg",
                        value: e.target.value,
                      })
                    );
                  }}
                >
                  {attributes.oidcRPMetaDataOptionsUserInfoEncContentEncAlg.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsLogoutEncKeyMgtAlg")}</th>
              <td>
                <select
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsLogoutEncKeyMgtAlg
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsLogoutEncKeyMgtAlg",
                        value: e.target.value,
                      })
                    );
                  }}
                >
                  {attributes.oidcRPMetaDataOptionsLogoutEncKeyMgtAlg.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsLogoutEncContentEncAlg")}</th>
              <td>
                <select
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsLogoutEncContentEncAlg
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsLogoutEncContentEncAlg",
                        value: e.target.value,
                      })
                    );
                  }}
                >
                  {attributes.oidcRPMetaDataOptionsLogoutEncContentEncAlg.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "keys" && (
        <table>
          <tbody>
            <tr>
              <th>{t("oidcRPMetaDataOptionsJwksUri")}</th>
              <td>
                <input
                  className="form"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsJwksUri
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsJwksUri
                      : ""
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsJwksUri",
                        value: e.target.value,
                      })
                    );
                  }}
                />
              </td>
            </tr>
            <tr>
              <th className="title2">{t("oidcRPMetaDataOptionsJwks")}</th>
              <div>
                <textarea
                  placeholder="oidcRPMetaDataOptionsJwks"
                  value={String(
                    name
                      ? data.oidcRPMetaDataOptions[name]
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsJwks
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsJwks
                          : ""
                        : ""
                      : ""
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsJwks",
                        value: e.target.value,
                      })
                    );
                  }}
                ></textarea>
              </div>
              <div>
                <input
                  type="file"
                  onChange={(e) => {
                    handleChangeFile(e).then((fileContent) => {
                      console.log("File content:", fileContent);
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsJwks",
                          value: fileContent,
                        })
                      );
                    });
                  }}
                />
              </div>
              <URLLoader
                appName={name}
                loadFunction={updateOidcRPMetaDataOptionsJwks}
              />
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "timouts" && (
        <table>
          <tbody>
            <tr>
              <th>{t("oidcRPMetaDataOptionsAuthorizationCodeExpiration")}</th>
              <td>
                <input
                  type="number"
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsAuthorizationCodeExpiration
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAuthorizationCodeExpiration
                      : ""
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option:
                          "oidcRPMetaDataOptionsAuthorizationCodeExpiration",
                        value: e.target.value,
                      })
                    );
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsIDTokenExpiration")}</th>
              <td>
                <input
                  type="number"
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsIDTokenExpiration
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsIDTokenExpiration
                      : ""
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsIDTokenExpiration",
                        value: e.target.value,
                      })
                    );
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsAccessTokenExpiration")}</th>
              <td>
                <input
                  type="number"
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsAccessTokenExpiration
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAccessTokenExpiration
                      : ""
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsAccessTokenExpiration",
                        value: e.target.value,
                      })
                    );
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsOfflineSessionExpiration")}</th>
              <td>
                <input
                  type="number"
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsOfflineSessionExpiration
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsOfflineSessionExpiration
                      : ""
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsOfflineSessionExpiration",
                        value: e.target.value,
                      })
                    );
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "logout" && (
        <table>
          <tbody>
            <tr>
              <th>{t("oidcRPMetaDataOptionsLogoutBypassConfirm")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsLogoutBypassConfirm"
                      value={1}
                      checked={Boolean(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsLogoutBypassConfirm
                      )}
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsLogoutBypassConfirm",
                            value: 1,
                          })
                        );
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsLogoutBypassConfirm"
                      value={0}
                      checked={
                        !Boolean(
                          data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsLogoutBypassConfirm
                        )
                      }
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option: "oidcRPMetaDataOptionsLogoutBypassConfirm",
                            value: 0,
                          })
                        );
                      }}
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsLogoutSessionRequired")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsLogoutSessionRequired"
                      value={1}
                      checked={Boolean(
                        data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsLogoutSessionRequired
                      )}
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option:
                              "oidcRPMetaDataOptionsLogoutSessionRequired",
                            value: 1,
                          })
                        );
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="oidcRPMetaDataOptionsLogoutSessionRequired"
                      value={0}
                      checked={
                        !Boolean(
                          data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsLogoutSessionRequired
                        )
                      }
                      onChange={() => {
                        dispatch(
                          updateOidcMetaDataOptions({
                            name,
                            option:
                              "oidcRPMetaDataOptionsLogoutSessionRequired",
                            value: 0,
                          })
                        );
                      }}
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsLogoutType")}</th>
              <td>
                <select
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsLogoutType
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsLogoutType",
                        value: e.target.value,
                      })
                    );
                  }}
                >
                  {attributes.oidcRPMetaDataOptionsLogoutType.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsLogoutUrl")}</th>
              <td>
                <input
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsLogoutUrl
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsLogoutUrl
                      : ""
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsLogoutUrl",
                        value: e.target.value,
                      })
                    );
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>{t("oidcRPMetaDataOptionsPostLogoutRedirectUris")}</th>
              <td>
                <input
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions[name]
                      .oidcRPMetaDataOptionsPostLogoutRedirectUris
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsPostLogoutRedirectUris
                      : ""
                  )}
                  onChange={(e) => {
                    dispatch(
                      updateOidcMetaDataOptions({
                        name,
                        option: "oidcRPMetaDataOptionsPostLogoutRedirectUris",
                        value: e.target.value,
                      })
                    );
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "comment" && (
        <textarea
          value={String(
            data.oidcRPMetaDataOptions[name].oidcRPMetaDataOptionsComment
              ? data.oidcRPMetaDataOptions[name].oidcRPMetaDataOptionsComment
              : ""
          )}
          onChange={(e) => {
            dispatch(
              updateOidcMetaDataOptions({
                name,
                option: "oidcRPMetaDataOptionsComment",
                value: e.target.value,
              })
            );
          }}
        />
      )}
    </>
  );
}
