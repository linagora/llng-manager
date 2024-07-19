import {
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { t } from "i18next";
import { MouseEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { delApp, newApp } from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import "./CreationAssistant.css";
import { MandatoryFields } from "./MandatoryFields";

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
                    aria-label={t("chooseType")}
                    value={appType}
                    onChange={(e) => {
                      setAppType(String(e.target.value));
                      if (e.target.value === "native") {
                        setName(attributes.virtualHostName.default);
                      }
                      if (e.target.value === "SPsaml") {
                        setName("sp-example");
                      }
                      if (e.target.value === "RPoidc") {
                        setName("rp-example");
                      }
                      if (e.target.value === "AppCas") {
                        setName("app-example");
                      }
                    }}
                  >
                    <MenuItem value="native">Native</MenuItem>
                    <MenuItem value="SPsaml">{t("saml")}</MenuItem>
                    <MenuItem value="RPoidc">{t("OpenIDConnect")}</MenuItem>
                    <MenuItem value="AppCas">{t("issuerDBCAS")}</MenuItem>
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
                    dispatch(delApp({ name, type: "native" }));
                  }}
                >
                  {t("cancel")}
                </Button>
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
        {page === 1 && (appType === "SPsaml" || appType === "RPoidc") && (
          <>
            <MandatoryFields type={appType} name={name}></MandatoryFields>
            <div>
              <ButtonGroup variant="outlined">
                <Button
                  onClick={(e) => {
                    closeModal(e);
                    setPage(page - 1);
                    dispatch(delApp({ name, type: appType }));
                  }}
                >
                  {t("cancel")}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setPage(page - 1);
                    dispatch(delApp({ name, type: appType }));
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
        {((page === 1 && !(appType === "SPsaml" || appType === "RPoidc")) ||
          (page === 2 && (appType === "SPsaml" || appType === "RPoidc"))) && (
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
