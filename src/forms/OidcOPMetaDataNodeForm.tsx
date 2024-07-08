import { TextField } from "@mui/material";
import { t } from "i18next";

export default function OidcOPMetaDataNodeForm({
  value,
  updateFunc,
}: {
  value: string;
  updateFunc: Function;
}) {
  return (
    <>
      <th className="title3">{t("oidcOPName")}</th>
      <td>
        <TextField
          size="small"
          type="text"
          onChange={(e) => updateFunc({ name: value, newName: e.target.value })}
          placeholder={t("oidcOPName")}
          value={value || ""}
        />
      </td>
    </>
  );
}
