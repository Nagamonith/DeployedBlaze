import "./chunk-SNAN23KQ.js";
import {
  isPlatformBrowser
} from "./chunk-6YJTNPCC.js";
import {
  Inject,
  Injectable,
  NgModule,
  PLATFORM_ID,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-54OBUEY2.js";
import "./chunk-ME2IYKBF.js";
import "./chunk-L3J3LTEH.js";
import {
  Subject
} from "./chunk-UD2DHKX2.js";
import "./chunk-AJH3MT3R.js";

// node_modules/@angular-cool/storage/fesm2020/angular-cool-storage.mjs
var CoolStorageBase = class {
  constructor(storageObject, storageObjectName) {
    if (!storageObject) {
      throw new Error(`Current browser does not support ${storageObjectName}`);
    }
    this._storageObject = storageObject;
    this._itemSetSubject = new Subject();
    this._itemRemovedSubject = new Subject();
  }
  get itemSetObservable() {
    return this._itemSetSubject.asObservable();
  }
  get itemRemovedObservable() {
    return this._itemRemovedSubject.asObservable();
  }
  getItem(key) {
    return this._storageObject.getItem(key) || null;
  }
  setItem(key, value) {
    this._itemSetSubject.next({
      key,
      value
    });
    this._setItemInStorage(key, value);
  }
  removeItem(key) {
    let currentValue = this.tryGetObject(key);
    if (!currentValue) {
      currentValue = this.getItem(key);
    }
    this._itemRemovedSubject.next({
      key,
      value: currentValue
    });
    this._storageObject.removeItem(key);
  }
  key(index) {
    return this._storageObject.key(index) || null;
  }
  clear() {
    this._storageObject.clear();
  }
  get length() {
    return this._storageObject.length;
  }
  getObject(key) {
    const jsonInStorage = this.getItem(key);
    if (jsonInStorage === null) {
      return null;
    }
    return JSON.parse(jsonInStorage);
  }
  tryGetObject(key) {
    try {
      return this.getObject(key);
    } catch (e) {
      return null;
    }
  }
  setObject(key, value) {
    this._itemSetSubject.next({
      key,
      value
    });
    this._setItemInStorage(key, JSON.stringify(value));
  }
  _setItemInStorage(key, value) {
    this._storageObject.setItem(key, value);
  }
};
var CoolServerStorage = class {
  constructor() {
    this._storageObject = {};
  }
  getItem(key) {
    return this._storageObject[key] || null;
  }
  setItem(key, value) {
    this._storageObject[key] = value;
  }
  removeItem(key) {
    this._storageObject[key] = void 0;
  }
  key(index) {
    return this._storageObject.key(index) || null;
  }
  clear() {
    this._storageObject = {};
  }
  get length() {
    return Object.keys(this._storageObject).length;
  }
};
var CoolLocalStorage = class extends CoolStorageBase {
  constructor(platformId) {
    if (isPlatformBrowser(platformId)) {
      super(window.localStorage, "LocalStorage");
    } else {
      super(new CoolServerStorage(), "LocalStorage");
    }
  }
};
CoolLocalStorage.ɵfac = function CoolLocalStorage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CoolLocalStorage)(ɵɵinject(PLATFORM_ID));
};
CoolLocalStorage.ɵprov = ɵɵdefineInjectable({
  token: CoolLocalStorage,
  factory: CoolLocalStorage.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CoolLocalStorage, [{
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }];
  }, null);
})();
var CoolSessionStorage = class extends CoolStorageBase {
  constructor(platformId) {
    if (isPlatformBrowser(platformId)) {
      super(window.sessionStorage, "SessionStorage");
    } else {
      super(new CoolServerStorage(), "SessionStorage");
    }
  }
};
CoolSessionStorage.ɵfac = function CoolSessionStorage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CoolSessionStorage)(ɵɵinject(PLATFORM_ID));
};
CoolSessionStorage.ɵprov = ɵɵdefineInjectable({
  token: CoolSessionStorage,
  factory: CoolSessionStorage.ɵfac
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CoolSessionStorage, [{
    type: Injectable
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }];
  }, null);
})();
var CoolStorageModule = class _CoolStorageModule {
  static forRoot() {
    return {
      ngModule: _CoolStorageModule,
      providers: [CoolLocalStorage, CoolSessionStorage]
    };
  }
};
CoolStorageModule.ɵfac = function CoolStorageModule_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || CoolStorageModule)();
};
CoolStorageModule.ɵmod = ɵɵdefineNgModule({
  type: CoolStorageModule
});
CoolStorageModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CoolStorageModule, [{
    type: NgModule,
    args: [{}]
  }], null, null);
})();
export {
  CoolLocalStorage,
  CoolSessionStorage,
  CoolStorageModule
};
//# sourceMappingURL=@angular-cool_storage.js.map
