# Applications dashboard

TODO: add description


## Rules

* apps in `locationRules`:
  * if `vhostsOptions/<appname>/vhostMaintenance` is set, display in orange
* apps in `oidcRPMetaDataOptions`:
  * if `issuerDBOpenIDConnectActivation` isn't set, display in red
* apps in `samlSPMetaDataXML`
  * if `issuerDBSAMLActivation` isn't set, display in red


## OIDC rules

An OIDC app is OK if:
* it has an ID `oidcRPMetaDataOptions/<appname>/oidcRPMetaDataOptionsClientID`
* either:
  - it is public _(`oidcRPMetaDataOptionsPublic`)_
  - or it has a secret in `oidcRPMetaDataOptionsClientSecret`

## SAML rules

A SAML app is OK if:
* it has metadata into `samlSPMetaDataXML/<appname>/samlSPMetaDataXML`

