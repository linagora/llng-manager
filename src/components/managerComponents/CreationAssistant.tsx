import { MouseEventHandler, useState } from "react";
import { MandatoryFields } from "./MandatoryFields";
import "./CreationAssistant.css";
import { t } from "i18next";
import attributes from "../../static/attributes.json";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { delApp, newApp } from "../../features/config/configSlice";
import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export function CreationAssistant({
  closeModal,
}: {
  closeModal: MouseEventHandler<HTMLButtonElement>;
}) {
  const [appType, setAppType] = useState("native");
  const [page, setPage] = useState(0);
  const [name, setName] = useState(attributes.virtualHostName.default);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.config.data.config);

  return (
    <div className="modal">
      <div className="createAssistant">
        {page === 0 && (
          <>
            <div>
              <div>
                <strong className="title2">{t("type")}</strong>
                <FormControl
                  sx={{ m: 1, minWidth: 150 }}
                  size="small"
                  id="applicationType"
                >
                  <InputLabel>{t("chooseType")}</InputLabel>
                  <Select
                    label={t("chooseType")}
                    defaultValue={"native"}
                    onChange={(e) => {
                      setAppType(String(e.target.value));
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
                  >
                    <MenuItem value="native">Native</MenuItem>
                    <MenuItem value="saml">{t("saml")}</MenuItem>
                    <MenuItem value="oidc">{t("OpenIDConnect")}</MenuItem>
                    <MenuItem value="cas">{t("issuerDBCAS")}</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <div>
                  <strong className="title2">{t("name")} </strong>
                  <TextField
                    size="small"
                    margin="normal"
                    variant="filled"
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
                <Button
                  onClick={(e) => {
                    closeModal(e);
                    setPage(page - 1);
                    setAppType("native");
                    dispatch(delApp(name));
                  }}
                >
                  {t("cancel")}
                </Button>
                <Button
                  onClick={() => {
                    console.log(appType);
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
                <Button
                  onClick={(e) => {
                    closeModal(e);
                    setPage(page - 1);
                    dispatch(delApp(name));
                  }}
                >
                  {t("cancel")}
                </Button>
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
                    if (
                      (data.oidcRPMetaDataOptions
                        ? data.oidcRPMetaDataOptions[name]
                          ? data.oidcRPMetaDataOptions[name]
                              .oidcRPMetaDataOptionsClientID !== ""
                          : false
                        : false) ||
                      (data.samlSPMetaDataXML
                        ? data.samlSPMetaDataXML[name]
                          ? data.samlSPMetaDataXML[name].samlSPMetaDataXML !==
                            ""
                          : false
                        : false)
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
