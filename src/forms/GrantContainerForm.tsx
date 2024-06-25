import { TextField, Tooltip } from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import attributes from "../static/attributes.json";
import definitions from "../static/definitions.json";

export default function GrantContainerForm({
  value,
  fieldName,
  updateFunc,
}: {
  value: Record<string, string>;
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
        <table>
          <thead>
            <tr>
              <th>{t("comments")}</th>
              <th>{t("rules")}</th>
              <th>{t("messages")}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(value).map((key) => {
              const [message, comments] = key.split("##");
              return (
                <tr>
                  <td>
                    <TextField size="small" value={comments || ""} />
                  </td>
                  <td>
                    <TextField size="small" value={value[key] || ""} />
                  </td>
                  <td>
                    <TextField size="small" value={message || ""} />
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </td>
    </>
  );
}
