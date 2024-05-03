import { MouseEventHandler, useState } from "react";
import { MandatoryFields } from "./MandatoryFields";
import "./CreationAssistant.css";
import { t } from "i18next";
import attributes from "../../static/attributes.json";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { delApp, newApp } from "../../features/config/configSlice";
import { Button, ButtonGroup } from "@mui/material";

export function CreationAssistant({
  closeModal,
}: {
  closeModal: MouseEventHandler<HTMLButtonElement>;
}) {
  const [appType, setAppType] = useState("None");
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.config.data.config);

  return (
    <div className="modal">
      {/* <Button
        variant="outlined"
        className="close"
        onClick={(e) => {
          closeModal(e);
          dispatch(delApp(name));
        }}
      >
        &times;
      </Button> */}
      <div className="createAssistant">
        {page === 0 && (
          <>
            <div>
              <div>
                <strong className="title2">{t("type")}</strong>
                <select
                  name="type"
                  id="applicationType"
                  onChange={(e) => {
                    setAppType(e.target.value);
                    if (e.target.value === "native") {
                      setName(attributes.virtualHostName.default);
                    }
                    if (e.target.value === "saml") {
                      setName("sp-example");
                    }
                    if (e.target.value === "oidc") {
                      setName("rp-example");
                    }
                    if (e.target.value === "cas") {
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
                  <strong className="title2">{t("name")} </strong>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <ButtonGroup variant="outlined">
                <Button onClick={closeModal}>{t("cancel")}</Button>
                <Button
                  onClick={() => {
                    if (name && appType !== "None") {
                      setPage(page + 1);
                      dispatch(newApp({ name, type: appType }));
                    }
                  }}
                >
                  {t("next")}
                </Button>
              </ButtonGroup>
            </div>
          </>
        )}
        {page === 1 && (appType === "saml" || appType === "oidc") && (
          <>
            <MandatoryFields type={appType} name={name}></MandatoryFields>
            <div>
              <ButtonGroup variant="outlined">
                <Button onClick={closeModal}>{t("cancel")}</Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setPage(page - 1);
                    dispatch(delApp(name));
                  }}
                >
                  {t("previous")}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    console.log(
                      data.oidcRPMetaDataOptions[name]
                        ?.oidcRPMetaDataOptionsClientID !== undefined,
                      data.samlSPMetaDataXML[name]?.samlSPMetaDataXML !== ""
                    );
                    if (
                      data.oidcRPMetaDataOptions[name]
                        ? data.oidcRPMetaDataOptions[name]
                            .oidcRPMetaDataOptionsClientID !== ""
                        : false || data.samlSPMetaDataXML[name]
                        ? data.samlSPMetaDataXML[name].samlSPMetaDataXML !== ""
                        : false
                    ) {
                      setPage(page + 1);
                    }
                  }}
                >
                  {t("next")}
                </Button>
              </ButtonGroup>
            </div>
          </>
        )}
        {((page === 1 && !(appType === "saml" || appType === "oidc")) ||
          (page === 2 && (appType === "saml" || appType === "oidc"))) && (
          <>
            <div>
              <span>
                Basic {appType} application setup, to customize further pls
                access it wia the manager dashboard
              </span>
            </div>
            <div>
              <Button variant="outlined" onClick={closeModal}>
                {"confirm"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
