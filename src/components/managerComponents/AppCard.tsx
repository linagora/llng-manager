import ControlPointDuplicateOutlinedIcon from "@mui/icons-material/ControlPointDuplicateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Button, ButtonGroup, Menu, TextField } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { push } from "redux-first-history";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  changeAppName,
  delApp,
  dupApp,
  toggleMaintenance,
} from "../../features/config/configSlice";
import ToggleButton from "../ToggleButton";
import "./AppCard.css";

function Maintenance(
  type: string,
  info: {
    name: string;
    config: Record<string, boolean | number | string>;
  }
): boolean {
  const maintenanceToggled = useAppSelector((state) => {
    if (state.config.data.config.vhostOptions) {
      return state.config.data.config.vhostOptions[info.name];
    }
  });
  if (maintenanceToggled && type === "native") {
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
    config: Record<string, boolean | number | string>;
    partial?: boolean;
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
        className={`card ${
          (!issuer && !(type === "native")) || !rule ? "issue" : ""
        }${maintenanceToggled ? "Maintenance" : ""}`}
        data-testid={info.name}
        role="gridcell"
        onClick={() => dispatch(push(`#app/${type}/${info.name}`))}
      >
        <div data-testid="appcard">
          <div>
            <strong className="title2">
              {info.name} <span> {!rule ? "⚠️" : ""}</span>
            </strong>
            {info.partial && (
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
            )}
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
                  inputProps={{ role: "switch" }}
                  data-testid={`maintenance.${info.name}`}
                  color="secondary"
                  role="switch"
                  checked={maintenanceToggled}
                  onChange={() =>
                    dispatch(toggleMaintenance(String(info.name)))
                  }
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="bottomRectangle">{t(type)}</div>
        </div>
      </div>
      {info.partial && (
        <>
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
                    setOpenName(false);
                    setAnchorEl(null);
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
                  setOpenDup(false);
                  setAnchorEl(null);
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
                onClick={() => {
                  dispatch(delApp({ name: info.name, type }));
                  setOpenDel(false);
                  setAnchorEl(null);
                }}
              >
                {t("confirm")}
              </Button>
            </div>
          </Menu>
        </>
      )}
    </>
  );
}

export default AppCard;
