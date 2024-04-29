import { t } from "i18next";
import { useState } from "react";
import attributes from "../../static/attributes.json";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateSamlMetaDataOptions } from "../../features/config/configSlice";

export function OptionSaml({ name }: { name: string }) {
  const data = useAppSelector((state) =>
    state.config.data.config.samlSPMetaDataOptions
      ? state.config.data.config.samlSPMetaDataOptions[name]
      : {}
  );
  const [optionSelect, setOptionSelected] = useState("authResponse");
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="optionNavbar">
        <label onClick={() => setOptionSelected("authResponse")}>
          {t("samlSPMetaDataOptionsAuthnResponse")}
        </label>
        <label onClick={() => setOptionSelected("signature")}>
          {t("samlSPMetaDataOptionsSignature")}
        </label>
        <label onClick={() => setOptionSelected("security")}>
          {t("samlSPMetaDataOptionsSecurity")}
        </label>
        <label onClick={() => setOptionSelected("federation")}>
          {t("samlSPMetaDataOptionsFederation")}
        </label>
        <label onClick={() => setOptionSelected("comment")}>
          {t("samlSPMetaDataOptionsComment")}
        </label>
      </div>
      {optionSelect === "authResponse" && (
        <table>
          <tbody>
            <tr>
              <th>{t("samlSPMetaDataOptionsNameIDFormat")}</th>
              <td>
                <select
                  value={String(data.samlSPMetaDataOptionsNameIDFormat)}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option: "samlSPMetaDataOptionsNameIDFormat",
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {attributes.samlSPMetaDataOptionsNameIDFormat.select.map(
                    (el) => {
                      return (
                        <option key={el.k} value={el.k}>
                          {t(el.v)}
                        </option>
                      );
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsNameIDSessionKey")}</th>
              <td>
                <input
                  className="form"
                  type="text"
                  value={String(
                    data.samlSPMetaDataOptionsNameIDSessionKey
                      ? data.samlSPMetaDataOptionsNameIDSessionKey
                      : ""
                  )}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option: "samlSPMetaDataOptionsNameIDSessionKey",
                        value: e.target.value,
                      })
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsOneTimeUse")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsOneTimeUse"
                      value={1}
                      checked={Boolean(data.samlSPMetaDataOptionsOneTimeUse)}
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option: "samlSPMetaDataOptionsOneTimeUse",
                            value: 1,
                          })
                        )
                      }
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsOneTimeUse"
                      value={0}
                      checked={!Boolean(data.samlSPMetaDataOptionsOneTimeUse)}
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option: "samlSPMetaDataOptionsOneTimeUse",
                            value: 0,
                          })
                        )
                      }
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsSessionNotOnOrAfterTimeout")}</th>
              <td>
                <input
                  className="form"
                  type="number"
                  value={String(
                    data.samlSPMetaDataOptionsSessionNotOnOrAfterTimeout
                  )}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option:
                          "samlSPMetaDataOptionsSessionNotOnOrAfterTimeout",
                        value: e.target.value,
                      })
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsNotOnOrAfterTimeout")}</th>
              <td>
                <input
                  className="form"
                  type="number"
                  value={String(data.samlSPMetaDataOptionsNotOnOrAfterTimeout)}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option: "samlSPMetaDataOptionsNotOnOrAfterTimeout",
                        value: e.target.value,
                      })
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsForceUTF8")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsForceUTF8"
                      value={1}
                      checked={Boolean(data.samlSPMetaDataOptionsForceUTF8)}
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option: "samlSPMetaDataOptionsForceUTF8",
                            value: 1,
                          })
                        )
                      }
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsForceUTF8"
                      value={0}
                      checked={!Boolean(data.samlSPMetaDataOptionsForceUTF8)}
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option: "samlSPMetaDataOptionsForceUTF8",
                            value: 0,
                          })
                        )
                      }
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "signature" && (
        <table>
          <tbody>
            <tr>
              <th>{t("samlSPMetaDataOptionsSignatureMethod")}</th>
              <td>
                <select
                  value={String(data.samlSPMetaDataOptionsSignatureMethod)}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option: "samlSPMetaDataOptionsSignatureMethod",
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {attributes.samlSPMetaDataOptionsSignatureMethod.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsSignSSOMessage")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsSignSSOMessage"
                      value={1}
                      checked={data.samlSPMetaDataOptionsSignSSOMessage === 1}
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option: "samlSPMetaDataOptionsSignSSOMessage",
                            value: 1,
                          })
                        )
                      }
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsSignSSOMessage"
                      value={0}
                      checked={data.samlSPMetaDataOptionsSignSSOMessage === 0}
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option: "samlSPMetaDataOptionsSignSSOMessage",
                            value: 0,
                          })
                        )
                      }
                    />
                    <span>{t("off")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsSignSSOMessage"
                      value={0}
                      checked={data.samlSPMetaDataOptionsSignSSOMessage === -1}
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option: "samlSPMetaDataOptionsSignSSOMessage",
                            value: -1,
                          })
                        )
                      }
                    />
                    <span>{t("default")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsCheckSSOMessageSignature")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsCheckSSOMessageSignature"
                      value={1}
                      checked={
                        data.samlSPMetaDataOptionsCheckSSOMessageSignature === 1
                      }
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option:
                              "samlSPMetaDataOptionsCheckSSOMessageSignature",
                            value: 1,
                          })
                        )
                      }
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsCheckSSOMessageSignature"
                      value={0}
                      checked={
                        data.samlSPMetaDataOptionsCheckSSOMessageSignature === 0
                      }
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option:
                              "samlSPMetaDataOptionsCheckSSOMessageSignature",
                            value: 0,
                          })
                        )
                      }
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsSignatureMethod")}</th>
              <td>
                <select
                  value={String(data.samlSPMetaDataOptionsSignatureMethod)}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option: "samlSPMetaDataOptionsSignatureMethod",
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {attributes.samlSPMetaDataOptionsSignatureMethod.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsSignSLOMessage")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsSignSLOMessage"
                      value={1}
                      checked={data.samlSPMetaDataOptionsSignSLOMessage === 1}
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option: "samlSPMetaDataOptionsSignSLOMessage",
                            value: 1,
                          })
                        )
                      }
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsSignSLOMessage"
                      value={0}
                      checked={data.samlSPMetaDataOptionsSignSLOMessage === 0}
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option: "samlSPMetaDataOptionsSignSLOMessage",
                            value: 0,
                          })
                        )
                      }
                    />
                    <span>{t("off")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsSignSLOMessage"
                      value={-1}
                      checked={data.samlSPMetaDataOptionsSignSLOMessage === -1}
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option: "samlSPMetaDataOptionsSignSLOMessage",
                            value: -1,
                          })
                        )
                      }
                    />
                    <span>{t("default")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsCheckSLOMessageSignature")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsCheckSLOMessageSignature"
                      value={1}
                      checked={Boolean(
                        data.samlSPMetaDataOptionsCheckSLOMessageSignature
                      )}
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option:
                              "samlSPMetaDataOptionsCheckSLOMessageSignature",
                            value: 1,
                          })
                        )
                      }
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsCheckSLOMessageSignature"
                      value={0}
                      checked={
                        !Boolean(
                          data.samlSPMetaDataOptionsCheckSLOMessageSignature
                        )
                      }
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option:
                              "samlSPMetaDataOptionsCheckSLOMessageSignature",
                            value: 0,
                          })
                        )
                      }
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "security" && (
        <table>
          <tbody>
            <tr>
              <th>{t("samlSPMetaDataOptionsEncryptionMode")}</th>
              <td>
                <select
                  value={String(data.samlSPMetaDataOptionsEncryptionMode)}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option: "samlSPMetaDataOptionsEncryptionMode",
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {attributes.samlSPMetaDataOptionsEncryptionMode.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsEnableIDPInitiatedURL")}</th>
              <td>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsEnableIDPInitiatedURL"
                      value={1}
                      checked={Boolean(
                        data.samlSPMetaDataOptionsEnableIDPInitiatedURL
                      )}
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option:
                              "samlSPMetaDataOptionsEnableIDPInitiatedURL",
                            value: 1,
                          })
                        )
                      }
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsEnableIDPInitiatedURL"
                      value={0}
                      checked={
                        !Boolean(
                          data.samlSPMetaDataOptionsEnableIDPInitiatedURL
                        )
                      }
                      onChange={() =>
                        dispatch(
                          updateSamlMetaDataOptions({
                            name,
                            option:
                              "samlSPMetaDataOptionsEnableIDPInitiatedURL",
                            value: 0,
                          })
                        )
                      }
                    />
                    <span>{t("off")}</span>
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsAuthnLevel")}</th>
              <td>
                <input
                  className="form"
                  type="text"
                  value={String(data.samlSPMetaDataOptionsAuthnLevel)}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option: "samlSPMetaDataOptionsAuthnLevel",
                        value: e.target.value,
                      })
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsRule")}</th>
              <td>
                <input
                  className="form"
                  type="number"
                  value={String(data.samlSPMetaDataOptionsRule)}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option: "samlSPMetaDataOptionsRule",
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
      {optionSelect === "federation" && (
        <table>
          <tbody>
            <tr>
              <th>{t("samlSPMetaDataOptionsFederationEntityID")}</th>
              <td>
                <input
                  className="form"
                  type="text"
                  value={String(
                    data.samlSPMetaDataOptionsFederationEntityID
                      ? data.samlSPMetaDataOptionsFederationEntityID
                      : ""
                  )}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option: "samlSPMetaDataOptionsFederationEntityID",
                        value: e.target.value,
                      })
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsFederationOptionalAttributes")}</th>
              <td>
                <select
                  value={String(
                    data.samlSPMetaDataOptionsFederationOptionalAttributes
                  )}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option:
                          "samlSPMetaDataOptionsFederationOptionalAttributes",
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {attributes.samlSPMetaDataOptionsFederationOptionalAttributes.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
                    }
                  )}
                </select>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsFederationRequiredAttributes")}</th>
              <td>
                <select
                  value={String(
                    data.samlSPMetaDataOptionsFederationRequiredAttributes
                  )}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option:
                          "samlSPMetaDataOptionsFederationRequiredAttributes",
                        value: e.target.value,
                      })
                    )
                  }
                >
                  {attributes.samlSPMetaDataOptionsFederationRequiredAttributes.select.map(
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
      {optionSelect === "comment" && (
        <textarea
          value={String(
            data.samlSPMetaDataOptionsComment
              ? data.samlSPMetaDataOptionsComment
              : ""
          )}
          onChange={(e) =>
            dispatch(
              updateSamlMetaDataOptions({
                name,
                option: "samlSPMetaDataOptionsComment",
                value: e.target.value,
              })
            )
          }
        />
      )}
    </>
  );
}
