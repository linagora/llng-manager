import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getDataAsync } from "./dataSlice";
import AppCard from "../../components/AppCard";
import NativeAppCard from "../../components/NativeAppCard";
import Issuers from "../../components/Issuers";

const DataDisplayer = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.data);
  const [dataPresent, setDataPresent] = useState<boolean>(false);

  const issuers = useAppSelector((state) => state.issuerToggle);

  useEffect(() => {
    if (!dataPresent) {
      dispatch(getDataAsync());
      setDataPresent(true);
    }
  }, [dataPresent, dispatch]);

  if (data.loading) {
    return <div>Loading ...</div>;
  } else if (data.error) {
    return (
      <div>
        <strong>/!\ Error while loading /!\</strong>
      </div>
    );
  } else {
    const nativeData = Object.keys(data.data.vhostOptions).map((key) => (
      <NativeAppCard info={{ name: key, data: data.data.vhostOptions[key] }} />
    ));
    const samlData = Object.keys(data.data.samlIDPMetaDataXML).map((key) => (
      <AppCard
        info={{ name: key, data: data.data.samlIDPMetaDataXML[key] }}
        issuer={issuers.SAML}
        issue={false}
      />
    ));
    const oidcData = Object.keys(data.data.oidcRPMetaDataOptions).map((key) => (
      <AppCard
        info={{ name: key, data: data.data.oidcRPMetaDataOptions[key] }}
        issuer={issuers.OIDC}
        issue={false}
      />
    ));
    const casData = Object.keys(data.data.casAppMetaDataOptions).map((key) => (
      <AppCard
        info={{ name: key, data: data.data.casAppMetaDataOptions[key] }}
        issuer={issuers.CAS}
        issue={false}
      />
    ));
    return (
      <div>
        <Issuers />
        <div className="grid">
          {nativeData.concat(samlData).concat(oidcData).concat(casData)}
        </div>
      </div>
    );
  }
};

export default DataDisplayer;
