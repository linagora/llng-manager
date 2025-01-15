import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateConfigParams } from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import TextForm from "../../forms/TextForm";
import BoolForm from "../../forms/BoolForm";

export function KerberosSimpleView() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  return (
    <div className="appDesc">
      <span className="title2">{t("kerberosParams")}</span>
      <table>
        <tbody>
          <tr>
            <TextForm
              fieldName="krbKeytab"
              updateFunc={(e: string) =>
                dispatch(
                  updateConfigParams({
                    param: "krbKeytab",
                    value: e,
                  })
                )
              }
              value={config.krbKeytab || ""}
            />
          </tr>
          <tr>
            <BoolForm
              fieldName="krbByJs"
              value={Number(config.krbByJs) || attributes.krbByJs.default}
              updateFunc={(e: number) =>
                dispatch(
                  updateConfigParams({
                    param: "krbByJs",
                    value: Number(e),
                  })
                )
              }
            />
          </tr>
          <tr>
            <BoolForm
              fieldName="krbRemoveDomain"
              value={Number(
                config.krbRemoveDomain || attributes.krbRemoveDomain.default
              )}
              updateFunc={(e: number) =>
                dispatch(
                  updateConfigParams({
                    param: "krbRemoveDomain",
                    value: Number(e),
                  })
                )
              }
            />
          </tr>
          <tr>
            <TextForm
              fieldName="krbAllowedDomains"
              updateFunc={(e: string) =>
                dispatch(
                  updateConfigParams({
                    param: "krbAllowedDomains",
                    value: e,
                  })
                )
              }
              value={config.krbAllowedDomains || ""}
            />
          </tr>
        </tbody>
      </table>
    </div>
  );
}
