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
      return (
        <div className="main">
          <table>
            <tbody>
              <tr>
                <th>{t("latest")}</th>
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
                <th>{t("author")}</th>
                <td>{config.data.metadata.cfgAuthor}</td>
              </tr>
              <tr>
                <th>{t("authorIPAddress")}</th>
                <td>{config.data.metadata.cfgAuthorIP}</td>
              </tr>
              <tr>
                <th>{t("date")}</th>
                <td>{createdDate.toLocaleString()}</td>
              </tr>
              <tr>
                <th>{t("cfgVersion")}</th>
                <td>{config.data.metadata.cfgVersion}</td>
              </tr>
              <tr>
                <th>{t("chooseConf")}</th>
                <td>
                  <TextField
                    type="number"
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
                  ></TextField>
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
                </td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              visibility: config.error.errorContent ? "visible" : "hidden",
            }}
          >
            <strong>{t("latestError")}</strong> {config.error.errorContent}
          </div>
        </div>
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
