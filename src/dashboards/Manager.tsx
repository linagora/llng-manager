import { useState } from "react";
import { ConfigState } from "../features/config/configSlice";
import AppCard from "../components/managerComponents/AppCard";
import Issuers from "../components/managerComponents/Issuers";
import FilterToggle from "../components/managerComponents/Filters";
import { ruleCAS, ruleOIDC, ruleSAML } from "../utils/rules";
import { useTranslation } from "react-i18next";
import "./Manager.css";

function Manager({ config }: { config: ConfigState }) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({ alpha: false, search: "" });

  if (config.loading) {
    return (
      <div>
        <strong className="title"> {t("currentConfiguration")} </strong>
        {t("loading")}
      </div>
    );
  } else if (config.error) {
    return (
      <div>
        <strong className="title"> {t("currentConfiguration")} </strong>
        <strong>{t("failedLoading")}</strong>
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
      .concat(casConfig)
      .filter((el) => {
        return String(el.props.info.name).includes(filters.search);
      });

    if (filters.alpha) {
      renderedData.sort((el1, el2) =>
        el1.props.info.name > el2.props.info.name ? 1 : -1
      );
    }

    return (
      <div className="main">
        <strong className="title"> {t("currentConfiguration")}</strong>
        <span className="cfgNum">{config.data.metadata.cfgNum}</span>
        <Issuers />
        <FilterToggle filters={filters} setFilters={setFilters} />
        <div className="grid">{renderedData}</div>
      </div>
    );
  }
}

export default Manager;
