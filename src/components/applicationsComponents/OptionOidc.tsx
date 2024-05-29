import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  styled,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";
import { handleChangeFile } from "../../utils/readFiles";
import { URLLoader } from "../managerComponents/URLLoader";
import { TableVars } from "./TableVars";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function OptionOidc({ name }: { name: string }) {
  const [optionSelect, setOptionSelected] = useState("advanced");
  const data = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="optionNavbar">
        <label
          className={`option ${optionSelect === "advanced" ? "selected" : ""}`}
          onClick={() => setOptionSelected("advanced")}
        >
          {t("oidcRPMetaDataOptionsAdvanced")}
        </label>
        <label
          className={`option ${optionSelect === "scope" ? "selected" : ""}`}
          onClick={() => setOptionSelected("scope")}
        >
          {t("oidcRPMetaDataOptionsScopes")}
        </label>
        <label
          className={`option ${optionSelect === "security" ? "selected" : ""}`}
          onClick={() => setOptionSelected("security")}
        >
          {t("security")}
        </label>
        <label
          className={`option ${optionSelect === "keys" ? "selected" : ""}`}
          onClick={() => setOptionSelected("keys")}
        >
          {t("keys")}
        </label>
        <label
          className={`option ${optionSelect === "timouts" ? "selected" : ""}`}
          onClick={() => setOptionSelected("timouts")}
        >
          {t("oidcRPMetaDataOptionsTimeouts")}
        </label>
        <label
          className={`option ${optionSelect === "logout" ? "selected" : ""}`}
          onClick={() => setOptionSelected("logout")}
        >
          {t("logout")}
        </label>
        <label
          className={`option ${optionSelect === "comment" ? "selected" : ""}`}
          onClick={() => setOptionSelected("comment")}
        >
          {t("oidcRPMetaDataOptionsComment")}
        </label>
      </div>
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsUserIDAttr
                      ? definitions.oidcRPMetaDataOptionsUserIDAttr
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsUserIDAttr")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsUserIDAttr
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsUserIDAttr
                        : ""
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsAdditionalAudiences
                      ? definitions.oidcRPMetaDataOptionsAdditionalAudiences
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsAdditionalAudiences")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAdditionalAudiences
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAdditionalAudiences
                        : ""
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
                    <Button
                      className="plus"
                      onClick={() =>
                        dispatch(newOidcRPMetaDataOptionsExtraClaims(name))
                      }
                    >
                      <AddCircleIcon color="success" />
                    </Button>
                  </th>
                </tr>
              </thead>{" "}
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
            <Button
              className="plus"
              onClick={() =>
                dispatch(newOidcRPMetaDataOptionsExtraClaims(name))
              }
            >
              <AddCircleIcon color="success" />
            </Button>
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
                    <Button
                      className="plus"
                      onClick={() =>
                        dispatch(newOidcRPMetaDataScopeRules(name))
                      }
                    >
                      <AddCircleIcon color="success" />
                    </Button>
                  </th>
                </tr>
              </thead>{" "}
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
            <Button
              className="plus"
              onClick={() => dispatch(newOidcRPMetaDataScopeRules(name))}
            >
              <AddCircleIcon color="success" />
            </Button>
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsRequestUris
                      ? definitions.oidcRPMetaDataOptionsRequestUris
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsRequestUris")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsRequestUris
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsRequestUris
                        : ""
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsAuthnLevel}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsAuthnLevel")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAuthnLevel
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAuthnLevel
                        : ""
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
              <Tooltip
                title={
                  <Markdown>{definitions.oidcRPMetaDataOptionsRule}</Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsRule")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsRule
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsRule
                        : ""
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
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg
                        : ""
                    }
                    displayEmpty
                    defaultValue=""
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
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg
                        : ""
                    }
                    displayEmpty
                    defaultValue=""
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
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsLogoutEncKeyMgtAlg
                        : ""
                    }
                    displayEmpty
                    defaultValue=""
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsJwksUri}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsJwksUri")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  className="form"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsJwksUri
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsJwksUri
                        : ""
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
              <td>
                <div>
                  <TextField
                    size="small"
                    margin="normal"
                    multiline
                    variant="filled"
                    fullWidth
                    rows={4}
                    placeholder="oidcRPMetaDataOptionsJwks"
                    value={String(
                      name
                        ? data.oidcRPMetaDataOptions
                          ? data.oidcRPMetaDataOptions[name]
                            ? data.oidcRPMetaDataOptions[name]
                                .oidcRPMetaDataOptionsJwks
                              ? data.oidcRPMetaDataOptions[name]
                                  .oidcRPMetaDataOptionsJwks
                              : ""
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
                  />
                </div>
                <div>
                  <Button
                    sx={{ margin: "5px" }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    {t("upload")}
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => {
                        if (e.target instanceof HTMLInputElement) {
                          handleChangeFile(
                            e as ChangeEvent<HTMLInputElement>
                          ).then((fileContent) => {
                            console.log("File content:", fileContent);
                            dispatch(
                              updateOidcMetaDataOptions({
                                name,
                                option: "oidcRPMetaDataOptionsJwks",
                                value: fileContent,
                              })
                            );
                          });
                        }
                      }}
                    />
                  </Button>
                </div>
                <URLLoader
                  appName={name}
                  loadFunction={updateOidcRPMetaDataOptionsJwks}
                />
              </td>
            </tr>
          </tbody>
        </table>
      )}
      {optionSelect === "timouts" && (
        <table>
          <tbody>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsAuthorizationCodeExpiration
                      ? definitions.oidcRPMetaDataOptionsAuthorizationCodeExpiration
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsAuthorizationCodeExpiration")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  type="number"
                  value={String(
                    data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAuthorizationCodeExpiration
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAuthorizationCodeExpiration
                        : ""
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsIDTokenExpiration
                      ? definitions.oidcRPMetaDataOptionsIDTokenExpiration
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsIDTokenExpiration")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  type="number"
                  value={String(
                    data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsIDTokenExpiration
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsIDTokenExpiration
                        : ""
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsAccessTokenExpiration
                      ? definitions.oidcRPMetaDataOptionsAccessTokenExpiration
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsAccessTokenExpiration")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  type="number"
                  value={String(
                    data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsAccessTokenExpiration
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsAccessTokenExpiration
                        : ""
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsOfflineSessionExpiration
                      ? definitions.oidcRPMetaDataOptionsOfflineSessionExpiration
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsOfflineSessionExpiration")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  type="number"
                  value={String(
                    data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsOfflineSessionExpiration
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsOfflineSessionExpiration
                        : ""
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
                      data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsLogoutBypassConfirm
                        : attributes.oidcRPMetaDataOptionsLogoutBypassConfirm
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsLogoutUrl}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsLogoutUrl")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsLogoutUrl
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsLogoutUrl
                        : ""
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
              <Tooltip
                title={
                  <Markdown>
                    {definitions.oidcRPMetaDataOptionsPostLogoutRedirectUris
                      ? definitions.oidcRPMetaDataOptionsPostLogoutRedirectUris
                      : ""}
                  </Markdown>
                }
              >
                <th>{t("oidcRPMetaDataOptionsPostLogoutRedirectUris")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  margin="normal"
                  variant="filled"
                  type="text"
                  value={String(
                    data.oidcRPMetaDataOptions
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsPostLogoutRedirectUris
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsPostLogoutRedirectUris
                        : ""
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
        <TextField
          size="small"
          margin="normal"
          multiline
          variant="filled"
          fullWidth
          rows={4}
          value={String(
            data.oidcRPMetaDataOptions
              ? data.oidcRPMetaDataOptions[name].oidcRPMetaDataOptionsComment
                ? data.oidcRPMetaDataOptions[name].oidcRPMetaDataOptionsComment
                : ""
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
