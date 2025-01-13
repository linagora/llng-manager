import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  List,
  ListItemText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Tooltip,
  styled,
} from "@mui/material";
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsBypassConsent
                      ? definitions.oidcRPMetaDataOptionsBypassConsent
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsBypassConsent")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsBypassConsent
                        : attributes.oidcRPMetaDataOptionsBypassConsent.default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsBypassConsent",
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsIDTokenForceClaims
                      ? definitions.oidcRPMetaDataOptionsIDTokenForceClaims
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsIDTokenForceClaims")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsIDTokenForceClaims
                        : attributes.oidcRPMetaDataOptionsIDTokenForceClaims
                            .default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsIDTokenForceClaims",
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsAccessTokenJWT
                      ? definitions.oidcRPMetaDataOptionsAccessTokenJWT
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsAccessTokenJWT")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAccessTokenJWT
                        : attributes.oidcRPMetaDataOptionsAccessTokenJWT.default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsAccessTokenJWT",
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsAccessTokenClaims
                      ? definitions.oidcRPMetaDataOptionsAccessTokenClaims
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsAccessTokenClaims")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAccessTokenClaims
                        : attributes.oidcRPMetaDataOptionsAccessTokenClaims
                            .default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsAccessTokenClaims",
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsRefreshToken}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsRefreshToken")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsRefreshToken
                        : attributes.oidcRPMetaDataOptionsRefreshToken.default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsRefreshToken",
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsIDTokenSignAlg
                      ? definitions.oidcRPMetaDataOptionsIDTokenSignAlg
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsIDTokenSignAlg")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>
                    {t("oidcRPMetaDataOptionsIDTokenSignAlg")}
                  </InputLabel>
                  <Select
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsIDTokenSignAlg
                        : attributes.oidcRPMetaDataOptionsIDTokenSignAlg.default
                    }
                    label={t("oidcRPMetaDataOptionsIDTokenSignAlg")}
                    onChange={(e) =>
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsIDTokenSignAlg",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.oidcRPMetaDataOptionsIDTokenSignAlg.select.map(
                      (el) => {
                        return (
                          <MenuItem key={el.v} value={el.k}>
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
                    {definitions.oidcRPMetaDataOptionsAccessTokenSignAlg
                      ? definitions.oidcRPMetaDataOptionsAccessTokenSignAlg
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsAccessTokenSignAlg")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>
                    {t("oidcRPMetaDataOptionsAccessTokenSignAlg")}
                  </InputLabel>
                  <Select
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAccessTokenSignAlg
                        : attributes.oidcRPMetaDataOptionsAccessTokenSignAlg
                            .default
                    }
                    label={t("oidcRPMetaDataOptionsAccessTokenSignAlg")}
                    onChange={(e) =>
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsAccessTokenSignAlg",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.oidcRPMetaDataOptionsAccessTokenSignAlg.select.map(
                      (el) => {
                        return (
                          <MenuItem key={el.v} value={el.k}>
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
                    {definitions.oidcRPMetaDataOptionsUserInfoSignAlg
                      ? definitions.oidcRPMetaDataOptionsUserInfoSignAlg
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsUserInfoSignAlg")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("oidcRPMetaDataOptionsUserInfoSignAlg")}
                  </InputLabel>
                  <Select
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsUserInfoSignAlg
                        : attributes.oidcRPMetaDataOptionsUserInfoSignAlg
                            .default
                    }
                    displayEmpty
                    label={t("oidcRPMetaDataOptionsUserInfoSignAlg")}
                    onChange={(e) =>
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsUserInfoSignAlg",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.oidcRPMetaDataOptionsUserInfoSignAlg.select.map(
                      (el) => {
                        return (
                          <MenuItem key={el.v} value={el.k}>
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
                    {definitions.oidcRPMetaDataOptionsRequirePKCE}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsRequirePKCE")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsRequirePKCE
                        : attributes.oidcRPMetaDataOptionsRequirePKCE.default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsRequirePKCE",
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsAllowOffline}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsAllowOffline")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAllowOffline
                        : attributes.oidcRPMetaDataOptionsAllowOffline.default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsAllowOffline",
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsAllowPasswordGrant}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsAllowPasswordGrant")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAllowPasswordGrant
                        : attributes.oidcRPMetaDataOptionsAllowPasswordGrant
                            .default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsAllowPasswordGrant",
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
              <Tooltip
                title={
                  <Markdown>
                    {
                      definitions.oidcRPMetaDataOptionsAllowClientCredentialsGrant
                    }
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsAllowClientCredentialsGrant")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAllowClientCredentialsGrant
                        : attributes
                            .oidcRPMetaDataOptionsAllowClientCredentialsGrant
                            .default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option:
                            "oidcRPMetaDataOptionsAllowClientCredentialsGrant",
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg")}
                  </InputLabel>
                  <Select
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg
                        : ""
                    }
                    label={t("oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg")}
                    displayEmpty
                    onChange={(e) =>
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option:
                            "oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg.select.map(
                      (el) => {
                        return (
                          <MenuItem key={el.v} value={el.k}>
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
                    {
                      definitions.oidcRPMetaDataOptionsAccessTokenEncContentEncAlg
                    }
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsAccessTokenEncContentEncAlg")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>
                    {t("oidcRPMetaDataOptionsAccessTokenEncContentEncAlg")}
                  </InputLabel>
                  <Select
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAccessTokenEncContentEncAlg
                        : attributes
                            .oidcRPMetaDataOptionsAccessTokenEncContentEncAlg
                            .default
                    }
                    label={t(
                      "oidcRPMetaDataOptionsAccessTokenEncContentEncAlg"
                    )}
                    onChange={(e) =>
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option:
                            "oidcRPMetaDataOptionsAccessTokenEncContentEncAlg",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.oidcRPMetaDataOptionsAccessTokenEncContentEncAlg.select.map(
                      (el) => {
                        return (
                          <MenuItem key={el.v} value={el.k}>
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
                    {"# oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg" +
                      definitions.test}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg")}
                  </InputLabel>
                  <Select
                    value={
                      (data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg
                        : "") || ""
                    }
                    displayEmpty
                    label={t("oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg")}
                    onChange={(e) =>
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg.select.map(
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
                    {definitions.oidcRPMetaDataOptionsIdTokenEncContentEncAlg}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsIdTokenEncContentEncAlg")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>
                    {t("oidcRPMetaDataOptionsIdTokenEncContentEncAlg")}
                  </InputLabel>
                  <Select
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsIdTokenEncContentEncAlg
                        : attributes
                            .oidcRPMetaDataOptionsIdTokenEncContentEncAlg
                            .default
                    }
                    label={t("oidcRPMetaDataOptionsIdTokenEncContentEncAlg")}
                    onChange={(e) =>
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option:
                            "oidcRPMetaDataOptionsIdTokenEncContentEncAlg",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.oidcRPMetaDataOptionsIdTokenEncContentEncAlg.select.map(
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
                    {definitions.oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg")}
                  </InputLabel>
                  <Select
                    value={
                      (data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg
                        : "") || ""
                    }
                    displayEmpty
                    label={t("oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg")}
                    onChange={(e) =>
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg.select.map(
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
                    {definitions.oidcRPMetaDataOptionsUserInfoEncContentEncAlg}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsUserInfoEncContentEncAlg")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>
                    {t("oidcRPMetaDataOptionsUserInfoEncContentEncAlg")}
                  </InputLabel>
                  <Select
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsUserInfoEncContentEncAlg
                        : attributes
                            .oidcRPMetaDataOptionsUserInfoEncContentEncAlg
                            .default
                    }
                    label={t("oidcRPMetaDataOptionsUserInfoEncContentEncAlg")}
                    onChange={(e) =>
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option:
                            "oidcRPMetaDataOptionsUserInfoEncContentEncAlg",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.oidcRPMetaDataOptionsUserInfoEncContentEncAlg.select.map(
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
                    {definitions.oidcRPMetaDataOptionsLogoutEncKeyMgtAlg}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsLogoutEncKeyMgtAlg")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel shrink>
                    {t("oidcRPMetaDataOptionsLogoutEncKeyMgtAlg")}
                  </InputLabel>
                  <Select
                    value={
                      (data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsLogoutEncKeyMgtAlg
                        : "") || ""
                    }
                    displayEmpty
                    label={t("oidcRPMetaDataOptionsLogoutEncKeyMgtAlg")}
                    onChange={(e) =>
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsLogoutEncKeyMgtAlg",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.oidcRPMetaDataOptionsLogoutEncKeyMgtAlg.select.map(
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
                    {definitions.oidcRPMetaDataOptionsLogoutEncContentEncAlg}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsLogoutEncContentEncAlg")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>
                    {t("oidcRPMetaDataOptionsLogoutEncContentEncAlg")}
                  </InputLabel>
                  <Select
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsLogoutEncContentEncAlg
                        : attributes.oidcRPMetaDataOptionsLogoutEncContentEncAlg
                            .default
                    }
                    label={t("oidcRPMetaDataOptionsLogoutEncContentEncAlg")}
                    onChange={(e) =>
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsLogoutEncContentEncAlg",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.oidcRPMetaDataOptionsLogoutEncContentEncAlg.select.map(
                      (el) => {
                        return (
                          <MenuItem key={el.v} value={el.k}>
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsLogoutBypassConfirm}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsLogoutBypassConfirm")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      (data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsLogoutBypassConfirm
                        : attributes.oidcRPMetaDataOptionsLogoutBypassConfirm
                            .default) ||
                      attributes.oidcRPMetaDataOptionsLogoutBypassConfirm
                        .default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsLogoutBypassConfirm",
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsLogoutSessionRequired}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsLogoutSessionRequired")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsLogoutSessionRequired
                        : attributes.oidcRPMetaDataOptionsLogoutSessionRequired
                            .default
                    }
                    onChange={(e) => {
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsLogoutSessionRequired",
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsLogoutType}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsLogoutType")}</th>
              </Tooltip>
              <td>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>
                    {t("oidcRPMetaDataOptionsLogoutType")}
                  </InputLabel>
                  <Select
                    value={
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsLogoutType
                        : attributes.oidcRPMetaDataOptionsLogoutType.default
                    }
                    label={t("oidcRPMetaDataOptionsLogoutType")}
                    onChange={(e) =>
                      dispatch(
                        updateOidcMetaDataOptions({
                          name,
                          option: "oidcRPMetaDataOptionsLogoutType",
                          value: String(e.target.value),
                        })
                      )
                    }
                  >
                    {attributes.oidcRPMetaDataOptionsLogoutType.select.map(
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
        className={`suboption ${optionSelect === "advanced" ? "selected" : ""}`}
        onClick={() => setOptionSelected("advanced")}
      >
        {t("oidcRPMetaDataOptionsAdvanced")}
      </ListItemText>
      <ListItemText
        className={`suboption ${optionSelect === "scope" ? "selected" : ""}`}
        onClick={() => setOptionSelected("scope")}
      >
        {t("oidcRPMetaDataOptionsScopes")}
      </ListItemText>
      <ListItemText
        className={`suboption ${optionSelect === "security" ? "selected" : ""}`}
        onClick={() => setOptionSelected("security")}
      >
        {t("security")}
      </ListItemText>
      <ListItemText
        className={`suboption ${optionSelect === "keys" ? "selected" : ""}`}
        onClick={() => setOptionSelected("keys")}
      >
        {t("keys")}
      </ListItemText>
      <ListItemText
        className={`suboption ${optionSelect === "timouts" ? "selected" : ""}`}
        onClick={() => setOptionSelected("timouts")}
      >
        {t("oidcRPMetaDataOptionsTimeouts")}
      </ListItemText>
      <ListItemText
        className={`suboption ${optionSelect === "logout" ? "selected" : ""}`}
        onClick={() => setOptionSelected("logout")}
      >
        {t("logout")}
      </ListItemText>
      <ListItemText
        className={`suboption ${optionSelect === "comment" ? "selected" : ""}`}
        onClick={() => setOptionSelected("comment")}
      >
        {t("oidcRPMetaDataOptionsComment")}
      </ListItemText>
    </List>
  );
}
