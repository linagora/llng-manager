import ToggleButton from "./ToggleButton";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { toggleMaintenance } from "../features/data/dataSlice";

function NativeAppCard({ info }: { info: any }) {
  const dispatch = useDispatch();
  const maintenanceToggled = useAppSelector(
    (state) => state.data.data.vhostOptions[info.name].vhostMaintenance
  );

  return (
    <div
      className={`card ${maintenanceToggled ? "Maintenance" : ""}`}
      key={info.name}
    >
      <div className="appInfo">
        <strong>{info.name}</strong>
        <p>
          description mais pour l'instant c'est pas les vrais données parce que
          c'est moche
        </p>
      </div>
      <div className="maintenanceToggle">
        <p>Maintenance</p>
        <ToggleButton
          toggled={maintenanceToggled}
          setToggled={() => dispatch(toggleMaintenance(String(info.name)))}
        />
      </div>
    </div>
  );
}

export default NativeAppCard;
