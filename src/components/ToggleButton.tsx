import { Dispatch, SetStateAction } from "react";
import "./ToggleButton.css";
function ToggleButton({
  toggled,
  setToggled,
  testid,
}: {
  toggled: boolean | number;
  setToggled: Dispatch<SetStateAction<boolean>>;
  testid: string;
}) {
  return (
    <label className={`toggleButton ${toggled ? "toggled" : ""}`}>
      <input
        data-testid={testid}
        type="checkbox"
        onChange={() => {
          setToggled(!toggled);
        }}
        checked={toggled ? true : false}
      />
      <span className="thumb"></span>
    </label>
  );
}

export default ToggleButton;
