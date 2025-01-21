import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { OptionRenderer } from "../components/authParamOptions/OptionRenderer";
import {
  getConfigAsync,
  removeError,
  setError,
  updateAuthParams,
} from "../features/config/configSlice";
import attributes from "../static/attributes.json";
import "./AuthParams.css";
export function AdvancedAuthParams() {
  const dispatch = useAppDispatch();
  const authChoiceModules = useAppSelector(
    (state) => state.config.data.config.authChoiceModules
  );
  const config = useAppSelector((state) => state.config);
  const authModule = useAppSelector(
    (state) => state.config.data.config.authentication
  );
  const registerDB = useAppSelector(
    (state) => state.config.data.config.registerDB
  );
  const passwordDB = useAppSelector(
    (state) => state.config.data.config.passwordDB
  );
  const userDB = useAppSelector((state) => state.config.data.config.userDB);
  const allOptChoices = Array.from(
    new Set(
      attributes.authentication.select
        .concat(attributes.userDB.select)
        .concat(attributes.registerDB.select)
        .concat(attributes.passwordDB.select)
        .map(({ k, v }) => JSON.stringify({ k, v }))
    )
  ).map((str) => JSON.parse(str));
  const choices = [authModule, registerDB, passwordDB, userDB];
  const selectedOptions = [
    authModule,
    registerDB,
    passwordDB,
    userDB,
    ...Object.keys(
      choices.includes("Choice")
        ? authChoiceModules
          ? authChoiceModules
          : {}
        : {}
    ).flatMap((key) => {
      if (authChoiceModules) {
        return authChoiceModules[key].split(";").splice(0, 3);
      }
      return [];
    }),
  ];
  if (selectedOptions.includes("AD") && !selectedOptions.includes("LDAP")) {
    selectedOptions.push("LDAP");
  }
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
  }, [dispatch, configNum, config.data.metadata]);

  const [optionSelected, setOptionSelected] = useState(authModule);
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
              value={authModule || attributes.authentication.default}
              onChange={(e) =>
                dispatch(
                  updateAuthParams({
                    param: "authentication",
                    value: String(e.target.value),
                  })
                )
              }
            >
              {attributes.authentication.select.map((el) => {
                return (
                  <MenuItem key={"auth" + el.v} value={el.k}>
                    {t(el.v)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="userDBLabel">{t("userDB")}</InputLabel>
            <Select
              labelId="userDBLabel"
              label={t("userDB")}
              size="small"
              value={userDB || attributes.userDB.default}
              onChange={(e) =>
                dispatch(
                  updateAuthParams({
                    param: "userDB",
                    value: String(e.target.value),
                  })
                )
              }
            >
              {attributes.userDB.select.map((el) => {
                return (
                  <MenuItem key={"user" + el.v} value={el.k}>
                    {t(el.v)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="passwordDBLabel">{t("passwordDB")}</InputLabel>
            <Select
              labelId="passwordDBLabel"
              label={t("passwordDB")}
              size="small"
              value={passwordDB || attributes.passwordDB.default}
              onChange={(e) =>
                dispatch(
                  updateAuthParams({
                    param: "passwordDB",
                    value: String(e.target.value),
                  })
                )
              }
            >
              {attributes.passwordDB.select.map((el) => {
                return (
                  <MenuItem key={"pass" + el.v} value={el.k}>
                    {t(el.v)}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="registerDBLabel">{t("registerDB")}</InputLabel>
            <Select
              labelId="registerDBLabel"
              label={t("registerDB")}
              size="small"
              value={registerDB || attributes.registerDB.default}
              onChange={(e) =>
                dispatch(
                  updateAuthParams({
                    param: "registerDB",
                    value: String(e.target.value),
                  })
                )
              }
            >
              {attributes.registerDB.select.map((el) => (
                <MenuItem key={"reg" + el.v} value={el.k}>
                  {t(el.v)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app">
          <div className="optionNavbar">
            {allOptChoices.map((el) =>
              selectedOptions.includes(el.k) && el.k !== "Same" ? (
                <span
                  className={`option ${
                    optionSelected === el.k ? "selected" : ""
                  }`}
                  key={"selected" + el.v}
                  onClick={() => setOptionSelected(el.k)}
                >
                  {t(el.v)}
                </span>
              ) : null
            )}
          </div>
          <Divider
            className="divider"
            orientation="vertical"
            variant="middle"
          />
          <div className="options">
            <OptionRenderer selected={optionSelected ? optionSelected : ""} />
          </div>
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
