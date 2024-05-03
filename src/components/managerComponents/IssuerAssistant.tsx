import "./CreationAssistant.css";
import { t } from "i18next";
import "./IssuerAssistant.css";
import { Dispatch, SetStateAction, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  saveOIDCPrivIdSig,
  saveOIDCPrivSig,
  saveOIDCPubSig,
  saveSAMLPrivIdSig,
  saveSAMLPrivSig,
  saveSAMLPubSig,
} from "../../features/config/configSlice";
import { handleChangeFile } from "../../utils/readFiles";
import { GenerateKeys } from "../../utils/generateKey";
import { Button, ButtonGroup, Dialog } from "@mui/material";

export function IssuerAssistant({
  visible,
  type,
  onIgnore,
  setVisible,
}: {
  visible: boolean;
  type: string;
  onIgnore: Function;
  setVisible: Dispatch<SetStateAction<boolean>>;
}) {
  const [step, setStep] = useState(0);
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.config.data.config);
  const [newKeysOIDC, setNewKeysOIDC] = useState({
    private: config.oidcServicePrivateKeySig,
    public: config.oidcServicePublicKeySig,
    hash: config.oidcServiceKeyIdSig,
  });
  const [newKeysSAML, setNewKeysSAML] = useState({
    private: config.samlServicePrivateKeySig,
    public: config.samlServicePublicKeySig,
    hash: config.samlServicePrivateKeySigPwd,
  });
  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleGenerateKeys = async () => {
    try {
      const result = await GenerateKeys();
      setNewKeysOIDC(result);
    } catch (error) {
      console.error("Error generating keys:", error);
    }
  };

  return (
    <Dialog
      fullWidth
      open={visible}
      onClose={(event, reason) => {
        if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
          setVisible(false);
        }
      }}
      style={{ display: "flex", justifyContent: "center" }}
      disableEscapeKeyDown
    >
      {step === 0 && (
        <div className="issuerAssistant">
          <div className="issuerInitials">{t("incompleteForm")}</div>
          <ButtonGroup variant="outlined">
            <Button
              onClick={() => {
                onIgnore();
                setStep(0);
              }}
            >
              {t("ignore")}
            </Button>
            <Button onClick={() => handleNextStep()}>
              {t("doItTogether")}
            </Button>
          </ButtonGroup>
        </div>
      )}
      {step === 1 && type === "saml" && (
        <>
          <div className="issuerAssistant">
            <span className="text">{t("samlServicePrivateKeySig")}</span>
            <textarea
              className="formInput"
              value={newKeysSAML.private}
              onChange={(e) =>
                setNewKeysSAML({ ...newKeysSAML, private: e.target.value })
              }
            ></textarea>
            <input
              className="fileInput"
              type="file"
              onChange={(e) => {
                handleChangeFile(e).then((fileContent) => {
                  console.log("File content:", fileContent);
                  setNewKeysSAML({ ...newKeysSAML, private: fileContent });
                });
              }}
            ></input>
            <div>
              {t("samlServiceKeyIdSig")}
              <input
                className="formInput"
                value={newKeysSAML.hash}
                onChange={(e) =>
                  setNewKeysSAML({ ...newKeysSAML, hash: e.target.value })
                }
              ></input>
            </div>
            <span className="text">{t("samlServicePublicKeySig")}</span>
            <textarea
              className="formInput"
              value={newKeysSAML.public}
              onChange={(e) =>
                setNewKeysSAML({ ...newKeysSAML, public: e.target.value })
              }
            />
            <input
              className="fileInput"
              type="file"
              onChange={(e) => {
                handleChangeFile(e).then((fileContent) => {
                  console.log("File content:", fileContent);
                  setNewKeysSAML({ ...newKeysSAML, public: fileContent });
                });
              }}
            />
            <Button
              variant="outlined"
              className="generateButton"
              onClick={handleGenerateKeys}
            >
              {t("newRSAKey")}
            </Button>
            <div>
              {" "}
              <ButtonGroup variant="outlined">
                <Button
                  onClick={() => {
                    onIgnore();
                    setStep(0);
                  }}
                >
                  {t("cancel")}
                </Button>
                <Button variant="outlined" onClick={() => handlePreviousStep()}>
                  {t("previous")}
                </Button>
                <Button
                  onClick={() => {
                    if (newKeysSAML.private && newKeysSAML.public) {
                      newKeysSAML.hash
                        ? dispatch(saveSAMLPrivIdSig(newKeysSAML.hash))
                        : console.log();
                      dispatch(saveSAMLPrivSig(newKeysSAML.private));
                      dispatch(saveSAMLPubSig(newKeysSAML.public));
                      setVisible(false);
                    }
                  }}
                >
                  {t("finish")}
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </>
      )}
      {step === 1 && type === "oidc" && (
        <>
          <div className="issuerAssistant">
            <span className="text">{t("oidcServicePrivateKeySig")}</span>
            <textarea
              className="formInput"
              value={newKeysOIDC.private}
              onChange={(e) =>
                setNewKeysOIDC({ ...newKeysOIDC, private: e.target.value })
              }
            ></textarea>
            <input
              className="fileInput"
              type="file"
              onChange={(e) => {
                handleChangeFile(e).then((fileContent) => {
                  console.log("File content:", fileContent);
                  setNewKeysOIDC({ ...newKeysOIDC, private: fileContent });
                });
              }}
            ></input>
            <div>
              {t("oidcServiceKeyIdSig")}
              <input
                className="formInput"
                value={newKeysOIDC.hash}
                onChange={(e) =>
                  setNewKeysOIDC({ ...newKeysOIDC, hash: e.target.value })
                }
              ></input>
            </div>
            <span className="text">{t("oidcServicePublicKeySig")}</span>
            <textarea
              className="formInput"
              value={newKeysOIDC.public}
              onChange={(e) =>
                setNewKeysOIDC({ ...newKeysOIDC, public: e.target.value })
              }
            />
            <input
              className="fileInput"
              type="file"
              onChange={(e) => {
                handleChangeFile(e).then((fileContent) => {
                  console.log("File content:", fileContent);
                  setNewKeysOIDC({ ...newKeysOIDC, public: fileContent });
                });
              }}
            />
            <Button
              variant="outlined"
              className="generateButton"
              onClick={handleGenerateKeys}
            >
              {t("newRSAKey")}
            </Button>
            <div>
              <ButtonGroup variant="outlined">
                <Button
                  variant="outlined"
                  className="ignoreButton"
                  onClick={() => {
                    onIgnore();
                    setStep(0);
                  }}
                >
                  {t("cancel")}
                </Button>
                <Button
                  variant="outlined"
                  className="nextButton"
                  onClick={() => handlePreviousStep()}
                >
                  {t("previous")}
                </Button>
                <Button
                  variant="outlined"
                  className="nextButton"
                  onClick={() => {
                    if (newKeysOIDC.private && newKeysOIDC.public) {
                      newKeysOIDC.hash
                        ? dispatch(saveOIDCPrivIdSig(newKeysOIDC.hash))
                        : console.log();
                      dispatch(saveOIDCPrivSig(newKeysOIDC.private));
                      dispatch(saveOIDCPubSig(newKeysOIDC.public));
                      setVisible(false);
                    }
                  }}
                >
                  {t("confirm")}
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </>
      )}
    </Dialog>
  );
}
