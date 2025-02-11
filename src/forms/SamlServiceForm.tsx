import { TextField, Tooltip } from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import definitions from "../static/definitions.json";
export default function SamlServiceForm({
  value,
  fieldName,
  updateFunc,
}: {
  value: string;
  fieldName: string;
  updateFunc: Function;
}) {
  return (
    <table>
      <tbody>
        <tr>
          <Tooltip
            title={
              <Markdown>
                {(definitions
                  ? definitions[fieldName as keyof typeof definitions]
                  : "") + ""}
              </Markdown>
            }
          >
            <th colSpan={2}>{t(fieldName)}</th>
          </Tooltip>
        </tr>
        <tr>
          <th>{t("url")}</th>
          <td>
            <TextField
              size="small"
              margin="normal"
              className="form"
              value={value?.split(";")[1] || ""}
              onChange={(e) =>
                updateFunc({
                  param: fieldName,
                  value: [
                    value?.split(";")[0],
                    e.target.value,
                    value?.split(";")[2],
                  ].join(";"),
                })
              }
            />
          </td>
        </tr>
        <tr>
          <th>{t("returnUrl")}</th>
          <td>
            <TextField
              size="small"
              margin="normal"
              className="form"
              value={value?.split(";")[2] || ""}
              onChange={(e) =>
                updateFunc({
                  param: fieldName,
                  value: [
                    value?.split(";")[0],
                    value?.split(";")[1],
                    e.target.value,
                  ].join(";"),
                })
              }
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
