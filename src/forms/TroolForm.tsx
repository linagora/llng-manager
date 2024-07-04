import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import attributes from "../static/attributes.json";
import definitions from "../static/definitions.json";

export default function TroolForm({
  value,
  fieldName,
  updateFunc,
}: {
  value: number;
  fieldName: string;
  updateFunc: Function;
}) {
  const attribute = attributes[fieldName as keyof typeof attributes];
  const fieldValue = value === 1 || value === 0 ? value : -1;
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
            value={fieldValue}
            onChange={(e) => updateFunc(Number(e.target.value))}
          >
            <FormControlLabel value={1} control={<Radio />} label={t("on")} />
            <FormControlLabel value={0} control={<Radio />} label={t("off")} />
            <FormControlLabel
              value={-1}
              control={<Radio />}
              label={t("default")}
            />
          </RadioGroup>
        </FormControl>
      </td>
    </>
  );
}
