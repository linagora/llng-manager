import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { t } from "i18next";
import attributes from "../static/attributes.json";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import "./AuthParams.css";
import { useState } from "react";
import { OptionRenderer } from "../components/authParamOptions/OptionRenderer";
import { updateAuthParams } from "../features/config/configSlice";
export function AuthParams() {
  const dispatch = useAppDispatch();
  const authChoiceModules = useAppSelector(
    (state) => state.config.data.config.authChoiceModules
  );
  const combModule = useAppSelector(
    (state) => state.config.data.config.combModules
  );
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
    ...Object.keys(
      choices.includes("Combination") ? (combModule ? combModule : {}) : {}
    ).flatMap((key) => {
      if (combModule) {
        return combModule[key].type;
      }
      return [];
    }),
  ];

  const [optionSelected, setOptionSelected] = useState(authModule);

  return (
    <div>
      <div>
        <strong className="title">{t("authParams")}</strong>
      </div>
      <div className="authOptionChoices">
        <FormControl>
          <InputLabel id="authenticationLabel">
            {t("authentication")}
          </InputLabel>
          <Select
            labelId="authenticationLabel"
            label={t("authentication")}
            size="small"
            value={authModule}
            defaultValue={attributes.authentication.default}
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
                <MenuItem key={el.k} value={el.k}>
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
            value={userDB}
            defaultValue={attributes.userDB.default}
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
                <MenuItem key={el.k} value={el.k}>
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
            value={passwordDB}
            defaultValue={attributes.passwordDB.default}
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
                <MenuItem key={el.k} value={el.k}>
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
            value={registerDB}
            defaultValue={attributes.registerDB.default}
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
              <MenuItem key={el.k} value={el.k}>
                {t(el.v)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="optionNavbar">
        {allOptChoices.map((el) =>
          selectedOptions.includes(el.k) && el.k !== "Same" ? (
            <span key={el.k} onClick={() => setOptionSelected(el.k)}>
              {el.v}
            </span>
          ) : (
            <></>
          )
        )}
      </div>
      <div className="options">
        <OptionRenderer selected={optionSelected ? optionSelected : ""} />
      </div>
    </div>
  );
}
