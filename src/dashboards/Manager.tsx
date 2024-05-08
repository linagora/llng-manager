import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getConfigAsync,
  removeError,
  setError,
} from "../features/config/configSlice";
import AppCard from "../components/managerComponents/AppCard";
import Issuers from "../components/managerComponents/Issuers";
import FilterToggle from "../components/managerComponents/Filters";
import { ruleCAS, ruleOIDC, ruleSAML } from "../utils/rules";
import { useTranslation } from "react-i18next";
import "./Manager.css";
import { Button, Divider, Menu, MenuItem, Pagination } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CachedIcon from "@mui/icons-material/Cached";
import { push } from "redux-first-history";
import { useLocation } from "react-router-dom";

export default function Manager() {
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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [configPresent, setConfigPresent] = useState<boolean>(
    Boolean(config.data.metadata && !config.loading && !config.error)
  );

  useEffect(() => {
    if (!configPresent) {
      setConfigPresent(true);
      dispatch(
        getConfigAsync(configNum === "latest" ? undefined : Number(configNum))
      );
    } else {
      if (
        configNum !== "latest" &&
        Number(configNum) !== Number(config.data.metadata.cfgNum)
      ) {
        dispatch(
          getConfigAsync(configNum === "latest" ? undefined : Number(configNum))
        );
      }
    }
  }, [
    dispatch,
    configNum,
    config.data.metadata.cfgNum,
    location,
    configPresent,
  ]);
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
      const casConfig = Object.keys(
        config.data.config.casAppMetaDataOptions
      ).map((key) => (
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
      ));

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
          <div className="main">
            <strong className="title"> {t("currentConfiguration")}</strong>
            <Button
              variant="contained"
              sx={{ verticalAlign: "top" }}
              className="cfgNum"
              color="success"
              onClick={(e) => {
                handleClick(e);
              }}
            >
              {config.data.metadata.cfgNum}
            </Button>
            <Issuers />
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
          </div>
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
            </MenuItem>{" "}
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
    console.log(e);
    if (e instanceof Error) {
      dispatch(setError(`${e.name} : ${e.message}`));
      dispatch(removeError());
    }
    return <div className="main">{config.error.errorContent}</div>;
  }
}
