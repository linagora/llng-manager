import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "./../../app/hooks";
import "./MandatoryField.css";
import { handleChangeFile } from "../../utils/readFiles";
import {
  updateOIDCPrivateClient,
  updateOIDCPublicClient,
  updateOIDCclientID,
  updateSamlSPMetadata,
} from "../../features/config/configSlice";
import { URLLoader } from "./URLLoader";
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
    case "saml":
      return (
        <div className="mandatoryField">
          <div>
            <textarea
              placeholder="XML MetaData"
              onChange={(e) =>
                dispatch(
                  updateSamlSPMetadata({
                    name: name ? name : "",
                    data: e.target.value,
                  })
                )
              }
              value={
                name
                  ? data.samlSPMetaDataXML[name]
                    ? data.samlSPMetaDataXML[name].samlSPMetaDataXML
                    : undefined
                  : undefined
              }
            ></textarea>
          </div>
          <div>
            <input
              type="file"
              onChange={(e) => {
                handleChangeFile(e).then((fileContent) => {
                  console.log("File content:", fileContent);
                  dispatch(
                    updateSamlSPMetadata({
                      name: name ? name : "",
                      data: fileContent,
                    })
                  );
                });
              }}
            />
          </div>
          <URLLoader appName={name} loadFunction={updateSamlSPMetadata} />
        </div>
      );
    case "oidc":
      return (
        <div className="mandatoryField">
          <div>
            <th>{t("oidcRPMetaDataOptionsClientID")}</th>
            <td>
              <input
                type="text"
                placeholder={t("oidcRPMetaDataOptionsClientID")}
                value={String(
                  name
                    ? data.oidcRPMetaDataOptions[name]
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsClientID
                      : ""
                    : ""
                )}
                onChange={(e) =>
                  dispatch(
                    updateOIDCclientID({
                      name: name ? name : "",
                      id: e.target.value,
                    })
                  )
                }
              />
            </td>
          </div>
          <div>
            <th>{t("oidcRPMetaDataOptionsClientSecret")}</th>
            <td>
              <input
                type="password"
                placeholder={t("oidcRPMetaDataOptionsClientSecret")}
                value={String(
                  name
                    ? data.oidcRPMetaDataOptions[name]
                      ? data.oidcRPMetaDataOptions[name]
                          .oidcRPMetaDataOptionsClientSecret
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsClientSecret
                        : ""
                      : ""
                    : ""
                )}
                onChange={(e) =>
                  dispatch(
                    updateOIDCPrivateClient({
                      name: name ? name : "",
                      privateClient: e.target.value,
                    })
                  )
                }
              />
            </td>
          </div>
          <div>
            <th>{t("oidcRPMetaDataOptionsPublic")}</th>
            <td>
              <label>
                <input
                  type="radio"
                  name="Client public"
                  checked={
                    name
                      ? data.oidcRPMetaDataOptions[name]
                        ? Boolean(
                            data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsPublic
                          )
                        : false
                      : false
                  }
                  onChange={() => {
                    dispatch(
                      updateOIDCPublicClient({
                        name: name ? name : "",
                        publicClient: 1,
                      })
                    );
                  }}
                />
                <span>{t("on")}</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="Client public"
                  checked={
                    name
                      ? data.oidcRPMetaDataOptions[name]
                        ? !Boolean(
                            data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsPublic
                          )
                        : false
                      : false
                  }
                  onChange={() => {
                    dispatch(
                      updateOIDCPublicClient({
                        name: name ? name : "",
                        publicClient: 0,
                      })
                    );
                  }}
                />
                <span>{t("off")}</span>
              </label>
            </td>
          </div>
          <div></div>
        </div>
      );

    default:
      return <div className="mandatoryField"></div>;
  }
}
