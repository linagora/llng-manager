import { t } from "i18next";
import { useState } from "react";
import attributes from "../../static/attributes.json";
import { useAppSelector } from "../../app/hooks";
import { handleChangeFile } from "../../utils/readFiles";
import { URLLoader } from "../managerComponents/URLLoader";

function tableVars(appName: string, vars: Record<string, string>) {
  return (
    <tbody>
      {Object.keys(vars).map((key) => {
        return (
          <tr>
            <td>
              <input
                className="form"
                onChange={() => console.log("abab")}
                type="text"
                value={key}
              />
            </td>
            <td>
              <input
                className="form"
                onChange={() => console.log("abab")}
                type="text"
                value={vars[key]}
              />
            </td>

            <td>
              <button
                onClick={() => {
                  console.log("del");
                }}
                className="minus"
              >
                -
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}

export function OptionOidc({ name }: { name: string }) {
  const [optionSelect, setOptionSelected] = useState("advanced");
  const data = useAppSelector((state) => state.config.data.config);
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
                        console.log("aka");
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
                      onChange={() => console.log("akak")}
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
                        console.log("aka");
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
                      onChange={() => console.log("akak")}
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
                        console.log("aka");
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
                      onChange={() => console.log("akak")}
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
                        console.log("aka");
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
                      onChange={() => console.log("akak")}
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
                        console.log("aka");
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
                      onChange={() => console.log("akak")}
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
                  onChange={(el) => {
                    console.log("akak");
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
                  onChange={(el) => {
                    console.log("akak");
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
            <table>
              <thead>
                <th>{t("keys")}</th>
                <th>{t("values")}</th>
              </thead>
              {tableVars(
                name,
                data.oidcRPMetaDataOptionsExtraClaims
                  ? data.oidcRPMetaDataOptionsExtraClaims[name]
                  : {}
              )}
            </table>
          </div>
          <div>
            <strong className="title3">{t("oidcRPMetaDataScopeRules")}</strong>
            <table>
              <thead>
                <th>{t("keys")}</th>
                <th>{t("values")}</th>
              </thead>
              {tableVars(
                name,
                data.oidcRPMetaDataScopeRules
                  ? data.oidcRPMetaDataScopeRules[name]
                  : {}
              )}
            </table>
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
                        console.log("aka");
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
                      onChange={() => console.log("akak")}
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
                        console.log("aka");
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
                      onChange={() => console.log("akak")}
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
                        console.log("aka");
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
                      onChange={() => console.log("akak")}
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
                        console.log("aka");
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
                      onChange={() => console.log("akak")}
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
                  onChange={(el) => {
                    console.log("akak");
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
                  onChange={(el) => {
                    console.log("akak");
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
                  onChange={(el) => {
                    console.log("akak");
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
                  onChange={(el) => {
                    console.log("akak");
                  }}
                />
              </td>
            </tr>
            <tr>
              <th className="title2">{t("samlSPMetaDataXML")}</th>
              <div>
                <textarea
                  placeholder="oidcRPMetaDataOptionsJwks"
                  onChange={(e) => console.log(e.target.value)}
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
                ></textarea>
              </div>
              <div>
                <input
                  type="file"
                  onChange={(e) => {
                    handleChangeFile(e).then((fileContent) => {
                      console.log("File content:", fileContent);
                    });
                  }}
                />
              </div>
              <URLLoader appName={name} loadFunction={console.log} />
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
                        console.log("aka");
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
                      onChange={() => console.log("akak")}
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
                        console.log("aka");
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
                      onChange={() => console.log("akak")}
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
        />
      )}
    </>
  );
}
