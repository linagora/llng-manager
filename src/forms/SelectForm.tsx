import { FormControl, MenuItem, Select, Tooltip } from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import attributes from "../static/attributes.json";
import definitions from "../static/definitions.json";

export default function SelectForm({
  value,
  fieldName,
  updateFunc,
}: {
  value: string;
  fieldName: string;
  updateFunc: Function;
}) {
  const attribute = attributes[fieldName as keyof typeof attributes];
  if (attribute && "select" in attribute && attribute.type === "select") {
    const selectedValue =
      value || ("default" in attribute ? attribute.default : "");

    const isValidValue = (attribute.select as { k: string; v: string }[]).some(
      (el) => el.k === selectedValue
    );
    const currentValue = isValidValue ? selectedValue : "";

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
            <Select
              labelId={fieldName}
              size="small"
              displayEmpty
              value={currentValue}
              onChange={(e) => updateFunc(e.target.value)}
            >
              {(attribute.select as { k: string; v: string }[]).map((el) => {
                return (
                  <MenuItem key={el.v} value={el.k}>
                    {t(el.v)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </td>
      </>
    );
  }
  return <td>type issue : {fieldName}</td>;
}
