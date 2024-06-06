import { TextField, Tooltip } from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateConfigParams } from "../../features/config/configSlice";
import definitions from "../../static/definitions.json";

export function ADSimpleView() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  return (
    <div className="appDesc">
      <span className="title2">{t("adParams")}</span>
      <table>
        <tbody>
          <tr>
            <Tooltip title={<Markdown>{definitions.ADPwdMaxAge}</Markdown>}>
              <th>{t("ADPwdMaxAge")}</th>
            </Tooltip>
            <td>
              <TextField
                size="small"
                type="number"
                onChange={(e) =>
                  dispatch(
                    updateConfigParams({
                      param: "ADPwdMaxAge",
                      value: e.target.value,
                    })
                  )
                }
                value={config.ADPwdMaxAge}
              />
            </td>
          </tr>
          <tr>
            <Tooltip
              title={<Markdown>{definitions.ADPwdExpireWarning}</Markdown>}
            >
              <th>{t("ADPwdExpireWarning")}</th>
            </Tooltip>
            <td>
              <TextField
                size="small"
                type="number"
                onChange={(e) =>
                  dispatch(
                    updateConfigParams({
                      param: "ADPwdExpireWarning",
                      value: e.target.value,
                    })
                  )
                }
                value={config.ADPwdExpireWarning}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
