import { t } from "i18next";
import { useAppSelector } from "./../../app/hooks";
import "./MandatoryField.css";
export function MandatoryFields({
  type,
  name,
}: {
  type: string;
  name?: string;
}) {
  const data = useAppSelector((state) => state.config.data.config);

  switch (type) {
    case "saml":
      return (
        <div className="mandatoryField">
          <div>
            {" "}
            <textarea placeholder="XML MetaData">
              {name
                ? data.samlSPMetaDataXML[name].samlSPMetaDataXML
                : undefined}
            </textarea>
          </div>
          <div>
            <input type="file" />
          </div>
          <div>
            <input type="url" />
          </div>
        </div>
      );
    case "oidc":
      return (
        <div className="mandatoryField">
          <div>
            {" "}
            <th>{t("oidcRPMetaDataOptionsClientID")}</th>{" "}
            <td>
              <input
                type="text"
                placeholder={t("oidcRPMetaDataOptionsClientID")}
              />{" "}
            </td>
          </div>
          <div>
            <th>{t("oidcRPMetaDataOptionsClientSecret")}</th>{" "}
            <td>
              <input type="text" />
            </td>
          </div>
          <div>
            <th>{t("oidcRPMetaDataOptionsPublic")}</th>
            <td>
              <label>
                <input type="radio" name="Client public" />
                <span>{t("on")}</span>
              </label>
              <label>
                <input type="radio" name="Client public" />
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
