import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import { Button, TextField } from "@mui/material";
import { t } from "i18next";
import { ChangeEvent, useEffect, useState } from "react";
import { push } from "redux-first-history";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ConfStats } from "../components/ConfStats";
import { Footer } from "../components/Footer";
import { SavePopup } from "../components/SavePopup";
import { VisuallyHiddenInput } from "../components/managerComponents/VisuallyHiddenInput";
import {
  getConfigAsync,
  removeError,
  saveConfigAsync,
  setError,
} from "../features/config/configSlice";
import { exportData } from "../utils/exportData";
import { handleChangeFile } from "../utils/readFiles";
import { llngConfig } from "../utils/types";
import "./HomePage.css";
export function HomePage() {
  const [openSavePopup, setOpenSavePopup] = useState(false);
  const config = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();
  const [configPresent, setConfigPresent] = useState<boolean>(
    Boolean(
      config.data.metadata &&
        !config.data.metadata.next &&
        !config.loading &&
        !config.error.has
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
        <>
          <div>
            <div className="head">
              <div>
                <strong className="title">{t("Configuration Manager")}</strong>
              </div>
              <div className="search-container">
                <div className="search">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<DownloadIcon />}
                    onClick={async () =>
                      await exportData("full", config.data.metadata.cfgNum)
                    }
                  >
                    {t("downloadIt")}
                  </Button>
                </div>
                <div className="search">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    {t("restore")}
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => {
                        if (e.target instanceof HTMLInputElement) {
                          handleChangeFile(
                            e as ChangeEvent<HTMLInputElement>
                          ).then((fileContent) => {
                            console.debug("File content:", fileContent);
                            dispatch(
                              saveConfigAsync(
                                JSON.parse(fileContent) as llngConfig
                              )
                            );
                            setOpenSavePopup(true);
                          });
                        }
                      }}
                    />
                  </Button>
                </div>
                <div className="search">
                  <Button
                    variant="contained"
                    onClick={() => dispatch(push(`#authParams/latest`))}
                  >
                    {t("authParams")}
                  </Button>
                </div>
                <div className="search">
                  <Button
                    variant="contained"
                    onClick={() => dispatch(push(`#tree/latest`))}
                  >
                    {t("tree")}
                  </Button>
                </div>
                <div className="search">
                  <TextField
                    type="number"
                    size="small"
                    error={Boolean(aimedConf && aimedConf <= 0)}
                    helperText={`${"Enter only positive and non nul numbers"}`}
                    placeholder={t("search config num")}
                    onChange={(e) => SetAimedConf(Number(e.target.value))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (
                          0 < aimedConf &&
                          aimedConf <= config.data.metadata.cfgNum
                        ) {
                          dispatch(push(`#conf/${aimedConf}`));
                        } else {
                          dispatch(
                            setError(
                              `Wrong config number :${aimedConf}, try latest : ${config.data.metadata.cfgNum}`
                            )
                          );
                        }
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (
                        0 < aimedConf &&
                        aimedConf <= config.data.metadata.cfgNum
                      ) {
                        dispatch(push(`#conf/${aimedConf}`));
                      } else {
                        dispatch(
                          setError(
                            `Wrong config number :${aimedConf}, try latest : ${config.data.metadata.cfgNum}`
                          )
                        );
                      }
                    }}
                  >
                    {t("go")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="desc">
            <div className="descBox">
              <table className="infoTable">
                <thead>
                  <tr>
                    <th colSpan={2}>
                      <strong>{t("Latest conf info")}</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      <span>{t("latest")}</span>
                    </th>
                    <td>{config.data.metadata.cfgNum}</td>
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
                    <td>{config.data.metadata.cfgAuthor}</td>
                  </tr>
                  <tr>
                    <th>
                      <span>{t("authorIPAddress")}</span>
                    </th>
                    <td>{config.data.metadata.cfgAuthorIP}</td>
                  </tr>
                  <tr>
                    <th>{t("cfgLog")}</th>

                    <td>{config.data.config.cfgLog}</td>
                  </tr>
                </tbody>
              </table>
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(push(`#conf/latest`));
                  dispatch(getConfigAsync());
                }}
              >
                {t("go")}
              </Button>
            </div>
            <div className="descBox">
              <ConfStats config={config.data.config} />
            </div>
          </div>

          <div
            style={{
              visibility: config.error.errorContent ? "visible" : "hidden",
            }}
          >
            <strong>{t("latestError")}</strong> {config.error.errorContent}
          </div>
          <Footer cfgVersion={config.data.config.cfgVersion} />
          <SavePopup
            config={config}
            dispatch={dispatch}
            openSavePopup={openSavePopup}
            setOpenSavePopup={setOpenSavePopup}
          />
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
