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
import definitions from "../static/definitions.json";
export default function SamlAssertionForm({
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
          <th>{t("default")}</th>
          <td>
            <FormControl>
              <RadioGroup
                row
                value={value?.split(";")[0] || 0}
                onChange={(e) =>
                  updateFunc({
                    param: fieldName,
                    value: [
                      e.target.value,
                      1 - Number(e.target.value),
                      value?.split(";")[2],
                      value?.split(";")[3],
                    ].join(";"),
                  })
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
          <th>{t("url")}</th>
          <td>
            <TextField
              size="small"
              margin="normal"
              variant="filled"
              className="form"
              value={value?.split(";")[3] || ""}
              onChange={(e) =>
                updateFunc({
                  param: fieldName,
                  value: [
                    value?.split(";")[0],
                    value?.split(";")[1],
                    value?.split(";")[2],
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
