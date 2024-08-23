import AddIcon from "@mui/icons-material/Add";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import "./AddApp.css";
import { CreationAssistant } from "./CreationAssistant";
function AddApp() {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        className="addButton"
        variant="contained"
        color="primary"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <AddIcon fontSize="large" />
        <span>{t("newApp")}</span>
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            closeModal();
          }
        }}
        disableEscapeKeyDown
      >
        <DialogTitle>{t("newApp")}</DialogTitle>
        <DialogContent>
          <CreationAssistant closeModal={closeModal} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddApp;
