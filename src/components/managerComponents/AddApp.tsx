import { useState } from "react";
import Popup from "reactjs-popup";
import { CreationAssistant } from "./CreationAssistant";
import "./AddApp.css";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
function AddApp() {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <div>
      <Fab
        style={{ position: "fixed", bottom: "2%", right: "2%" }}
        color="primary"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <AddIcon fontSize="large" />
      </Fab>
      <Popup
        open={open}
        position={"center center"}
        modal
        lockScroll
        overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        onClose={closeModal}
      >
        <CreationAssistant closeModal={closeModal} />
      </Popup>
    </div>
  );
}

export default AddApp;
