import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CachedIcon from "@mui/icons-material/Cached";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { Button, Divider, Menu, MenuItem, Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { push } from "redux-first-history";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AppCard from "../components/managerComponents/AppCard";
import FilterToggle from "../components/managerComponents/Filters";
import Issuers from "../components/managerComponents/Issuers";
import {
  getPartialConfigAsync,
  removeError,
  setError,
} from "../features/config/configSlice";
import { ruleCAS, ruleOIDC, ruleSAML } from "../utils/rules";
import "./Manager.css";

export default function PartialManager() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const config = useAppSelector((state) => state.config);
  const configNum = useAppSelector((state) =>
    state.router.location?.hash.replace("#conf/", "")
  );
  const [filters, setFilters] = useState({ alpha: false, search: "" });
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [configPresent, setConfigPresent] = useState<boolean>(
    Boolean(config.data.metadata && !config.loading && !config.error.has)
  );

  useEffect(() => {
    if (!configPresent) {
      setConfigPresent(true);
      dispatch(getPartialConfigAsync());
    }
    const appNum =
      (config.data.config.locationRules
        ? Object.keys(config.data.config.locationRules).length
        : 0) +
      (config.data.config.samlSPMetaDataXML
        ? Object.keys(config.data.config.samlSPMetaDataXML).length
        : 0) +
      (config.data.config.oidcRPMetaDataOptions
        ? Object.keys(config.data.config.oidcRPMetaDataOptions).length
        : 0) +
      (config.data.config.casAppMetaDataOptions
        ? Object.keys(config.data.config.casAppMetaDataOptions).length
        : 0);
    if (appNum === 1) {
      const name =
        config.data.config.locationRules ||
        config.data.config.samlSPMetaDataXML ||
        config.data.config.oidcRPMetaDataOptions ||
        config.data.config.casAppMetaDataOptions;
      const type = config.data.config.locationRules
        ? "native"
        : false || config.data.config.samlSPMetaDataXML
        ? "SPsaml"
        : false || config.data.config.oidcRPMetaDataOptions
        ? "RPoidc"
        : false || config.data.config.casAppMetaDataOptions
        ? "AppCas"
        : false;
      dispatch(push(`#app/${type}/${Object.keys(name ? name : {})[0]}`));
    }
  }, [dispatch, configNum, config.data.metadata, location, configPresent]);
  try {
    if (config.loading) {
      return (
        <div>
          <strong className="title"> {t("currentConfiguration")} </strong>
          {t("loading")}
        </div>
      );
    } else if (config.error.has) {
      return (
        <div className="top">
          <strong className="title"> {t("currentConfiguration")} </strong>
          <strong>{t("failedLoading")}</strong>
          <span>{config.error.errorContent}</span>
        </div>
      );
    } else {
      const renderedData: JSX.Element[] = [];
      if (config.data.config.locationRules) {
        renderedData.push(
          ...Object.keys(config.data.config.locationRules).map((key) => (
            <AppCard
              key={key}
              type="native"
              info={{
                name: key,
                config: config.data.config.vhostOptions
                  ? config.data.config.vhostOptions[key]
                  : {},
              }}
              rule={true}
            />
          ))
        );
      }
      if (config.data.config.samlSPMetaDataXML) {
        renderedData.push(
          ...Object.keys(config.data.config.samlSPMetaDataXML).map((key) => (
            <AppCard
              key={key}
              type="SPsaml"
              info={{
                name: key,
                config: config.data.config.samlSPMetaDataXML
                  ? config.data.config.samlSPMetaDataXML[key]
                  : {},
              }}
              issuer={config.data.config.issuerDBSAMLActivation}
              rule={ruleSAML(
                config.data.config.samlSPMetaDataXML
                  ? config.data.config.samlSPMetaDataXML[key]
                  : {}
              )}
            />
          ))
        );
      }
      if (config.data.config.oidcRPMetaDataOptions) {
        renderedData.push(
          ...Object.keys(config.data.config.oidcRPMetaDataOptions).map(
            (key) => (
              <AppCard
                key={key}
                type="RPoidc"
                info={{
                  name: key,
                  config: config.data.config.oidcRPMetaDataOptions
                    ? config.data.config.oidcRPMetaDataOptions[key]
                    : {},
                  partial: true,
                }}
                issuer={config.data.config.issuerDBOpenIDConnectActivation}
                rule={ruleOIDC(
                  config.data.config.oidcRPMetaDataOptions
                    ? config.data.config.oidcRPMetaDataOptions[key]
                    : {}
                )}
              />
            )
          )
        );
      }
      if (config.data.config.casAppMetaDataOptions) {
        renderedData.push(
          ...Object.keys(config.data.config.casAppMetaDataOptions).map(
            (key) => (
              <AppCard
                key={key}
                type="AppCas"
                info={{
                  name: key,
                  config: config.data.config.casAppMetaDataOptions
                    ? config.data.config.casAppMetaDataOptions[key]
                    : {},
                }}
                issuer={config.data.config.issuerDBCASActivation}
                rule={ruleCAS(
                  config.data.config.casAppMetaDataOptions
                    ? config.data.config.casAppMetaDataOptions[key]
                    : {}
                )}
              />
            )
          )
        );
      }
      renderedData.filter((el) => {
        return String(el.props.info.name).includes(filters.search);
      });

      if (filters.alpha) {
        renderedData.sort((el1, el2) =>
          el1.props.info.name > el2.props.info.name ? 1 : -1
        );
      }
      const pageLimit = 12;
      const pageNb = Math.ceil(renderedData.length / pageLimit);
      const pages = Array.from(
        { length: Math.ceil(renderedData.length / pageLimit) },
        (v, i) => renderedData.slice(i * pageLimit, i * pageLimit + pageLimit)
      );
      const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
        setPage(value);
      };

      return (
        <>
          <div className="top">
            <strong className="title"> {t("currentConfiguration")}</strong>
            <Button
              variant="contained"
              sx={{ verticalAlign: "top" }}
              className="cfgNum"
              color={"success"}
            >
              {config.data.metadata.cfgNum}
            </Button>
            {false && (
              <Button
                onClick={() => {
                  dispatch(push("#catandapp"));
                }}
              >
                <WidgetsOutlinedIcon color="secondary" />
              </Button>
            )}
          </div>
          {false && <Issuers />}
          <FilterToggle filters={filters} setFilters={setFilters} />
          <Pagination
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
            count={pageNb}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
          <div className="grid">{pages[page - 1]}</div>
          <Pagination
            sx={{
              justifyContent: "center",
              display: "flex",
              margin: "15px",
            }}
            count={pageNb}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
          <Menu
            id="del-menu"
            anchorEl={anchorEl}
            open={anchorEl ? true : false}
            onClose={() => {
              setAnchorEl(null);
            }}
          >
            <MenuItem
              onClick={() => {
                dispatch(push(`#conf/${config.data.metadata.prev}`));
                setAnchorEl(null);
              }}
            >
              <ArrowBackIcon sx={{ marginRight: "15px" }} />
              {t("previous")}
            </MenuItem>
            <Divider />
            <MenuItem
              disabled={!config.data.metadata.next}
              onClick={() => {
                dispatch(push(`#conf/${config.data.metadata.next}`));
                setAnchorEl(null);
              }}
            >
              <ArrowForwardIcon sx={{ marginRight: "15px" }} />
              {t("next")}
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                dispatch(push(`#conf/latest`));
                setAnchorEl(null);
              }}
            >
              <CachedIcon sx={{ marginRight: "15px" }} />
              {t("latest")}
            </MenuItem>
          </Menu>
        </>
      );
    }
  } catch (e) {
    console.debug(e);
    if (e instanceof Error) {
      dispatch(setError(`${e.name} : ${e.message}`));
      dispatch(removeError());
    }
    return <div className="main">{config.error.errorContent}</div>;
  }
}
