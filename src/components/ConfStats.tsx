import { t } from "i18next";
import { PieChart } from "@mui/x-charts";
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
    <div>
      <strong>
        {t("appNum")} ({appNum})
      </strong>
      <PieChart
        series={[
          {
            data: [
              {
                id: 1,
                label: `${t("saml")} (${
                  config.samlSPMetaDataXML
                    ? Object.keys(config.samlSPMetaDataXML).length
                    : 0
                })`,
                value: config.samlSPMetaDataXML
                  ? Object.keys(config.samlSPMetaDataXML).length
                  : 0,
                color: "#E38627",
              },
              {
                id: 2,
                label: `${t("virtualHost")} (${
                  config.locationRules
                    ? Object.keys(config.locationRules).length
                    : 0
                })`,
                value: config.locationRules
                  ? Object.keys(config.locationRules).length
                  : 0,
                color: "#d65600",
              },
              {
                id: 3,
                label: `${t("oidc")} (${
                  config.oidcRPMetaDataOptions
                    ? Object.keys(config.oidcRPMetaDataOptions).length
                    : 0
                })`,
                value: config.oidcRPMetaDataOptions
                  ? Object.keys(config.oidcRPMetaDataOptions).length
                  : 0,
                color: "#C13C37",
              },
              {
                id: 4,
                label: `${t("cas")} (${
                  config.casAppMetaDataOptions
                    ? Object.keys(config.casAppMetaDataOptions).length
                    : 0
                })`,
                value: config.casAppMetaDataOptions
                  ? Object.keys(config.casAppMetaDataOptions).length
                  : 0,
                color: "#6A2135",
              },
            ].filter((el) => el.value !== 0),
            innerRadius: 50,
          },
        ]}
        height={200}
        width={425}
      />
    </div>
  );
}
