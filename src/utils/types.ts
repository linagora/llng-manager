export interface llngConfig {
  ADPwdExpireWarning?: number;
  ADPwdMaxAge?: number;
  AuthLDAPFilter?: string;
  LDAPFilter?: string;
  SMTPAuthPass?: string;
  SMTPAuthUser?: string;
  SMTPPort?: number;
  SMTPServer?: string;
  SMTPTLS?: Array<{ k: string; v: string }>;
  SMTPTLSOpts?: Record<string, Record<string, string>>;
  SSLAuthnLevel?: number;
  SSLIssuerVar?: string;
  SSLVar?: string;
  SSLVarIf?: Record<string, Record<string, string>>;
  activeTimer?: boolean | number;
  adaptativeAuthenticationLevelRules?: Record<string, Record<string, string>>;
  apacheAuthnLevel?: number;
  applicationList?: Record<
    string,
    Record<
      string,
      string | number | Record<string, string | number | Record<string, string>>
    >
  >;
  authChoiceAuthBasic?: string;
  authChoiceFindUser?: string;
  authChoiceModules?: Record<string, string>;
  authChoiceParam?: string;
  authentication?: string;
  autoSigninRules?: Record<string, Record<string, string>>;
  available2F?: string;
  available2FSelfRegistration?: string;
  avoidAssignment?: boolean | number;
  browsersDontStorePassword?: boolean | number;
  bruteForceProtection?: boolean | number;
  bruteForceProtectionIncrementalTempo?: boolean | number;
  bruteForceProtectionLockTimes?: string;
  bruteForceProtectionMaxAge?: number;
  bruteForceProtectionMaxFailed?: number;
  bruteForceProtectionMaxLockTime?: number;
  bruteForceProtectionTempo?: number;
  captcha?: string;
  captchaOptions?: Record<string, Record<string, string>>;
  captcha_login_enabled?: boolean | number;
  captcha_mail_enabled?: boolean | number;
  captcha_register_enabled?: boolean | number;
  captcha_size?: number;
  casAccessControlPolicy?: Array<{ k: string; v: string }>;
  casAppMetaDataExportedVars?: Record<string, Record<string, string>>;
  casAppMetaDataMacros?: Record<string, Record<string, string>>;
  casAppMetaDataNodes?: Record<string, object>;
  casAppMetaDataOptions?: Record<
    string,
    Record<string, string | number | boolean>
  >;
  casAppMetaDataOptionsAuthnLevel?: number | null;
  casAppMetaDataOptionsComment?: string;
  casAppMetaDataOptionsDisplayName?: string;
  casAppMetaDataOptionsLogout?: number;
  casAppMetaDataOptionsRule?: string;
  casAppMetaDataOptionsService?: string;
  casAppMetaDataOptionsUserAttribute?: string;
  casAttr?: string;
  casAttributes?: Record<string, string>;
  casAuthnLevel?: number;
  casBackChannelSingleLogout?: boolean | number;
  casSrvMetaDataExportedVars?: Record<string, Record<string, string>>;
  casSrvMetaDataNodes?: Record<string, object>;
  casSrvMetaDataOptions?: Record<
    string,
    Record<string, string | number | boolean>
  >;
  casSrvMetaDataOptionsComment?: string;
  casSrvMetaDataOptionsDisplayName?: string;
  casSrvMetaDataOptionsGateway?: boolean | number;
  casSrvMetaDataOptionsIcon?: string;
  casSrvMetaDataOptionsProxiedServices?: Record<string, Record<string, string>>;
  casSrvMetaDataOptionsRenew?: boolean | number;
  casSrvMetaDataOptionsResolutionRule?: string;
  casSrvMetaDataOptionsSortNumber?: number | null;
  casSrvMetaDataOptionsTooltip?: string;
  casSrvMetaDataOptionsUrl?: string;
  casStorage?: string;
  casStorageOptions?: Record<string, string>;
  casStrictMatching?: boolean | number;
  casTicketExpiration?: number;
  cda?: boolean | number;
  certificateResetByMailCeaAttribute?: string;
  certificateResetByMailCertificateAttribute?: string;
  certificateResetByMailStep1Body?: string;
  certificateResetByMailStep1Subject?: string;
  certificateResetByMailStep2Body?: string;
  certificateResetByMailStep2Subject?: string;
  certificateResetByMailURL?: string;
  certificateResetByMailValidityDelay?: number;
  cfgAuthor?: string;
  cfgAuthorIP?: string;
  cfgDate?: number;
  cfgLog?: string;
  cfgNum?: number;
  cfgVersion?: string;
  checkDevOps?: boolean | number;
  checkDevOpsCheckSessionAttributes?: boolean | number;
  checkDevOpsDisplayNormalizedHeaders?: boolean | number;
  checkDevOpsDownload?: boolean | number;
  checkEntropy?: boolean | number;
  checkEntropyRequired?: boolean | number;
  checkEntropyRequiredLevel?: number;
  checkHIBP?: boolean | number;
  checkHIBPRequired?: boolean | number;
  checkHIBPURL?: string;
  checkState?: boolean | number;
  checkStateSecret?: string;
  checkTime?: number;
  checkUser?: boolean | number;
  checkUserDisplayComputedSession?: boolean | number | string;
  checkUserDisplayEmptyHeaders?: boolean | number | string;
  checkUserDisplayEmptyValues?: boolean | number | string;
  checkUserDisplayHiddenAttributes?: boolean | number | string;
  checkUserDisplayHistory?: boolean | number | string;
  checkUserDisplayNormalizedHeaders?: boolean | number | string;
  checkUserDisplayPersistentInfo?: boolean | number | string;
  checkUserHiddenAttributes?: string;
  checkUserHiddenHeaders?: Record<string, Record<string, string>>;
  checkUserIdRule?: string;
  checkUserSearchAttributes?: string;
  checkUserUnrestrictedUsersRule?: string;
  checkXSS?: boolean | number;
  combModules?: Record<
    string,
    Record<string, string | Record<string, string | number>>
  >;
  combination?: string;
  compactConf?: boolean | number;
  configStorage?: string;
  confirmFormMethod?: Array<{ k: string; v: string }>;
  contextSwitchingAllowed2fModifications?: boolean | number;
  contextSwitchingIdRule?: string;
  contextSwitchingPrefix?: string;
  contextSwitchingRule?: boolean | number | string;
  contextSwitchingStopWithLogout?: boolean | number;
  contextSwitchingUnrestrictedUsersRule?: string;
  cookieExpiration?: number | null;
  cookieName?: string;
  corsAllow_Credentials?: string;
  corsAllow_Headers?: string;
  corsAllow_Methods?: string;
  corsAllow_Origin?: string;
  corsEnabled?: boolean | number;
  corsExpose_Headers?: string;
  corsMax_Age?: string;
  crowdsec?: boolean | number;
  crowdsecAction?: Array<{ k: string; v: string }>;
  crowdsecKey?: string;
  crowdsecUrl?: string;
  cspConnect?: string;
  cspDefault?: string;
  cspFont?: string;
  cspFormAction?: string;
  cspFrameAncestors?: string;
  cspImg?: string;
  cspScript?: string;
  cspStyle?: string;
  customAddParams?: Record<string, Record<string, string>>;
  customAuth?: string;
  customFunctions?: string;
  customPassword?: string;
  customPlugins?: string;
  customPluginsParams?: Record<string, Record<string, string>>;
  customRegister?: string;
  customResetCertByMail?: string;
  customToTrace?: string;
  customUserDB?: string;
  dbiAuthChain?: string;
  dbiAuthLoginCol?: string;
  dbiAuthPassword?: string;
  dbiAuthPasswordCol?: string;
  dbiAuthPasswordHash?: string;
  dbiAuthTable?: string;
  dbiAuthUser?: string;
  dbiAuthnLevel?: number;
  dbiDynamicHashEnabled?: boolean | number;
  dbiDynamicHashNewPasswordScheme?: string;
  dbiDynamicHashValidSaltedSchemes?: string;
  dbiDynamicHashValidSchemes?: string;
  dbiExportedVars?: Record<string, Record<string, string>>;
  dbiPasswordMailCol?: string;
  dbiUserChain?: string;
  dbiUserPassword?: string;
  dbiUserTable?: string;
  dbiUserUser?: string;
  decryptValueFunctions?: string;
  decryptValueRule?: boolean | number | string;
  defaultNewKeySize?: number;
  demoExportedVars?: Record<string, string>;
  disablePersistentStorage?: boolean | number;
  displaySessionId?: boolean | number;
  domain?: string;
  exportedAttr?: string;
  exportedHeaders?: Record<string, Record<string, string>>;
  exportedVars?: Record<string, Record<string, string>>;
  ext2FSendCommand?: string;
  ext2FValidateCommand?: string;
  ext2fActivation?: boolean | number | string;
  ext2fAuthnLevel?: number | null;
  ext2fCodeActivation?: string;
  ext2fLabel?: string;
  ext2fLogo?: string;
  ext2fResendInterval?: string;
  facebookAppId?: string;
  facebookAppSecret?: string;
  facebookAuthnLevel?: number;
  facebookExportedVars?: Record<string, Record<string, string>>;
  facebookUserField?: string;
  failedLoginNumber?: number;
  findUser?: boolean | number;
  findUserControl?: string;
  findUserExcludingAttributes?: Record<string, Record<string, string>>;
  findUserSearchingAttributes?: Record<string, Record<string, string>>;
  findUserWildcard?: string;
  forceGlobalStorageIssuerOTT?: boolean | number;
  forceGlobalStorageUpgradeOTT?: boolean | number;
  formTimeout?: number;
  githubAuthnLevel?: number;
  githubClientID?: string;
  githubClientSecret?: string;
  githubScope?: string;
  githubUserField?: string;
  globalLogoutCustomParam?: string;
  globalLogoutRule?: boolean | number | string;
  globalLogoutTimer?: boolean | number;
  globalStorage?: string;
  globalStorageOptions?: Record<string, Record<string, string>>;
  gpgAuthnLevel?: number;
  gpgDb?: string;
  grantSessionRules?: Record<string, string>;
  groupLDAPFilter?: string;
  groups?: Record<string, Record<string, string>>;
  groupsBeforeMacros?: boolean | number;
  handlerInternalCache?: number;
  handlerServiceTokenTTL?: number;
  hiddenAttributes?: string;
  hideOldPassword?: boolean | number;
  httpOnly?: boolean | number;
  https?: number;
  impersonationHiddenAttributes?: string;
  impersonationIdRule?: string;
  impersonationMergeSSOgroups?: boolean | number | string;
  impersonationPrefix?: string;
  impersonationRule?: boolean | number | string;
  impersonationSkipEmptyValues?: boolean | number;
  impersonationUnrestrictedUsersRule?: string;
  infoFormMethod?: Array<{ k: string; v: string }>;
  initializePasswordReset?: boolean | number;
  initializePasswordResetSecret?: string;
  issuerDBCASActivation: boolean | number;
  issuerDBCASPath?: string;
  issuerDBCASRule?: boolean | number | string;
  issuerDBGetActivation?: boolean | number;
  issuerDBGetParameters?: Record<string, Record<string, string>>;
  issuerDBGetPath?: string;
  issuerDBGetRule?: boolean | number | string;
  issuerDBOpenIDActivation?: boolean | number;
  issuerDBOpenIDConnectActivation?: boolean | number;
  issuerDBOpenIDConnectPath?: string;
  issuerDBOpenIDConnectRule?: boolean | number | string;
  issuerDBOpenIDPath?: string;
  issuerDBOpenIDRule?: boolean | number | string;
  issuerDBSAMLActivation?: boolean | number;
  issuerDBSAMLPath?: string;
  issuerDBSAMLRule?: boolean | number | string;
  issuersTimeout?: number;
  jsRedirect?: boolean | number | string;
  key?: string;
  krbAllowedDomains?: string;
  krbAuthnLevel?: number;
  krbByJs?: boolean | number;
  krbKeytab?: string;
  krbRemoveDomain?: boolean | number;
  ldapAllowResetExpiredPassword?: boolean | number;
  ldapAuthnLevel?: number;
  ldapBase?: string;
  ldapCAFile?: string;
  ldapCAPath?: string;
  ldapChangePasswordAsUser?: boolean | number;
  ldapExportedVars?: Record<string, Record<string, string>>;
  ldapGetUserBeforePasswordChange?: boolean | number;
  ldapGroupAttributeName?: string;
  ldapGroupAttributeNameGroup?: string;
  ldapGroupAttributeNameSearch?: string;
  ldapGroupAttributeNameUser?: string;
  ldapGroupBase?: string;
  ldapGroupDecodeSearchedValue?: boolean | number;
  ldapGroupObjectClass?: string;
  ldapGroupRecursive?: boolean | number;
  ldapIOTimeout?: number;
  ldapITDS?: boolean | number;
  ldapPasswordResetAttribute?: string;
  ldapPasswordResetAttributeValue?: string;
  ldapPort?: number | null;
  ldapPpolicyControl?: boolean | number;
  ldapPwdEnc?: string;
  ldapRaw?: string;
  ldapSearchDeref?: Array<{ k: string; v: string }>;
  ldapServer?: string;
  ldapSetPassword?: boolean | number;
  ldapTimeout?: number;
  ldapUsePasswordResetAttribute?: boolean | number;
  ldapVerify?: Array<{ k: string; v: string }>;
  ldapVersion?: number;
  linkedInAuthnLevel?: number;
  linkedInClientID?: string;
  linkedInClientSecret?: string;
  linkedInFields?: string;
  linkedInScope?: string;
  linkedInUserField?: string;
  localSessionStorage?: string;
  localSessionStorageOptions?: Record<string, Record<string, string>>;
  localStorage?: string;
  localStorageOptions?: Record<string, Record<string, string>>;
  locationDetect?: boolean | number;
  locationDetectGeoIpDatabase?: string;
  locationDetectGeoIpLanguages?: string;
  locationDetectIpDetail?: string;
  locationDetectUaDetail?: string;
  locationRules?: Record<string, Record<string, string>>;
  log4perlConfFile?: string;
  logLevel?: string;
  logger?: string;
  loginHistoryEnabled?: boolean | number;
  logoutServices?: Record<string, Record<string, string>>;
  lwpOpts?: Record<string, Record<string, string>>;
  lwpSslOpts?: Record<string, Record<string, string>>;
  macros?: Record<string, Record<string, string>>;
  mail2fActivation?: boolean | number | string;
  mail2fAuthnLevel?: number | null;
  mail2fBody?: string;
  mail2fCodeRegex?: string;
  mail2fLabel?: string;
  mail2fLogo?: string;
  mail2fResendInterval?: string;
  mail2fSessionKey?: string;
  mail2fSubject?: string;
  mail2fTimeout?: number | null;
  mailBody?: string;
  mailCharset?: string;
  mailConfirmBody?: string;
  mailConfirmSubject?: string;
  mailFrom?: string;
  mailLDAPFilter?: string;
  mailOnPasswordChange?: boolean | number;
  mailReplyTo?: string;
  mailSessionKey?: string;
  mailSubject?: string;
  mailTimeout?: number;
  mailUrl?: string;
  maintenance?: boolean | number;
  managerDn?: string;
  managerPassword?: string;
  max2FDevices?: number;
  max2FDevicesNameLength?: number;
  multiValuesSeparator?: string;
  mySessionAuthorizedRWKeys?: string[];
  newLocationWarning?: boolean | number;
  newLocationWarningLocationAttribute?: string;
  newLocationWarningLocationDisplayAttribute?: string;
  newLocationWarningMailAttribute?: string;
  newLocationWarningMailBody?: string;
  newLocationWarningMailSubject?: string;
  newLocationWarningMaxValues?: number;
  nginxCustomHandlers?: Record<string, Record<string, string>>;
  noAjaxHook?: boolean | number;
  notification?: boolean | number;
  notificationDefaultCond?: string;
  notificationServer?: boolean | number;
  notificationServerDELETE?: boolean | number;
  notificationServerGET?: boolean | number;
  notificationServerPOST?: boolean | number;
  notificationServerSentAttributes?: string;
  notificationStorage?: string;
  notificationStorageOptions?: Record<string, Record<string, string>>;
  notificationWildcard?: string;
  notificationXSLTfile?: string;
  notificationsExplorer?: boolean | number;
  notificationsMaxRetrieve?: number;
  notifyDeleted?: boolean | number;
  notifyOther?: boolean | number;
  nullAuthnLevel?: number;
  oidcAuthnLevel?: number;
  oidcDropCspHeaders?: boolean | number;
  oidcOPMetaDataExportedVars?: Record<string, Record<string, string>>;
  oidcOPMetaDataJSON?: Record<string, string>;
  oidcOPMetaDataJWKS?: Record<string, string>;
  oidcOPMetaDataNodes?: Record<string, Record<string, string | number>>;
  oidcOPMetaDataOptions?: Record<
    string,
    Record<string, string | number | boolean>
  >;
  oidcOPMetaDataOptionsAcrValues?: string;
  oidcOPMetaDataOptionsAuthnEndpointAuthMethod?: Array<{
    k: string;
    v: string;
  }>;
  oidcOPMetaDataOptionsAuthnEndpointAuthSigAlg?: Array<{
    k: string;
    v: string;
  }>;
  oidcOPMetaDataOptionsCheckJWTSignature?: boolean | number;
  oidcOPMetaDataOptionsClientID?: string;
  oidcOPMetaDataOptionsClientSecret?: string;
  oidcOPMetaDataOptionsComment?: string;
  oidcOPMetaDataOptionsConfigurationURI?: string;
  oidcOPMetaDataOptionsDisplay?: Array<{ k: string; v: string }>;
  oidcOPMetaDataOptionsDisplayName?: string;
  oidcOPMetaDataOptionsIDTokenMaxAge?: number;
  oidcOPMetaDataOptionsIcon?: string;
  oidcOPMetaDataOptionsJWKSTimeout?: number;
  oidcOPMetaDataOptionsMaxAge?: number;
  oidcOPMetaDataOptionsPrompt?: string;
  oidcOPMetaDataOptionsRequirePkce?: boolean | number;
  oidcOPMetaDataOptionsResolutionRule?: string;
  oidcOPMetaDataOptionsScope?: string;
  oidcOPMetaDataOptionsSortNumber?: number | null;
  oidcOPMetaDataOptionsStoreIDToken?: boolean | number;
  oidcOPMetaDataOptionsTokenEndpointAuthMethod?: Array<{
    k: string;
    v: string;
  }>;
  oidcOPMetaDataOptionsTooltip?: string;
  oidcOPMetaDataOptionsUiLocales?: string;
  oidcOPMetaDataOptionsUseNonce?: boolean | number;
  oidcOPMetaDataOptionsUserAttribute?: string;
  oidcRPCallbackGetParam?: string;
  oidcRPMetaDataExportedVars?: Record<string, Record<string, string>>;
  oidcRPMetaDataMacros?: Record<string, Record<string, string>>;
  oidcRPMetaDataNodes?: Record<string, object>;
  oidcRPMetaDataOptions?: Record<
    string,
    Record<string, string | number | boolean>
  >;
  oidcRPMetaDataOptionsAccessTokenClaims?: boolean | number;
  oidcRPMetaDataOptionsAccessTokenEncContentEncAlg?: Array<{
    k: string;
    v: string;
  }>;
  oidcRPMetaDataOptionsAccessTokenEncKeyMgtAlg?: Array<{
    k: string;
    v: string;
  }>;
  oidcRPMetaDataOptionsAccessTokenExpiration?: number | null;
  oidcRPMetaDataOptionsAccessTokenJWT?: boolean | number;
  oidcRPMetaDataOptionsAccessTokenSignAlg?: Array<{ k: string; v: string }>;
  oidcRPMetaDataOptionsAdditionalAudiences?: string;
  oidcRPMetaDataOptionsAllowClientCredentialsGrant?: boolean | number;
  oidcRPMetaDataOptionsAllowOffline?: boolean | number;
  oidcRPMetaDataOptionsAllowPasswordGrant?: boolean | number;
  oidcRPMetaDataOptionsAuthMethod?: Array<{ k: string; v: string }>;
  oidcRPMetaDataOptionsAuthRequiredForAuthorize?: boolean | number;
  oidcRPMetaDataOptionsAuthnLevel?: number | null;
  oidcRPMetaDataOptionsAuthnRequireNonce?: boolean | number;
  oidcRPMetaDataOptionsAuthnRequireState?: boolean | number;
  oidcRPMetaDataOptionsAuthorizationCodeExpiration?: number | null;
  oidcRPMetaDataOptionsBypassConsent?: boolean | number;
  oidcRPMetaDataOptionsClientID?: string;
  oidcRPMetaDataOptionsClientSecret?: string;
  oidcRPMetaDataOptionsComment?: string;
  oidcRPMetaDataOptionsDisplayName?: string;
  oidcRPMetaDataOptionsExtraClaims?: Record<string, Record<string, string>>;
  oidcRPMetaDataOptionsIDTokenExpiration?: number | null;
  oidcRPMetaDataOptionsIDTokenForceClaims?: boolean | number;
  oidcRPMetaDataOptionsIDTokenSignAlg?: Array<{ k: string; v: string }>;
  oidcRPMetaDataOptionsIcon?: string;
  oidcRPMetaDataOptionsIdTokenEncContentEncAlg?: Array<{
    k: string;
    v: string;
  }>;
  oidcRPMetaDataOptionsIdTokenEncKeyMgtAlg?: Array<{ k: string; v: string }>;
  oidcRPMetaDataOptionsJwks?: string;
  oidcRPMetaDataOptionsJwksUri?: string;
  oidcRPMetaDataOptionsLogoutBypassConfirm?: boolean | number;
  oidcRPMetaDataOptionsLogoutEncContentEncAlg?: Array<{ k: string; v: string }>;
  oidcRPMetaDataOptionsLogoutEncKeyMgtAlg?: Array<{ k: string; v: string }>;
  oidcRPMetaDataOptionsLogoutSessionRequired?: boolean | number;
  oidcRPMetaDataOptionsLogoutType?: Array<{ k: string; v: string }>;
  oidcRPMetaDataOptionsLogoutUrl?: string;
  oidcRPMetaDataOptionsOfflineSessionExpiration?: number | null;
  oidcRPMetaDataOptionsPostLogoutRedirectUris?: string;
  oidcRPMetaDataOptionsPublic?: boolean | number;
  oidcRPMetaDataOptionsRedirectUris?: string;
  oidcRPMetaDataOptionsRefreshToken?: boolean | number;
  oidcRPMetaDataOptionsRequestUris?: string;
  oidcRPMetaDataOptionsRequirePKCE?: boolean | number;
  oidcRPMetaDataOptionsRule?: string;
  oidcRPMetaDataOptionsUserIDAttr?: string;
  oidcRPMetaDataOptionsUserInfoEncContentEncAlg?: Array<{
    k: string;
    v: string;
  }>;
  oidcRPMetaDataOptionsUserInfoEncKeyMgtAlg?: Array<{ k: string; v: string }>;
  oidcRPMetaDataOptionsUserInfoSignAlg?: Array<{ k: string; v: string }>;
  oidcRPMetaDataOptionsUserinfoRequireHeaderToken?: boolean | number;
  oidcRPMetaDataScopeRules?: Record<string, Record<string, string>>;
  oidcRPStateTimeout?: number;
  oidcServiceAccessTokenExpiration?: number;
  oidcServiceAllowAuthorizationCodeFlow?: boolean | number;
  oidcServiceAllowDynamicRegistration?: boolean | number;
  oidcServiceAllowHybridFlow?: boolean | number;
  oidcServiceAllowImplicitFlow?: boolean | number;
  oidcServiceAllowOnlyDeclaredScopes?: boolean | number;
  oidcServiceAuthorizationCodeExpiration?: number;
  oidcServiceDynamicRegistrationExportedVars?: Record<string, string>;
  oidcServiceDynamicRegistrationExtraClaims?: Record<string, string>;
  oidcServiceEncAlgorithmAlg?: Array<{ k: string; v: string }>;
  oidcServiceEncAlgorithmEnc?: Array<{ k: string; v: string }>;
  oidcServiceIDTokenExpiration?: number;
  oidcServiceIgnoreScopeForClaims?: boolean | number;
  oidcServiceKeyIdEnc?: string;
  oidcServiceKeyIdSig?: string;
  oidcServiceKeyTypeEnc?: string;
  oidcServiceKeyTypeSig?: string;
  oidcServiceMetaDataAuthnContext?: Record<string, Record<string, string>>;
  oidcServiceMetaDataAuthorizeURI?: string;
  oidcServiceMetaDataBackChannelURI?: string;
  oidcServiceMetaDataCheckSessionURI?: string;
  oidcServiceMetaDataEndSessionURI?: string;
  oidcServiceMetaDataFrontChannelURI?: string;
  oidcServiceMetaDataIntrospectionURI?: string;
  oidcServiceMetaDataIssuer?: string;
  oidcServiceMetaDataJWKSURI?: string;
  oidcServiceMetaDataRegistrationURI?: string;
  oidcServiceMetaDataTokenURI?: string;
  oidcServiceMetaDataUserInfoURI?: string;
  oidcServiceNewKeyIdSig?: string;
  oidcServiceNewKeyTypeSig?: Array<{ k: string; v: string }>;
  oidcServiceNewPrivateKeySig?: string;
  oidcServiceNewPublicKeySig?: string;
  oidcServiceOfflineSessionExpiration?: number;
  oidcServiceOldKeyIdEnc?: string;
  oidcServiceOldKeyIdSig?: string;
  oidcServiceOldKeyTypeEnc?: Array<{ k: string; v: string }>;
  oidcServiceOldKeyTypeSig?: Array<{ k: string; v: string }>;
  oidcServiceOldPrivateKeyEnc?: string;
  oidcServiceOldPrivateKeySig?: string;
  oidcServiceOldPublicKeyEnc?: string;
  oidcServiceOldPublicKeySig?: string;
  oidcServicePrivateKeyEnc?: string;
  oidcServicePrivateKeySig?: string;
  oidcServicePublicKeyEnc?: string;
  oidcServicePublicKeySig?: string;
  oidcStorage?: string;
  oidcStorageOptions?: Record<string, string>;
  oldNotifFormat?: boolean | number;
  openIdAttr?: string;
  openIdAuthnLevel?: number;
  openIdExportedVars?: Record<string, Record<string, string>>;
  openIdIDPList?: string;
  openIdIssuerSecret?: string;
  openIdSPList?: string;
  openIdSecret?: string;
  openIdSreg_country?: string;
  openIdSreg_dob?: string;
  openIdSreg_email?: string;
  openIdSreg_fullname?: string;
  openIdSreg_gender?: string;
  openIdSreg_language?: string;
  openIdSreg_nickname?: string;
  openIdSreg_postcode?: string;
  openIdSreg_timezone?: string;
  pamAuthnLevel?: number;
  pamService?: string;
  password2fActivation?: boolean | number | string;
  password2fAuthnLevel?: number | null;
  password2fLabel?: string;
  password2fLogo?: string;
  password2fSelfRegistration?: boolean | number | string;
  password2fTTL?: number | null;
  password2fUserCanRemoveKey?: boolean | number;
  passwordDB?: string;
  passwordPolicyActivation?: boolean | number | string;
  passwordPolicyMinDigit?: number;
  passwordPolicyMinLower?: number;
  passwordPolicyMinSize?: number;
  passwordPolicyMinSpeChar?: number;
  passwordPolicyMinUpper?: number;
  passwordPolicySpecialChar?: string;
  passwordResetAllowedRetries?: number;
  pdataDomain?: string;
  persistentSessionAttributes?: string;
  persistentStorage?: string;
  persistentStorageOptions?: Record<string, Record<string, string>>;
  port?: number;
  portal?: string;
  portalAntiFrame?: boolean | number;
  portalCheckLogins?: boolean | number;
  portalCustomCss?: string;
  portalCustomJs?: string;
  portalDisplayAppslist?: boolean | number | string;
  portalDisplayCertificateResetByMail?: boolean | number;
  portalDisplayChangePassword?: boolean | number | string;
  portalDisplayGeneratePassword?: boolean | number;
  portalDisplayLoginHistory?: boolean | number | string;
  portalDisplayLogout?: boolean | number | string;
  portalDisplayOidcConsents?: boolean | number | string;
  portalDisplayOrder?: string;
  portalDisplayPasswordPolicy?: boolean | number;
  portalDisplayRefreshMyRights?: boolean | number;
  portalDisplayRegister?: boolean | number;
  portalDisplayResetPassword?: boolean | number;
  portalEnablePasswordDisplay?: boolean | number;
  portalErrorOnExpiredSession?: boolean | number;
  portalErrorOnMailNotFound?: boolean | number;
  portalFavicon?: string;
  portalForceAuthn?: boolean | number;
  portalForceAuthnInterval?: number;
  portalMainLogo?: string;
  portalOpenLinkInNewWindow?: boolean | number;
  portalPingInterval?: number;
  portalRequireOldPassword?: boolean | number | string;
  portalSkin?: string;
  portalSkinBackground?: string;
  portalSkinRules?: Record<string, Record<string, string>>;
  portalStatus?: boolean | number;
  portalUserAttr?: string;
  post?: Record<string, Record<string, Record<string, string>>>;
  protection?: string;
  proxyAuthService?: string;
  proxyAuthServiceChoiceParam?: string;
  proxyAuthServiceChoiceValue?: string;
  proxyAuthServiceImpersonation?: boolean | number;
  proxyAuthnLevel?: number;
  proxyCookieName?: string;
  proxySessionService?: string;
  proxyUseSoap?: boolean | number;
  radius2fActivation?: boolean | number | string;
  radius2fAuthnLevel?: number | null;
  radius2fDictionaryFile?: string;
  radius2fLabel?: string;
  radius2fLogo?: string;
  radius2fRequestAttributes?: Record<string, Record<string, string>>;
  radius2fSecret?: string;
  radius2fSendInitialRequest?: boolean | number;
  radius2fServer?: string;
  radius2fTimeout?: number;
  radius2fUsernameSessionKey?: string;
  radiusAuthnLevel?: number;
  radiusDictionaryFile?: string;
  radiusExportedVars?: Record<string, Record<string, string>>;
  radiusRequestAttributes?: Record<string, Record<string, string>>;
  radiusSecret?: string;
  radiusServer?: string;
  radiusTimeout?: number | null;
  randomPasswordRegexp?: string;
  redirectFormMethod?: Array<{ k: string; v: string }>;
  refreshSessions?: boolean | number;
  registerConfirmBody?: string;
  registerConfirmSubject?: string;
  registerDB?: string;
  registerDoneBody?: string;
  registerDoneSubject?: string;
  registerTimeout?: number;
  registerUrl?: string;
  reloadTimeout?: number;
  reloadUrls?: Record<string, Record<string, string>>;
  rememberAuthChoiceRule?: boolean | number | string;
  rememberCookieName?: string;
  rememberCookieTimeout?: number;
  rememberDefaultChecked?: boolean | number;
  rememberTimer?: number;
  remoteCookieName?: string;
  remoteGlobalStorage?: string;
  remoteGlobalStorageOptions?: Record<string, Record<string, string>>;
  remotePortal?: string;
  requireToken?: boolean | number | string;
  rest2fActivation?: boolean | number | string;
  rest2fAuthnLevel?: number | null;
  rest2fCodeActivation?: string;
  rest2fInitArgs?: Record<string, Record<string, string>>;
  rest2fInitUrl?: string;
  rest2fLabel?: string;
  rest2fLogo?: string;
  rest2fResendInterval?: string;
  rest2fVerifyArgs?: Record<string, Record<string, string>>;
  rest2fVerifyUrl?: string;
  restAuthServer?: boolean | number;
  restAuthUrl?: string;
  restAuthnLevel?: number;
  restClockTolerance?: number;
  restConfigServer?: boolean | number;
  restExportSecretKeys?: boolean | number;
  restFindUserDBUrl?: string;
  restPasswordServer?: boolean | number;
  restPwdConfirmUrl?: string;
  restPwdModifyUrl?: string;
  restSessionServer?: boolean | number;
  restUserDBUrl?: string;
  sameSite?: string;
  samlAttributeAuthorityDescriptorAttributeServiceSOAP?: string;
  samlAuthnContextMapKerberos?: number;
  samlAuthnContextMapPassword?: number;
  samlAuthnContextMapPasswordProtectedTransport?: number;
  samlAuthnContextMapTLSClient?: number;
  samlCommonDomainCookieActivation?: boolean | number;
  samlCommonDomainCookieDomain?: string;
  samlCommonDomainCookieReader?: string;
  samlCommonDomainCookieWriter?: string;
  samlDiscoveryProtocolActivation?: boolean | number;
  samlDiscoveryProtocolIsPassive?: boolean | number;
  samlDiscoveryProtocolPolicy?: string;
  samlDiscoveryProtocolURL?: string;
  samlEntityID?: string;
  samlFederationFiles?: string;
  samlIDPMetaDataExportedAttributes?: Record<string, Record<string, string>>;
  samlIDPMetaDataNodes?: Record<string, object>;
  samlIDPMetaDataOptions?: Record<string, Record<string, string>>;
  samlIDPMetaDataOptionsAdaptSessionUtime?: boolean | number;
  samlIDPMetaDataOptionsAllowLoginFromIDP?: boolean | number;
  samlIDPMetaDataOptionsCheckAudience?: boolean | number;
  samlIDPMetaDataOptionsCheckSLOMessageSignature?: boolean | number;
  samlIDPMetaDataOptionsCheckSSOMessageSignature?: boolean | number;
  samlIDPMetaDataOptionsCheckTime?: boolean | number;
  samlIDPMetaDataOptionsComment?: string;
  samlIDPMetaDataOptionsDisplayName?: string;
  samlIDPMetaDataOptionsEncryptionMode?: Array<{ k: string; v: string }>;
  samlIDPMetaDataOptionsFederationEntityID?: string;
  samlIDPMetaDataOptionsForceAuthn?: boolean | number;
  samlIDPMetaDataOptionsForceUTF8?: boolean | number;
  samlIDPMetaDataOptionsIcon?: string;
  samlIDPMetaDataOptionsIsPassive?: boolean | number;
  samlIDPMetaDataOptionsNameIDFormat?: Array<{ k: string; v: string }>;
  samlIDPMetaDataOptionsRelayStateURL?: boolean | number;
  samlIDPMetaDataOptionsRequestedAuthnContext?: Array<{ k: string; v: string }>;
  samlIDPMetaDataOptionsResolutionRule?: string;
  samlIDPMetaDataOptionsSLOBinding?: Array<{ k: string; v: string }>;
  samlIDPMetaDataOptionsSSOBinding?: Array<{ k: string; v: string }>;
  samlIDPMetaDataOptionsSignSLOMessage?: number;
  samlIDPMetaDataOptionsSignSSOMessage?: number;
  samlIDPMetaDataOptionsSignatureMethod?: Array<{ k: string; v: string }>;
  samlIDPMetaDataOptionsSortNumber?: number | null;
  samlIDPMetaDataOptionsStoreSAMLToken?: boolean | number;
  samlIDPMetaDataOptionsTooltip?: string;
  samlIDPMetaDataOptionsUserAttribute?: string;
  samlIDPMetaDataXML?: Record<string, Record<string, string>>;
  samlIDPSSODescriptorArtifactResolutionServiceArtifact?: string;
  samlIDPSSODescriptorSingleLogoutServiceHTTPPost?: string;
  samlIDPSSODescriptorSingleLogoutServiceHTTPRedirect?: string;
  samlIDPSSODescriptorSingleLogoutServiceSOAP?: string;
  samlIDPSSODescriptorSingleSignOnServiceHTTPArtifact?: string;
  samlIDPSSODescriptorSingleSignOnServiceHTTPPost?: string;
  samlIDPSSODescriptorSingleSignOnServiceHTTPRedirect?: string;
  samlIDPSSODescriptorWantAuthnRequestsSigned?: boolean | number;
  samlMetadataForceUTF8?: boolean | number;
  samlNameIDFormatMapEmail?: string;
  samlNameIDFormatMapKerberos?: string;
  samlNameIDFormatMapWindows?: string;
  samlNameIDFormatMapX509?: string;
  samlOrganizationDisplayName?: string;
  samlOrganizationName?: string;
  samlOrganizationURL?: string;
  samlOverrideIDPEntityID?: string;
  samlRelayStateTimeout?: number;
  samlSPMetaDataExportedAttributes?: Record<string, Record<string, string>>;
  samlSPMetaDataMacros?: Record<string, Record<string, string>>;
  samlSPMetaDataNodes?: Record<string, object>;
  samlSPMetaDataOptions?: Record<
    string,
    Record<string, string | boolean | number>
  >;
  samlSPMetaDataOptionsAuthnLevel?: number | null;
  samlSPMetaDataOptionsCheckSLOMessageSignature?: boolean | number;
  samlSPMetaDataOptionsCheckSSOMessageSignature?: boolean | number;
  samlSPMetaDataOptionsComment?: string;
  samlSPMetaDataOptionsEnableIDPInitiatedURL?: boolean | number;
  samlSPMetaDataOptionsEncryptionMode?: Array<{ k: string; v: string }>;
  samlSPMetaDataOptionsFederationEntityID?: string;
  samlSPMetaDataOptionsFederationOptionalAttributes?: Array<{
    k: string;
    v: string;
  }>;
  samlSPMetaDataOptionsFederationRequiredAttributes?: Array<{
    k: string;
    v: string;
  }>;
  samlSPMetaDataOptionsForceUTF8?: boolean | number;
  samlSPMetaDataOptionsNameIDFormat?: Array<{ k: string; v: string }>;
  samlSPMetaDataOptionsNameIDSessionKey?: string;
  samlSPMetaDataOptionsNotOnOrAfterTimeout?: number;
  samlSPMetaDataOptionsOneTimeUse?: boolean | number;
  samlSPMetaDataOptionsRule?: string;
  samlSPMetaDataOptionsSessionNotOnOrAfterTimeout?: number;
  samlSPMetaDataOptionsSignSLOMessage?: number;
  samlSPMetaDataOptionsSignSSOMessage?: number;
  samlSPMetaDataOptionsSignatureMethod?: Array<{ k: string; v: string }>;
  samlSPMetaDataXML?: Record<string, Record<string, string>>;
  samlSPSSODescriptorArtifactResolutionServiceArtifact?: string;
  samlSPSSODescriptorAssertionConsumerServiceHTTPArtifact?: string;
  samlSPSSODescriptorAssertionConsumerServiceHTTPPost?: string;
  samlSPSSODescriptorAuthnRequestsSigned?: boolean | number;
  samlSPSSODescriptorSingleLogoutServiceHTTPPost?: string;
  samlSPSSODescriptorSingleLogoutServiceHTTPRedirect?: string;
  samlSPSSODescriptorSingleLogoutServiceSOAP?: string;
  samlSPSSODescriptorWantAssertionsSigned?: boolean | number;
  samlServicePrivateKeyEnc?: string;
  samlServicePrivateKeyEncPwd?: string;
  samlServicePrivateKeySig?: string;
  samlServicePrivateKeySigPwd?: string;
  samlServicePublicKeyEnc?: string;
  samlServicePublicKeySig?: string;
  samlServiceSignatureMethod?: Array<{ k: string; v: string }>;
  samlServiceUseCertificateInResponse?: boolean | number;
  samlStorage?: string;
  samlStorageOptions?: Record<string, string>;
  samlUseQueryStringSpecific?: boolean | number;
  scrollTop?: number;
  secureTokenAllowOnError?: string;
  secureTokenAttribute?: string;
  secureTokenExpiration?: string;
  secureTokenHeader?: string;
  secureTokenMemcachedServers?: string;
  secureTokenUrls?: string;
  securedCookie?: Array<{ k: string; v: string }>;
  sentryDsn?: string;
  sessionDataToRemember?: Record<string, Record<string, string>>;
  sfEngine?: string;
  sfExtra?: Record<
    string,
    {
      type?: string;
      over?: Record<string, string | number>;
      register?: number | boolean;
    }
  >;
  sfLoginTimeout?: number | null;
  sfManagerRule?: boolean | number | string;
  sfOnlyUpgrade?: boolean | number;
  sfRegisterTimeout?: number | null;
  sfRemovedMsgRule?: boolean | number | string;
  sfRemovedNotifMsg?: string;
  sfRemovedNotifRef?: string;
  sfRemovedNotifTitle?: string;
  sfRemovedUseNotif?: boolean | number;
  sfRequired?: boolean | number | string;
  sfRetries?: number | null;
  showLanguages?: boolean | number;
  singleIP?: boolean | number | string;
  singleSession?: boolean | number | string;
  singleUserByIP?: boolean | number | string;
  skipRenewConfirmation?: boolean | number;
  skipUpgradeConfirmation?: boolean | number;
  slaveAuthnLevel?: number;
  slaveDisplayLogo?: boolean | number;
  slaveExportedVars?: Record<string, Record<string, string>>;
  slaveHeaderContent?: string;
  slaveHeaderName?: string;
  slaveMasterIP?: string;
  slaveUserHeader?: string;
  soapConfigServer?: boolean | number;
  soapProxyUrn?: string;
  soapSessionServer?: boolean | number;
  sslByAjax?: boolean | number;
  sslHost?: string;
  staticPrefix?: string;
  status?: boolean | number;
  stayConnected?: boolean | number | string;
  stayConnectedBypassFG?: boolean | number;
  stayConnectedCookieName?: string;
  stayConnectedSingleSession?: boolean | number;
  stayConnectedTimeout?: number;
  storePassword?: boolean | number;
  storePasswordEncrypted?: boolean | number;
  strictTransportSecurityMax_Age?: string;
  successLoginNumber?: number;
  syslogFacility?: string;
  timeout?: number;
  timeoutActivity?: number;
  timeoutActivityInterval?: number;
  tokenUseGlobalStorage?: boolean | number;
  totp2fActivation?: boolean | number | string;
  totp2fAuthnLevel?: number | null;
  totp2fDigits?: number;
  totp2fEncryptSecret?: boolean | number;
  totp2fInterval?: number;
  totp2fIssuer?: string;
  totp2fLabel?: string;
  totp2fLogo?: string;
  totp2fRange?: number;
  totp2fSelfRegistration?: boolean | number | string;
  totp2fTTL?: number | null;
  totp2fUserCanRemoveKey?: boolean | number;
  trustedBrowserRule?: boolean | number | string;
  trustedDomains?: string;
  twitterAppName?: string;
  twitterAuthnLevel?: number;
  twitterKey?: string;
  twitterSecret?: string;
  twitterUserField?: string;
  u2fActivation?: boolean | number | string;
  u2fAuthnLevel?: number | null;
  u2fLabel?: string;
  u2fLogo?: string;
  u2fSelfRegistration?: boolean | number | string;
  u2fTTL?: number | null;
  u2fUserCanRemoveKey?: boolean | number;
  upgradeSession?: boolean | number;
  useRedirectOnError?: boolean | number;
  useRedirectOnForbidden?: boolean | number;
  useSafeJail?: boolean | number;
  userControl?: string;
  userDB?: string;
  userLogger?: string;
  userPivot?: string;
  userSyslogFacility?: string;
  utotp2fActivation?: boolean | number | string;
  utotp2fAuthnLevel?: number | null;
  utotp2fLabel?: string;
  utotp2fLogo?: string;
  vhostAccessToTrace?: string;
  vhostAliases?: string;
  vhostAuthnLevel?: number | null;
  vhostComment?: string;
  vhostDevOpsRulesUrl?: string;
  vhostHttps?: number;
  vhostMaintenance?: boolean | number;
  vhostOptions?: Record<string, Record<string, boolean | number | string>>;
  vhostPort?: number;
  vhostServiceTokenTTL?: number;
  vhostType?: Array<{ k: string; v: string }>;
  viewerAllowBrowser?: boolean | number;
  viewerAllowDiff?: boolean | number;
  viewerHiddenKeys?: string;
  virtualHosts?: Record<string, object>;
  webIDAuthnLevel?: number;
  webIDExportedVars?: Record<string, Record<string, string>>;
  webIDWhitelist?: string;
  webauthn2fActivation?: boolean | number | string;
  webauthn2fAttestation?: Array<{ k: string; v: string }>;
  webauthn2fAttestationTrust?: string;
  webauthn2fAuthnLevel?: number | null;
  webauthn2fLabel?: string;
  webauthn2fLogo?: string;
  webauthn2fSelfRegistration?: boolean | number | string;
  webauthn2fUserCanRemoveKey?: boolean | number;
  webauthn2fUserVerification?: Array<{ k: string; v: string }>;
  webauthnDisplayNameAttr?: string;
  webauthnRpName?: string;
  whatToTrace?: string;
  wsdlServer?: boolean | number;
  yubikey2fActivation?: boolean | number | string;
  yubikey2fAuthnLevel?: number | null;
  yubikey2fClientID?: string;
  yubikey2fFromSessionAttribute?: string;
  yubikey2fLabel?: string;
  yubikey2fLogo?: string;
  yubikey2fNonce?: string;
  yubikey2fPublicIDSize?: number;
  yubikey2fSecretKey?: string;
  yubikey2fSelfRegistration?: boolean | number | string;
  yubikey2fTTL?: number | null;
  yubikey2fUrl?: string;
  yubikey2fUserCanRemoveKey?: boolean | number;
  zimbraAccountKey?: string;
  zimbraBy?: string;
  zimbraPreAuthKey?: string;
  zimbraSsoUrl?: string;
  zimbraUrl?: string;
}

export interface MetaData {
  cfgAuthor: string;
  cfgAuthorIP: string;
  cfgDate: number;
  cfgLog: string;
  cfgNum: number;
  cfgVersion: string;
  prev: number;
  next?: number;
}
