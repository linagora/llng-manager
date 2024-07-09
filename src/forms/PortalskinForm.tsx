import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { t } from "i18next";
import attributes from "../static/attributes.json";
export default function PortalskinForm({
  value,
  portal,
}: {
  value: string;
  portal: string;
}) {
  return (
    <>
      <th>
        <span>{t("portalSkin")}</span>
      </th>
      <td>
        <FormControl>
          <RadioGroup
            row
            value={value || attributes.portalSkin.select[0].k}
            onChange={(e) => {}}
          >
            <FormControlLabel
              value={"bootstrap"}
              control={<Radio />}
              label={t("bootstrap")}
            />
            <FormControlLabel
              value={"custom"}
              control={<Radio />}
              label={t("custom")}
            />
          </RadioGroup>
        </FormControl>
        {value === "bootstrap" && (
          <img
            src={`${portal}/static/logos/bootstrap.png`}
            width="250px"
            alt={value}
          />
        )}
        {value !== "bootstrap" && (
          <>
            <img
              src={`${portal}/static/logos/custom.png`}
              width="250px"
              alt={value}
            />
            <TextField value={"" || value} />
          </>
        )}
      </td>
    </>
  );
}
