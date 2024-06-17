import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateConfigParams } from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";

export function OIDIssuer() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  return (
    <div>
      <strong className="title">{t("issuerDBOIDParameters")}</strong>
      <div className="appDesc">
        <div className="box">
          <table>
            <tbody>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {(definitions
                        ? definitions.issuerDBOpenIDActivation
                        : "") + ""}
                    </Markdown>
                  }
                >
                  <th>{t("issuerDBOIDActivation")}</th>
                </Tooltip>
                <td>
                  <FormControl>
                    <RadioGroup
                      row
                      value={
                        config.issuerDBOpenIDActivation ||
                        attributes.issuerDBOpenIDActivation.default
                      }
                      onChange={() =>
                        dispatch(
                          updateConfigParams({
                            param: "issuerDBOpenIDActivation",
                            value: 1 - Number(config.issuerDBOpenIDActivation),
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
                    <Markdown>
                      {(definitions ? definitions.openIdIssuerSecret : "") + ""}
                    </Markdown>
                  }
                >
                  <th>{t("openIdIssuerSecret")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    type="text"
                    value={String(config.openIdIssuerSecret || "")}
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "openIdIssuerSecret",
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
                      {(definitions ? definitions.openIdAttr : "") + ""}
                    </Markdown>
                  }
                >
                  <th>{t("openIdAttr")}</th>
                </Tooltip>
                <td>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
                    className="form"
                    type="text"
                    value={String(config.openIdAttr || "")}
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "openIdAttr",
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
                      {(definitions ? definitions.openIdSPList : "") + ""}
                    </Markdown>
                  }
                >
                  <th>{t("openIdSPList")}</th>
                </Tooltip>
                <td>
                  <FormControl>
                    <RadioGroup
                      row
                      value={config.openIdSPList?.split(";")[0] || 0}
                      onChange={(e) =>
                        dispatch(
                          updateConfigParams({
                            param: "openIdSPList",
                            value: `${Number(e.target.value)};${
                              config.openIdSPList?.split(";")[1]
                            }`,
                          })
                        )
                      }
                    >
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label={t("blacklist")}
                      />
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={t("whitelist")}
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    size="small"
                    type="url"
                    value={config.openIdSPList?.split(";")[1] || ""}
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "openIdSPList",
                          value: `${config.openIdSPList?.split(";")[0]};${
                            e.target.value
                          }`,
                        })
                      )
                    }
                    placeholder={t("openIdSPList")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
