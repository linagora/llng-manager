import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { t } from "i18next";
import { updateConfigParams } from "../features/config/configSlice";
import attributes from "../static/attributes.json";
export default function PortalskinForm({
  value,
  portal,
  dispatch,
}: {
  value: string;
  portal: string;
  dispatch: Function;
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
            onChange={(e) => {
              dispatch(
                updateConfigParams({
                  param: "portalSkin",
                  value: e.target.value,
                })
              );
            }}
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
