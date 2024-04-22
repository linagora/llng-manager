import { MouseEventHandler, useState } from "react";
import { MandatoryFields } from "./MandatoryFields";
import "./CreationAssistant.css";
import { t } from "i18next";
import attributes from "../../static/attributes.json";
import { useAppDispatch } from "../../app/hooks";
import { delApp, newApp } from "../../features/config/configSlice";

export function CreationAssistant({
  closeModal,
}: {
  closeModal: MouseEventHandler<HTMLButtonElement>;
}) {
  const [appType, setAppType] = useState("None");
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();
  return (
    <div className="modal">
      <button
        className="close"
        onClick={(e) => {
          closeModal(e);
          dispatch(delApp(name));
        }}
      >
        &times;
      </button>
      <div className="createAssistant">
        <div>{t("newApp")}</div>

        {page === 0 && (
          <>
            <div>
              <span>{t("type")}</span>
              <select
                name="type"
                id="applicationType"
                onChange={(e) => {
                  setAppType(e.target.value);
                  if (appType === "native") {
                    setName(attributes.virtualHostName.default);
                  }
                  if (appType === "saml") {
                    setName("sp-example");
                  }
                  if (appType === "oidc") {
                    setName("rp-example");
                  }
                  if (appType === "cas") {
                    setName("app-example");
                  }
                }}
                defaultValue={""}
              >
                <option value="" disabled hidden>
                  {t("chooseType")}
                </option>
                <option value="native">Native</option>
                <option value="saml">{t("saml")}</option>
                <option value="oidc">{t("OpenIDConnect")}</option>
                <option value="cas">{t("issuerDBCAS")}</option>
              </select>
            </div>
            <div>
              <div>
                <label title="test">{t("name")} </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={() => {
                  if (name && appType !== "None") {
                    setPage(page + 1);
                    dispatch(newApp({ name, type: appType }));
                  }
                }}
              >
                {t("next")}
              </button>
            </div>
          </>
        )}
        {page === 1 && (appType === "saml" || appType === "oidc") && (
          <>
            <MandatoryFields type={appType} name={name}></MandatoryFields>{" "}
            <button onClick={() => setPage(page + 1)}>{t("next")}</button>{" "}
            <button
              onClick={() => {
                setPage(page - 1);
                dispatch(delApp(name));
              }}
            >
              {t("previous")}
            </button>
          </>
        )}
        {((page === 1 && !(appType === "saml" || appType === "oidc")) ||
          (page === 2 && (appType === "saml" || appType === "oidc"))) && (
          <div>
            <div>
              <span>
                Basic {appType} application setup, to customize further pls
                access it wia the manager dashboard
              </span>
            </div>
            <div>
              <button onClick={closeModal}>{"confirm"}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
