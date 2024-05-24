import AddCircleIcon from "@mui/icons-material/AddCircle";
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
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  toggleCAS,
  updateConfigParams,
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
      <strong className="title">{t("casServiceMetadata")}</strong>
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
                        value={config.issuerDBCASActivation ? true : false}
                        onChange={() => dispatch(toggleCAS())}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label={t("on")}
                        />
                        <FormControlLabel
                          value={false}
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
                      defaultValue={""}
                      value={config.casAttr}
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
                        defaultValue={attributes.casStrictMatching.default}
                        value={config.casStrictMatching}
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
                      defaultValue={attributes.casTicketExpiration.default}
                      value={String(config.casTicketExpiration)}
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
                        defaultValue={
                          attributes.casBackChannelSingleLogout.default
                        }
                        value={config.casBackChannelSingleLogout}
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
                      defaultValue={""}
                      value={config.casStorage}
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
                  <Button className="plus">
                    <AddCircleIcon color="success" />
                  </Button>
                </th>
              </tr>
            </thead>
            {TableVars(
              "cas",
              config.casStorageOptions ? config.casStorageOptions : {},
              "casStorageOptions",
              console.log,
              console.log,
              console.log
            )}
          </table>
        )}
        {option === "casAttributes" && (
          <table id="casAttributes">
            <thead>
              <tr>
                <th>{t("keys")}</th>
                <th>{t("values")}</th>
                <th>
                  <Button className="plus">
                    <AddCircleIcon color="success" />
                  </Button>
                </th>
              </tr>
            </thead>
            {TableVars(
              "cas",
              config.casAttributes ? config.casAttributes : {},
              "casAttributes",
              console.log,
              console.log,
              console.log
            )}
          </table>
        )}
      </div>
    </div>
  );
}
