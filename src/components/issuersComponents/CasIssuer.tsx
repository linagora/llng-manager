import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  FormControl,
  FormControlLabel,
  IconButton,
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
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  delModuleOpt,
  newModuleOpt,
  toggleCAS,
  updateConfigParams,
  updateModuleOpt,
} from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";
import { TableVars } from "../applicationsComponents/TableVars";
export function CasIssuer() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  const [option, setOption] = useState("basic");
  return (
    <div>
      <div className="top">
        <strong className="title">{t("casServiceMetadata")}</strong>
      </div>
      <div className="optionNavbar">
        <label
          className={`option ${option === "basic" ? "selected" : ""}`}
          onClick={() => {
            setOption("basic");
          }}
        >
          {t("Basic Option")}
        </label>
        <label
          className={`option ${
            option === "casStorageOptions" ? "selected" : ""
          }`}
          onClick={() => setOption("casStorageOptions")}
        >
          {t("casStorageOptions")}
        </label>
        <label
          className={`option ${option === "casAttributes" ? "selected" : ""}`}
          onClick={() => setOption("casAttributes")}
        >
          {t("casAttributes")}
        </label>
      </div>
      <div className="appDesc">
        {option === "basic" && (
          <div className="box">
            <table>
              <tbody>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>
                        {(definitions
                          ? definitions.issuerDBCASActivation
                          : "") + ""}
                      </Markdown>
                    }
                  >
                    <th>{t("issuerDBCASActivation")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.issuerDBCASActivation ||
                          attributes.issuerDBCASActivation.default
                        }
                        onChange={() => dispatch(toggleCAS())}
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
                  <Tooltip title={<Markdown>{definitions.casAttr}</Markdown>}>
                    <th>{t("casAttr")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={config.casAttr || ""}
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "casAttr",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <Tooltip
                    title={
                      <Markdown>{definitions.casAccessControlPolicy}</Markdown>
                    }
                  >
                    <th>{t("casAccessControlPolicy")}</th>
                  </Tooltip>
                  <td>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel>{t("casAccessControlPolicy")}</InputLabel>
                      <Select
                        value={
                          config.casAccessControlPolicy
                            ? config.casAccessControlPolicy
                            : attributes.casAccessControlPolicy.default
                        }
                        label={t("casAccessControlPolicy")}
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param: "casAccessControlPolicy",
                              value: e.target.value,
                            })
                          )
                        }
                      >
                        {attributes.casAccessControlPolicy.select.map((el) => {
                          return (
                            <MenuItem key={el.k} value={el.k}>
                              {t(el.v)}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <Tooltip
                    title={<Markdown>{definitions.casStrictMatching}</Markdown>}
                  >
                    <th>{t("casStrictMatching")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.casStrictMatching ||
                          attributes.casStrictMatching.default
                        }
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param: "casStrictMatching",
                              value: e.target.value,
                            })
                          )
                        }
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
                      <Markdown>{definitions.casTicketExpiration}</Markdown>
                    }
                  >
                    <th>{t("casTicketExpiration")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      type="number"
                      value={String(
                        config.casTicketExpiration ||
                          attributes.casTicketExpiration.default
                      )}
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "casTicketExpiration",
                            value: e.target.value,
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
                        {definitions.casBackChannelSingleLogout}
                      </Markdown>
                    }
                  >
                    <th>{t("casBackChannelSingleLogout")}</th>
                  </Tooltip>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          config.casBackChannelSingleLogout ||
                          attributes.casBackChannelSingleLogout.default
                        }
                        onChange={(e) =>
                          dispatch(
                            updateConfigParams({
                              param: "casBackChannelSingleLogout",
                              value: e.target.value,
                            })
                          )
                        }
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
                    title={<Markdown>{definitions.casStorage}</Markdown>}
                  >
                    <th>{t("casStorage")}</th>
                  </Tooltip>
                  <td>
                    <TextField
                      size="small"
                      margin="normal"
                      variant="filled"
                      className="form"
                      value={config.casStorage || ""}
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "casStorage",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {option === "casStorageOptions" && (
          <table id="casStorageOptions">
            <thead>
              <tr>
                <th>{t("keys")}</th>
                <th>{t("values")}</th>
                <th>
                  <IconButton
                    className="plus"
                    onClick={() => dispatch(newModuleOpt("casStorageOptions"))}
                  >
                    <AddCircleIcon color="success" />
                  </IconButton>
                </th>
              </tr>
            </thead>
            <TableVars
              appName={"casStorageOptions"}
              vars={config.casStorageOptions ? config.casStorageOptions : {}}
              tableID={"casStorageOptions"}
              dispatch={dispatch}
              delFunction={delModuleOpt}
              updateFunction={updateModuleOpt}
            />
          </table>
        )}
        {option === "casAttributes" && (
          <table id="casAttributes">
            <thead>
              <tr>
                <th>{t("keys")}</th>
                <th>{t("values")}</th>
                <th>
                  <IconButton
                    className="plus"
                    onClick={() => dispatch(newModuleOpt("casAttributes"))}
                  >
                    <AddCircleIcon color="success" />
                  </IconButton>
                </th>
              </tr>
            </thead>
            <TableVars
              appName={"casAttributes"}
              vars={config.casAttributes ? config.casAttributes : {}}
              tableID={"casAttributes"}
              dispatch={dispatch}
              delFunction={delModuleOpt}
              updateFunction={updateModuleOpt}
            />
          </table>
        )}
      </div>
    </div>
  );
}
