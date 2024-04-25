import { t } from "i18next";
import { useState } from "react";
import attributes from "../../static/attributes.json";
import { useAppSelector } from "../../app/hooks";

export function OptionSaml({ name }: { name: string }) {
  const data = useAppSelector((state) =>
    state.config.data.config.samlSPMetaDataOptions
      ? state.config.data.config.samlSPMetaDataOptions[name]
      : {}
  );
  const [optionSelect, setOptionSelected] = useState("authResponse");
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
                <select value={String(data.samlSPMetaDataOptionsNameIDFormat)}>
                  {attributes.samlSPMetaDataOptionsNameIDFormat.select.map(
                    (el) => {
                      return <option value={el.k}>{t(el.v)}</option>;
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
                  value={String(data.samlSPMetaDataOptionsNameIDSessionKey)}
                  onChange={(el) => {
                    console.log("akak");
                  }}
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
                      onChange={() => {
                        console.log("aka");
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsOneTimeUse"
                      value={0}
                      checked={!Boolean(data.samlSPMetaDataOptionsOneTimeUse)}
                      onChange={() => console.log("akak")}
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
                  onChange={(el) => console.log(el.target.value)}
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
                  onChange={(el) => console.log(el.target.value)}
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
                      onChange={() => {
                        console.log("aka");
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsForceUTF8"
                      value={0}
                      checked={!Boolean(data.samlSPMetaDataOptionsForceUTF8)}
                      onChange={() => console.log("akak")}
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
                      onChange={() => {
                        console.log("aka");
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsSignSSOMessage"
                      value={0}
                      checked={data.samlSPMetaDataOptionsSignSSOMessage === 0}
                      onChange={() => console.log("akak")}
                    />
                    <span>{t("off")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsSignSSOMessage"
                      value={0}
                      checked={data.samlSPMetaDataOptionsSignSSOMessage === -1}
                      onChange={() => console.log("akak")}
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
                      onChange={() => {
                        console.log("aka");
                      }}
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
                      onChange={() => console.log("akak")}
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
                      onChange={() => {
                        console.log("aka");
                      }}
                    />
                    <span>{t("on")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsSignSLOMessage"
                      value={0}
                      checked={data.samlSPMetaDataOptionsSignSLOMessage === 0}
                      onChange={() => console.log("akak")}
                    />
                    <span>{t("off")}</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="samlSPMetaDataOptionsSignSLOMessage"
                      value={0}
                      checked={data.samlSPMetaDataOptionsSignSLOMessage === -1}
                      onChange={() => console.log("akak")}
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
                      onChange={() => {
                        console.log("aka");
                      }}
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
                      onChange={() => console.log("akak")}
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
                      onChange={() => {
                        console.log("aka");
                      }}
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
                      onChange={() => console.log("akak")}
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
                  onChange={(el) => console.log(el.target.value)}
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
                  onChange={(el) => console.log(el.target.value)}
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
                  onChange={(el) => {
                    console.log("akak");
                  }}
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
        />
      )}
    </>
  );
}
