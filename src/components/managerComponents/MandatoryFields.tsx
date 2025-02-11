import {
  updateOIDCPrivateClient,
  updateOIDCPublicClient,
  updateOIDCclientID,
  updateSamlSPMetadata,
} from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import { useAppDispatch, useAppSelector } from "./../../app/hooks";
import "./MandatoryField.css";
import BoolForm from "../../forms/BoolForm";
import TextForm from "../../forms/TextForm";
import PasswordForm from "../../forms/PasswordForm";
import FileForm from "../../forms/FileForm";

export function MandatoryFields({
  type,
  name,
}: {
  type: string;
  name?: string;
}) {
  const data = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();

  switch (type) {
    case "SPsaml":
      return (
        <div className="mandatoryField">
          <div>
            <table>
              <tbody>
                <tr>
                  <FileForm
                    fieldName="samlSPMetaDataXML"
                    value={String(
                      (name
                        ? data.samlSPMetaDataXML
                          ? data.samlSPMetaDataXML[name]
                            ? data.samlSPMetaDataXML[name].samlSPMetaDataXML
                            : undefined
                          : undefined
                        : undefined) || ""
                    )}
                    updateFunc={(e: string) =>
                      dispatch(
                        updateSamlSPMetadata({
                          name: name ? name : "",
                          data: e,
                        })
                      )
                    }
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    case "RPoidc":
      return (
        <div className="mandatoryField">
          <table>
            <tbody>
              <tr>
                <TextForm
                  fieldName="oidcRPMetaDataOptionsClientID"
                  value={
                    name
                      ? data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsClientID
                            ? String(
                                data.oidcRPMetaDataOptions[name]
                                  .oidcRPMetaDataOptionsClientID
                              )
                            : ""
                          : ""
                        : ""
                      : ""
                  }
                  updateFunc={(e: string) =>
                    dispatch(
                      updateOIDCclientID({
                        name: name ? name : "",
                        id: e,
                      })
                    )
                  }
                />
              </tr>
              <tr>
                <PasswordForm
                  fieldName="oidcRPMetaDataOptionsClientSecret"
                  value={String(
                    name
                      ? data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsClientSecret
                            ? data.oidcRPMetaDataOptions[name]
                                .oidcRPMetaDataOptionsClientSecret
                            : ""
                          : ""
                        : ""
                      : ""
                  )}
                  updateFunc={(e: string) =>
                    dispatch(
                      updateOIDCPrivateClient({
                        name: name ? name : "",
                        privateClient: e,
                      })
                    )
                  }
                />
              </tr>
              <tr>
                <BoolForm
                  fieldName="oidcRPMetaDataOptionsPublic"
                  value={Number(
                    data.oidcRPMetaDataOptions === undefined
                      ? attributes.oidcRPMetaDataOptionsPublic.default
                      : data.oidcRPMetaDataOptions[name ? name : ""]
                          .oidcRPMetaDataOptionsPublic
                  )}
                  updateFunc={(e: number) => {
                    dispatch(
                      updateOIDCPublicClient({
                        name: name ? name : "",
                        publicClient: e,
                      })
                    );
                  }}
                />
              </tr>
            </tbody>
          </table>
          <div></div>
        </div>
      );

    default:
      return <div className="mandatoryField"></div>;
  }
}
