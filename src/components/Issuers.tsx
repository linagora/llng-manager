import ToggleButton from "./ToggleButton";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  toggleCAS,
  toggleOIDC,
  toggleSAML,
} from "../features/toggles/issuerSlice";

function Issuers() {
  const dispatch = useAppDispatch();
  const issuers = useAppSelector((state) => state.issuerToggle);

  return (
    <div className="issuersList">
      <div className="issuers">
        <ToggleButton
          toggled={issuers.SAML}
          setToggled={() => dispatch(toggleSAML())}
        />
        SAMl
      </div>
      <div className="issuers">
        <ToggleButton
          toggled={issuers.OIDC}
          setToggled={() => dispatch(toggleOIDC())}
        />
        OIDC
      </div>
      <div className="issuers">
        <ToggleButton
          toggled={issuers.CAS}
          setToggled={() => dispatch(toggleCAS())}
        />
        CAS
      </div>
    </div>
  );
}

export default Issuers;
