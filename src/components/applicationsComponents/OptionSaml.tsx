import { t } from "i18next";
import { useAppSelector } from "../../app/hooks";
import { updateSamlMetaDataOptions } from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import TextForm from "../../forms/TextForm";
import SelectForm from "../../forms/SelectForm";
import BoolForm from "../../forms/BoolForm";
import TroolForm from "../../forms/TroolForm";
import LongtextForm from "../../forms/LongtextForm";

export function OptionSaml({
  name,
  dispatch,
  optionSelect,
}: {
  name: string;
  dispatch: Function;
  optionSelect: string;
}) {
  const data =
    useAppSelector((state) => {
      if (state.config.data.config.samlSPMetaDataOptions) {
        return state.config.data.config.samlSPMetaDataOptions[name];
      }
    }) || {};
  return (
    <>
      {optionSelect === "authResponse" && (
        <table>
          <tbody>
            <tr>
              <SelectForm
                fieldName="samlSPMetaDataOptionsNameIDFormat"
                value={String(
                  data.samlSPMetaDataOptionsNameIDFormat ||
                    attributes.samlSPMetaDataOptionsNameIDFormat.default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsNameIDFormat",
                      value: String(e || ""),
                    })
                  )
                }
              />
            </tr>
            <tr>
              <TextForm
                fieldName="samlSPMetaDataOptionsNameIDSessionKey"
                value={String(
                  data.samlSPMetaDataOptionsNameIDSessionKey
                    ? data.samlSPMetaDataOptionsNameIDSessionKey
                    : ""
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsNameIDSessionKey",
                      value: e || "",
                    })
                  )
                }
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="samlSPMetaDataOptionsOneTimeUse"
                value={
                  Number(data.samlSPMetaDataOptionsOneTimeUse) ||
                  attributes.samlSPMetaDataOptionsOneTimeUse.default
                }
                updateFunc={(e: number) => {
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsOneTimeUse",
                      value: Number(e || ""),
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <TextForm
                fieldName="samlSPMetaDataOptionsSessionNotOnOrAfterTimeout"
                value={String(
                  data.samlSPMetaDataOptionsSessionNotOnOrAfterTimeout
                    ? data.samlSPMetaDataOptionsSessionNotOnOrAfterTimeout
                    : attributes.samlSPMetaDataOptionsSessionNotOnOrAfterTimeout
                        .default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsSessionNotOnOrAfterTimeout",
                      value: e || "",
                    })
                  )
                }
              />
            </tr>
            <tr>
              <TextForm
                fieldName="samlSPMetaDataOptionsNotOnOrAfterTimeout"
                value={String(
                  data.samlSPMetaDataOptionsNotOnOrAfterTimeout
                    ? data.samlSPMetaDataOptionsNotOnOrAfterTimeout
                    : attributes.samlSPMetaDataOptionsNotOnOrAfterTimeout
                        .default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsNotOnOrAfterTimeout",
                      value: e || "",
                    })
                  )
                }
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="samlSPMetaDataOptionsForceUTF8"
                value={
                  Number(data.samlSPMetaDataOptionsForceUTF8) ||
                  attributes.samlMetadataForceUTF8.default
                }
                updateFunc={(e: number) => {
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsForceUTF8",
                      value: Number(e || ""),
                    })
                  );
                }}
              />
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "signature" && (
        <table>
          <tbody>
            <tr>
              <SelectForm
                fieldName="samlSPMetaDataOptionsSignatureMethod"
                value={String(
                  data.samlSPMetaDataOptionsSignatureMethod ||
                    attributes.samlSPMetaDataOptionsSignatureMethod.default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsSignatureMethod",
                      value: String(e || ""),
                    })
                  )
                }
              />
            </tr>
            <tr>
              <TroolForm
                fieldName="samlSPMetaDataOptionsSignSSOMessage"
                value={
                  data.samlSPMetaDataOptionsSignSSOMessage !== undefined &&
                  data.samlSPMetaDataOptionsSignSSOMessage !== null
                    ? Number(data.samlSPMetaDataOptionsSignSSOMessage)
                    : attributes.samlSPMetaDataOptionsSignSSOMessage.default
                }
                updateFunc={(e: number) => {
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsSignSSOMessage",
                      value: Number(e || ""),
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="samlSPMetaDataOptionsCheckSSOMessageSignature"
                value={
                  Number(data.samlSPMetaDataOptionsCheckSSOMessageSignature) ||
                  attributes.samlSPMetaDataOptionsCheckSSOMessageSignature
                    .default
                }
                updateFunc={(e: number) => {
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsCheckSSOMessageSignature",
                      value: Number(e || ""),
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <TroolForm
                fieldName="samlSPMetaDataOptionsSignSLOMessage"
                value={
                  data.samlSPMetaDataOptionsSignSLOMessage !== undefined &&
                  data.samlSPMetaDataOptionsSignSLOMessage !== null
                    ? Number(data.samlSPMetaDataOptionsSignSLOMessage)
                    : attributes.samlSPMetaDataOptionsSignSLOMessage.default
                }
                updateFunc={(e: number) => {
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsSignSLOMessage",
                      value: Number(e || ""),
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="samlSPMetaDataOptionsCheckSLOMessageSignature"
                value={
                  Number(data.samlSPMetaDataOptionsCheckSLOMessageSignature) ||
                  attributes.samlSPMetaDataOptionsCheckSLOMessageSignature
                    .default
                }
                updateFunc={(e: number) => {
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsCheckSLOMessageSignature",
                      value: Number(e || ""),
                    })
                  );
                }}
              />
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "security" && (
        <table>
          <tbody>
            <tr>
              <SelectForm
                fieldName="samlSPMetaDataOptionsEncryptionMode"
                value={String(
                  data.samlSPMetaDataOptionsEncryptionMode ||
                    attributes.samlSPMetaDataOptionsEncryptionMode.default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsEncryptionMode",
                      value: String(e || ""),
                    })
                  )
                }
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="samlSPMetaDataOptionsEnableIDPInitiatedURL"
                value={Number(
                  data.samlSPMetaDataOptionsEnableIDPInitiatedURL ||
                    attributes.samlSPMetaDataOptionsEnableIDPInitiatedURL
                      .default
                )}
                updateFunc={(e: number) => {
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsEnableIDPInitiatedURL",
                      value: Number(e || ""),
                    })
                  );
                }}
              />
            </tr>
            <tr>
              <TextForm
                fieldName="samlSPMetaDataOptionsAuthnLevel"
                value={String(data.samlSPMetaDataOptionsAuthnLevel || "")}
                updateFunc={(e: string) =>
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsAuthnLevel",
                      value: e || "",
                    })
                  )
                }
              />
            </tr>
            <tr>
              <TextForm
                fieldName="samlSPMetaDataOptionsRule"
                value={String(data.samlSPMetaDataOptionsRule || "")}
                updateFunc={(e: string) =>
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsRule",
                      value: e || "",
                    })
                  )
                }
              />
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "federation" && (
        <table>
          <tbody>
            <tr>
              <TextForm
                fieldName="samlSPMetaDataOptionsFederationEntityID"
                value={String(
                  data.samlSPMetaDataOptionsFederationEntityID
                    ? data.samlSPMetaDataOptionsFederationEntityID
                    : ""
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option: "samlSPMetaDataOptionsFederationEntityID",
                      value: e || "",
                    })
                  )
                }
              />
            </tr>
            <tr>
              <SelectForm
                fieldName="samlSPMetaDataOptionsFederationOptionalAttributes"
                value={String(
                  data.samlSPMetaDataOptionsFederationOptionalAttributes ||
                    attributes.samlSPMetaDataOptionsFederationOptionalAttributes
                      .default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option:
                        "samlSPMetaDataOptionsFederationOptionalAttributes",
                      value: String(e || ""),
                    })
                  )
                }
              />
            </tr>
            <tr>
              <SelectForm
                fieldName="samlSPMetaDataOptionsFederationRequiredAttributes"
                value={String(
                  data.samlSPMetaDataOptionsFederationRequiredAttributes ||
                    attributes.samlSPMetaDataOptionsFederationRequiredAttributes
                      .default
                )}
                updateFunc={(e: string) =>
                  dispatch(
                    updateSamlMetaDataOptions({
                      name,
                      option:
                        "samlSPMetaDataOptionsFederationRequiredAttributes",
                      value: String(e || ""),
                    })
                  )
                }
              />
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "comment" && (
        <LongtextForm
          fieldName="samlSPMetaDataOptionsComment"
          value={String(
            data.samlSPMetaDataOptionsComment
              ? data.samlSPMetaDataOptionsComment
              : ""
          )}
          updateFunc={(e: string) =>
            dispatch(
              updateSamlMetaDataOptions({
                name,
                option: "samlSPMetaDataOptionsComment",
                value: e || "",
              })
            )
          }
        />
      )}
    </>
  );
}
export function SubObtionSelector({
  optionSelect,
  setOptionSelected,
}: {
  optionSelect: string;
  setOptionSelected: Function;
}) {
  return (
    <div className="optionNavbar sub">
      <label
        data-testid="samlSPMetaDataOptionsAuthnResponse"
        className={`suboption ${
          optionSelect === "authResponse" ? "selected" : ""
        }`}
        onClick={() => setOptionSelected("authResponse")}
      >
        {t("samlSPMetaDataOptionsAuthnResponse")}
      </label>
      <label
        data-testid="samlSPMetaDataOptionsSignature"
        className={`suboption ${
          optionSelect === "signature" ? "selected" : ""
        }`}
        onClick={() => setOptionSelected("signature")}
      >
        {t("samlSPMetaDataOptionsSignature")}
      </label>
      <label
        data-testid="samlSPMetaDataOptionsSecurity"
        className={`suboption ${optionSelect === "security" ? "selected" : ""}`}
        onClick={() => setOptionSelected("security")}
      >
        {t("samlSPMetaDataOptionsSecurity")}
      </label>
      <label
        data-testid="samlSPMetaDataOptionsFederation"
        className={`suboption ${
          optionSelect === "federation" ? "selected" : ""
        }`}
        onClick={() => setOptionSelected("federation")}
      >
        {t("samlSPMetaDataOptionsFederation")}
      </label>
      <label
        data-testid="samlSPMetaDataOptionsComment"
        className={`suboption ${optionSelect === "comment" ? "selected" : ""}`}
        onClick={() => setOptionSelected("comment")}
      >
        {t("samlSPMetaDataOptionsComment")}
      </label>
    </div>
  );
}
