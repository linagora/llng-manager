import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { t } from "i18next";
import Markdown from "markdown-to-jsx";
import { ChangeEvent } from "react";
import { VisuallyHiddenInput } from "../components/managerComponents/VisuallyHiddenInput";
import attributes from "../static/attributes.json";
import definitions from "../static/definitions.json";
import { GenerateEcKeys, NewCertificate } from "../utils/generateKey";
import { handleChangeFile } from "../utils/readFiles";
export default function OidcKeyForm({
  value,
  fieldNames,
  updateFunc,
}: {
  value: Record<string, string>;
  fieldNames: Record<string, string>;
  updateFunc: Function;
}) {
  const handleGenerateKeys = async (type?: string) => {
    try {
      let result;
      switch (type) {
        case "EC":
          result = await GenerateEcKeys();
          break;
        default:
          result = await NewCertificate();
          break;
      }
      updateFunc({
        param: fieldNames.pub,
        value: result.public,
      });
      updateFunc({
        param: fieldNames.priv,
        value: result.private,
      });
      updateFunc({
        param: fieldNames.hash,
        value: result.hash,
      });
      updateFunc({
        param: fieldNames.type,
        value: type,
      });
    } catch (error) {
      console.error("Error generating keys:", error);
    }
  };
  console.log(value, fieldNames);
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>{t(fieldNames.hash)}</th>
            <td>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>{t("oidcServiceKeyTypeSig")}</InputLabel>
                <Select
                  value={value.type || "RSA"}
                  label={t("oidcServiceKeyTypeSig")}
                  onChange={(e) =>
                    updateFunc({
                      param: fieldNames.type,
                      value: e.target.value,
                    })
                  }
                >
                  {(
                    attributes[fieldNames.type as keyof typeof attributes] as {
                      type: string;
                      select: { k: string; v: string }[];
                    }
                  ).select.map((el) => {
                    return (
                      <MenuItem key={el.k} value={el.k}>
                        {t(el.v)}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </td>
          </tr>
          <tr>
            <Tooltip
              title={
                <Markdown>
                  {definitions[fieldNames.hash as keyof typeof definitions]
                    ? definitions[fieldNames.hash as keyof typeof definitions] +
                      ""
                    : ""}
                </Markdown>
              }
            >
              <th> {t("oidcServiceKeyIdSig")} </th>
            </Tooltip>

            <td>
              <TextField
                size="small"
                margin="normal"
                variant="filled"
                className="formInput"
                value={value.hash || ""}
                onChange={(e) =>
                  updateFunc({
                    param: fieldNames.hash,
                    value: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <th>
              <div>
                <Tooltip
                  title={
                    <Markdown>
                      {definitions[fieldNames.priv as keyof typeof definitions]
                        ? definitions[
                            fieldNames.priv as keyof typeof definitions
                          ] + ""
                        : ""}
                    </Markdown>
                  }
                >
                  <span>{t("oidcServicePrivateKeySig")}</span>
                </Tooltip>
              </div>
              <Button
                sx={{ margin: "5px" }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                {t("upload")}
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => {
                    if (e.target instanceof HTMLInputElement) {
                      handleChangeFile(e as ChangeEvent<HTMLInputElement>).then(
                        (fileContent) => {
                          console.debug("File content:", fileContent);
                          updateFunc({
                            param: "oidcServicePrivateKeySig",
                            value: fileContent,
                          });
                        }
                      );
                    }
                  }}
                />
              </Button>
            </th>
            <td>
              <TextField
                size="small"
                margin="normal"
                multiline
                fullWidth
                variant="filled"
                rows={5}
                className="formInput"
                value={value.priv || ""}
                onChange={(e) =>
                  updateFunc({
                    param: "oidcServicePrivateKeySig",
                    value: e.target.value,
                  })
                }
              />
            </td>
          </tr>

          <tr>
            <th>
              <div>
                <Tooltip
                  title={
                    <Markdown>
                      {definitions.oidcServicePublicKeySig
                        ? definitions.oidcServicePublicKeySig
                        : ""}
                    </Markdown>
                  }
                >
                  <span>{t("oidcServicePublicKeySig")}</span>
                </Tooltip>
              </div>
              <Button
                sx={{ margin: "5px" }}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                {t("upload")}
                <VisuallyHiddenInput
                  type="file"
                  onChange={(e) => {
                    if (e.target instanceof HTMLInputElement) {
                      handleChangeFile(e as ChangeEvent<HTMLInputElement>).then(
                        (fileContent) => {
                          console.debug("File content:", fileContent);
                          updateFunc({
                            param: "oidcServicePublicKeySig",
                            value: fileContent,
                          });
                        }
                      );
                    }
                  }}
                />
              </Button>
            </th>
            <td>
              <TextField
                size="small"
                margin="normal"
                multiline
                variant="filled"
                fullWidth
                rows={5}
                className="formInput"
                value={value.pub || ""}
                onChange={(e) =>
                  updateFunc({
                    param: "oidcServicePublicKeySig",
                    value: e.target.value,
                  })
                }
              />
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <Button
                variant="outlined"
                className="generateButton"
                onClick={() =>
                  handleGenerateKeys(value.type ? value.type : "RSA")
                }
              >
                {t("newRSAKey")}
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

// {
//   /* <div class="panel panel-default">
//   <div class="panel-heading">
//     <h3 class="panel-title">{{translateTitle(currentNode)}}</h3>
//   </div>
//   <div class="panel-body">
//     <div class="row">
//       <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
//         <div class="form-group">
//           <label for="keyid" id="lki"><span>{{translateTitle(currentNode.data[2])}}</span></label>
//           <input id="keyid" aria-describedby="lki" class="form-control" ng-model="currentNode.data[2].data"/>
//         </div>
//         <div class="form-group">
//           <label for="privateKey" id="lpv"><span>{{translateTitle(currentNode.data[0])}}</span></label>
//           <textarea id="privateKey" aria-describedby="lpv" class="form-control" rows="8" ng-model="currentNode.data[0].data"></textarea>
//         </div>
//         <div class="form-group">
//           <label for="privkfile" id="lprivkfile"><span trspan="replaceByFile"></span></label>
//           <input id="privkfile" aria-describedby="lprivkfile" type="file" class="form-control" on-read-file="replaceContent(currentNode.data[0],$fileContent)"/>
//         </div>
//       </div>
//       <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
// 	<div class="form-group">
// 	  <label for="selform" id="selLabel"><span>{{translateTitle(currentNode.data[3])}}</span></label>
// 	  <select id="selform" class="form-control" ng-model="currentNode.data[3].data" ng-change="currentNode.onChange()">
// 	    <option ng-selected="'RSA'==currentNode.data[3].data" value="RSA">RSA</option>
// 	    <option ng-selected="'EC'==currentNode.data[3].data" value="EC">EC</option>
// 	  </select>
// 	</div>
//         <div class="form-group">
//           <label for="publicKey" id="lpub"><span>{{translateTitle(currentNode.data[1])}}</span></label>
//           <textarea id="publicKey" aria-describedby="lpub" class="form-control" rows="8" ng-model="currentNode.data[1].data"></textarea>
//         </div>
//         <div class="form-group">
//           <label for="privkfile" id="lprivkfile"><span trspan="replaceByFile"></span></label>
//           <input id="privkfile" aria-describedby="lprivkfile" type="file" class="form-control" on-read-file="replaceContent(currentNode.data[1],$fileContent)"/>
//         </div>
//       </div>
//     </div>
//     <hr/>
//     <div class="row" ng-if="currentNode.data.length>3">
//       <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
//         <div class="form-group">
//           <label for="privateKey2" id="lpv2"><span>{{translateTitle(currentNode.data[3])}}</span></label>
//           <textarea id="privateKey2" aria-describedby="lpv2" class="form-control" rows="8" ng-model="currentNode.data[3].data" disabled></textarea>
//         </div>
//         <div class="form-group">
//           <label for="keyid2" id="lki2"><span>{{translateTitle(currentNode.data[5])}}</span></label>
//           <input id="keyid2" aria-describedby="lki2" class="form-control" ng-model="currentNode.data[5].data" disabled/>
//         </div>
//       </div>
//       <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
//         <div class="form-group">
//           <label for="publicKey2" id="lpub2"><span>{{translateTitle(currentNode.data[4])}}</span></label>
//           <textarea id="publicKey2" aria-describedby="lpub2" class="form-control" rows="8" ng-model="currentNode.data[4].data" disabled></textarea>
//         </div>
//       </div>
//     </div>
//     <hr/>
//     <div class="row" ng-if="currentNode.data.length>6">
//       <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
//         <div class="form-group">
//           <label for="privateKey3" id="lpv3"><span>{{translateTitle(currentNode.data[6])}}</span></label>
//           <textarea id="privateKey3" aria-describedby="lpv3" class="form-control" rows="8" ng-model="currentNode.data[6].data"></textarea>
//         </div>
//         <div class="form-group">
//           <label for="keyid3" id="lki3"><span>{{translateTitle(currentNode.data[8])}}</span></label>
//           <input id="keyid3" aria-describedby="lki3" class="form-control" ng-model="currentNode.data[8].data"/>
//         </div>
//       </div>
//       <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
//         <div class="form-group">
//           <label for="publicKey3" id="lpub3"><span>{{translateTitle(currentNode.data[7])}}</span></label>
//           <textarea id="publicKey3" aria-describedby="lpub3" class="form-control" rows="8" ng-model="currentNode.data[7].data"></textarea>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// <script type="text/menu">
// [{
//  "title": "newCertificate",
//  "action": "newCertificateNoPassword",
//  "icon": "plus-sign"
// },{
//  "title": "newEcKeys",
//  "action": "newEcKeys",
//  "icon": "plus-sign"
// },{
//   "title": "download",
//   "icon": "save-file",
//   "action": "saveAsPem"
// }]
// </script> */
// }
