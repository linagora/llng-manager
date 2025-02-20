import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateConfigParams } from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import TextForm from "../../forms/TextForm";
import BoolForm from "../../forms/BoolForm";
import BlackWhiteListForm from "../../forms/BlackWhiteListForm";
import HomeButton from "../HomeButton";

export function OIDIssuer() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="top">
        <HomeButton />
        <strong className="title">{t("issuerDBOIDParameters")}</strong>
      </div>
      <div className="appDesc">
        <div className="box">
          <table>
            <tbody>
              <tr>
                <BoolForm
                  fieldName="issuerDBOpenIDActivation"
                  value={Number(
                    config.issuerDBOpenIDActivation ||
                      attributes.issuerDBOpenIDActivation.default
                  )}
                  updateFunc={() =>
                    dispatch(
                      updateConfigParams({
                        param: "issuerDBOpenIDActivation",
                        value:
                          1 -
                          Number(
                            config.issuerDBOpenIDActivation ||
                              attributes.issuerDBOpenIDActivation.default
                          ),
                      })
                    )
                  }
                />
              </tr>
              <tr>
                <TextForm
                  fieldName="openIdIssuerSecret"
                  value={String(config.openIdIssuerSecret || "")}
                  updateFunc={(e: string) =>
                    dispatch(
                      updateConfigParams({
                        param: "openIdIssuerSecret",
                        value: e,
                      })
                    )
                  }
                />
              </tr>
              <tr>
                <TextForm
                  fieldName="openIdAttr"
                  value={String(config.openIdAttr || "")}
                  updateFunc={(e: string) =>
                    dispatch(
                      updateConfigParams({
                        param: "openIdAttr",
                        value: e,
                      })
                    )
                  }
                />
              </tr>
              <tr>
                <BlackWhiteListForm
                  fieldName="openIdSPList"
                  value={String(config.openIdSPList?.split(";")[0] || 0)}
                  updateFunc={(e: string) =>
                    dispatch(
                      updateConfigParams({
                        param: "openIdSPList",
                        value: e,
                      })
                    )
                  }
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
