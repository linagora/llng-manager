import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogContent, DialogTitle, Fab } from "@mui/material";
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
      <Fab
        className="addButton"
        style={{ position: "fixed", bottom: "2%", right: "2%" }}
        color="primary"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <AddIcon fontSize="large" />
      </Fab>
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
