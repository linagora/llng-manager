import attributes from "../../static/attributes.json";

import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleGET } from "../../features/config/configSlice";
import BoolForm from "../../forms/BoolForm";
import DoubleHashForm from "../../forms/DoubleHashForm";

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
                <BoolForm
                  fieldName="issuerDBGetActivation"
                  value={Number(
                    config.issuerDBGetActivation ||
                      attributes.issuerDBGetActivation.default
                  )}
                  updateFunc={() => dispatch(toggleGET())}
                />
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
