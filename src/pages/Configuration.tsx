import Manager from "./../dashboards/Manager";
import AddApp from "../components/managerComponents/AddApp";
import SaveButton from "./../components/SaveButton";
import { ApplicationDashboard } from "../dashboards/ApplicationDashboard";

export function Configuration({
  location,
}: {
  location: { type: string; info: { name: string; type?: string } };
}) {
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
          <Manager />
          <div>
            <SaveButton />
            <AddApp />
          </div>
        </div>
      );
  }
}
