import { useState } from "react";
import Popup from "reactjs-popup";

function AddApp() {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <div>
      <button
        className="addButton"
        onClick={() => {
          setOpen(!open);
        }}
      ></button>
      <Popup
        open={open}
        position={"center center"}
        modal
        lockScroll
        overlayStyle={{ background: "rgba(0,0,0,0.5)" }}
        closeOnDocumentClick
        closeOnEscape
        onClose={closeModal}
      >
        <div className="createAssistant"> Création Assistant Popup</div>
      </Popup>
    </div>
  );
}

export default AddApp;
