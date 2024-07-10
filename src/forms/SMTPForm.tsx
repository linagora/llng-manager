import { Button, Dialog, Divider, TextField } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { sendTestMail } from "../utils/sentTestMail";

export default function SMTPForm() {
  const [recPopup, setRecPopup] = useState(false);
  const [recipient, setRecipient] = useState<string>();
  const [result, setResult] = useState<Record<string, string>>();

  const next = async () => {
    const response = await sendTestMail(recipient || "");
    setResult(response.data);
  };
  return (
    <>
      <Button onClick={() => setRecPopup(true)} variant="contained">
        {t("sendTestMail")}
      </Button>
      <Dialog open={recPopup}>
        {!result && (
          <div>
            <TextField
              size="small"
              margin="normal"
              className="formInput"
              value={recipient}
              placeholder={t("recipient")}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <Button
              onClick={() => {
                next();
              }}
            >
              {t("send")}
            </Button>
            <Button
              onClick={() => {
                setRecPopup(false);
                setResult(undefined);
                setRecipient("");
              }}
            >
              {t("cancel")}
            </Button>
          </div>
        )}
        {result && (
          <div>
            <h3>{result.success ? t("success") : t("error")}</h3>
            <Divider />
            <span>{result.error || "__sendTestMailSuccess__"}</span>
            <Divider />
            <Button
              onClick={() => {
                setRecPopup(false);
                setResult(undefined);
                setRecipient("");
              }}
            >
              {t("ok")}
            </Button>
          </div>
        )}
      </Dialog>
    </>
  );
}
