import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import attributes from "../static/attributes.json";
import definitions from "../static/definitions.json";

export default function BlackWhiteListForm({
  value,
  fieldName,
  updateFunc,
}: {
  value: string;
  fieldName: string;
  updateFunc: Function;
}) {
  const attribute = attributes[fieldName as keyof typeof attributes];
  return (
    <>
      <Tooltip
        title={
          <Markdown>
            {(definitions[fieldName as keyof typeof definitions]
              ? definitions[fieldName as keyof typeof definitions]
              : "") + ""}
          </Markdown>
        }
      >
        <th className="title3">{t(fieldName)}</th>
      </Tooltip>
      <td>
        <FormControl>
          <FormLabel>{t(fieldName)}</FormLabel>
          <RadioGroup
            row
            value={
              value.split(";")[0] ||
              ("default" in attribute
                ? String(attribute.default).split(";")[0]
                : 0)
            }
            onChange={(e) =>
              updateFunc(
                `${Number(e.target.value)};${String(value).split(";")[1]}`
              )
            }
          >
            <FormControlLabel
              value={1}
              control={<Radio />}
              label={t("whiteList")}
            />
            <FormControlLabel
              value={0}
              control={<Radio />}
              label={t("blackList")}
            />
          </RadioGroup>
        </FormControl>
        <TextField
          size="small"
          onChange={(e) =>
            updateFunc(`${String(value).split(";")[0]};${e.target.value}`)
          }
          placeholder={t(fieldName)}
          value={
            value.split(";")[1] ||
            ("default" in attribute
              ? String(attribute.default).split(";")[1]
              : 0)
          }
        />
      </td>
    </>
  );
}
