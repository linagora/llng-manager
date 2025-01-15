import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateConfigParams } from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import IntForm from "../../forms/IntForm";

export function ADSimpleView() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  return (
    <div className="appDesc">
      <span className="title2">{t("adParams")}</span>
      <table>
        <tbody>
          <tr>
            <IntForm
              fieldName="ADPwdMaxAge"
              updateFunc={(e: number) =>
                dispatch(
                  updateConfigParams({
                    param: "ADPwdMaxAge",
                    value: e,
                  })
                )
              }
              value={Number(
                config.ADPwdMaxAge || attributes.ADPwdMaxAge.default
              )}
            />
          </tr>
          <tr>
            <IntForm
              fieldName="ADPwdExpireWarning"
              updateFunc={(e: number) =>
                dispatch(
                  updateConfigParams({
                    param: "ADPwdExpireWarning",
                    value: e,
                  })
                )
              }
              value={Number(
                config.ADPwdExpireWarning ||
                  attributes.ADPwdExpireWarning.default
              )}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
