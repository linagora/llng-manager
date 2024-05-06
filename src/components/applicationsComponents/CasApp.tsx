import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./AppPage.css";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  delCASAppMetaDataMacros,
  delCASexportedVars,
  newCASAppMetaDataMacros,
  newCASexportedVars,
  updateCASAppMetaDataMacros,
  updateCASOptions,
  updateCASexportedVars,
} from "../../features/config/configSlice";
import { TableVars } from "./TableVars";
import { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export function CasApp({ name }: { name: string }) {
  const vars = useAppSelector((state) =>
    state.config.data.config.casAppMetaDataExportedVars
      ? state.config.data.config.casAppMetaDataExportedVars[name]
      : {}
  );
  const casAppMetaDataMacros = useAppSelector((state) => {
    return state.config.data.config.casAppMetaDataMacros
      ? state.config.data.config.casAppMetaDataMacros[name]
      : {};
  });
  const casAppMetaDataOptions = useAppSelector((state) => {
    return state.config.data.config.casAppMetaDataOptions
      ? state.config.data.config.casAppMetaDataOptions[name]
      : {};
  });
  const [optionSelected, setOptionSelected] = useState("basic");
  const dispatch = useAppDispatch();
  return (
    <div>
      <strong className="title">{name}</strong>
      <div className="optionNavbar">
        <label onClick={() => setOptionSelected("basic")}>
          {t("Basic Option")}
        </label>
        <label onClick={() => setOptionSelected("casAppMetaDataExportedVars")}>
          {t("casAppMetaDataExportedVars")}
        </label>
        <label onClick={() => setOptionSelected("casAppMetaDataMacros")}>
          {t("casAppMetaDataMacros")}
        </label>
        <label onClick={() => setOptionSelected("casAppMetaDataOptions")}>
          {t("casAppMetaDataOptions")}
        </label>
      </div>
      <div className="appDesc">
        {optionSelected === "casAppMetaDataExportedVars" && (
          <div className="box">
            <strong className="title2">
              {t("casAppMetaDataExportedVars")}
            </strong>

            <table id="exportedVars">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <th>{t("values")}</th>
                  <th>
                    <Button
                      className="plus"
                      onClick={() => dispatch(newCASexportedVars(name))}
                    >
                      <AddCircleIcon color="success" />
                    </Button>
                  </th>
                </tr>
              </thead>
              {TableVars(
                name,
                vars,
                "exportedVars",
                delCASexportedVars,
                updateCASexportedVars
              )}
            </table>
            <Button
              className="plus"
              onClick={() => dispatch(newCASexportedVars(name))}
            >
              <AddCircleIcon color="success" />
            </Button>
          </div>
        )}
        {optionSelected === "casAppMetaDataMacros" && (
          <div className="box">
            <strong className="title2">{t("casAppMetaDataMacros")}</strong>

            <table id="macros">
              <thead>
                <tr>
                  <th>{t("keys")}</th>
                  <th>{t("values")}</th>
                  <th>
                    <Button
                      className="plus"
                      onClick={() => dispatch(newCASAppMetaDataMacros(name))}
                    >
                      <AddCircleIcon color="success" />
                    </Button>
                  </th>
                </tr>
              </thead>
              {TableVars(
                name,
                casAppMetaDataMacros,
                "macros",
                delCASAppMetaDataMacros,
                updateCASAppMetaDataMacros
              )}
            </table>
            <Button
              className="plus"
              onClick={() => dispatch(newCASAppMetaDataMacros(name))}
            >
              <AddCircleIcon color="success" />
            </Button>
          </div>
        )}
        {optionSelected === "casAppMetaDataOptions" && (
          <div className="box">
            <strong className="title2">{t("casAppMetaDataOptions")}</strong>
            <table>
              <tbody>
                <tr>
                  <th>{t("casAppMetaDataOptionsDisplayName")}</th>
                  <td>
                    <input
                      className="form"
                      type="text"
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsDisplayName
                          ? casAppMetaDataOptions.casAppMetaDataOptionsDisplayName
                          : ""
                      )}
                      onChange={(e) =>
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsDisplayName",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("casAppMetaDataOptionsService")}</th>
                  <td>
                    <input
                      className="form"
                      type="text"
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsService
                          ? casAppMetaDataOptions.casAppMetaDataOptionsService
                          : ""
                      )}
                      onChange={(e) =>
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsService",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("casAppMetaDataOptionsLogout")}</th>
                  <td>
                    <FormControl>
                      <RadioGroup
                        row
                        value={
                          casAppMetaDataOptions.casAppMetaDataOptionsLogout
                        }
                        onChange={(e) => {
                          dispatch(
                            updateCASOptions({
                              name,
                              option: "casAppMetaDataOptionsLogout",
                              value: Number(e.target.value),
                            })
                          );
                        }}
                      >
                        <FormControlLabel
                          value={1}
                          control={<Radio />}
                          label={t("on")}
                        />
                        <FormControlLabel
                          value={0}
                          control={<Radio />}
                          label={t("off")}
                        />
                        <FormControlLabel
                          value={-1}
                          control={<Radio />}
                          label={t("default")}
                        />
                      </RadioGroup>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <th>{t("casAppMetaDataOptionsAuthnLevel")}</th>
                  <td>
                    <input
                      className="form"
                      type="number"
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsAuthnLevel
                          ? casAppMetaDataOptions.casAppMetaDataOptionsAuthnLevel
                          : ""
                      )}
                      onChange={(e) =>
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsAuthnLevel",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("casAppMetaDataOptionsRule")}</th>
                  <td>
                    <input
                      className="form"
                      type="text"
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsRule
                          ? casAppMetaDataOptions.casAppMetaDataOptionsRule
                          : ""
                      )}
                      onChange={(e) =>
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsRule",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
                <tr>
                  <th>{t("casAppMetaDataOptionsComment")}</th>
                  <td>
                    <textarea
                      className="form"
                      value={String(
                        casAppMetaDataOptions.casAppMetaDataOptionsComment
                          ? casAppMetaDataOptions.casAppMetaDataOptionsComment
                          : ""
                      )}
                      onChange={(e) =>
                        dispatch(
                          updateCASOptions({
                            name,
                            option: "casAppMetaDataOptionsComment",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
