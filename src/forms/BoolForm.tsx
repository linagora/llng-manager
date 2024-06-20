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

export default function BoolForm({
  value,
  fieldName,
  updateFunc,
}: {
  value: number;
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
        <strong className="title3">{t(fieldName)}</strong>
      </Tooltip>
      <FormControl>
        <FormLabel>{t(fieldName)}</FormLabel>
        <RadioGroup
          row
          value={value || ("default" in attribute ? attribute.default : 0)}
          onChange={(e) => updateFunc(e)}
        >
          <FormControlLabel value={1} control={<Radio />} label={t("on")} />
          <FormControlLabel value={0} control={<Radio />} label={t("off")} />
        </RadioGroup>
      </FormControl>
    </>
  );
}
