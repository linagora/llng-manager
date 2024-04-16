import { t } from "i18next";
import { useAppSelector } from "../../app/hooks";
import { transformJsonToList } from "../../utils/nativeRule";
import "./NativeApp.css";

function NativeRule(locationRules: Record<string, string>) {
  return Object.keys(locationRules).map((group) => {
    const [commentary, regex, authLevel] = transformJsonToList(group);
    if (regex === "default") {
      return (
        <tr>
          <td>
            <strong>{t("defaultRule")}</strong>
          </td>
          <td>
            <input type="text" defaultValue={regex} readOnly />
          </td>
          <td>
            <input type="text" defaultValue={locationRules[group]} />
          </td>
          <td>
            <input
              type="text"
              value={"default"}
              className="authLevel"
              readOnly
            />
          </td>
          <td>
            <span className="plus">+</span>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td>
          <input type="text" defaultValue={commentary} />
        </td>
        <td>
          <input type="text" defaultValue={regex} />
        </td>
        <td>
          <input type="text" defaultValue={locationRules[group]} />
        </td>
        <td>
          <input type="number" className="authLevel" defaultValue={authLevel} />
        </td>
        <td>
          <span className="minus">-</span>
        </td>
      </tr>
    );
  });
}

function NativeHeaders(exportedHeaders: Record<string, string>) {
  return Object.keys(exportedHeaders).map((header) => {
    return (
      <tr>
        <td>
          <input type="text" defaultValue={header} />
        </td>
        <td>
          <input type="text" defaultValue={exportedHeaders[header]} />
        </td>
        <td>
          <span className="minus">-</span>
        </td>
      </tr>
    );
  });
}

function NativPost(post: Record<string, Record<string, string>>) {
  return Object.keys(post).map((link) => {
    return (
      <tr>
        <td>
          <input type="text" defaultValue={link} />
        </td>
        <td>
          <input type="text" defaultValue={post[link].target} />
        </td>
        <td>
          <input type="text" defaultValue={post[link].jqueryUrl} />
        </td>{" "}
        <td>
          <input type="text" defaultValue={post[link].formSelector} />
        </td>
        <td>
          <input type="text" defaultValue={post[link].buttonSelector} />
        </td>
        <td>
          <span className="minus">-</span>
        </td>
      </tr>
    );
  });
}

export function NativeApp({ name }: { name: string }) {
  const locationRules = useAppSelector(
    (state) => state.config.data.config.locationRules[name]
  );
  const exportedHeaders = useAppSelector((state) =>
    state.config.data.config.exportedHeaders
      ? state.config.data.config.exportedHeaders[name]
      : {}
  );
  const post = useAppSelector((state) =>
    state.config.data.config.post ? state.config.data.config.post[name] : {}
  );

  console.log(post);
  return (
    <div>
      {" "}
      <strong>{name}</strong>
      <div className="appDesc">
        <div className="box">
          <strong>{t("locationRules")}</strong>
          <table>
            <tr>
              <th>{t("vhostComment")}</th>
              <th>{t("regexp")}</th>
              <th>{t("rules")}</th>
              <th>{t("rulesAuthnLevel")}</th>
              <th></th>
            </tr>
            {NativeRule(locationRules)}
          </table>
        </div>
        <div className="box">
          <div>
            <strong>{t("exportedHeaders")}</strong>
          </div>
          <table>
            <tr>
              <th>{t("keys")}</th>
              <th>{t("values")}</th>
              <th>
                <span>+</span>
              </th>
            </tr>
            {NativeHeaders(exportedHeaders)}
          </table>
        </div>
        <div className="box">
          <strong>{t("post")}</strong>
          <table>
            <th>{t("postUrl")}</th>
            <th>{t("postTargetUrl")}</th>
            <th>{t("jqueryUrl")}</th>
            <th>{t("jqueryFormSelector")}</th>
            <th>{t("jqueryButtonSelector")}</th>
            <th></th>
            {NativPost(post)}
          </table>
        </div>

        <div className="box">
          <strong>{t("vhostOptions")}</strong>
        </div>
      </div>{" "}
    </div>
  );
}
