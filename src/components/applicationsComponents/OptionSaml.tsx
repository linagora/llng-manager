import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { updateSamlMetaDataOptions } from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";

export function OptionSaml({
  name,
  dispatch,
}: {
  name: string;
  dispatch: Function;
}) {
  const data =
    useAppSelector((state) => {
      if (state.config.data.config.samlSPMetaDataOptions) {
        return state.config.data.config.samlSPMetaDataOptions[name];
      }
    }) || {};
  const [optionSelect, setOptionSelected] = useState("authResponse");
  return (
    <>
      <div className="optionNavbar">
        <label
          className={`option ${
            optionSelect === "authResponse" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("authResponse")}
        >
          {t("samlSPMetaDataOptionsAuthnResponse")}
        </label>
        <label
          className={`option ${optionSelect === "signature" ? "selected" : ""}`}
          onClick={() => setOptionSelected("signature")}
        >
          {t("samlSPMetaDataOptionsSignature")}
        </label>
        <label
          className={`option ${optionSelect === "security" ? "selected" : ""}`}
          onClick={() => setOptionSelected("security")}
        >
          {t("samlSPMetaDataOptionsSecurity")}
        </label>
        <label
          className={`option ${
            optionSelect === "federation" ? "selected" : ""
          }`}
          onClick={() => setOptionSelected("federation")}
        >
          {t("samlSPMetaDataOptionsFederation")}
        </label>
        <label
          className={`option ${optionSelect === "comment" ? "selected" : ""}`}
          onClick={() => setOptionSelected("comment")}
        >
          {t("samlSPMetaDataOptionsComment")}
        </label>
      </div>
      {optionSelect === "authResponse" && (
        <table>
          <tbody>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {definitions.samlSPMetaDataOptionsNameIDFormat
                      ? definitions.samlSPMetaDataOptionsNameIDFormat
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsNameIDFormat")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("samlSPMetaDataOptionsNameIDFormat")}
                  </InputLabel>
                  <Select
                    value={
                      data.samlSPMetaDataOptionsNameIDFormat ||
                      attributes.samlSPMetaDataOptionsNameIDFormat.default
                    }
                    label={t("samlSPMetaDataOptionsNameIDFormat")}
                    displayEmpty
                    onChange={(e) =>
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsNameIDFormat",
                          value: String(e.target.value || ""),
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.samlSPMetaDataOptionsNameIDSessionKey
                      ? definitions.samlSPMetaDataOptionsNameIDSessionKey
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsNameIDSessionKey")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
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
                        value: e.target.value || "",
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
                    {definitions.samlSPMetaDataOptionsOneTimeUse
                      ? definitions.samlSPMetaDataOptionsOneTimeUse
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsOneTimeUse")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.samlSPMetaDataOptionsOneTimeUse ||
                      attributes.samlSPMetaDataOptionsOneTimeUse.default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsOneTimeUse",
                          value: Number(e.target.value || ""),
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.samlSPMetaDataOptionsSessionNotOnOrAfterTimeout
                      ? definitions.samlSPMetaDataOptionsSessionNotOnOrAfterTimeout
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsSessionNotOnOrAfterTimeout")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  type="number"
                  value={String(
                    data.samlSPMetaDataOptionsSessionNotOnOrAfterTimeout ||
                      attributes.samlSPMetaDataOptionsNotOnOrAfterTimeout
                        .default
                  )}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option:
                          "samlSPMetaDataOptionsSessionNotOnOrAfterTimeout",
                        value: e.target.value || "",
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
                    {definitions.samlSPMetaDataOptionsNotOnOrAfterTimeout
                      ? definitions.samlSPMetaDataOptionsNotOnOrAfterTimeout
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsNotOnOrAfterTimeout")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  type="number"
                  value={String(
                    data.samlSPMetaDataOptionsNotOnOrAfterTimeout ||
                      attributes.samlSPMetaDataOptionsNotOnOrAfterTimeout
                        .default
                  )}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option: "samlSPMetaDataOptionsNotOnOrAfterTimeout",
                        value: e.target.value || "",
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
                    {definitions.samlSPMetaDataOptionsForceUTF8
                      ? definitions.samlSPMetaDataOptionsForceUTF8
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsForceUTF8")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.samlSPMetaDataOptionsForceUTF8 ||
                      attributes.samlMetadataForceUTF8.default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsForceUTF8",
                          value: Number(e.target.value || ""),
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.samlSPMetaDataOptionsSignatureMethod
                      ? definitions.samlSPMetaDataOptionsSignatureMethod
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsSignatureMethod")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("samlSPMetaDataOptionsSignatureMethod")}
                  </InputLabel>
                  <Select
                    value={
                      data.samlSPMetaDataOptionsSignatureMethod ||
                      attributes.samlSPMetaDataOptionsSignatureMethod.default
                    }
                    label={t("samlSPMetaDataOptionsSignatureMethod")}
                    displayEmpty
                    onChange={(e) =>
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsSignatureMethod",
                          value: String(e.target.value || ""),
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.samlSPMetaDataOptionsSignSSOMessage
                      ? definitions.samlSPMetaDataOptionsSignSSOMessage
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsSignSSOMessage")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.samlSPMetaDataOptionsSignSSOMessage !== undefined &&
                      data.samlSPMetaDataOptionsSignSSOMessage !== null
                        ? data.samlSPMetaDataOptionsSignSSOMessage
                        : attributes.samlSPMetaDataOptionsSignSSOMessage.default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsSignSSOMessage",
                          value: Number(e.target.value || ""),
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.samlSPMetaDataOptionsCheckSSOMessageSignature
                      ? definitions.samlSPMetaDataOptionsCheckSSOMessageSignature
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsCheckSSOMessageSignature")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.samlSPMetaDataOptionsCheckSSOMessageSignature ||
                      attributes.samlSPMetaDataOptionsCheckSSOMessageSignature
                        .default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option:
                            "samlSPMetaDataOptionsCheckSSOMessageSignature",
                          value: Number(e.target.value || ""),
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.samlSPMetaDataOptionsSignSLOMessage
                      ? definitions.samlSPMetaDataOptionsSignSLOMessage
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsSignSLOMessage")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.samlSPMetaDataOptionsSignSLOMessage !== undefined &&
                      data.samlSPMetaDataOptionsSignSLOMessage !== null
                        ? data.samlSPMetaDataOptionsSignSLOMessage
                        : attributes.samlSPMetaDataOptionsSignSLOMessage.default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsSignSLOMessage",
                          value: Number(e.target.value || ""),
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.samlSPMetaDataOptionsCheckSLOMessageSignature
                      ? definitions.samlSPMetaDataOptionsCheckSLOMessageSignature
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsCheckSLOMessageSignature")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.samlSPMetaDataOptionsCheckSLOMessageSignature ||
                      attributes.samlSPMetaDataOptionsCheckSLOMessageSignature
                        .default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option:
                            "samlSPMetaDataOptionsCheckSLOMessageSignature",
                          value: Number(e.target.value || ""),
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.samlSPMetaDataOptionsEncryptionMode
                      ? definitions.samlSPMetaDataOptionsEncryptionMode
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsEncryptionMode")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("samlSPMetaDataOptionsEncryptionMode")}
                  </InputLabel>
                  <Select
                    value={
                      data.samlSPMetaDataOptionsEncryptionMode ||
                      attributes.samlSPMetaDataOptionsEncryptionMode.default
                    }
                    label={t("samlSPMetaDataOptionsEncryptionMode")}
                    displayEmpty
                    onChange={(e) =>
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsEncryptionMode",
                          value: String(e.target.value || ""),
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.samlSPMetaDataOptionsEnableIDPInitiatedURL
                      ? definitions.samlSPMetaDataOptionsEnableIDPInitiatedURL
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsEnableIDPInitiatedURL")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.samlSPMetaDataOptionsEnableIDPInitiatedURL ||
                      attributes.samlSPMetaDataOptionsEnableIDPInitiatedURL
                        .default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateSamlMetaDataOptions({
                          name,
                          option: "samlSPMetaDataOptionsEnableIDPInitiatedURL",
                          value: Number(e.target.value || ""),
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.samlSPMetaDataOptionsAuthnLevel}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsAuthnLevel")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  type="text"
                  value={String(data.samlSPMetaDataOptionsAuthnLevel || "")}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option: "samlSPMetaDataOptionsAuthnLevel",
                        value: e.target.value || "",
                      })
                    )
                  }
                />
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>{definitions.samlSPMetaDataOptionsRule}</Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsRule")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  type="number"
                  value={String(data.samlSPMetaDataOptionsRule || "")}
                  onChange={(e) =>
                    dispatch(
                      updateSamlMetaDataOptions({
                        name,
                        option: "samlSPMetaDataOptionsRule",
                        value: e.target.value || "",
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.samlSPMetaDataOptionsFederationEntityID
                      ? definitions.samlSPMetaDataOptionsFederationEntityID
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("samlSPMetaDataOptionsFederationEntityID")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
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
                        value: e.target.value || "",
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
                    {definitions.samlSPMetaDataOptionsFederationOptionalAttributes
                      ? definitions.samlSPMetaDataOptionsFederationOptionalAttributes
                      : ""}
                  </Markdown>
                }
              >
                <th>
                  {t("samlSPMetaDataOptionsFederationOptionalAttributes")}
                </th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("samlSPMetaDataOptionsFederationOptionalAttributes")}
                  </InputLabel>
                  <Select
                    value={
                      data.samlSPMetaDataOptionsFederationOptionalAttributes ||
                      attributes
                        .samlSPMetaDataOptionsFederationOptionalAttributes
                        .default
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
                          value: String(e.target.value || ""),
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.samlSPMetaDataOptionsFederationRequiredAttributes
                      ? definitions.samlSPMetaDataOptionsFederationRequiredAttributes
                      : ""}
                  </Markdown>
                }
              >
                <th>
                  {t("samlSPMetaDataOptionsFederationRequiredAttributes")}
                </th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("samlSPMetaDataOptionsFederationRequiredAttributes")}
                  </InputLabel>
                  <Select
                    value={
                      data.samlSPMetaDataOptionsFederationRequiredAttributes ||
                      attributes
                        .samlSPMetaDataOptionsFederationRequiredAttributes
                        .default
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
                          value: String(e.target.value || ""),
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
        <TextField
          size="small"
          margin="normal"
          multiline
          variant="filled"
          fullWidth
          rows={4}
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
                value: e.target.value || "",
              })
            )
          }
        />
      )}
    </>
  );
}
