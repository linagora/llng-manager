import { TextField, Tooltip } from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import attributes from "../static/attributes.json";
import definitions from "../static/definitions.json";

export default function IntForm({
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
      <TextField
        size="small"
        type="number"
        onChange={(e) => updateFunc(e.target.value)}
        placeholder={t(fieldName)}
        value={value || ("default" in attribute ? attribute.default : 0)}
      />
    </>
  );
}
