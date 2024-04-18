import Manager from "./../dashboards/Manager";
import AddApp from "../components/managerComponents/AddApp";
import SaveButton from "./../components/SaveButton";
import { ApplicationDashboard } from "../dashboards/ApplicationDashboard";
import { useState, useEffect } from "react";
import { getConfigAsync } from "../features/config/configSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export function Configuration({
  location,
}: {
  location: { type: string; info: { name: string; type?: string } };
}) {
  const config = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const [configPresent, setConfigPresent] = useState<boolean>(
    !config.loading && !config.error
  );

  useEffect(() => {
    if (!configPresent) {
      dispatch(getConfigAsync());
      setConfigPresent(true);
    }
  }, [configPresent, dispatch]);
  switch (location.type) {
    case "app":
      return (
        <div className="main">
          <ApplicationDashboard
            name={location.info.name}
            type={location.info.type ? location.info.type : ""}
          />
          <SaveButton />
        </div>
      );
    default:
      return (
        <div className="main">
          <Manager config={config} />
          <SaveButton />
          <AddApp />
        </div>
      );
  }
}
