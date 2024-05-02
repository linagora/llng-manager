import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./AppPage.css";
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
  const dispatch = useAppDispatch();
  return (
    <div>
      <strong className="title">{name}</strong>
      <div className="appDesc">
        <div className="box">
          <strong className="title2">{t("casAppMetaDataExportedVars")}</strong>
          <button
            className="plus"
            onClick={() => dispatch(newCASexportedVars(name))}
          >
            +
          </button>
          <table id="exportedVars">
            <thead>
              <tr>
                <th>{t("keys")}</th>
                <th>{t("values")}</th>
                <th></th>
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
          <button
            className="plus"
            onClick={() => dispatch(newCASexportedVars(name))}
          >
            +
          </button>
        </div>
        <div className="box">
          <strong className="title2">{t("casAppMetaDataMacros")}</strong>
          <button
            className="plus"
            onClick={() => dispatch(newCASAppMetaDataMacros(name))}
          >
            +
          </button>
          <table id="macros">
            <thead>
              <tr>
                <th>{t("keys")}</th>
                <th>{t("values")}</th>

                <th></th>
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
          <button
            className="plus"
            onClick={() => dispatch(newCASAppMetaDataMacros(name))}
          >
            +
          </button>
        </div>
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
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="casAppMetaDataOptionsLogout"
                        value={1}
                        checked={
                          casAppMetaDataOptions.casAppMetaDataOptionsLogout ===
                          1
                        }
                        onChange={() => {
                          dispatch(
                            updateCASOptions({
                              name,
                              option: "casAppMetaDataOptionsLogout",
                              value: 1,
                            })
                          );
                        }}
                      />
                      <span>{t("on")}</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="casAppMetaDataOptionsLogout"
                        value={0}
                        checked={
                          casAppMetaDataOptions.casAppMetaDataOptionsLogout ===
                          0
                        }
                        onChange={() => {
                          dispatch(
                            updateCASOptions({
                              name,
                              option: "casAppMetaDataOptionsLogout",
                              value: 0,
                            })
                          );
                        }}
                      />
                      <span>{t("off")}</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="casAppMetaDataOptionsLogout"
                        value={-1}
                        checked={
                          casAppMetaDataOptions.casAppMetaDataOptionsLogout ===
                          -1
                        }
                        onChange={() => {
                          dispatch(
                            updateCASOptions({
                              name,
                              option: "casAppMetaDataOptionsLogout",
                              value: -1,
                            })
                          );
                        }}
                      />
                      <span>{t("default")}</span>
                    </label>
                  </div>
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
      </div>
    </div>
  );
}