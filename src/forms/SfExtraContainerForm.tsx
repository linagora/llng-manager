import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Accordion,
  AccordionSummary,
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { t } from "i18next";
import { TableVars } from "../components/applicationsComponents/TableVars";
import {
  deleteSfExtraOverParam,
  delModuleOpt,
  newModuleOpt,
  newSfExtraOverParam,
  updateModuleOpt,
  updateSfExtraOverParam,
} from "../features/config/configSlice";
import attributes from "../static/attributes.json";

function updateSfExtra(
  tableID: string,
  data: Record<
    string,
    Record<string, string | number | Record<string, string>>
  >,
  selectData: { name: string; type?: string; use?: string },
  newkey?: string
) {
  const headerList: Record<
    string,
    Record<string, string | number | Record<string, string>>
  > = {};

  const table = document.getElementById(tableID);
  const rows = table?.getElementsByTagName("tr");
  if (rows) {
    for (let i = 1; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName("td");
      const key = cells[0].querySelector("input")?.value;
      const type = cells[1].querySelector("input")?.value;
      const label = cells[2].querySelector("input")?.value;
      const logo = cells[3].querySelector("input")?.value;
      const level = cells[4].querySelector("input")?.value;
      const rule = cells[5].querySelector("input")?.value;
      const register = cells[6].querySelector("input")?.checked;
      const regrule = cells[7].querySelector("input")?.value;

      if (key) {
        if (key === selectData?.name) {
          headerList[key] = {
            label: label ? label : "",
            logo: logo ? logo : "",
            over: data[key].over,
            rule: rule ? rule : "",
            level: level ? level : "",
            register: register ? Number(register) : 0,
            regrule: regrule ? regrule : "",
            type: selectData?.type ? selectData.type : type ? type : "",
          };
        } else if (newkey && key === newkey) {
          headerList[newkey] = {
            label: label ? label : "",
            level: level ? level : "",
            logo: logo ? logo : "",
            over: data[selectData?.name].over,
            rule: rule ? rule : "",
            register: register ? Number(register) : 0,
            regrule: regrule ? regrule : "",
            type: type ? type : "",
          };
        } else {
          headerList[key] = {
            label: label ? label : "",
            level: level ? level : "",
            logo: logo ? logo : "",
            over: data[key].over,
            rule: rule ? rule : "",
            register: register ? Number(register) : 0,
            regrule: regrule ? regrule : "",
            type: type ? type : "",
          };
        }
      }
    }
  }
  return headerList;
}

