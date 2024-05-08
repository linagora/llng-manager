import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { samlSPMetaDataXML } from "../../utils/types";
import {
  changeAppName,
  delApp,
  dupApp,
  toggleMaintenance,
} from "../../features/config/configSlice";
import ToggleButton from "../ToggleButton";
import "./AppCard.css";
import { t } from "i18next";
import { push } from "redux-first-history";
import { useState } from "react";
import { Button, ButtonGroup, Menu, TextField } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function Maintenance(
  type: string,
  info: {
    name: string;
    config: samlSPMetaDataXML | Record<string, boolean | number | string>;
  }
): boolean {
  const maintenanceToggled = useAppSelector(
    (state) => state.config.data.config.vhostOptions[info.name]
  );

  if (type === "native") {
    return Boolean(maintenanceToggled.vhostMaintenance);
  }
  return false;
}

function AppCard({
  info,
  type,
  issuer,
  rule,
}: {
  info: {
    name: string;
    config: samlSPMetaDataXML | Record<string, boolean | number | string>;
  };
  type: string;
  issuer?: boolean | number;
  rule: boolean;
}) {
  const dispatch = useAppDispatch();
  const maintenanceToggled = Maintenance(type, info);
  const [name, setName] = useState("");
  const [openName, setOpenName] = useState(false);
  const [openDup, setOpenDup] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <div
        data-testid="appcard"
        onClick={() => dispatch(push(`#app/${type}/${info.name}`))}
      >
        <div
          className={`card ${
            (!issuer && !(type === "native")) || !rule ? "issue" : ""
          }${maintenanceToggled ? "Maintenance" : ""}`}
          data-testid={info.name}
        >
          <div>
            <strong className="title2">
              {info.name} <span> {!rule ? "⚠️" : ""}</span>
            </strong>
            <ButtonGroup size="small" color="secondary">
              <Button
                onClick={(e) => {
                  setOpenName(true);
                  e.stopPropagation();
                  handleClick(e);
                }}
              >
                <DriveFileRenameOutlineIcon />
              </Button>

              <Button
                onClick={(e) => {
                  setOpenDup(true);
                  e.stopPropagation();
                  handleClick(e);
                }}
              >
                <ControlPointDuplicateOutlinedIcon />
              </Button>

              <Button
                onClick={(e) => {
                  setOpenDel(true);
                  e.stopPropagation();
                  handleClick(e);
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </Button>
            </ButtonGroup>
          </div>
          {type === "native" ? (
            <div className="maintenanceToggle">
              <p>{t("maintenance")}</p>
              <div
                data-testid={`maintenanceButton.${info.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <ToggleButton
                  color="secondary"
                  checked={maintenanceToggled}
                  onChange={() =>
                    dispatch(toggleMaintenance(String(info.name)))
                  }
                  // testid={`maintenance.${info.name}`}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Menu
        id="name-menu"
        anchorEl={anchorEl}
        open={openName}
        onClose={() => {
          setOpenName(false);
          setAnchorEl(null);
        }}
      >
        <div>
          <TextField
            sx={{ margin: "10px" }}
            placeholder={t("hostname")}
            size="small"
            margin="normal"
            variant="filled"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            sx={{ verticalAlign: "-28px", margin: "15px" }}
            variant="outlined"
            onClick={() => {
              if (name) {
                dispatch(changeAppName({ name: info.name, newName: name }));
              }
            }}
          >
            {t("confirm")}
          </Button>
        </div>
      </Menu>
      <Menu
        id="dup-menu"
        anchorEl={anchorEl}
        open={openDup}
        onClose={() => {
          setOpenDup(false);
          setAnchorEl(null);
        }}
      >
        <TextField
          sx={{ margin: "10px" }}
          placeholder={t("hostname")}
          size="small"
          margin="normal"
          variant="filled"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          sx={{ verticalAlign: "-28px", margin: "10px" }}
          variant="outlined"
          onClick={() => {
            if (name) {
              dispatch(dupApp({ oldName: info.name, newAppName: name }));
            }
          }}
        >
          {t("confirm")}
        </Button>
      </Menu>
      <Menu
        id="del-menu"
        anchorEl={anchorEl}
        open={openDel}
        onClose={() => {
          setOpenDel(false);
          setAnchorEl(null);
        }}
      >
        <div>
          <label style={{ margin: "10px" }}>Are You Sure?</label>

          <Button
            sx={{ margin: "10px" }}
            variant="outlined"
            onClick={() => dispatch(delApp(info.name))}
          >
            confirm
          </Button>
        </div>
      </Menu>
    </>
  );
}

export default AppCard;
