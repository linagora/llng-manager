import { TextField } from "@mui/material";
import { t } from "i18next";
import attributes from "../static/attributes.json";

export default function GrantForm({
  key,
  value,
  fieldName,
  updateFunc,
}: {
  key: string;
  value: string;
  fieldName: string;
  updateFunc: Function;
}) {
  const attribute = attributes[fieldName as keyof typeof attributes];
  const [message, comments] = key.split("##");

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>{t("comments")}</th>
            <td>
              <TextField size="small" value={comments || ""} />
            </td>
          </tr>
          <tr>
            <th>{t("rules")}</th>
            <td>
              <TextField size="small" value={value || ""} />
            </td>
          </tr>
          <tr>
            <th>{t("messages")}</th>
            <td>
              <TextField size="small" value={message || ""} />
            </td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
