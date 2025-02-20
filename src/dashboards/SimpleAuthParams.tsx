import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { TableVars } from "../components/applicationsComponents/TableVars";
import { ADSimpleView } from "../components/authParamOptions/ADSimpleView";
import { KerberosSimpleView } from "../components/authParamOptions/KerberosSimpleView";
import { LDAPSimpleView } from "../components/authParamOptions/LDAPSimpleView";
import {
  delModuleOpt,
  getConfigAsync,
  newModuleOpt,
  removeError,
  setError,
  updateAuthParams,
  updateModuleOpt,
} from "../features/config/configSlice";
import "./AuthParams.css";
export function SimpleAuthParams() {
  const dispatch = useAppDispatch();

  const config = useAppSelector((state) => state.config);
  const authModule = useAppSelector(
    (state) => state.config.data.config.authentication
  );
  const userDB = useAppSelector((state) => state.config.data.config.userDB);
  const registerDB = useAppSelector(
    (state) => state.config.data.config.registerDB
  );
  const passwordDB = useAppSelector(
    (state) => state.config.data.config.passwordDB
  );
  const allOptChoices = [
    {
      k: "Demo",
      v: "Demo",
    },
    {
      k: "AD+K",
      v: "Active Directory + Kerberos",
    },
    {
      k: "LDAP",
      v: "LDAP",
    },
    { k: "adv", v: "Advanced Configuration" },
  ];
  const [optionSelected, setOptionSelected] = useState(authModule);

  const configNum = useAppSelector((state) =>
    state.router.location?.hash.replace("#authParams/", "")
  );
  useEffect(() => {
    if (
      configNum !== "latest" &&
      Number(configNum) !== Number(config.data.metadata.cfgNum)
    ) {
      dispatch(
        getConfigAsync(configNum === "latest" ? undefined : Number(configNum))
      );
    } else if (configNum === "latest" && config.data.metadata.next) {
      dispatch(getConfigAsync());
    }
    if (
      authModule === "Demo" &&
      userDB === "Same" &&
      (registerDB === "Demo" || registerDB === "Null") &&
      (passwordDB === "Demo" || passwordDB === "Null")
    ) {
      setOptionSelected("Demo");
    } else if (
      authModule === "LDAP" &&
      userDB === "Same" &&
      (registerDB === "LDAP" || registerDB === "Null") &&
      (passwordDB === "LDAP" || passwordDB === "Null")
    ) {
      setOptionSelected("LDAP");
    } else if (
      authModule === "Kerberos" &&
      userDB === "AD" &&
      (registerDB === "AD" || registerDB === "Null") &&
      (passwordDB === "AD" || passwordDB === "Null")
    ) {
      setOptionSelected("AD+K");
    } else {
      setOptionSelected("adv");
    }
  }, [
    dispatch,
    configNum,
    config.data.metadata,
    authModule,
    userDB,
    registerDB,
    passwordDB,
  ]);

  const [ADKoptionSelected, setADKOptionSelected] = useState("AD");
  try {
    return (
      <div>
        <div className="authOptionChoices">
          <FormControl>
            <InputLabel id="authenticationLabel">
              {t("authentication")}
            </InputLabel>
            <Select
              labelId="authenticationLabel"
              label={t("authentication")}
              size="small"
              value={optionSelected}
              onChange={(e) => {
                if (e.target.value === "AD+K") {
                  dispatch(
                    updateAuthParams({
                      param: "authentication",
                      value: "Kerberos",
                    })
                  );
                  dispatch(
                    updateAuthParams({
                      param: "userDB",
                      value: "AD",
                    })
                  );
                  if (registerDB !== "Null") {
                    dispatch(
                      updateAuthParams({
                        param: "registerDB",
                        value: "AD",
                      })
                    );
                  }
                  if (passwordDB !== "Null") {
                    dispatch(
                      updateAuthParams({
                        param: "passwordDB",
                        value: "AD",
                      })
                    );
                  }
                } else if (e.target.value !== "adv") {
                  dispatch(
                    updateAuthParams({
                      param: "authentication",
                      value: String(e.target.value),
                    })
                  );
                  dispatch(
                    updateAuthParams({
                      param: "userDB",
                      value: "Same",
                    })
                  );

                  if (registerDB !== "Null") {
                    dispatch(
                      updateAuthParams({
                        param: "registerDB",
                        value: String(e.target.value),
                      })
                    );
                  }
                  if (passwordDB !== "Null") {
                    dispatch(
                      updateAuthParams({
                        param: "passwordDB",
                        value: String(e.target.value),
                      })
                    );
                  }
                }
                setOptionSelected(String(e.target.value));
              }}
            >
              {allOptChoices.map((el) => {
                return (
                  <MenuItem key={"auth" + el.v} value={el.k}>
                    {t(el.v)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Switch />}
            checked={passwordDB !== "Null"}
            label={t("passwordDB")}
            onClick={() => {
              if (passwordDB === "Null") {
                if (authModule === "Kerberos") {
                  dispatch(
                    updateAuthParams({
                      param: "passwordDB",
                      value: authModule ? "AD" : "Null",
                    })
                  );
                } else {
                  dispatch(
                    updateAuthParams({
                      param: "passwordDB",
                      value: authModule ? authModule : "Null",
                    })
                  );
                }
              } else {
                dispatch(
                  updateAuthParams({
                    param: "passwordDB",
                    value: "Null",
                  })
                );
              }
            }}
          />
          <FormControlLabel
            control={<Switch />}
            label={t("registerDB")}
            checked={registerDB !== "Null"}
            onClick={() => {
              if (registerDB === "Null") {
                if (authModule === "Kerberos") {
                  dispatch(
                    updateAuthParams({
                      param: "registerDB",
                      value: authModule ? "AD" : "Null",
                    })
                  );
                } else {
                  dispatch(
                    updateAuthParams({
                      param: "registerDB",
                      value: authModule ? authModule : "Null",
                    })
                  );
                }
              } else {
                dispatch(
                  updateAuthParams({
                    param: "registerDB",
                    value: "Null",
                  })
                );
              }
            }}
          />
        </div>
        <div className="options">
          {optionSelected === "adv" && (
            <div>Use the Advanced Panel to manage your configuration.</div>
          )}

          {optionSelected === "LDAP" && <LDAPSimpleView />}
          {optionSelected === "AD+K" && (
            <div className="app">
              <div className="optionNavbar">
                <span
                  className={`option ${
                    ADKoptionSelected === "AD" ? "selected" : ""
                  }`}
                  onClick={() => setADKOptionSelected("AD")}
                >
                  {t("AD")}
                </span>
                <span
                  className={`option ${
                    ADKoptionSelected === "Kerberos" ? "selected" : ""
                  }`}
                  onClick={() => setADKOptionSelected("Kerberos")}
                >
                  {t("Kerberos")}
                </span>
                <span
                  className={`option ${
                    ADKoptionSelected === "LDAP" ? "selected" : ""
                  }`}
                  onClick={() => setADKOptionSelected("LDAP")}
                >
                  {t("LDAP")}
                </span>
              </div>
              <Divider
                className="divider"
                orientation="vertical"
                variant="middle"
              />
              {ADKoptionSelected === "AD" && <ADSimpleView />}
              {ADKoptionSelected === "Kerberos" && <KerberosSimpleView />}
              {ADKoptionSelected === "LDAP" && <LDAPSimpleView />}
            </div>
          )}
          {optionSelected === "Demo" && (
            <div className="appDesc">
              <span className="title2">{t("demoParams")}</span>
              <table id="demoExportedVars">
                <thead>
                  <tr>
                    <th>{t("keys")}</th>
                    <th>{t("values")}</th>
                    <th>
                      <IconButton
                        className="plus"
                        onClick={() =>
                          dispatch(newModuleOpt("demoExportedVars"))
                        }
                      >
                        <AddCircleIcon color="success" />
                      </IconButton>
                    </th>
                  </tr>
                </thead>
                <TableVars
                  appName="demoExportedVars"
                  vars={
                    config.data.config.demoExportedVars
                      ? config.data.config.demoExportedVars
                      : {}
                  }
                  tableID="demoExportedVars"
                  dispatch={dispatch}
                  delFunction={delModuleOpt}
                  updateFunction={updateModuleOpt}
                />
              </table>
            </div>
          )}
        </div>
      </div>
    );
  } catch (e) {
    if (e instanceof Error) {
      dispatch(setError(`${e.name} : ${e.message}`));
      dispatch(removeError());
    }
    return <div>{config.error.errorContent}</div>;
  }
}
