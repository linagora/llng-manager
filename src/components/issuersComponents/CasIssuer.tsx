import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Divider, IconButton } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  delModuleOpt,
  newModuleOpt,
  toggleCAS,
  updateConfigParams,
  updateModuleOpt,
} from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import { TableVars } from "../applicationsComponents/TableVars";
import BoolForm from "../../forms/BoolForm";
import TextForm from "../../forms/TextForm";
import SelectForm from "../../forms/SelectForm";
export function CasIssuer() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  const [option, setOption] = useState("basic");
  return (
    <div>
      <div className="top">
        <strong className="title">{t("casServiceMetadata")}</strong>
      </div>
      <div className="app">
        <div className="optionNavbar">
          <label
            className={`option ${option === "basic" ? "selected" : ""}`}
            onClick={() => {
              setOption("basic");
            }}
          >
            {t("Basic Option")}
          </label>
          <label
            className={`option ${
              option === "casStorageOptions" ? "selected" : ""
            }`}
            onClick={() => setOption("casStorageOptions")}
          >
            {t("casStorageOptions")}
          </label>
          <label
            className={`option ${option === "casAttributes" ? "selected" : ""}`}
            onClick={() => setOption("casAttributes")}
          >
            {t("casAttributes")}
          </label>
        </div>
        <Divider className="divider" orientation="vertical" variant="middle" />
        <div className="appDesc">
          {option === "basic" && (
            <div className="box">
              <table>
                <tbody>
                  <tr>
                    <BoolForm
                      fieldName="issuerDBCASActivation"
                      value={Number(
                        config.issuerDBCASActivation ||
                          attributes.issuerDBCASActivation.default
                      )}
                      updateFunc={() => dispatch(toggleCAS())}
                    />
                  </tr>
                  <tr>
                    <TextForm
                      fieldName="casAttr"
                      value={config.casAttr || ""}
                      updateFunc={(e: string) =>
                        dispatch(
                          updateConfigParams({
                            param: "casAttr",
                            value: e,
                          })
                        )
                      }
                    />
                  </tr>
                  <tr>
                    <SelectForm
                      fieldName="casAccessControlPolicy"
                      value={String(
                        config.casAccessControlPolicy
                          ? config.casAccessControlPolicy
                          : attributes.casAccessControlPolicy.default
                      )}
                      updateFunc={(e: string) =>
                        dispatch(
                          updateConfigParams({
                            param: "casAccessControlPolicy",
                            value: e,
                          })
                        )
                      }
                    />
                  </tr>
                  <tr>
                    <BoolForm
                      fieldName="casStrictMatching"
                      value={Number(
                        config.casStrictMatching ||
                          attributes.casStrictMatching.default
                      )}
                      updateFunc={(e: number) =>
                        dispatch(
                          updateConfigParams({
                            param: "casStrictMatching",
                            value: e,
                          })
                        )
                      }
                    />
                  </tr>
                  <tr>
                    <TextForm
                      fieldName="casTicketExpiration"
                      value={String(
                        config.casTicketExpiration ||
                          attributes.casTicketExpiration.default
                      )}
                      updateFunc={(e: string) =>
                        dispatch(
                          updateConfigParams({
                            param: "casTicketExpiration",
                            value: e,
                          })
                        )
                      }
                    />
                  </tr>
                  <tr>
                    <BoolForm
                      fieldName="casBackChannelSingleLogout"
                      value={Number(
                        config.casBackChannelSingleLogout ||
                          attributes.casBackChannelSingleLogout.default
                      )}
                      updateFunc={(e: number) =>
                        dispatch(
                          updateConfigParams({
                            param: "casBackChannelSingleLogout",
                            value: e,
                          })
                        )
                      }
                    />
                  </tr>
                  <tr>
                    <TextForm
                      fieldName="casStorage"
                      value={config.casStorage || ""}
                      updateFunc={(e: string) =>
                        dispatch(
                          updateConfigParams({
                            param: "casStorage",
                            value: e,
                          })
                        )
                      }
                    />
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {option === "casStorageOptions" && (
            <table id="casStorageOptions">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <th>{t("values")}</th>
                  <th>
                    <IconButton
                      className="plus"
                      onClick={() =>
                        dispatch(newModuleOpt("casStorageOptions"))
                      }
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                  </th>
                </tr>
              </thead>
              <TableVars
                appName={"casStorageOptions"}
                vars={config.casStorageOptions ? config.casStorageOptions : {}}
                tableID={"casStorageOptions"}
                dispatch={dispatch}
                delFunction={delModuleOpt}
                updateFunction={updateModuleOpt}
              />
            </table>
          )}
          {option === "casAttributes" && (
            <table id="casAttributes">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <th>{t("values")}</th>
                  <th>
                    <IconButton
                      className="plus"
                      onClick={() => dispatch(newModuleOpt("casAttributes"))}
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                  </th>
                </tr>
              </thead>
              <TableVars
                appName={"casAttributes"}
                vars={config.casAttributes ? config.casAttributes : {}}
                tableID={"casAttributes"}
                dispatch={dispatch}
                delFunction={delModuleOpt}
                updateFunction={updateModuleOpt}
              />
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
