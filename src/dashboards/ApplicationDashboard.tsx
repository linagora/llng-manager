import { useAppDispatch } from "../app/hooks";
import { CasApp } from "../components/applicationsComponents/CasApp";
import { NativeApp } from "../components/applicationsComponents/NativeApp";
import { OIDCApp } from "../components/applicationsComponents/OIDCApp";
import { SAMLApp } from "../components/applicationsComponents/SAMLApp";
import { setError } from "../features/config/configSlice";

export function ApplicationDashboard({
  name,
  type,
}: {
  name: string;
  type: string;
}) {
  const dispatch = useAppDispatch();
  try {
    switch (type) {
      case "native":
        return <NativeApp name={name} />;
      case "cas":
        return <CasApp name={name} />;
      case "saml":
        return <SAMLApp dispatch={dispatch} name={name} />;
      case "oidc":
        return <OIDCApp name={name} />;
      default:
        return <div>¯\_(ツ)_/¯</div>;
    }
  } catch (e) {
    if (e instanceof Error) {
      dispatch(setError(e.message));
    }
    return <div>e</div>;
  }
}
