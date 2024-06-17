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

export function KerberosSimpleView() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  return (
    <div className="appDesc">
      <span className="title2">{t("kerberosParams")}</span>
      <table>
        <tbody>
          <tr>
            <Tooltip title={<Markdown>{definitions.krbKeytab}</Markdown>}>
              <th>{t("krbKeytab")}</th>
            </Tooltip>
            <td>
              <TextField
                size="small"
                type="text"
                onChange={(e) =>
                  dispatch(
                    updateConfigParams({
                      param: "krbKeytab",
                      value: e.target.value,
                    })
                  )
                }
                value={config.krbKeytab || ""}
              />
            </td>
          </tr>
          <tr>
            <Tooltip
              title={
                <Markdown>
                  {(definitions ? definitions.krbByJs : "") + ""}
                </Markdown>
              }
            >
              <th>{t("krbByJs")}</th>
            </Tooltip>
            <td>
              <FormControl>
                <RadioGroup
                  row
                  value={config.krbByJs || attributes.krbByJs.default}
                  onChange={(e) =>
                    dispatch(
                      updateConfigParams({
                        param: "krbByJs",
                        value: Number(e.target.value),
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
                  {(definitions ? definitions.krbRemoveDomain : "") + ""}
                </Markdown>
              }
            >
              <th>{t("krbRemoveDomain")}</th>
            </Tooltip>
            <td>
              <FormControl>
                <RadioGroup
                  row
                  value={
                    config.krbRemoveDomain || attributes.krbRemoveDomain.default
                  }
                  onChange={(e) =>
                    dispatch(
                      updateConfigParams({
                        param: "krbRemoveDomain",
                        value: Number(e.target.value),
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
              title={<Markdown>{definitions.krbAllowedDomains}</Markdown>}
            >
              <th>{t("krbAllowedDomains")}</th>
            </Tooltip>
            <td>
              <TextField
                size="small"
                type="text"
                onChange={(e) =>
                  dispatch(
                    updateConfigParams({
                      param: "krbAllowedDomains",
                      value: e.target.value,
                    })
                  )
                }
                value={config.krbAllowedDomains || ""}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
