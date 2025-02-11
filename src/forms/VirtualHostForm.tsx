import { TextField } from "@mui/material";
import { t } from "i18next";

export default function VirtualHostForm({
  value,
  updateFunc,
}: {
  value: string;
  updateFunc: Function;
}) {
  return (
    <>
      <th >{t("vHostName")}</th>
      <td>
        <TextField
          size="small"
          type="text"
          onChange={(e) => updateFunc({ name: value, newName: e.target.value })}
          placeholder={t("vHostName")}
          value={value || ""}
        />
      </td>
    </>
  );
}
