import {
  Router
} from "./chunk-4AOU6FWM.js";
import {
  BrowserConfigurationAuthError,
  BrowserUtils_exports,
  EventMessageUtils,
  InteractionStatus,
  InteractionType,
  NavigationClient,
  StringUtils,
  UrlString,
  WrapperSKU
} from "./chunk-CRQU25LI.js";
import "./chunk-GXCC2SSG.js";
import "./chunk-OWEXZDVT.js";
import "./chunk-TMP7LIPF.js";
import {
  CommonModule,
  Location
} from "./chunk-SNAN23KQ.js";
import {
  DOCUMENT
} from "./chunk-6YJTNPCC.js";
import {
  Component,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  Optional,
  setClassMetadata,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵinject
} from "./chunk-54OBUEY2.js";
import "./chunk-ME2IYKBF.js";
import "./chunk-L3J3LTEH.js";
import {
  BehaviorSubject,
  EMPTY,
  ReplaySubject,
  Subject,
  catchError,
  concatMap,
  filter,
  from,
  map,
  of,
  switchMap,
  take
} from "./chunk-UD2DHKX2.js";
import {
  __async,
  __spreadProps,
  __spreadValues,
  __superGet
} from "./chunk-AJH3MT3R.js";

// node_modules/@azure/msal-angular/fesm2020/azure-msal-angular.mjs
var name = "@azure/msal-angular";
var version = "4.0.16";
var MSAL_INSTANCE = new InjectionToken("MSAL_INSTANCE");
var MSAL_GUARD_CONFIG = new InjectionToken("MSAL_GUARD_CONFIG");
var MSAL_INTERCEPTOR_CONFIG = new InjectionToken("MSAL_INTERCEPTOR_CONFIG");
var MSAL_BROADCAST_CONFIG = new InjectionToken("MSAL_BROADCAST_CONFIG");
var MsalBroadcastService = class {
  constructor(msalInstance, msalBroadcastConfig) {
    this.msalInstance = msalInstance;
    this.msalBroadcastConfig = msalBroadcastConfig;
    if (this.msalBroadcastConfig && this.msalBroadcastConfig.eventsToReplay > 0) {
      this.msalInstance.getLogger().clone(name, version).verbose(`BroadcastService - eventsToReplay set on BroadcastConfig, replaying the last ${this.msalBroadcastConfig.eventsToReplay} events`);
      this._msalSubject = new ReplaySubject(this.msalBroadcastConfig.eventsToReplay);
    } else {
      this._msalSubject = new Subject();
    }
    this.msalSubject$ = this._msalSubject.asObservable();
    this._inProgress = new BehaviorSubject(InteractionStatus.Startup);
    this.inProgress$ = this._inProgress.asObservable();
    this.msalInstance.addEventCallback((message) => {
      this._msalSubject.next(message);
      const status = EventMessageUtils.getInteractionStatusFromEvent(message, this._inProgress.value);
      if (status !== null) {
        this.msalInstance.getLogger().clone(name, version).verbose(`BroadcastService - ${message.eventType} results in setting inProgress from ${this._inProgress.value} to ${status}`);
        this._inProgress.next(status);
      }
    });
  }
  /**
   * Resets inProgress state to None
   */
  resetInProgressEvent() {
    if (this._inProgress.value === InteractionStatus.Startup) {
      this._inProgress.next(InteractionStatus.None);
    }
  }
};
MsalBroadcastService.ɵfac = function MsalBroadcastService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MsalBroadcastService)(ɵɵinject(MSAL_INSTANCE), ɵɵinject(MSAL_BROADCAST_CONFIG, 8));
};
MsalBroadcastService.ɵprov = ɵɵdefineInjectable({
  token: MsalBroadcastService,
  factory: MsalBroadcastService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MsalBroadcastService, [{
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [MSAL_INSTANCE]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [MSAL_BROADCAST_CONFIG]
      }]
    }];
  }, null);
})();
var MsalService = class {
  constructor(instance, location, injector) {
    this.instance = instance;
    this.location = location;
    this.injector = injector;
    const hash = this.location.path(true).split("#").pop();
    if (hash) {
      this.redirectHash = `#${hash}`;
    }
    this.instance.initializeWrapperLibrary(WrapperSKU.Angular, version);
  }
  initialize() {
    return from(this.instance.initialize());
  }
  acquireTokenPopup(request) {
    return from(this.instance.acquireTokenPopup(request));
  }
  acquireTokenRedirect(request) {
    return from(this.instance.acquireTokenRedirect(request));
  }
  acquireTokenSilent(silentRequest) {
    return from(this.instance.acquireTokenSilent(silentRequest));
  }
  handleRedirectObservable(hash) {
    return from(this.instance.initialize().then(() => this.instance.handleRedirectPromise(hash || this.redirectHash)).finally(() => {
      this.injector.get(MsalBroadcastService).resetInProgressEvent();
    }));
  }
  loginPopup(request) {
    return from(this.instance.loginPopup(request));
  }
  loginRedirect(request) {
    return from(this.instance.loginRedirect(request));
  }
  // @deprecated: Use logoutRedirect or logoutPopup
  logout(logoutRequest) {
    return from(this.instance.logout(logoutRequest));
  }
  logoutRedirect(logoutRequest) {
    return from(this.instance.logoutRedirect(logoutRequest));
  }
  logoutPopup(logoutRequest) {
    return from(this.instance.logoutPopup(logoutRequest));
  }
  ssoSilent(request) {
    return from(this.instance.ssoSilent(request));
  }
  /**
   * Gets logger for msal-angular.
   * If no logger set, returns logger instance created with same options as msal-browser
   */
  getLogger() {
    if (!this.logger) {
      this.logger = this.instance.getLogger().clone(name, version);
    }
    return this.logger;
  }
  // Create a logger instance for msal-angular with the same options as msal-browser
  setLogger(logger) {
    this.logger = logger.clone(name, version);
    this.instance.setLogger(logger);
  }
};
MsalService.ɵfac = function MsalService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MsalService)(ɵɵinject(MSAL_INSTANCE), ɵɵinject(Location), ɵɵinject(Injector));
};
MsalService.ɵprov = ɵɵdefineInjectable({
  token: MsalService,
  factory: MsalService.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MsalService, [{
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [MSAL_INSTANCE]
      }]
    }, {
      type: Location
    }, {
      type: Injector
    }];
  }, null);
})();
var MsalGuard = class {
  constructor(msalGuardConfig, msalBroadcastService, authService, location, router) {
    this.msalGuardConfig = msalGuardConfig;
    this.msalBroadcastService = msalBroadcastService;
    this.authService = authService;
    this.location = location;
    this.router = router;
    this.msalBroadcastService.inProgress$.subscribe();
  }
  /**
   * Parses url string to UrlTree
   * @param url
   */
  parseUrl(url) {
    return this.router.parseUrl(url);
  }
  /**
   * Builds the absolute url for the destination page
   * @param path Relative path of requested page
   * @returns Full destination url
   */
  getDestinationUrl(path) {
    this.authService.getLogger().verbose("Guard - getting destination url");
    const baseElements = document.getElementsByTagName("base");
    const baseUrl = this.location.normalize(baseElements.length ? baseElements[0].href : window.location.origin);
    const pathUrl = this.location.prepareExternalUrl(path);
    if (pathUrl.startsWith("#")) {
      this.authService.getLogger().verbose("Guard - destination by hash routing");
      return `${baseUrl}/${pathUrl}`;
    }
    return `${baseUrl}${path}`;
  }
  /**
   * Interactively prompt the user to login
   * @param url Path of the requested page
   */
  loginInteractively(state) {
    const authRequest = typeof this.msalGuardConfig.authRequest === "function" ? this.msalGuardConfig.authRequest(this.authService, state) : __spreadValues({}, this.msalGuardConfig.authRequest);
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.getLogger().verbose("Guard - logging in by popup");
      return this.authService.loginPopup(authRequest).pipe(map((response) => {
        this.authService.getLogger().verbose("Guard - login by popup successful, can activate, setting active account");
        this.authService.instance.setActiveAccount(response.account);
        return true;
      }));
    }
    this.authService.getLogger().verbose("Guard - logging in by redirect");
    const redirectStartPage = this.getDestinationUrl(state.url);
    return this.authService.loginRedirect(__spreadValues({
      redirectStartPage
    }, authRequest)).pipe(map(() => false));
  }
  /**
   * Helper which checks for the correct interaction type, prevents page with Guard to be set as redirect, and calls handleRedirectObservable
   * @param state
   */
  activateHelper(state) {
    if (this.msalGuardConfig.interactionType !== InteractionType.Popup && this.msalGuardConfig.interactionType !== InteractionType.Redirect) {
      throw new BrowserConfigurationAuthError("invalid_interaction_type", "Invalid interaction type provided to MSAL Guard. InteractionType.Popup or InteractionType.Redirect must be provided in the MsalGuardConfiguration");
    }
    this.authService.getLogger().verbose("MSAL Guard activated");
    if (typeof window !== "undefined") {
      if (UrlString.hashContainsKnownProperties(window.location.hash) && BrowserUtils_exports.isInIframe() && !this.authService.instance.getConfiguration().system.allowRedirectInIframe) {
        this.authService.getLogger().warning("Guard - redirectUri set to page with MSAL Guard. It is recommended to not set redirectUri to a page that requires authentication.");
        return of(false);
      }
    } else {
      this.authService.getLogger().info("Guard - window is undefined, MSAL does not support server-side token acquisition");
      return of(true);
    }
    if (this.msalGuardConfig.loginFailedRoute) {
      this.loginFailedRoute = this.parseUrl(this.msalGuardConfig.loginFailedRoute);
    }
    const currentPath = this.location.path(true);
    return this.authService.initialize().pipe(concatMap(() => {
      return this.authService.handleRedirectObservable();
    }), concatMap(() => {
      if (!this.authService.instance.getAllAccounts().length) {
        if (state) {
          this.authService.getLogger().verbose("Guard - no accounts retrieved, log in required to activate");
          return this.loginInteractively(state);
        }
        this.authService.getLogger().verbose("Guard - no accounts retrieved, no state, cannot load");
        return of(false);
      }
      this.authService.getLogger().verbose("Guard - at least 1 account exists, can activate or load");
      if (state) {
        const urlContainsCode = this.includesCode(state.url);
        const fragmentContainsCode = !!state.root && !!state.root.fragment && this.includesCode(`#${state.root.fragment}`);
        const hashRouting = this.location.prepareExternalUrl(state.url).indexOf("#") === 0;
        if (urlContainsCode && (fragmentContainsCode || hashRouting)) {
          this.authService.getLogger().info("Guard - Hash contains known code response, stopping navigation.");
          if (currentPath.indexOf("#") > -1) {
            return of(this.parseUrl(this.location.path()));
          }
          return of(this.parseUrl(""));
        }
      }
      return of(true);
    }), catchError((error) => {
      this.authService.getLogger().error("Guard - error while logging in, unable to activate");
      this.authService.getLogger().errorPii(`Guard - error: ${error.message}`);
      if (this.loginFailedRoute && state) {
        this.authService.getLogger().verbose("Guard - loginFailedRoute set, redirecting");
        return of(this.loginFailedRoute);
      }
      return of(false);
    }));
  }
  includesCode(path) {
    return path.lastIndexOf("/code") > -1 && path.lastIndexOf("/code") === path.length - "/code".length || // path.endsWith("/code")
    path.indexOf("#code=") > -1 || path.indexOf("&code=") > -1;
  }
  canActivate(route, state) {
    this.authService.getLogger().verbose("Guard - canActivate");
    return this.activateHelper(state);
  }
  canActivateChild(route, state) {
    this.authService.getLogger().verbose("Guard - canActivateChild");
    return this.activateHelper(state);
  }
  canMatch() {
    this.authService.getLogger().verbose("Guard - canLoad");
    return this.activateHelper();
  }
};
MsalGuard.ɵfac = function MsalGuard_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MsalGuard)(ɵɵinject(MSAL_GUARD_CONFIG), ɵɵinject(MsalBroadcastService), ɵɵinject(MsalService), ɵɵinject(Location), ɵɵinject(Router));
};
MsalGuard.ɵprov = ɵɵdefineInjectable({
  token: MsalGuard,
  factory: MsalGuard.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MsalGuard, [{
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [MSAL_GUARD_CONFIG]
      }]
    }, {
      type: MsalBroadcastService
    }, {
      type: MsalService
    }, {
      type: Location
    }, {
      type: Router
    }];
  }, null);
})();
var MsalInterceptor = class {
  constructor(msalInterceptorConfig, authService, location, msalBroadcastService, document2) {
    this.msalInterceptorConfig = msalInterceptorConfig;
    this.authService = authService;
    this.location = location;
    this.msalBroadcastService = msalBroadcastService;
    this._document = document2;
  }
  intercept(req, next) {
    if (this.msalInterceptorConfig.interactionType !== InteractionType.Popup && this.msalInterceptorConfig.interactionType !== InteractionType.Redirect) {
      throw new BrowserConfigurationAuthError("invalid_interaction_type", "Invalid interaction type provided to MSAL Interceptor. InteractionType.Popup, InteractionType.Redirect must be provided in the msalInterceptorConfiguration");
    }
    this.authService.getLogger().verbose("MSAL Interceptor activated");
    const scopes = this.getScopesForEndpoint(req.url, req.method);
    if (!scopes || scopes.length === 0) {
      this.authService.getLogger().verbose("Interceptor - no scopes for endpoint");
      return next.handle(req);
    }
    let account;
    if (!!this.authService.instance.getActiveAccount()) {
      this.authService.getLogger().verbose("Interceptor - active account selected");
      account = this.authService.instance.getActiveAccount();
    } else {
      this.authService.getLogger().verbose("Interceptor - no active account, fallback to first account");
      account = this.authService.instance.getAllAccounts()[0];
    }
    const authRequest = typeof this.msalInterceptorConfig.authRequest === "function" ? this.msalInterceptorConfig.authRequest(this.authService, req, {
      account
    }) : __spreadProps(__spreadValues({}, this.msalInterceptorConfig.authRequest), {
      account
    });
    this.authService.getLogger().info(`Interceptor - ${scopes.length} scopes found for endpoint`);
    this.authService.getLogger().infoPii(`Interceptor - [${scopes}] scopes found for ${req.url}`);
    return this.acquireToken(authRequest, scopes, account).pipe(switchMap((result) => {
      this.authService.getLogger().verbose("Interceptor - setting authorization headers");
      const headers = req.headers.set("Authorization", `Bearer ${result.accessToken}`);
      const requestClone = req.clone({
        headers
      });
      return next.handle(requestClone);
    }));
  }
  /**
   * Try to acquire token silently. Invoke interaction if acquireTokenSilent rejected with error or resolved with null access token
   * @param authRequest Request
   * @param scopes Array of scopes for the request
   * @param account Account
   * @returns Authentication result
   */
  acquireToken(authRequest, scopes, account) {
    return this.authService.acquireTokenSilent(__spreadProps(__spreadValues({}, authRequest), {
      scopes,
      account
    })).pipe(catchError(() => {
      this.authService.getLogger().error("Interceptor - acquireTokenSilent rejected with error. Invoking interaction to resolve.");
      return this.msalBroadcastService.inProgress$.pipe(take(1), switchMap((status) => {
        if (status === InteractionStatus.None) {
          return this.acquireTokenInteractively(authRequest, scopes);
        }
        return this.msalBroadcastService.inProgress$.pipe(filter((status2) => status2 === InteractionStatus.None), take(1), switchMap(() => this.acquireToken(authRequest, scopes, account)));
      }));
    }), switchMap((result) => {
      if (!result.accessToken) {
        this.authService.getLogger().error("Interceptor - acquireTokenSilent resolved with null access token. Known issue with B2C tenants, invoking interaction to resolve.");
        return this.msalBroadcastService.inProgress$.pipe(filter((status) => status === InteractionStatus.None), take(1), switchMap(() => this.acquireTokenInteractively(authRequest, scopes)));
      }
      return of(result);
    }));
  }
  /**
   * Invoke interaction for the given set of scopes
   * @param authRequest Request
   * @param scopes Array of scopes for the request
   * @returns Result from the interactive request
   */
  acquireTokenInteractively(authRequest, scopes) {
    if (this.msalInterceptorConfig.interactionType === InteractionType.Popup) {
      this.authService.getLogger().verbose("Interceptor - error acquiring token silently, acquiring by popup");
      return this.authService.acquireTokenPopup(__spreadProps(__spreadValues({}, authRequest), {
        scopes
      }));
    }
    this.authService.getLogger().verbose("Interceptor - error acquiring token silently, acquiring by redirect");
    const redirectStartPage = window.location.href;
    this.authService.acquireTokenRedirect(__spreadProps(__spreadValues({}, authRequest), {
      scopes,
      redirectStartPage
    }));
    return EMPTY;
  }
  /**
   * Looks up the scopes for the given endpoint from the protectedResourceMap
   * @param endpoint Url of the request
   * @param httpMethod Http method of the request
   * @returns Array of scopes, or null if not found
   *
   */
  getScopesForEndpoint(endpoint, httpMethod) {
    this.authService.getLogger().verbose("Interceptor - getting scopes for endpoint");
    const normalizedEndpoint = this.location.normalize(endpoint);
    const protectedResourcesArray = Array.from(this.msalInterceptorConfig.protectedResourceMap.keys());
    const matchingProtectedResources = this.matchResourcesToEndpoint(protectedResourcesArray, normalizedEndpoint);
    if (matchingProtectedResources.length > 0) {
      return this.matchScopesToEndpoint(this.msalInterceptorConfig.protectedResourceMap, matchingProtectedResources, httpMethod);
    }
    return null;
  }
  /**
   * Finds resource endpoints that match request endpoint
   * @param protectedResourcesEndpoints
   * @param endpoint
   * @returns
   */
  matchResourcesToEndpoint(protectedResourcesEndpoints, endpoint) {
    const matchingResources = [];
    protectedResourcesEndpoints.forEach((key) => {
      const normalizedKey = this.location.normalize(key);
      const absoluteKey = this.getAbsoluteUrl(normalizedKey);
      const keyComponents = new URL(absoluteKey);
      const absoluteEndpoint = this.getAbsoluteUrl(endpoint);
      const endpointComponents = new URL(absoluteEndpoint);
      if (this.checkUrlComponents(keyComponents, endpointComponents)) {
        matchingResources.push(key);
      }
    });
    return matchingResources;
  }
  /**
   * Compares URL segments between key and endpoint
   * @param key
   * @param endpoint
   * @returns
   */
  checkUrlComponents(keyComponents, endpointComponents) {
    const urlProperties = ["protocol", "host", "pathname", "search", "hash"];
    for (const property of urlProperties) {
      if (keyComponents[property]) {
        const decodedInput = decodeURIComponent(keyComponents[property]);
        if (!StringUtils.matchPattern(decodedInput, endpointComponents[property])) {
          return false;
        }
      }
    }
    return true;
  }
  /**
   * Transforms relative urls to absolute urls
   * @param url
   * @returns
   */
  getAbsoluteUrl(url) {
    const link = this._document.createElement("a");
    link.href = url;
    return link.href;
  }
  /**
   * Finds scopes from first matching endpoint with HTTP method that matches request
   * @param protectedResourceMap Protected resource map
   * @param endpointArray Array of resources that match request endpoint
   * @param httpMethod Http method of the request
   * @returns
   */
  matchScopesToEndpoint(protectedResourceMap, endpointArray, httpMethod) {
    const allMatchedScopes = [];
    endpointArray.forEach((matchedEndpoint) => {
      const scopesForEndpoint = [];
      const methodAndScopesArray = protectedResourceMap.get(matchedEndpoint);
      if (methodAndScopesArray === null) {
        allMatchedScopes.push(null);
        return;
      }
      methodAndScopesArray.forEach((entry) => {
        if (typeof entry === "string") {
          scopesForEndpoint.push(entry);
        } else {
          const normalizedRequestMethod = httpMethod.toLowerCase();
          const normalizedResourceMethod = entry.httpMethod.toLowerCase();
          if (normalizedResourceMethod === normalizedRequestMethod) {
            if (entry.scopes === null) {
              allMatchedScopes.push(null);
            } else {
              entry.scopes.forEach((scope) => {
                scopesForEndpoint.push(scope);
              });
            }
          }
        }
      });
      if (scopesForEndpoint.length > 0) {
        allMatchedScopes.push(scopesForEndpoint);
      }
    });
    if (allMatchedScopes.length > 0) {
      if (allMatchedScopes.length > 1) {
        this.authService.getLogger().warning("Interceptor - More than 1 matching scopes for endpoint found.");
      }
      return allMatchedScopes[0];
    }
    return null;
  }
};
MsalInterceptor.ɵfac = function MsalInterceptor_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MsalInterceptor)(ɵɵinject(MSAL_INTERCEPTOR_CONFIG), ɵɵinject(MsalService), ɵɵinject(Location), ɵɵinject(MsalBroadcastService), ɵɵinject(DOCUMENT));
};
MsalInterceptor.ɵprov = ɵɵdefineInjectable({
  token: MsalInterceptor,
  factory: MsalInterceptor.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MsalInterceptor, [{
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [MSAL_INTERCEPTOR_CONFIG]
      }]
    }, {
      type: MsalService
    }, {
      type: Location
    }, {
      type: MsalBroadcastService
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var MsalRedirectComponent = class {
  constructor(authService) {
    this.authService = authService;
  }
  ngOnInit() {
    this.authService.getLogger().verbose("MsalRedirectComponent activated");
    this.authService.handleRedirectObservable().subscribe();
  }
};
MsalRedirectComponent.ɵfac = function MsalRedirectComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MsalRedirectComponent)(ɵɵdirectiveInject(MsalService));
};
MsalRedirectComponent.ɵcmp = ɵɵdefineComponent({
  type: MsalRedirectComponent,
  selectors: [["app-redirect"]],
  standalone: false,
  decls: 0,
  vars: 0,
  template: function MsalRedirectComponent_Template(rf, ctx) {
  },
  encapsulation: 2
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MsalRedirectComponent, [{
    type: Component,
    args: [{
      selector: "app-redirect",
      template: ""
    }]
  }], function() {
    return [{
      type: MsalService
    }];
  }, null);
})();
var MsalModule = class _MsalModule {
  static forRoot(msalInstance, guardConfig, interceptorConfig) {
    return {
      ngModule: _MsalModule,
      providers: [{
        provide: MSAL_INSTANCE,
        useValue: msalInstance
      }, {
        provide: MSAL_GUARD_CONFIG,
        useValue: guardConfig
      }, {
        provide: MSAL_INTERCEPTOR_CONFIG,
        useValue: interceptorConfig
      }, MsalService]
    };
  }
};
MsalModule.ɵfac = function MsalModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MsalModule)();
};
MsalModule.ɵmod = ɵɵdefineNgModule({
  type: MsalModule,
  declarations: [MsalRedirectComponent],
  imports: [CommonModule]
});
MsalModule.ɵinj = ɵɵdefineInjector({
  providers: [MsalGuard, MsalBroadcastService],
  imports: [CommonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MsalModule, [{
    type: NgModule,
    args: [{
      declarations: [MsalRedirectComponent],
      imports: [CommonModule],
      providers: [MsalGuard, MsalBroadcastService]
    }]
  }], null, null);
})();
var MsalCustomNavigationClient = class _MsalCustomNavigationClient extends NavigationClient {
  constructor(authService, router, location) {
    super();
    this.authService = authService;
    this.router = router;
    this.location = location;
  }
  navigateInternal(url, options) {
    return __async(this, null, function* () {
      this.authService.getLogger().trace("MsalCustomNavigationClient called");
      this.authService.getLogger().verbose("MsalCustomNavigationClient - navigating");
      this.authService.getLogger().verbosePii(`MsalCustomNavigationClient - navigating to url: ${url}`);
      if (options.noHistory) {
        return __superGet(_MsalCustomNavigationClient.prototype, this, "navigateInternal").call(this, url, options);
      } else {
        const urlComponents = new UrlString(url).getUrlComponents();
        const newUrl = urlComponents.QueryString ? `${urlComponents.AbsolutePath}?${urlComponents.QueryString}` : this.location.normalize(urlComponents.AbsolutePath);
        yield this.router.navigateByUrl(newUrl, {
          replaceUrl: options.noHistory
        });
      }
      return Promise.resolve(options.noHistory);
    });
  }
};
MsalCustomNavigationClient.ɵfac = function MsalCustomNavigationClient_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || MsalCustomNavigationClient)(ɵɵinject(MsalService), ɵɵinject(Router), ɵɵinject(Location));
};
MsalCustomNavigationClient.ɵprov = ɵɵdefineInjectable({
  token: MsalCustomNavigationClient,
  factory: MsalCustomNavigationClient.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MsalCustomNavigationClient, [{
    type: Injectable
  }], function() {
    return [{
      type: MsalService
    }, {
      type: Router
    }, {
      type: Location
    }];
  }, null);
})();
export {
  MSAL_BROADCAST_CONFIG,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalCustomNavigationClient,
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalRedirectComponent,
  MsalService,
  version
};
//# sourceMappingURL=@azure_msal-angular.js.map
