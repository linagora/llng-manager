# Applications dashboard

TODO: add description


## Rules

* apps in `locationRules`:
  * if `vhostsOptions/<appname>/vhostMaintenance` is set, display in orange
* apps in `oidcRPMetaDataOptions`:
  * if `issuerDBOpenIDConnectActivation` isn't set, display in red
* apps in `samlSPMetaDataXML`
  * if `issuerDBSAMLActivation` isn't set, display in red
