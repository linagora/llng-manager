import attributes from "../../static/attributes.json";

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleGET } from "../../features/config/configSlice";
import DoubleHashForm from "../../forms/DoubleHashForm";
import definitions from "../../static/definitions.json";

export function GetIssuer() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="top">
        <strong className="title">{t("issuerDBGetParameters")}</strong>
      </div>
      <div className="appDesc">
        <div className="box">
          <table>
            <tbody>
              <tr>
                <Tooltip
                  title={
                    <Markdown>
                      {(definitions ? definitions.issuerDBGetActivation : "") +
                        ""}
                    </Markdown>
                  }
                >
                  <th>{t("issuerDBGetActivation")}</th>
                </Tooltip>
                <td>
                  <FormControl>
                    <RadioGroup
                      row
                      value={
                        config.issuerDBGetActivation ||
                        attributes.issuerDBGetActivation.default
                      }
                      onChange={() => dispatch(toggleGET())}
                    >
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={t("on")}
                      />
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label={t("off")}
                      />
                    </RadioGroup>
                  </FormControl>
                </td>
              </tr>
            </tbody>
          </table>
          <DoubleHashForm
            value={config.issuerDBGetParameters || {}}
            fieldName={"issuerDBGetParameters"}
            dispatch={dispatch}
          />
        </div>
      </div>
    </div>
  );
}
