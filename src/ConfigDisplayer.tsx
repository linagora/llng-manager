import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getConfigAsync } from "./features/config/configSlice";
import AppCard from "./components/AppCard";
import Issuers from "./components/Issuers";
import FilterToggle from "./components/FilterToggle";
import { ruleCAS, ruleOIDC, ruleSAML } from "./utils/rules";

const ConfigDisplayer = () => {
  const dispatch = useAppDispatch();

  const config = useAppSelector((state) => state.config);
  const [filters, setFilters] = useState({ alpha: false });

  const [configPresent, setConfigPresent] = useState<boolean>(false);

  useEffect(() => {
    if (!configPresent) {
      dispatch(getConfigAsync());
      setConfigPresent(true);
    }
  }, [configPresent, dispatch]);

  if (config.loading) {
    return (
      <div>
        {" "}
        <strong> TITRE </strong>
        Loading ...
      </div>
    );
  } else if (config.error) {
    return (
      <div>
        {" "}
        <strong> TITRE </strong>
        <strong>/!\ Error while loading /!\</strong>
        <span>{JSON.stringify(config.error)}</span>
      </div>
    );
  } else {
    const nativeConfig = Object.keys(config.data.config.locationRules).map(
      (key) => (
        <AppCard
          key={key}
          type="native"
          info={{ name: key, config: config.data.config.vhostOptions[key] }}
          rule={true}
        />
      )
    );
    const samlConfig = Object.keys(config.data.config.samlSPMetaDataXML).map(
      (key) => (
        <AppCard
          key={key}
          type="saml"
          info={{
            name: key,
            config: config.data.config.samlSPMetaDataXML[key],
          }}
          issuer={config.data.config.issuerDBSAMLActivation}
          rule={ruleSAML(config.data.config.samlSPMetaDataXML[key])}
        />
      )
    );
    const oidcConfig = Object.keys(
      config.data.config.oidcRPMetaDataOptions
    ).map((key) => (
      <AppCard
        key={key}
        type="oidc"
        info={{
          name: key,
          config: config.data.config.oidcRPMetaDataOptions[key],
        }}
        issuer={config.data.config.issuerDBOpenIDConnectActivation}
        rule={ruleOIDC(config.data.config.oidcRPMetaDataOptions[key])}
      />
    ));
    const casConfig = Object.keys(config.data.config.casAppMetaDataOptions).map(
      (key) => (
        <AppCard
          key={key}
          type="cas"
          info={{
            name: key,
            config: config.data.config.casAppMetaDataOptions[key],
          }}
          issuer={config.data.config.issuerDBCASActivation}
          rule={ruleCAS(config.data.config.casAppMetaDataOptions[key])}
        />
      )
    );

    const renderedData = nativeConfig
      .concat(samlConfig)
      .concat(oidcConfig)
      .concat(casConfig);

    if (filters.alpha) {
      renderedData.sort((el1, el2) =>
        el1.props.info.name > el2.props.info.name ? 1 : -1
      );
    }

    return (
      <div>
        {" "}
        <strong> CONFIGURATION </strong>
        <span className="cfgNum">{config.data.metadata.cfgNum}</span>
        <Issuers />
        <FilterToggle filters={filters} setFilters={setFilters} />
        <div className="grid">{renderedData}</div>
      </div>
    );
  }
};

export default ConfigDisplayer;
