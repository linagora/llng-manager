import { t } from "i18next";
import { useState } from "react";
import attributes from "../../static/attributes.json";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateSamlMetaDataOptions } from "../../features/config/configSlice";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

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
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("samlSPMetaDataOptionsNameIDFormat")}
                  </InputLabel>
                  <Select
                    value={data.samlSPMetaDataOptionsNameIDFormat}
                    label={t("samlSPMetaDataOptionsNameIDFormat")}
                    displayEmpty
                    onChange={(e) =>
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsNameIDFormat",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.samlSPMetaDataOptionsNameIDFormat.select.map(
                      (el) => {
                        return (
                          <MenuItem key={el.k} value={el.k}>
                            {t(el.v)}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </FormControl>
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
                <FormControl>
                  <RadioGroup
                    row
                    value={data.samlSPMetaDataOptionsOneTimeUse}
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsOneTimeUse",
                          value: Number(e.target.value),
                        })
                      );
                    }}
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
                <FormControl>
                  <RadioGroup
                    row
                    value={data.samlSPMetaDataOptionsForceUTF8}
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsForceUTF8",
                          value: Number(e.target.value),
                        })
                      );
                    }}
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
      )}
      {optionSelect === "signature" && (
        <table>
          <tbody>
            <tr>
              <th>{t("samlSPMetaDataOptionsSignatureMethod")}</th>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("samlSPMetaDataOptionsSignatureMethod")}
                  </InputLabel>
                  <Select
                    value={data.samlSPMetaDataOptionsSignatureMethod}
                    label={t("samlSPMetaDataOptionsSignatureMethod")}
                    displayEmpty
                    onChange={(e) =>
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsSignatureMethod",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.samlSPMetaDataOptionsSignatureMethod.select.map(
                      (el) => {
                        return (
                          <MenuItem key={el.k} value={el.k}>
                            {t(el.v)}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsSignSSOMessage")}</th>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={data.samlSPMetaDataOptionsSignSSOMessage}
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsSignSSOMessage",
                          value: Number(e.target.value),
                        })
                      );
                    }}
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
              <th>{t("samlSPMetaDataOptionsCheckSSOMessageSignature")}</th>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={data.samlSPMetaDataOptionsCheckSSOMessageSignature}
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option:
                            "samlSPMetaDataOptionsCheckSSOMessageSignature",
                          value: Number(e.target.value),
                        })
                      );
                    }}
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
              <th>{t("samlSPMetaDataOptionsSignatureMethod")}</th>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("samlSPMetaDataOptionsSignatureMethod")}
                  </InputLabel>
                  <Select
                    value={data.samlSPMetaDataOptionsSignatureMethod}
                    label={t("samlSPMetaDataOptionsSignatureMethod")}
                    displayEmpty
                    onChange={(e) =>
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsSignatureMethod",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.samlSPMetaDataOptionsSignatureMethod.select.map(
                      (el) => {
                        return (
                          <MenuItem key={el.k} value={el.k}>
                            {t(el.v)}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsSignSLOMessage")}</th>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={data.samlSPMetaDataOptionsSignSLOMessage}
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsSignSLOMessage",
                          value: Number(e.target.value),
                        })
                      );
                    }}
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
                    <FormControlLabel
                      value={-1}
                      control={<Radio />}
                      label={t("default")}
                    />
                  </RadioGroup>
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsCheckSLOMessageSignature")}</th>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={data.samlSPMetaDataOptionsCheckSLOMessageSignature}
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option:
                            "samlSPMetaDataOptionsCheckSLOMessageSignature",
                          value: Number(e.target.value),
                        })
                      );
                    }}
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
      )}
      {optionSelect === "security" && (
        <table>
          <tbody>
            <tr>
              <th>{t("samlSPMetaDataOptionsEncryptionMode")}</th>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("samlSPMetaDataOptionsEncryptionMode")}
                  </InputLabel>
                  <Select
                    value={data.samlSPMetaDataOptionsEncryptionMode}
                    label={t("samlSPMetaDataOptionsEncryptionMode")}
                    displayEmpty
                    onChange={(e) =>
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsEncryptionMode",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.samlSPMetaDataOptionsEncryptionMode.select.map(
                      (el) => {
                        return (
                          <MenuItem key={el.k} value={el.k}>
                            {t(el.v)}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsEnableIDPInitiatedURL")}</th>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={data.samlSPMetaDataOptionsEnableIDPInitiatedURL}
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsEnableIDPInitiatedURL",
                          value: Number(e.target.value),
                        })
                      );
                    }}
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
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("samlSPMetaDataOptionsFederationOptionalAttributes")}
                  </InputLabel>
                  <Select
                    value={
                      data.samlSPMetaDataOptionsFederationOptionalAttributes
                    }
                    label={t(
                      "samlSPMetaDataOptionsFederationOptionalAttributes"
                    )}
                    displayEmpty
                    onChange={(e) =>
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option:
                            "samlSPMetaDataOptionsFederationOptionalAttributes",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.samlSPMetaDataOptionsFederationOptionalAttributes.select.map(
                      (el) => {
                        return (
                          <MenuItem key={el.k} value={el.k}>
                            {t(el.v)}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </FormControl>
              </td>
            </tr>
            <tr>
              <th>{t("samlSPMetaDataOptionsFederationRequiredAttributes")}</th>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("samlSPMetaDataOptionsFederationRequiredAttributes")}
                  </InputLabel>
                  <Select
                    value={
                      data.samlSPMetaDataOptionsFederationRequiredAttributes
                    }
                    label={t(
                      "samlSPMetaDataOptionsFederationRequiredAttributes"
                    )}
                    displayEmpty
                    onChange={(e) =>
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option:
                            "samlSPMetaDataOptionsFederationRequiredAttributes",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.samlSPMetaDataOptionsFederationRequiredAttributes.select.map(
                      (el) => {
                        return (
                          <MenuItem key={el.k} value={el.k}>
                            {t(el.v)}
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                </FormControl>
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
