import React, { Dispatch, SetStateAction } from "react";

function ToggleButton({
  toggled,
  setToggled,
}: {
  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      className={`toggleButton ${toggled ? "toggled" : ""}`}
      onClick={() => setToggled(!toggled)}
    >
      <div className="thumb"></div>
    </button>
  );
}

export default ToggleButton;
