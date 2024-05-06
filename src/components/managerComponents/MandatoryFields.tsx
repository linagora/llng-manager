import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "./../../app/hooks";
import "./MandatoryField.css";
import { handleChangeFile } from "../../utils/readFiles";
import {
  updateOIDCPrivateClient,
  updateOIDCPublicClient,
  updateOIDCclientID,
} from "../../features/config/configSlice";
import { URLLoader } from "./URLLoader";
import { updateSamlSPMetadata } from "../../features/config/configSlice";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
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
              <FormControl>
                <RadioGroup
                  row
                  value={data.samlSPMetaDataOptionsOneTimeUse}
                  onChange={(e) => {
                    dispatch(
                      updateOIDCPublicClient({
                        name: name ? name : "",
                        publicClient: Number(e.target.value),
                      })
                    );
                  }}
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
          </div>
          <div></div>
        </div>
      );

    default:
      return <div className="mandatoryField"></div>;
  }
}