export default function ContainerForm({
  data,
  dispatch,
}: {
  data: Record<
    string,
    Record<string, number | string | Record<string, string>>
  >;
  dispatch: Function;
}) {
  let i = 0;
  return (
    <>
      <table id="combTable">
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>{t("type")}</th>
            <th>{t("label")}</th>
            <th>{t("logo")}</th>
            <th>{t("level")}</th>
            <th>{t("activationrule")}</th>
            <th>{t("registerextra")}</th>
            <th>{t("registerrule")}</th>
            <th>
              <Button
                className="plus"
                onClick={() => dispatch(newModuleOpt("sfExtra"))}
              >
                <AddCircleIcon color="success" />
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => {
            i++;
            return (
              <tr key={i}>
                <td>
                  <TextField
                    size="small"
                    type="text"
                    placeholder={t(key)}
                    value={key || ""}
                    onChange={(e) =>
                      dispatch(
                        updateModuleOpt({
                          name: "sfExtra",
                          data: updateSfExtra(
                            "combTable",
                            data,
                            {
                              name: key,
                            },
                            e.target.value
                          ),
                        })
                      )
                    }
                  />
                </td>
                <td>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel shrink>{t("type")}</InputLabel>
                    <Select
                      label={t("type")}
                      value={data[key].type || "Mail2F"}
                      onChange={(e) =>
                        dispatch(
                          updateModuleOpt({
                            name: "sfExtra",
                            data: updateSfExtra("combTable", data, {
                              name: key,
                              type: String(e.target.value),
                            }),
                          })
                        )
                      }
                    >
                      {attributes.sfExtra.select.map((e) => {
                        return (
                          <MenuItem key={e.v} value={e.k}>
                            {t(e.v)}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <TextField
                    size="small"
                    type="text"
                    value={data[key].label}
                    onChange={(e) =>
                      dispatch(
                        updateModuleOpt({
                          name: "sfExtra",
                          data: updateSfExtra(
                            "combTable",
                            data,
                            {
                              name: key,
                            },
                            e.target.value
                          ),
                        })
                      )
                    }
                  />
                </td>
                <td>
                  <TextField
                    size="small"
                    type="text"
                    value={data[key].logo}
                    onChange={(e) =>
                      dispatch(
                        updateModuleOpt({
                          name: "sfExtra",
                          data: updateSfExtra(
                            "combTable",
                            data,
                            {
                              name: key,
                            },
                            e.target.value
                          ),
                        })
                      )
                    }
                  />
                </td>
                <td>
                  <TextField
                    size="small"
                    type="text"
                    value={data[key].level}
                    onChange={(e) =>
                      dispatch(
                        updateModuleOpt({
                          name: "sfExtra",
                          data: updateSfExtra(
                            "combTable",
                            data,
                            {
                              name: key,
                            },
                            e.target.value
                          ),
                        })
                      )
                    }
                  />
                </td>
                <td>
                  <TextField
                    size="small"
                    type="text"
                    value={data[key].rule}
                    onChange={(e) =>
                      dispatch(
                        updateModuleOpt({
                          name: "sfExtra",
                          data: updateSfExtra(
                            "combTable",
                            data,
                            {
                              name: key,
                            },
                            e.target.value
                          ),
                        })
                      )
                    }
                  />
                </td>
                <td>
                  <Checkbox
                    checked={data[key].register === 1 ? true : false}
                    value={data[key].register}
                    onChange={(e) => {
                      console.log(e.target);
                      dispatch(
                        updateModuleOpt({
                          name: "sfExtra",
                          data: updateSfExtra("combTable", data, {
                            name: key,
                          }),
                        })
                      );
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </td>
                <td>
                  <TextField
                    size="small"
                    type="text"
                    value={data[key].regrule}
                    onChange={(e) =>
                      dispatch(
                        updateModuleOpt({
                          name: "sfExtra",
                          data: updateSfExtra(
                            "combTable",
                            data,
                            {
                              name: key,
                            },
                            e.target.value
                          ),
                        })
                      )
                    }
                  />
                </td>
                <td>
                  <IconButton
                    className="minus"
                    onClick={() =>
                      dispatch(delModuleOpt({ name: "sfExtra", key }))
                    }
                  >
                    <RemoveCircleIcon color="error" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {Object.keys(data).map((key) => {
          i++;
          return (
            <Accordion key={i}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {t("overPrm") + " " + key}
              </AccordionSummary>

              <table id={`overParam${key}`}>
                <thead>
                  <tr>
                    <th>{t("overPrm")}</th>
                    <th>{t("value")}</th>
                    <th>
                      <IconButton
                        className="plus"
                        onClick={() => dispatch(newSfExtraOverParam(key))}
                      >
                        <AddCircleIcon color="success" />
                      </IconButton>
                    </th>
                  </tr>
                </thead>
                <TableVars
                  appName={key}
                  vars={
                    (data[key].over ? data[key].over : {}) as Record<
                      string,
                      string
                    >
                  }
                  tableID={`overParam${key}`}
                  dispatch={dispatch}
                  delFunction={deleteSfExtraOverParam}
                  updateFunction={updateSfExtraOverParam}
                />
              </table>
            </Accordion>
          );
        })}
      </div>
    </>
  );
}

// {/* <div class="panel panel-default">
//   <div class="panel-heading">
//     <h3 class="panel-title">{{translateTitle(currentNode)}}</h3>
//   </div>
//   <table ng-repeat="s in currentNode.nodes"  class="table table-striped">
//     <tbody>
//       <tr>
//         <th trspan="name"></th>
//         <td>
//           <input class="form-control" ng-model="s.title" />
//         </td>
//       </tr>
//       <tr>
//         <th trspan="type"></th>
//         <td>
//           <select class="form-control" ng-model="s.data.type">
//             <option ng-repeat="item in currentNode.select" ng-selected="item.k==s.data.type" value="{{item.k}}">{{item.v}}</option>
//           </select>
//         </td>
//       </tr>
//       <tr>
//         <th trspan="label"></th>
//         <td>
//           <input class="form-control" ng-model="s.data.label" />
//         </td>
//       </tr>
//       <tr>
//         <th trspan="logo"></th>
//         <td>
//           <input class="form-control" ng-model="s.data.logo" />
//         </td>
//       </tr>
//       <tr>
//         <th trspan="level"></th>
//         <td>
//           <input class="form-control" ng-model="s.data.level" />
//         </td>
//       </tr>
//       <tr>
//         <th trspan="activationrule"></th>
//         <td>
//           <input class="form-control" ng-model="s.data.rule" />
//         </td>
//       </tr>
//       <tr>
//         <th trspan="registerextra"></th>
//         <td class="form-horizontal">
//           <input type="checkbox" class="form-control checkbox-inline" ng-model="s.data.register" />
//         </td>
//       </tr>
//       <tr>
//         <th trspan="registerrule"></th>
//         <td>
//           <input class="form-control" ng-model="s.data.regrule" />
//         </td>
//       </tr>
//       <tr>
//         <td>
//           <span class="link text-danger glyphicon glyphicon-minus-sign" ng-click="del(currentNode.nodes,$index)"></span>
//           <span ng-if="$last" class="link text-success glyphicon glyphicon-plus-sign" ng-click="menuClick({title:'newSfExtra'})"></span>
//         </td>
//       </tr>
//     </tbody>
//   </table>
// </div>
// <script type="text/menu">
// [{
//   "title": "newSfExtra",
//   "icon": "plus-sign"
// }]
// </script> */}
