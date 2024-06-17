import { t } from "i18next";
import { PieChart } from "react-minimal-pie-chart";
import { llngConfig } from "../utils/types";

export function ConfStats({ config }: { config: llngConfig }) {
  const appNum =
    (config.locationRules ? Object.keys(config.locationRules).length : 0) +
    (config.samlSPMetaDataXML
      ? Object.keys(config.samlSPMetaDataXML).length
      : 0) +
    (config.oidcRPMetaDataOptions
      ? Object.keys(config.oidcRPMetaDataOptions).length
      : 0) +
    (config.casAppMetaDataOptions
      ? Object.keys(config.casAppMetaDataOptions).length
      : 0);
  return (
    <div className="main">
      <div className="box" style={{ maxWidth: "350px" }}>
        <strong>
          {t("appNum")} ({appNum})
        </strong>
        <PieChart
          paddingAngle={18}
          data={[
            {
              title: t("saml"),
              value: config.samlSPMetaDataXML
                ? Object.keys(config.samlSPMetaDataXML).length
                : 0,
              color: "#E38627",
            },
            {
              title: t("oidc"),
              value: config.oidcRPMetaDataOptions
                ? Object.keys(config.oidcRPMetaDataOptions).length
                : 0,
              color: "#C13C37",
            },
            {
              title: t("cas"),
              value: config.casAppMetaDataOptions
                ? Object.keys(config.casAppMetaDataOptions).length
                : 0,
              color: "#6A2135",
            },
          ]}
          label={({ dataEntry }) => dataEntry.title + " : " + dataEntry.value}
          labelStyle={() => ({
            fontSize: "5px",
            fontFamily: "sans-serif",
          })}
          lineWidth={30}
          labelPosition={110}
          radius={30}
        />
      </div>
    </div>
  );
}
