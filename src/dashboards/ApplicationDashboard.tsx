import { t } from "i18next";
import { NativeApp } from "../components/applicationsComponents/NativeApp";

export function ApplicationDashboard({
  name,
  type,
}: {
  name: string;
  type: string;
}) {
  switch (type) {
    case "native":
      return <NativeApp name={name} />;

    default:
      return <div>¯\_(ツ)_/¯</div>;
  }
}
