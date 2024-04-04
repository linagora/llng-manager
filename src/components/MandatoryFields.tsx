import { useAppSelector } from "../app/hooks";
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
            <input type="text" placeholder="OpenID Connect ID" />
          </div>
          <div>
            <th>Secret client</th>
            <td>
              <input type="text" />
            </td>
          </div>{" "}
          <div>
            <th>Client public</th>
            <td>
              <label>
                <input type="radio" name="Client public" />
                <span>Activé</span>
              </label>
              <label>
                <input type="radio" name="Client public" />
                <span>Désactivé</span>
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
