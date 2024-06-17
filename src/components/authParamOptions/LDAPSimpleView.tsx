import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateConfigParams } from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import definitions from "../../static/definitions.json";

export function LDAPSimpleView() {
  const config = useAppSelector((state) => state.config.data.config);
  const dispatch = useAppDispatch();
  return (
    <div className="appDesc">
      <span className="title2">{t("ldapParams")}</span>
      <table>
        <tbody>
          <tr>
            <th colSpan={2} className="title2">
              {t("ldapConnection")}
            </th>
          </tr>
          <tr>
            <Tooltip title={<Markdown>{definitions.ldapBase}</Markdown>}>
              <th>{t("ldapBase")}</th>
            </Tooltip>
            <td>
              <TextField
                size="small"
                type="text"
                onChange={(e) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapBase",
                      value: e.target.value,
                    })
                  )
                }
                value={config.ldapBase || attributes.ldapBase.default}
              />
            </td>
          </tr>
          <tr>
            <Tooltip title={<Markdown>{definitions.managerDn}</Markdown>}>
              <th>{t("managerDn")}</th>
            </Tooltip>
            <td>
              <TextField
                size="small"
                type="text"
                onChange={(e) =>
                  dispatch(
                    updateConfigParams({
                      param: "managerDn",
                      value: e.target.value,
                    })
                  )
                }
                value={config.managerDn || attributes.managerDn.default}
              />
            </td>
          </tr>
          <tr>
            <Tooltip title={<Markdown>{definitions.managerPassword}</Markdown>}>
              <th>{t("managerPassword")}</th>
            </Tooltip>
            <td>
              <TextField
                size="small"
                type="text"
                onChange={(e) =>
                  dispatch(
                    updateConfigParams({
                      param: "managerPassword",
                      value: e.target.value,
                    })
                  )
                }
                value={
                  config.managerPassword || attributes.managerPassword.default
                }
              />
            </td>
          </tr>
          <tr>
            <Tooltip
              title={
                <Markdown>
                  {(definitions ? definitions.LDAPFilter : "") + ""}
                </Markdown>
              }
            >
              <th>{t("LDAPFilter")}</th>
            </Tooltip>
            <td>
              <TextField
                size="small"
                type="text"
                onChange={(e) =>
                  dispatch(
                    updateConfigParams({
                      param: "LDAPFilter",
                      value: e.target.value,
                    })
                  )
                }
                value={config.LDAPFilter || ""}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {t("ldapGroups")}
        </AccordionSummary>
        <table>
          <tbody>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions ? definitions.ldapGroupBase : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapGroupBase")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  type="text"
                  onChange={(e) =>
                    dispatch(
                      updateConfigParams({
                        param: "ldapGroupBase",
                        value: e.target.value,
                      })
                    )
                  }
                  value={config.ldapGroupBase || ""}
                />
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions ? definitions.groupLDAPFilter : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("groupLDAPFilter")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  type="text"
                  onChange={(e) =>
                    dispatch(
                      updateConfigParams({
                        param: "groupLDAPFilter",
                        value: e.target.value,
                      })
                    )
                  }
                  value={config.groupLDAPFilter || ""}
                />
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions ? definitions.ldapGroupObjectClass : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapGroupObjectClass")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  type="text"
                  onChange={(e) =>
                    dispatch(
                      updateConfigParams({
                        param: "ldapGroupObjectClass",
                        value: e.target.value,
                      })
                    )
                  }
                  value={
                    config.ldapGroupObjectClass ||
                    attributes.ldapGroupObjectClass.default
                  }
                />
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions ? definitions.ldapGroupAttributeName : "") +
                      ""}
                  </Markdown>
                }
              >
                <th>{t("ldapGroupAttributeName")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  type="text"
                  onChange={(e) =>
                    dispatch(
                      updateConfigParams({
                        param: "ldapGroupAttributeName",
                        value: e.target.value,
                      })
                    )
                  }
                  value={
                    config.ldapGroupAttributeName ||
                    attributes.ldapGroupAttributeName.default
                  }
                />
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions
                      ? definitions.ldapGroupAttributeNameUser
                      : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapGroupAttributeNameUser")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  type="text"
                  onChange={(e) =>
                    dispatch(
                      updateConfigParams({
                        param: "ldapGroupAttributeNameSearch",
                        value: e.target.value,
                      })
                    )
                  }
                  value={
                    config.ldapGroupAttributeNameUser ||
                    attributes.ldapGroupAttributeNameUser.default
                  }
                />
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions
                      ? definitions.ldapGroupAttributeNameSearch
                      : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapGroupAttributeNameSearch")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  type="text"
                  onChange={(e) =>
                    dispatch(
                      updateConfigParams({
                        param: "ldapGroupAttributeNameSearch",
                        value: e.target.value,
                      })
                    )
                  }
                  value={
                    config.ldapGroupAttributeNameSearch ||
                    attributes.ldapGroupAttributeNameSearch.default
                  }
                />
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions
                      ? definitions.ldapGroupDecodeSearchedValue
                      : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapGroupDecodeSearchedValue")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      config.ldapGroupDecodeSearchedValue ||
                      attributes.ldapGroupDecodeSearchedValue.default
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "ldapGroupDecodeSearchedValue",
                          value: Number(e.target.value),
                        })
                      )
                    }
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
                  </RadioGroup>
                </FormControl>
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions ? definitions.ldapGroupRecursive : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapGroupRecursive")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      config.ldapGroupRecursive ||
                      attributes.ldapGroupRecursive.default
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "ldapGroupRecursive",
                          value: Number(e.target.value),
                        })
                      )
                    }
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
                  </RadioGroup>
                </FormControl>
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions
                      ? definitions.ldapGroupAttributeNameGroup
                      : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapGroupAttributeNameGroup")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  type="text"
                  onChange={(e) =>
                    dispatch(
                      updateConfigParams({
                        param: "ldapGroupAttributeNameGroup",
                        value: e.target.value,
                      })
                    )
                  }
                  value={
                    config.ldapGroupAttributeNameGroup ||
                    attributes.ldapGroupAttributeNameGroup.default
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {t("ldapPassword")}
        </AccordionSummary>
        <table>
          <tbody>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions ? definitions.ldapPpolicyControl : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapPpolicyControl")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      config.ldapPpolicyControl ||
                      attributes.ldapPpolicyControl.default
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "ldapPpolicyControl",
                          value: Number(e.target.value),
                        })
                      )
                    }
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
                  </RadioGroup>
                </FormControl>
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions ? definitions.ldapSetPassword : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapSetPassword")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      config.ldapSetPassword ||
                      attributes.ldapSetPassword.default
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "ldapSetPassword",
                          value: Number(e.target.value),
                        })
                      )
                    }
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
                  </RadioGroup>
                </FormControl>
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions ? definitions.ldapChangePasswordAsUser : "") +
                      ""}
                  </Markdown>
                }
              >
                <th>{t("ldapChangePasswordAsUser")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      config.ldapChangePasswordAsUser ||
                      attributes.ldapChangePasswordAsUser.default
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "ldapChangePasswordAsUser",
                          value: Number(e.target.value),
                        })
                      )
                    }
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
                  </RadioGroup>
                </FormControl>
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions ? definitions.ldapPwdEnc : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapPwdEnc")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  type="text"
                  onChange={(e) =>
                    dispatch(
                      updateConfigParams({
                        param: "ldapPwdEnc",
                        value: e.target.value,
                      })
                    )
                  }
                  value={config.ldapPwdEnc || attributes.ldapPwdEnc.default}
                />
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions
                      ? definitions.ldapUsePasswordResetAttribute
                      : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapUsePasswordResetAttribute")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      config.ldapUsePasswordResetAttribute ||
                      attributes.ldapUsePasswordResetAttribute.default
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "ldapUsePasswordResetAttribute",
                          value: Number(e.target.value),
                        })
                      )
                    }
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
                  </RadioGroup>
                </FormControl>
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions
                      ? definitions.ldapPasswordResetAttribute
                      : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapPasswordResetAttribute")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  type="text"
                  onChange={(e) =>
                    dispatch(
                      updateConfigParams({
                        param: "ldapPasswordResetAttribute",
                        value: e.target.value,
                      })
                    )
                  }
                  value={
                    config.ldapPasswordResetAttribute ||
                    attributes.ldapPasswordResetAttribute.default
                  }
                />
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions
                      ? definitions.ldapPasswordResetAttributeValue
                      : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapPasswordResetAttributeValue")}</th>
              </Tooltip>
              <td>
                <TextField
                  size="small"
                  type="text"
                  onChange={(e) =>
                    dispatch(
                      updateConfigParams({
                        param: "ldapPasswordResetAttributeValue",
                        value: e.target.value,
                      })
                    )
                  }
                  value={
                    config.ldapPasswordResetAttributeValue ||
                    attributes.ldapPasswordResetAttributeValue.default
                  }
                />
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions
                      ? definitions.ldapAllowResetExpiredPassword
                      : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapAllowResetExpiredPassword")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      config.ldapAllowResetExpiredPassword ||
                      attributes.ldapAllowResetExpiredPassword.default
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "ldapAllowResetExpiredPassword",
                          value: Number(e.target.value),
                        })
                      )
                    }
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
                  </RadioGroup>
                </FormControl>
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions
                      ? definitions.ldapGetUserBeforePasswordChange
                      : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapGetUserBeforePasswordChange")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={
                      config.ldapGetUserBeforePasswordChange ||
                      attributes.ldapGetUserBeforePasswordChange.default
                    }
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "ldapGetUserBeforePasswordChange",
                          value: Number(e.target.value),
                        })
                      )
                    }
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
                  </RadioGroup>
                </FormControl>
              </td>
            </tr>
            <tr>
              <Tooltip
                title={
                  <Markdown>
                    {(definitions ? definitions.ldapITDS : "") + ""}
                  </Markdown>
                }
              >
                <th>{t("ldapITDS")}</th>
              </Tooltip>
              <td>
                <FormControl>
                  <RadioGroup
                    row
                    value={config.ldapITDS || attributes.ldapITDS.default}
                    onChange={(e) =>
                      dispatch(
                        updateConfigParams({
                          param: "ldapITDS",
                          value: Number(e.target.value),
                        })
                      )
                    }
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
                  </RadioGroup>
                </FormControl>
              </td>
            </tr>
          </tbody>
        </table>
      </Accordion>
    </div>
  );
}
