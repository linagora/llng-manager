import { useAppDispatch, useAppSelector } from "../app/hooks";
import { push } from "redux-first-history";
import {
  getConfigAsync,
  removeError,
  setError,
} from "../features/config/configSlice";
import { Button, TextField } from "@mui/material";
import { t } from "i18next";
import { useEffect, useState } from "react";
import "./HomePage.css";
import { Footer } from "../components/Footer";
export function HomePage() {
  const config = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();
  const [configPresent, setConfigPresent] = useState<boolean>(
    Boolean(
      config.data.metadata &&
        !config.data.metadata.next &&
        !config.loading &&
        !config.error
    )
  );
  const [aimedConf, SetAimedConf] = useState(0);
  useEffect(() => {
    if (!configPresent) {
      dispatch(getConfigAsync());
      setConfigPresent(true);
      dispatch(removeError());
    }
  }, [configPresent, dispatch]);
  try {
    if (config.loading) {
      return <div className="main">{t("loading")}</div>;
    } else if (config.error.has) {
      return (
        <div className="main">
          <strong>{t("failedLoading")}</strong>
          <span>{JSON.stringify(config.error)}</span>
        </div>
      );
    } else {
      const createdDate = new Date(config.data.metadata.cfgDate * 1000);
      const appNum =
        (config.data.config.locationRules
          ? Object.keys(config.data.config.locationRules).length
          : 0) +
        (config.data.config.samlSPMetaDataXML
          ? Object.keys(config.data.config.samlSPMetaDataXML).length
          : 0) +
        (config.data.config.oidcRPMetaDataOptions
          ? Object.keys(config.data.config.oidcRPMetaDataOptions).length
          : 0) +
        (config.data.config.casAppMetaDataOptions
          ? Object.keys(config.data.config.casAppMetaDataOptions).length
          : 0);

      return (
        <>
          <div className="main">
            <div>
              <div>
                <img
                  className="logo"
                  src={require("./../static/logo_llng_400px.png")}
                  alt="logo"
                />
              </div>
              <strong className="title1">{t("Configuration Manager")}</strong>
            </div>
            <div className="search-container">
              <div className="search">
                <Button variant="contained">{t("authParams")}</Button>
              </div>
              <div className="search">
                <TextField
                  type="number"
                  size="small"
                  error={aimedConf <= 0}
                  helperText={`${
                    aimedConf === 0
                      ? "Enter only positive and non nul numbers"
                      : ""
                  }`}
                  placeholder={t("search config num")}
                  onChange={(e) => SetAimedConf(Number(e.target.value))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (aimedConf <= config.data.metadata.cfgNum) {
                        dispatch(push(`#conf/${aimedConf}`));
                      } else
                        dispatch(
                          setError(
                            `Latest Config : ${config.data.metadata.cfgNum}`
                          )
                        );
                    }
                  }}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    if (aimedConf <= config.data.metadata.cfgNum) {
                      dispatch(push(`#conf/${aimedConf}`));
                    } else
                      dispatch(
                        setError(
                          `Latest Config : ${config.data.metadata.cfgNum}`
                        )
                      );
                  }}
                >
                  {t("go")}
                </Button>
              </div>
            </div>
            <div className="desc">
              <div>
                <table className="infoTable">
                  <thead>
                    <tr>
                      <th>
                        <strong>{t("Latest conf info")}</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>
                        <span>{t("latest")}</span>
                      </th>
                      <td>
                        <Button
                          variant="contained"
                          onClick={() => {
                            dispatch(push(`#conf/latest`));
                            dispatch(getConfigAsync());
                          }}
                        >
                          {config.data.metadata.cfgNum}
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <span>{t("date")}</span>
                      </th>
                      <td>{createdDate.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th>
                        <span>{t("author")}</span>
                      </th>
                      <td>{config.data.metadata.cfgAuthor}</td>{" "}
                    </tr>
                    <tr>
                      <th>
                        <span>{t("authorIPAddress")}</span>
                      </th>
                      <td>{config.data.metadata.cfgAuthorIP}</td>
                    </tr>

                    <tr>
                      <th>
                        <span>{t("App Number")}</span>
                      </th>
                      <td>{appNum}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              style={{
                visibility: config.error.errorContent ? "visible" : "hidden",
              }}
            >
              <strong>{t("latestError")}</strong> {config.error.errorContent}
            </div>
          </div>
          <Footer />
        </>
      );
    }
  } catch (e) {
    if (e instanceof Error) {
      dispatch(setError(`${e.name} : ${e.message}`));
      dispatch(removeError());
    }
    return <div>{config.error.errorContent}</div>;
  }
}
