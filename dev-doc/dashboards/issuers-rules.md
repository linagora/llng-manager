# Issuer rules

The configuration for an issuer is OK if:

* SAML:
  * the following configuration keys must not be empty:
    samlServicePublicKeySig, samlServicePrivateKeySig
  * [maybe later] if one SAML partner require encryption, the following configuration keys must not be empty:
    samlServicePublicKeyEnc, samlServicePrivateKeyEnc
* OIDC:
  * the following configuration keys must not be empty:
    oidcServicePublicKeySig, oidcServicePrivateKeySig
* CAS: no rules AFAIK
