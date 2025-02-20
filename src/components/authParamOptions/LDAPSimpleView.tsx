import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary } from "@mui/material";
import { t } from "i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateConfigParams } from "../../features/config/configSlice";
import attributes from "../../static/attributes.json";
import TextForm from "../../forms/TextForm";
import BoolForm from "../../forms/BoolForm";

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
            <TextForm
              fieldName="ldapBase"
              updateFunc={(e: string) =>
                dispatch(
                  updateConfigParams({
                    param: "ldapBase",
                    value: e,
                  })
                )
              }
              value={config.ldapBase || attributes.ldapBase.default}
            />
          </tr>
          <tr>
            <TextForm
              fieldName="managerDn"
              updateFunc={(e: string) =>
                dispatch(
                  updateConfigParams({
                    param: "managerDn",
                    value: e,
                  })
                )
              }
              value={config.managerDn || attributes.managerDn.default}
            />
          </tr>
          <tr>
            <TextForm
              fieldName="managerPassword"
              updateFunc={(e: string) =>
                dispatch(
                  updateConfigParams({
                    param: "managerPassword",
                    value: e,
                  })
                )
              }
              value={
                config.managerPassword || attributes.managerPassword.default
              }
            />
          </tr>
          <tr>
            <TextForm
              fieldName="LDAPFilter"
              updateFunc={(e: string) =>
                dispatch(
                  updateConfigParams({
                    param: "LDAPFilter",
                    value: e,
                  })
                )
              }
              value={config.LDAPFilter || ""}
            />
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
              <TextForm
                fieldName="ldapGroupBase"
                updateFunc={(e: string) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapGroupBase",
                      value: e,
                    })
                  )
                }
                value={config.ldapGroupBase || ""}
              />
            </tr>
            <tr>
              <TextForm
                fieldName="groupLDAPFilter"
                updateFunc={(e: string) =>
                  dispatch(
                    updateConfigParams({
                      param: "groupLDAPFilter",
                      value: e,
                    })
                  )
                }
                value={config.groupLDAPFilter || ""}
              />
            </tr>
            <tr>
              <TextForm
                fieldName="ldapGroupObjectClass"
                updateFunc={(e: string) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapGroupObjectClass",
                      value: e,
                    })
                  )
                }
                value={
                  config.ldapGroupObjectClass ||
                  attributes.ldapGroupObjectClass.default
                }
              />
            </tr>
            <tr>
              <TextForm
                fieldName="ldapGroupAttributeName"
                updateFunc={(e: string) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapGroupAttributeName",
                      value: e,
                    })
                  )
                }
                value={
                  config.ldapGroupAttributeName ||
                  attributes.ldapGroupAttributeName.default
                }
              />
            </tr>
            <tr>
              <TextForm
                fieldName="ldapGroupAttributeNameUser"
                updateFunc={(e: string) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapGroupAttributeNameUser",
                      value: e,
                    })
                  )
                }
                value={
                  config.ldapGroupAttributeNameUser ||
                  attributes.ldapGroupAttributeNameUser.default
                }
              />
            </tr>
            <tr>
              <TextForm
                fieldName="ldapGroupAttributeNameSearch"
                updateFunc={(e: string) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapGroupAttributeNameSearch",
                      value: e,
                    })
                  )
                }
                value={
                  config.ldapGroupAttributeNameSearch ||
                  attributes.ldapGroupAttributeNameSearch.default
                }
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="ldapGroupDecodeSearchedValue"
                value={Number(
                  config.ldapGroupDecodeSearchedValue ||
                    attributes.ldapGroupDecodeSearchedValue.default
                )}
                updateFunc={(e: number) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapGroupDecodeSearchedValue",
                      value: Number(e),
                    })
                  )
                }
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="ldapGroupRecursive"
                value={Number(
                  config.ldapGroupRecursive ||
                    attributes.ldapGroupRecursive.default
                )}
                updateFunc={(e: number) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapGroupRecursive",
                      value: Number(e),
                    })
                  )
                }
              />
            </tr>
            <tr>
              <TextForm
                fieldName="ldapGroupAttributeNameGroup"
                updateFunc={(e: string) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapGroupAttributeNameGroup",
                      value: e,
                    })
                  )
                }
                value={
                  config.ldapGroupAttributeNameGroup ||
                  attributes.ldapGroupAttributeNameGroup.default
                }
              />
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
              <BoolForm
                fieldName="ldapPpolicyControl"
                value={Number(
                  config.ldapPpolicyControl ||
                    attributes.ldapPpolicyControl.default
                )}
                updateFunc={(e: number) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapPpolicyControl",
                      value: Number(e),
                    })
                  )
                }
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="ldapSetPassword"
                value={Number(
                  config.ldapSetPassword || attributes.ldapSetPassword.default
                )}
                updateFunc={(e: number) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapSetPassword",
                      value: Number(e),
                    })
                  )
                }
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="ldapChangePasswordAsUser"
                value={Number(
                  config.ldapChangePasswordAsUser ||
                    attributes.ldapChangePasswordAsUser.default
                )}
                updateFunc={(e: number) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapChangePasswordAsUser",
                      value: Number(e),
                    })
                  )
                }
              />
            </tr>
            <tr>
              <TextForm
                fieldName="ldapPwdEnc"
                updateFunc={(e: string) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapPwdEnc",
                      value: e,
                    })
                  )
                }
                value={config.ldapPwdEnc || attributes.ldapPwdEnc.default}
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="ldapUsePasswordResetAttribute"
                value={Number(
                  config.ldapUsePasswordResetAttribute ||
                    attributes.ldapUsePasswordResetAttribute.default
                )}
                updateFunc={(e: number) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapUsePasswordResetAttribute",
                      value: Number(e),
                    })
                  )
                }
              />
            </tr>
            <tr>
              <TextForm
                fieldName="ldapPasswordResetAttribute"
                updateFunc={(e: string) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapPasswordResetAttribute",
                      value: e,
                    })
                  )
                }
                value={
                  config.ldapPasswordResetAttribute ||
                  attributes.ldapPasswordResetAttribute.default
                }
              />
            </tr>
            <tr>
              <TextForm
                fieldName="ldapPasswordResetAttributeValue"
                updateFunc={(e: string) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapPasswordResetAttributeValue",
                      value: e,
                    })
                  )
                }
                value={
                  config.ldapPasswordResetAttributeValue ||
                  attributes.ldapPasswordResetAttributeValue.default
                }
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="ldapAllowResetExpiredPassword"
                value={Number(
                  config.ldapAllowResetExpiredPassword ||
                    attributes.ldapAllowResetExpiredPassword.default
                )}
                updateFunc={(e: number) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapAllowResetExpiredPassword",
                      value: Number(e),
                    })
                  )
                }
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="ldapGetUserBeforePasswordChange"
                value={Number(
                  config.ldapGetUserBeforePasswordChange ||
                    attributes.ldapGetUserBeforePasswordChange.default
                )}
                updateFunc={(e: number) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapGetUserBeforePasswordChange",
                      value: Number(e),
                    })
                  )
                }
              />
            </tr>
            <tr>
              <BoolForm
                fieldName="ldapITDS"
                value={Number(config.ldapITDS || attributes.ldapITDS.default)}
                updateFunc={(e: number) =>
                  dispatch(
                    updateConfigParams({
                      param: "ldapITDS",
                      value: Number(e),
                    })
                  )
                }
              />
            </tr>
          </tbody>
        </table>
      </Accordion>
    </div>
  );
}
