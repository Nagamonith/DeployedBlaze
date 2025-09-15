import {
  CollectionNestedOption,
  DxTemplateHost,
  NestedOption,
  NestedOptionHost,
  extractTemplate
} from "./chunk-EZILT2CL.js";
import {
  DOCUMENT
} from "./chunk-6YJTNPCC.js";
import {
  Component,
  ContentChildren,
  ElementRef,
  Host,
  Inject,
  Input,
  NgModule,
  Output,
  Renderer2,
  SkipSelf,
  forwardRef,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵloadQuery,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh
} from "./chunk-54OBUEY2.js";

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-data-grid-nested.mjs
var _c0 = ["*"];
var DxoDataGridAnimationComponent = class _DxoDataGridAnimationComponent extends NestedOption {
  get hide() {
    return this._getOption("hide");
  }
  set hide(value) {
    this._setOption("hide", value);
  }
  get show() {
    return this._getOption("show");
  }
  set show(value) {
    this._setOption("show", value);
  }
  get _optionPath() {
    return "animation";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridAnimationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridAnimationComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridAnimationComponent,
    selectors: [["dxo-data-grid-animation"]],
    inputs: {
      hide: "hide",
      show: "show"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridAnimationComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridAnimationComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-animation",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    hide: [{
      type: Input
    }],
    show: [{
      type: Input
    }]
  });
})();
var DxoDataGridAnimationModule = class _DxoDataGridAnimationModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridAnimationModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridAnimationModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridAnimationModule,
    declarations: [DxoDataGridAnimationComponent],
    exports: [DxoDataGridAnimationComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridAnimationModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridAnimationComponent],
      exports: [DxoDataGridAnimationComponent]
    }]
  }], null, null);
})();
var DxiDataGridAsyncRuleComponent = class _DxiDataGridAsyncRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get reevaluate() {
    return this._getOption("reevaluate");
  }
  set reevaluate(value) {
    this._setOption("reevaluate", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get validationCallback() {
    return this._getOption("validationCallback");
  }
  set validationCallback(value) {
    this._setOption("validationCallback", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridAsyncRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridAsyncRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridAsyncRuleComponent,
    selectors: [["dxi-data-grid-async-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      message: "message",
      reevaluate: "reevaluate",
      type: "type",
      validationCallback: "validationCallback"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridAsyncRuleComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridAsyncRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-async-rule",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    ignoreEmptyValue: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    reevaluate: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    validationCallback: [{
      type: Input
    }]
  });
})();
var DxiDataGridAsyncRuleModule = class _DxiDataGridAsyncRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridAsyncRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridAsyncRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridAsyncRuleModule,
    declarations: [DxiDataGridAsyncRuleComponent],
    exports: [DxiDataGridAsyncRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridAsyncRuleModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridAsyncRuleComponent],
      exports: [DxiDataGridAsyncRuleComponent]
    }]
  }], null, null);
})();
var DxoDataGridAtComponent = class _DxoDataGridAtComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "at";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridAtComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridAtComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridAtComponent,
    selectors: [["dxo-data-grid-at"]],
    inputs: {
      x: "x",
      y: "y"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridAtComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridAtComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-at",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoDataGridAtModule = class _DxoDataGridAtModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridAtModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridAtModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridAtModule,
    declarations: [DxoDataGridAtComponent],
    exports: [DxoDataGridAtComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridAtModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridAtComponent],
      exports: [DxoDataGridAtComponent]
    }]
  }], null, null);
})();
var DxoDataGridBoundaryOffsetComponent = class _DxoDataGridBoundaryOffsetComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "boundaryOffset";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridBoundaryOffsetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridBoundaryOffsetComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridBoundaryOffsetComponent,
    selectors: [["dxo-data-grid-boundary-offset"]],
    inputs: {
      x: "x",
      y: "y"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridBoundaryOffsetComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridBoundaryOffsetComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-boundary-offset",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoDataGridBoundaryOffsetModule = class _DxoDataGridBoundaryOffsetModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridBoundaryOffsetModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridBoundaryOffsetModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridBoundaryOffsetModule,
    declarations: [DxoDataGridBoundaryOffsetComponent],
    exports: [DxoDataGridBoundaryOffsetComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridBoundaryOffsetModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridBoundaryOffsetComponent],
      exports: [DxoDataGridBoundaryOffsetComponent]
    }]
  }], null, null);
})();
var DxiDataGridButtonComponent = class _DxiDataGridButtonComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get hint() {
    return this._getOption("hint");
  }
  set hint(value) {
    this._setOption("hint", value);
  }
  get icon() {
    return this._getOption("icon");
  }
  set icon(value) {
    this._setOption("icon", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get onClick() {
    return this._getOption("onClick");
  }
  set onClick(value) {
    this._setOption("onClick", value);
  }
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get _optionPath() {
    return "buttons";
  }
  constructor(parentOptionHost, optionHost, renderer, document, templateHost, element) {
    super();
    this.renderer = renderer;
    this.document = document;
    this.element = element;
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    templateHost.setHost(this);
  }
  setTemplate(template) {
    this.template = template;
  }
  ngAfterViewInit() {
    extractTemplate(this, this.element, this.renderer, this.document);
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridButtonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridButtonComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridButtonComponent,
    selectors: [["dxi-data-grid-button"]],
    inputs: {
      cssClass: "cssClass",
      disabled: "disabled",
      hint: "hint",
      icon: "icon",
      name: "name",
      onClick: "onClick",
      template: "template",
      text: "text",
      visible: "visible"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiDataGridButtonComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridButtonComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-button",
      template: "<ng-content></ng-content>",
      providers: [NestedOptionHost, DxTemplateHost],
      styles: [":host{display:block}\n"]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: Renderer2
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: DxTemplateHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: ElementRef
  }], {
    cssClass: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    hint: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    onClick: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    visible: [{
      type: Input
    }]
  });
})();
var DxiDataGridButtonModule = class _DxiDataGridButtonModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridButtonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridButtonModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridButtonModule,
    declarations: [DxiDataGridButtonComponent],
    exports: [DxiDataGridButtonComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridButtonModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridButtonComponent],
      exports: [DxiDataGridButtonComponent]
    }]
  }], null, null);
})();
var DxiDataGridChangeComponent = class _DxiDataGridChangeComponent extends CollectionNestedOption {
  get data() {
    return this._getOption("data");
  }
  set data(value) {
    this._setOption("data", value);
  }
  get insertAfterKey() {
    return this._getOption("insertAfterKey");
  }
  set insertAfterKey(value) {
    this._setOption("insertAfterKey", value);
  }
  get insertBeforeKey() {
    return this._getOption("insertBeforeKey");
  }
  set insertBeforeKey(value) {
    this._setOption("insertBeforeKey", value);
  }
  get key() {
    return this._getOption("key");
  }
  set key(value) {
    this._setOption("key", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "changes";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridChangeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridChangeComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridChangeComponent,
    selectors: [["dxi-data-grid-change"]],
    inputs: {
      data: "data",
      insertAfterKey: "insertAfterKey",
      insertBeforeKey: "insertBeforeKey",
      key: "key",
      type: "type"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridChangeComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridChangeComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-change",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    data: [{
      type: Input
    }],
    insertAfterKey: [{
      type: Input
    }],
    insertBeforeKey: [{
      type: Input
    }],
    key: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiDataGridChangeModule = class _DxiDataGridChangeModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridChangeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridChangeModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridChangeModule,
    declarations: [DxiDataGridChangeComponent],
    exports: [DxiDataGridChangeComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridChangeModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridChangeComponent],
      exports: [DxiDataGridChangeComponent]
    }]
  }], null, null);
})();
var DxoDataGridColCountByScreenComponent = class _DxoDataGridColCountByScreenComponent extends NestedOption {
  get lg() {
    return this._getOption("lg");
  }
  set lg(value) {
    this._setOption("lg", value);
  }
  get md() {
    return this._getOption("md");
  }
  set md(value) {
    this._setOption("md", value);
  }
  get sm() {
    return this._getOption("sm");
  }
  set sm(value) {
    this._setOption("sm", value);
  }
  get xs() {
    return this._getOption("xs");
  }
  set xs(value) {
    this._setOption("xs", value);
  }
  get _optionPath() {
    return "colCountByScreen";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridColCountByScreenComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColCountByScreenComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridColCountByScreenComponent,
    selectors: [["dxo-data-grid-col-count-by-screen"]],
    inputs: {
      lg: "lg",
      md: "md",
      sm: "sm",
      xs: "xs"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridColCountByScreenComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColCountByScreenComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-col-count-by-screen",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    lg: [{
      type: Input
    }],
    md: [{
      type: Input
    }],
    sm: [{
      type: Input
    }],
    xs: [{
      type: Input
    }]
  });
})();
var DxoDataGridColCountByScreenModule = class _DxoDataGridColCountByScreenModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridColCountByScreenModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColCountByScreenModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridColCountByScreenModule,
    declarations: [DxoDataGridColCountByScreenComponent],
    exports: [DxoDataGridColCountByScreenComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColCountByScreenModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridColCountByScreenComponent],
      exports: [DxoDataGridColCountByScreenComponent]
    }]
  }], null, null);
})();
var DxoDataGridCollisionComponent = class _DxoDataGridCollisionComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "collision";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridCollisionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridCollisionComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridCollisionComponent,
    selectors: [["dxo-data-grid-collision"]],
    inputs: {
      x: "x",
      y: "y"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridCollisionComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridCollisionComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-collision",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoDataGridCollisionModule = class _DxoDataGridCollisionModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridCollisionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridCollisionModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridCollisionModule,
    declarations: [DxoDataGridCollisionComponent],
    exports: [DxoDataGridCollisionComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridCollisionModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridCollisionComponent],
      exports: [DxoDataGridCollisionComponent]
    }]
  }], null, null);
})();
var DxoDataGridColumnChooserSearchComponent = class _DxoDataGridColumnChooserSearchComponent extends NestedOption {
  get editorOptions() {
    return this._getOption("editorOptions");
  }
  set editorOptions(value) {
    this._setOption("editorOptions", value);
  }
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get timeout() {
    return this._getOption("timeout");
  }
  set timeout(value) {
    this._setOption("timeout", value);
  }
  get _optionPath() {
    return "search";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnChooserSearchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnChooserSearchComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridColumnChooserSearchComponent,
    selectors: [["dxo-data-grid-column-chooser-search"]],
    inputs: {
      editorOptions: "editorOptions",
      enabled: "enabled",
      timeout: "timeout"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridColumnChooserSearchComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnChooserSearchComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-column-chooser-search",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    editorOptions: [{
      type: Input
    }],
    enabled: [{
      type: Input
    }],
    timeout: [{
      type: Input
    }]
  });
})();
var DxoDataGridColumnChooserSearchModule = class _DxoDataGridColumnChooserSearchModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnChooserSearchModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnChooserSearchModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridColumnChooserSearchModule,
    declarations: [DxoDataGridColumnChooserSearchComponent],
    exports: [DxoDataGridColumnChooserSearchComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnChooserSearchModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridColumnChooserSearchComponent],
      exports: [DxoDataGridColumnChooserSearchComponent]
    }]
  }], null, null);
})();
var DxoDataGridColumnChooserSelectionComponent = class _DxoDataGridColumnChooserSelectionComponent extends NestedOption {
  get allowSelectAll() {
    return this._getOption("allowSelectAll");
  }
  set allowSelectAll(value) {
    this._setOption("allowSelectAll", value);
  }
  get recursive() {
    return this._getOption("recursive");
  }
  set recursive(value) {
    this._setOption("recursive", value);
  }
  get selectByClick() {
    return this._getOption("selectByClick");
  }
  set selectByClick(value) {
    this._setOption("selectByClick", value);
  }
  get _optionPath() {
    return "selection";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnChooserSelectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnChooserSelectionComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridColumnChooserSelectionComponent,
    selectors: [["dxo-data-grid-column-chooser-selection"]],
    inputs: {
      allowSelectAll: "allowSelectAll",
      recursive: "recursive",
      selectByClick: "selectByClick"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridColumnChooserSelectionComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnChooserSelectionComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-column-chooser-selection",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowSelectAll: [{
      type: Input
    }],
    recursive: [{
      type: Input
    }],
    selectByClick: [{
      type: Input
    }]
  });
})();
var DxoDataGridColumnChooserSelectionModule = class _DxoDataGridColumnChooserSelectionModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnChooserSelectionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnChooserSelectionModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridColumnChooserSelectionModule,
    declarations: [DxoDataGridColumnChooserSelectionComponent],
    exports: [DxoDataGridColumnChooserSelectionComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnChooserSelectionModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridColumnChooserSelectionComponent],
      exports: [DxoDataGridColumnChooserSelectionComponent]
    }]
  }], null, null);
})();
var DxoDataGridColumnChooserComponent = class _DxoDataGridColumnChooserComponent extends NestedOption {
  get allowSearch() {
    return this._getOption("allowSearch");
  }
  set allowSearch(value) {
    this._setOption("allowSearch", value);
  }
  get container() {
    return this._getOption("container");
  }
  set container(value) {
    this._setOption("container", value);
  }
  get emptyPanelText() {
    return this._getOption("emptyPanelText");
  }
  set emptyPanelText(value) {
    this._setOption("emptyPanelText", value);
  }
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  get mode() {
    return this._getOption("mode");
  }
  set mode(value) {
    this._setOption("mode", value);
  }
  get position() {
    return this._getOption("position");
  }
  set position(value) {
    this._setOption("position", value);
  }
  get search() {
    return this._getOption("search");
  }
  set search(value) {
    this._setOption("search", value);
  }
  get searchTimeout() {
    return this._getOption("searchTimeout");
  }
  set searchTimeout(value) {
    this._setOption("searchTimeout", value);
  }
  get selection() {
    return this._getOption("selection");
  }
  set selection(value) {
    this._setOption("selection", value);
  }
  get sortOrder() {
    return this._getOption("sortOrder");
  }
  set sortOrder(value) {
    this._setOption("sortOrder", value);
  }
  get title() {
    return this._getOption("title");
  }
  set title(value) {
    this._setOption("title", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  get _optionPath() {
    return "columnChooser";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnChooserComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnChooserComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridColumnChooserComponent,
    selectors: [["dxo-data-grid-column-chooser"]],
    inputs: {
      allowSearch: "allowSearch",
      container: "container",
      emptyPanelText: "emptyPanelText",
      enabled: "enabled",
      height: "height",
      mode: "mode",
      position: "position",
      search: "search",
      searchTimeout: "searchTimeout",
      selection: "selection",
      sortOrder: "sortOrder",
      title: "title",
      width: "width"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridColumnChooserComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnChooserComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-column-chooser",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowSearch: [{
      type: Input
    }],
    container: [{
      type: Input
    }],
    emptyPanelText: [{
      type: Input
    }],
    enabled: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    search: [{
      type: Input
    }],
    searchTimeout: [{
      type: Input
    }],
    selection: [{
      type: Input
    }],
    sortOrder: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    width: [{
      type: Input
    }]
  });
})();
var DxoDataGridColumnChooserModule = class _DxoDataGridColumnChooserModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnChooserModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnChooserModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridColumnChooserModule,
    declarations: [DxoDataGridColumnChooserComponent],
    exports: [DxoDataGridColumnChooserComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnChooserModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridColumnChooserComponent],
      exports: [DxoDataGridColumnChooserComponent]
    }]
  }], null, null);
})();
var DxiDataGridCompareRuleComponent = class _DxiDataGridCompareRuleComponent extends CollectionNestedOption {
  get comparisonTarget() {
    return this._getOption("comparisonTarget");
  }
  set comparisonTarget(value) {
    this._setOption("comparisonTarget", value);
  }
  get comparisonType() {
    return this._getOption("comparisonType");
  }
  set comparisonType(value) {
    this._setOption("comparisonType", value);
  }
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridCompareRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridCompareRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridCompareRuleComponent,
    selectors: [["dxi-data-grid-compare-rule"]],
    inputs: {
      comparisonTarget: "comparisonTarget",
      comparisonType: "comparisonType",
      ignoreEmptyValue: "ignoreEmptyValue",
      message: "message",
      type: "type"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridCompareRuleComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridCompareRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-compare-rule",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    comparisonTarget: [{
      type: Input
    }],
    comparisonType: [{
      type: Input
    }],
    ignoreEmptyValue: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiDataGridCompareRuleModule = class _DxiDataGridCompareRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridCompareRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridCompareRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridCompareRuleModule,
    declarations: [DxiDataGridCompareRuleComponent],
    exports: [DxiDataGridCompareRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridCompareRuleModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridCompareRuleComponent],
      exports: [DxiDataGridCompareRuleComponent]
    }]
  }], null, null);
})();
var DxiDataGridCustomRuleComponent = class _DxiDataGridCustomRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get reevaluate() {
    return this._getOption("reevaluate");
  }
  set reevaluate(value) {
    this._setOption("reevaluate", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get validationCallback() {
    return this._getOption("validationCallback");
  }
  set validationCallback(value) {
    this._setOption("validationCallback", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridCustomRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridCustomRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridCustomRuleComponent,
    selectors: [["dxi-data-grid-custom-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      message: "message",
      reevaluate: "reevaluate",
      type: "type",
      validationCallback: "validationCallback"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridCustomRuleComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridCustomRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-custom-rule",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    ignoreEmptyValue: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    reevaluate: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    validationCallback: [{
      type: Input
    }]
  });
})();
var DxiDataGridCustomRuleModule = class _DxiDataGridCustomRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridCustomRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridCustomRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridCustomRuleModule,
    declarations: [DxiDataGridCustomRuleComponent],
    exports: [DxiDataGridCustomRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridCustomRuleModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridCustomRuleComponent],
      exports: [DxiDataGridCustomRuleComponent]
    }]
  }], null, null);
})();
var DxiDataGridEmailRuleComponent = class _DxiDataGridEmailRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridEmailRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridEmailRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridEmailRuleComponent,
    selectors: [["dxi-data-grid-email-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      message: "message",
      type: "type"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridEmailRuleComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridEmailRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-email-rule",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    ignoreEmptyValue: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiDataGridEmailRuleModule = class _DxiDataGridEmailRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridEmailRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridEmailRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridEmailRuleModule,
    declarations: [DxiDataGridEmailRuleComponent],
    exports: [DxiDataGridEmailRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridEmailRuleModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridEmailRuleComponent],
      exports: [DxiDataGridEmailRuleComponent]
    }]
  }], null, null);
})();
var DxiDataGridNumericRuleComponent = class _DxiDataGridNumericRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridNumericRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridNumericRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridNumericRuleComponent,
    selectors: [["dxi-data-grid-numeric-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      message: "message",
      type: "type"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridNumericRuleComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridNumericRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-numeric-rule",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    ignoreEmptyValue: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiDataGridNumericRuleModule = class _DxiDataGridNumericRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridNumericRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridNumericRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridNumericRuleModule,
    declarations: [DxiDataGridNumericRuleComponent],
    exports: [DxiDataGridNumericRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridNumericRuleModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridNumericRuleComponent],
      exports: [DxiDataGridNumericRuleComponent]
    }]
  }], null, null);
})();
var DxiDataGridPatternRuleComponent = class _DxiDataGridPatternRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get pattern() {
    return this._getOption("pattern");
  }
  set pattern(value) {
    this._setOption("pattern", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridPatternRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridPatternRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridPatternRuleComponent,
    selectors: [["dxi-data-grid-pattern-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      message: "message",
      pattern: "pattern",
      type: "type"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridPatternRuleComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridPatternRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-pattern-rule",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    ignoreEmptyValue: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    pattern: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiDataGridPatternRuleModule = class _DxiDataGridPatternRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridPatternRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridPatternRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridPatternRuleModule,
    declarations: [DxiDataGridPatternRuleComponent],
    exports: [DxiDataGridPatternRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridPatternRuleModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridPatternRuleComponent],
      exports: [DxiDataGridPatternRuleComponent]
    }]
  }], null, null);
})();
var DxiDataGridRangeRuleComponent = class _DxiDataGridRangeRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get max() {
    return this._getOption("max");
  }
  set max(value) {
    this._setOption("max", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get min() {
    return this._getOption("min");
  }
  set min(value) {
    this._setOption("min", value);
  }
  get reevaluate() {
    return this._getOption("reevaluate");
  }
  set reevaluate(value) {
    this._setOption("reevaluate", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridRangeRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridRangeRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridRangeRuleComponent,
    selectors: [["dxi-data-grid-range-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      max: "max",
      message: "message",
      min: "min",
      reevaluate: "reevaluate",
      type: "type"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridRangeRuleComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridRangeRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-range-rule",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    ignoreEmptyValue: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    reevaluate: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiDataGridRangeRuleModule = class _DxiDataGridRangeRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridRangeRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridRangeRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridRangeRuleModule,
    declarations: [DxiDataGridRangeRuleComponent],
    exports: [DxiDataGridRangeRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridRangeRuleModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridRangeRuleComponent],
      exports: [DxiDataGridRangeRuleComponent]
    }]
  }], null, null);
})();
var DxiDataGridRequiredRuleComponent = class _DxiDataGridRequiredRuleComponent extends CollectionNestedOption {
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get trim() {
    return this._getOption("trim");
  }
  set trim(value) {
    this._setOption("trim", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridRequiredRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridRequiredRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridRequiredRuleComponent,
    selectors: [["dxi-data-grid-required-rule"]],
    inputs: {
      message: "message",
      trim: "trim",
      type: "type"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridRequiredRuleComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridRequiredRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-required-rule",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    message: [{
      type: Input
    }],
    trim: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiDataGridRequiredRuleModule = class _DxiDataGridRequiredRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridRequiredRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridRequiredRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridRequiredRuleModule,
    declarations: [DxiDataGridRequiredRuleComponent],
    exports: [DxiDataGridRequiredRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridRequiredRuleModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridRequiredRuleComponent],
      exports: [DxiDataGridRequiredRuleComponent]
    }]
  }], null, null);
})();
var DxiDataGridStringLengthRuleComponent = class _DxiDataGridStringLengthRuleComponent extends CollectionNestedOption {
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get max() {
    return this._getOption("max");
  }
  set max(value) {
    this._setOption("max", value);
  }
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get min() {
    return this._getOption("min");
  }
  set min(value) {
    this._setOption("min", value);
  }
  get trim() {
    return this._getOption("trim");
  }
  set trim(value) {
    this._setOption("trim", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridStringLengthRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridStringLengthRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridStringLengthRuleComponent,
    selectors: [["dxi-data-grid-string-length-rule"]],
    inputs: {
      ignoreEmptyValue: "ignoreEmptyValue",
      max: "max",
      message: "message",
      min: "min",
      trim: "trim",
      type: "type"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridStringLengthRuleComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridStringLengthRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-string-length-rule",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    ignoreEmptyValue: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    message: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    trim: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxiDataGridStringLengthRuleModule = class _DxiDataGridStringLengthRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridStringLengthRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridStringLengthRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridStringLengthRuleModule,
    declarations: [DxiDataGridStringLengthRuleComponent],
    exports: [DxiDataGridStringLengthRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridStringLengthRuleModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridStringLengthRuleComponent],
      exports: [DxiDataGridStringLengthRuleComponent]
    }]
  }], null, null);
})();
var DxiDataGridValidationRuleComponent = class _DxiDataGridValidationRuleComponent extends CollectionNestedOption {
  get message() {
    return this._getOption("message");
  }
  set message(value) {
    this._setOption("message", value);
  }
  get trim() {
    return this._getOption("trim");
  }
  set trim(value) {
    this._setOption("trim", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get ignoreEmptyValue() {
    return this._getOption("ignoreEmptyValue");
  }
  set ignoreEmptyValue(value) {
    this._setOption("ignoreEmptyValue", value);
  }
  get max() {
    return this._getOption("max");
  }
  set max(value) {
    this._setOption("max", value);
  }
  get min() {
    return this._getOption("min");
  }
  set min(value) {
    this._setOption("min", value);
  }
  get reevaluate() {
    return this._getOption("reevaluate");
  }
  set reevaluate(value) {
    this._setOption("reevaluate", value);
  }
  get validationCallback() {
    return this._getOption("validationCallback");
  }
  set validationCallback(value) {
    this._setOption("validationCallback", value);
  }
  get comparisonTarget() {
    return this._getOption("comparisonTarget");
  }
  set comparisonTarget(value) {
    this._setOption("comparisonTarget", value);
  }
  get comparisonType() {
    return this._getOption("comparisonType");
  }
  set comparisonType(value) {
    this._setOption("comparisonType", value);
  }
  get pattern() {
    return this._getOption("pattern");
  }
  set pattern(value) {
    this._setOption("pattern", value);
  }
  get _optionPath() {
    return "validationRules";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridValidationRuleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridValidationRuleComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridValidationRuleComponent,
    selectors: [["dxi-data-grid-validation-rule"]],
    inputs: {
      message: "message",
      trim: "trim",
      type: "type",
      ignoreEmptyValue: "ignoreEmptyValue",
      max: "max",
      min: "min",
      reevaluate: "reevaluate",
      validationCallback: "validationCallback",
      comparisonTarget: "comparisonTarget",
      comparisonType: "comparisonType",
      pattern: "pattern"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridValidationRuleComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridValidationRuleComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-validation-rule",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    message: [{
      type: Input
    }],
    trim: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    ignoreEmptyValue: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    reevaluate: [{
      type: Input
    }],
    validationCallback: [{
      type: Input
    }],
    comparisonTarget: [{
      type: Input
    }],
    comparisonType: [{
      type: Input
    }],
    pattern: [{
      type: Input
    }]
  });
})();
var DxiDataGridValidationRuleModule = class _DxiDataGridValidationRuleModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridValidationRuleModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridValidationRuleModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridValidationRuleModule,
    declarations: [DxiDataGridValidationRuleComponent],
    exports: [DxiDataGridValidationRuleComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridValidationRuleModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridValidationRuleComponent],
      exports: [DxiDataGridValidationRuleComponent]
    }]
  }], null, null);
})();
var DxiDataGridColumnComponent = class _DxiDataGridColumnComponent extends CollectionNestedOption {
  get alignment() {
    return this._getOption("alignment");
  }
  set alignment(value) {
    this._setOption("alignment", value);
  }
  get allowEditing() {
    return this._getOption("allowEditing");
  }
  set allowEditing(value) {
    this._setOption("allowEditing", value);
  }
  get allowExporting() {
    return this._getOption("allowExporting");
  }
  set allowExporting(value) {
    this._setOption("allowExporting", value);
  }
  get allowFiltering() {
    return this._getOption("allowFiltering");
  }
  set allowFiltering(value) {
    this._setOption("allowFiltering", value);
  }
  get allowFixing() {
    return this._getOption("allowFixing");
  }
  set allowFixing(value) {
    this._setOption("allowFixing", value);
  }
  get allowGrouping() {
    return this._getOption("allowGrouping");
  }
  set allowGrouping(value) {
    this._setOption("allowGrouping", value);
  }
  get allowHeaderFiltering() {
    return this._getOption("allowHeaderFiltering");
  }
  set allowHeaderFiltering(value) {
    this._setOption("allowHeaderFiltering", value);
  }
  get allowHiding() {
    return this._getOption("allowHiding");
  }
  set allowHiding(value) {
    this._setOption("allowHiding", value);
  }
  get allowReordering() {
    return this._getOption("allowReordering");
  }
  set allowReordering(value) {
    this._setOption("allowReordering", value);
  }
  get allowResizing() {
    return this._getOption("allowResizing");
  }
  set allowResizing(value) {
    this._setOption("allowResizing", value);
  }
  get allowSearch() {
    return this._getOption("allowSearch");
  }
  set allowSearch(value) {
    this._setOption("allowSearch", value);
  }
  get allowSorting() {
    return this._getOption("allowSorting");
  }
  set allowSorting(value) {
    this._setOption("allowSorting", value);
  }
  get autoExpandGroup() {
    return this._getOption("autoExpandGroup");
  }
  set autoExpandGroup(value) {
    this._setOption("autoExpandGroup", value);
  }
  get buttons() {
    return this._getOption("buttons");
  }
  set buttons(value) {
    this._setOption("buttons", value);
  }
  get calculateCellValue() {
    return this._getOption("calculateCellValue");
  }
  set calculateCellValue(value) {
    this._setOption("calculateCellValue", value);
  }
  get calculateDisplayValue() {
    return this._getOption("calculateDisplayValue");
  }
  set calculateDisplayValue(value) {
    this._setOption("calculateDisplayValue", value);
  }
  get calculateFilterExpression() {
    return this._getOption("calculateFilterExpression");
  }
  set calculateFilterExpression(value) {
    this._setOption("calculateFilterExpression", value);
  }
  get calculateGroupValue() {
    return this._getOption("calculateGroupValue");
  }
  set calculateGroupValue(value) {
    this._setOption("calculateGroupValue", value);
  }
  get calculateSortValue() {
    return this._getOption("calculateSortValue");
  }
  set calculateSortValue(value) {
    this._setOption("calculateSortValue", value);
  }
  get caption() {
    return this._getOption("caption");
  }
  set caption(value) {
    this._setOption("caption", value);
  }
  get cellTemplate() {
    return this._getOption("cellTemplate");
  }
  set cellTemplate(value) {
    this._setOption("cellTemplate", value);
  }
  get columns() {
    return this._getOption("columns");
  }
  set columns(value) {
    this._setOption("columns", value);
  }
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get customizeText() {
    return this._getOption("customizeText");
  }
  set customizeText(value) {
    this._setOption("customizeText", value);
  }
  get dataField() {
    return this._getOption("dataField");
  }
  set dataField(value) {
    this._setOption("dataField", value);
  }
  get dataType() {
    return this._getOption("dataType");
  }
  set dataType(value) {
    this._setOption("dataType", value);
  }
  get editCellTemplate() {
    return this._getOption("editCellTemplate");
  }
  set editCellTemplate(value) {
    this._setOption("editCellTemplate", value);
  }
  get editorOptions() {
    return this._getOption("editorOptions");
  }
  set editorOptions(value) {
    this._setOption("editorOptions", value);
  }
  get encodeHtml() {
    return this._getOption("encodeHtml");
  }
  set encodeHtml(value) {
    this._setOption("encodeHtml", value);
  }
  get falseText() {
    return this._getOption("falseText");
  }
  set falseText(value) {
    this._setOption("falseText", value);
  }
  get filterOperations() {
    return this._getOption("filterOperations");
  }
  set filterOperations(value) {
    this._setOption("filterOperations", value);
  }
  get filterType() {
    return this._getOption("filterType");
  }
  set filterType(value) {
    this._setOption("filterType", value);
  }
  get filterValue() {
    return this._getOption("filterValue");
  }
  set filterValue(value) {
    this._setOption("filterValue", value);
  }
  get filterValues() {
    return this._getOption("filterValues");
  }
  set filterValues(value) {
    this._setOption("filterValues", value);
  }
  get fixed() {
    return this._getOption("fixed");
  }
  set fixed(value) {
    this._setOption("fixed", value);
  }
  get fixedPosition() {
    return this._getOption("fixedPosition");
  }
  set fixedPosition(value) {
    this._setOption("fixedPosition", value);
  }
  get format() {
    return this._getOption("format");
  }
  set format(value) {
    this._setOption("format", value);
  }
  get formItem() {
    return this._getOption("formItem");
  }
  set formItem(value) {
    this._setOption("formItem", value);
  }
  get groupCellTemplate() {
    return this._getOption("groupCellTemplate");
  }
  set groupCellTemplate(value) {
    this._setOption("groupCellTemplate", value);
  }
  get groupIndex() {
    return this._getOption("groupIndex");
  }
  set groupIndex(value) {
    this._setOption("groupIndex", value);
  }
  get headerCellTemplate() {
    return this._getOption("headerCellTemplate");
  }
  set headerCellTemplate(value) {
    this._setOption("headerCellTemplate", value);
  }
  get headerFilter() {
    return this._getOption("headerFilter");
  }
  set headerFilter(value) {
    this._setOption("headerFilter", value);
  }
  get hidingPriority() {
    return this._getOption("hidingPriority");
  }
  set hidingPriority(value) {
    this._setOption("hidingPriority", value);
  }
  get isBand() {
    return this._getOption("isBand");
  }
  set isBand(value) {
    this._setOption("isBand", value);
  }
  get lookup() {
    return this._getOption("lookup");
  }
  set lookup(value) {
    this._setOption("lookup", value);
  }
  get minWidth() {
    return this._getOption("minWidth");
  }
  set minWidth(value) {
    this._setOption("minWidth", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get ownerBand() {
    return this._getOption("ownerBand");
  }
  set ownerBand(value) {
    this._setOption("ownerBand", value);
  }
  get renderAsync() {
    return this._getOption("renderAsync");
  }
  set renderAsync(value) {
    this._setOption("renderAsync", value);
  }
  get selectedFilterOperation() {
    return this._getOption("selectedFilterOperation");
  }
  set selectedFilterOperation(value) {
    this._setOption("selectedFilterOperation", value);
  }
  get setCellValue() {
    return this._getOption("setCellValue");
  }
  set setCellValue(value) {
    this._setOption("setCellValue", value);
  }
  get showEditorAlways() {
    return this._getOption("showEditorAlways");
  }
  set showEditorAlways(value) {
    this._setOption("showEditorAlways", value);
  }
  get showInColumnChooser() {
    return this._getOption("showInColumnChooser");
  }
  set showInColumnChooser(value) {
    this._setOption("showInColumnChooser", value);
  }
  get showWhenGrouped() {
    return this._getOption("showWhenGrouped");
  }
  set showWhenGrouped(value) {
    this._setOption("showWhenGrouped", value);
  }
  get sortIndex() {
    return this._getOption("sortIndex");
  }
  set sortIndex(value) {
    this._setOption("sortIndex", value);
  }
  get sortingMethod() {
    return this._getOption("sortingMethod");
  }
  set sortingMethod(value) {
    this._setOption("sortingMethod", value);
  }
  get sortOrder() {
    return this._getOption("sortOrder");
  }
  set sortOrder(value) {
    this._setOption("sortOrder", value);
  }
  get trueText() {
    return this._getOption("trueText");
  }
  set trueText(value) {
    this._setOption("trueText", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get validationRules() {
    return this._getOption("validationRules");
  }
  set validationRules(value) {
    this._setOption("validationRules", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get visibleIndex() {
    return this._getOption("visibleIndex");
  }
  set visibleIndex(value) {
    this._setOption("visibleIndex", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  filterValueChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  filterValuesChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  groupIndexChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  selectedFilterOperationChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  sortIndexChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  sortOrderChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  visibleChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  visibleIndexChange;
  get _optionPath() {
    return "columns";
  }
  get asyncRulesChildren() {
    return this._getOption("validationRules");
  }
  set asyncRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get buttonsChildren() {
    return this._getOption("buttons");
  }
  set buttonsChildren(value) {
    this.setChildren("buttons", value);
  }
  get compareRulesChildren() {
    return this._getOption("validationRules");
  }
  set compareRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get customRulesChildren() {
    return this._getOption("validationRules");
  }
  set customRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get emailRulesChildren() {
    return this._getOption("validationRules");
  }
  set emailRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get numericRulesChildren() {
    return this._getOption("validationRules");
  }
  set numericRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get patternRulesChildren() {
    return this._getOption("validationRules");
  }
  set patternRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get rangeRulesChildren() {
    return this._getOption("validationRules");
  }
  set rangeRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get requiredRulesChildren() {
    return this._getOption("validationRules");
  }
  set requiredRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get stringLengthRulesChildren() {
    return this._getOption("validationRules");
  }
  set stringLengthRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get validationRulesChildren() {
    return this._getOption("validationRules");
  }
  set validationRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "filterValueChange"
    }, {
      emit: "filterValuesChange"
    }, {
      emit: "groupIndexChange"
    }, {
      emit: "selectedFilterOperationChange"
    }, {
      emit: "sortIndexChange"
    }, {
      emit: "sortOrderChange"
    }, {
      emit: "visibleChange"
    }, {
      emit: "visibleIndexChange"
    }]);
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridColumnComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridColumnComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridColumnComponent,
    selectors: [["dxi-data-grid-column"]],
    contentQueries: function DxiDataGridColumnComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, DxiDataGridAsyncRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridButtonComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridCompareRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridCustomRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridEmailRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridNumericRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridPatternRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridRangeRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridRequiredRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridStringLengthRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridValidationRuleComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.asyncRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.buttonsChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.compareRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.customRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emailRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.numericRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.patternRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.rangeRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.requiredRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.stringLengthRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.validationRulesChildren = _t);
      }
    },
    inputs: {
      alignment: "alignment",
      allowEditing: "allowEditing",
      allowExporting: "allowExporting",
      allowFiltering: "allowFiltering",
      allowFixing: "allowFixing",
      allowGrouping: "allowGrouping",
      allowHeaderFiltering: "allowHeaderFiltering",
      allowHiding: "allowHiding",
      allowReordering: "allowReordering",
      allowResizing: "allowResizing",
      allowSearch: "allowSearch",
      allowSorting: "allowSorting",
      autoExpandGroup: "autoExpandGroup",
      buttons: "buttons",
      calculateCellValue: "calculateCellValue",
      calculateDisplayValue: "calculateDisplayValue",
      calculateFilterExpression: "calculateFilterExpression",
      calculateGroupValue: "calculateGroupValue",
      calculateSortValue: "calculateSortValue",
      caption: "caption",
      cellTemplate: "cellTemplate",
      columns: "columns",
      cssClass: "cssClass",
      customizeText: "customizeText",
      dataField: "dataField",
      dataType: "dataType",
      editCellTemplate: "editCellTemplate",
      editorOptions: "editorOptions",
      encodeHtml: "encodeHtml",
      falseText: "falseText",
      filterOperations: "filterOperations",
      filterType: "filterType",
      filterValue: "filterValue",
      filterValues: "filterValues",
      fixed: "fixed",
      fixedPosition: "fixedPosition",
      format: "format",
      formItem: "formItem",
      groupCellTemplate: "groupCellTemplate",
      groupIndex: "groupIndex",
      headerCellTemplate: "headerCellTemplate",
      headerFilter: "headerFilter",
      hidingPriority: "hidingPriority",
      isBand: "isBand",
      lookup: "lookup",
      minWidth: "minWidth",
      name: "name",
      ownerBand: "ownerBand",
      renderAsync: "renderAsync",
      selectedFilterOperation: "selectedFilterOperation",
      setCellValue: "setCellValue",
      showEditorAlways: "showEditorAlways",
      showInColumnChooser: "showInColumnChooser",
      showWhenGrouped: "showWhenGrouped",
      sortIndex: "sortIndex",
      sortingMethod: "sortingMethod",
      sortOrder: "sortOrder",
      trueText: "trueText",
      type: "type",
      validationRules: "validationRules",
      visible: "visible",
      visibleIndex: "visibleIndex",
      width: "width"
    },
    outputs: {
      filterValueChange: "filterValueChange",
      filterValuesChange: "filterValuesChange",
      groupIndexChange: "groupIndexChange",
      selectedFilterOperationChange: "selectedFilterOperationChange",
      sortIndexChange: "sortIndexChange",
      sortOrderChange: "sortOrderChange",
      visibleChange: "visibleChange",
      visibleIndexChange: "visibleIndexChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridColumnComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridColumnComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-column",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    alignment: [{
      type: Input
    }],
    allowEditing: [{
      type: Input
    }],
    allowExporting: [{
      type: Input
    }],
    allowFiltering: [{
      type: Input
    }],
    allowFixing: [{
      type: Input
    }],
    allowGrouping: [{
      type: Input
    }],
    allowHeaderFiltering: [{
      type: Input
    }],
    allowHiding: [{
      type: Input
    }],
    allowReordering: [{
      type: Input
    }],
    allowResizing: [{
      type: Input
    }],
    allowSearch: [{
      type: Input
    }],
    allowSorting: [{
      type: Input
    }],
    autoExpandGroup: [{
      type: Input
    }],
    buttons: [{
      type: Input
    }],
    calculateCellValue: [{
      type: Input
    }],
    calculateDisplayValue: [{
      type: Input
    }],
    calculateFilterExpression: [{
      type: Input
    }],
    calculateGroupValue: [{
      type: Input
    }],
    calculateSortValue: [{
      type: Input
    }],
    caption: [{
      type: Input
    }],
    cellTemplate: [{
      type: Input
    }],
    columns: [{
      type: Input
    }],
    cssClass: [{
      type: Input
    }],
    customizeText: [{
      type: Input
    }],
    dataField: [{
      type: Input
    }],
    dataType: [{
      type: Input
    }],
    editCellTemplate: [{
      type: Input
    }],
    editorOptions: [{
      type: Input
    }],
    encodeHtml: [{
      type: Input
    }],
    falseText: [{
      type: Input
    }],
    filterOperations: [{
      type: Input
    }],
    filterType: [{
      type: Input
    }],
    filterValue: [{
      type: Input
    }],
    filterValues: [{
      type: Input
    }],
    fixed: [{
      type: Input
    }],
    fixedPosition: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    formItem: [{
      type: Input
    }],
    groupCellTemplate: [{
      type: Input
    }],
    groupIndex: [{
      type: Input
    }],
    headerCellTemplate: [{
      type: Input
    }],
    headerFilter: [{
      type: Input
    }],
    hidingPriority: [{
      type: Input
    }],
    isBand: [{
      type: Input
    }],
    lookup: [{
      type: Input
    }],
    minWidth: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    ownerBand: [{
      type: Input
    }],
    renderAsync: [{
      type: Input
    }],
    selectedFilterOperation: [{
      type: Input
    }],
    setCellValue: [{
      type: Input
    }],
    showEditorAlways: [{
      type: Input
    }],
    showInColumnChooser: [{
      type: Input
    }],
    showWhenGrouped: [{
      type: Input
    }],
    sortIndex: [{
      type: Input
    }],
    sortingMethod: [{
      type: Input
    }],
    sortOrder: [{
      type: Input
    }],
    trueText: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    validationRules: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    visibleIndex: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    filterValueChange: [{
      type: Output
    }],
    filterValuesChange: [{
      type: Output
    }],
    groupIndexChange: [{
      type: Output
    }],
    selectedFilterOperationChange: [{
      type: Output
    }],
    sortIndexChange: [{
      type: Output
    }],
    sortOrderChange: [{
      type: Output
    }],
    visibleChange: [{
      type: Output
    }],
    visibleIndexChange: [{
      type: Output
    }],
    asyncRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridAsyncRuleComponent)]
    }],
    buttonsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridButtonComponent)]
    }],
    compareRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridCompareRuleComponent)]
    }],
    customRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridCustomRuleComponent)]
    }],
    emailRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridEmailRuleComponent)]
    }],
    numericRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridNumericRuleComponent)]
    }],
    patternRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridPatternRuleComponent)]
    }],
    rangeRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridRangeRuleComponent)]
    }],
    requiredRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridRequiredRuleComponent)]
    }],
    stringLengthRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridStringLengthRuleComponent)]
    }],
    validationRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridValidationRuleComponent)]
    }]
  });
})();
var DxiDataGridColumnModule = class _DxiDataGridColumnModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridColumnModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridColumnModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridColumnModule,
    declarations: [DxiDataGridColumnComponent],
    exports: [DxiDataGridColumnComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridColumnModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridColumnComponent],
      exports: [DxiDataGridColumnComponent]
    }]
  }], null, null);
})();
var DxoDataGridColumnFixingTextsComponent = class _DxoDataGridColumnFixingTextsComponent extends NestedOption {
  get fix() {
    return this._getOption("fix");
  }
  set fix(value) {
    this._setOption("fix", value);
  }
  get leftPosition() {
    return this._getOption("leftPosition");
  }
  set leftPosition(value) {
    this._setOption("leftPosition", value);
  }
  get rightPosition() {
    return this._getOption("rightPosition");
  }
  set rightPosition(value) {
    this._setOption("rightPosition", value);
  }
  get stickyPosition() {
    return this._getOption("stickyPosition");
  }
  set stickyPosition(value) {
    this._setOption("stickyPosition", value);
  }
  get unfix() {
    return this._getOption("unfix");
  }
  set unfix(value) {
    this._setOption("unfix", value);
  }
  get _optionPath() {
    return "texts";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnFixingTextsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnFixingTextsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridColumnFixingTextsComponent,
    selectors: [["dxo-data-grid-column-fixing-texts"]],
    inputs: {
      fix: "fix",
      leftPosition: "leftPosition",
      rightPosition: "rightPosition",
      stickyPosition: "stickyPosition",
      unfix: "unfix"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridColumnFixingTextsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnFixingTextsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-column-fixing-texts",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    fix: [{
      type: Input
    }],
    leftPosition: [{
      type: Input
    }],
    rightPosition: [{
      type: Input
    }],
    stickyPosition: [{
      type: Input
    }],
    unfix: [{
      type: Input
    }]
  });
})();
var DxoDataGridColumnFixingTextsModule = class _DxoDataGridColumnFixingTextsModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnFixingTextsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnFixingTextsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridColumnFixingTextsModule,
    declarations: [DxoDataGridColumnFixingTextsComponent],
    exports: [DxoDataGridColumnFixingTextsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnFixingTextsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridColumnFixingTextsComponent],
      exports: [DxoDataGridColumnFixingTextsComponent]
    }]
  }], null, null);
})();
var DxoDataGridColumnFixingComponent = class _DxoDataGridColumnFixingComponent extends NestedOption {
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get icons() {
    return this._getOption("icons");
  }
  set icons(value) {
    this._setOption("icons", value);
  }
  get texts() {
    return this._getOption("texts");
  }
  set texts(value) {
    this._setOption("texts", value);
  }
  get _optionPath() {
    return "columnFixing";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnFixingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnFixingComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridColumnFixingComponent,
    selectors: [["dxo-data-grid-column-fixing"]],
    inputs: {
      enabled: "enabled",
      icons: "icons",
      texts: "texts"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridColumnFixingComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnFixingComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-column-fixing",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    enabled: [{
      type: Input
    }],
    icons: [{
      type: Input
    }],
    texts: [{
      type: Input
    }]
  });
})();
var DxoDataGridColumnFixingModule = class _DxoDataGridColumnFixingModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnFixingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnFixingModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridColumnFixingModule,
    declarations: [DxoDataGridColumnFixingComponent],
    exports: [DxoDataGridColumnFixingComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnFixingModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridColumnFixingComponent],
      exports: [DxoDataGridColumnFixingComponent]
    }]
  }], null, null);
})();
var DxoDataGridColumnHeaderFilterSearchComponent = class _DxoDataGridColumnHeaderFilterSearchComponent extends NestedOption {
  get editorOptions() {
    return this._getOption("editorOptions");
  }
  set editorOptions(value) {
    this._setOption("editorOptions", value);
  }
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get mode() {
    return this._getOption("mode");
  }
  set mode(value) {
    this._setOption("mode", value);
  }
  get searchExpr() {
    return this._getOption("searchExpr");
  }
  set searchExpr(value) {
    this._setOption("searchExpr", value);
  }
  get timeout() {
    return this._getOption("timeout");
  }
  set timeout(value) {
    this._setOption("timeout", value);
  }
  get _optionPath() {
    return "search";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnHeaderFilterSearchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnHeaderFilterSearchComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridColumnHeaderFilterSearchComponent,
    selectors: [["dxo-data-grid-column-header-filter-search"]],
    inputs: {
      editorOptions: "editorOptions",
      enabled: "enabled",
      mode: "mode",
      searchExpr: "searchExpr",
      timeout: "timeout"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridColumnHeaderFilterSearchComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnHeaderFilterSearchComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-column-header-filter-search",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    editorOptions: [{
      type: Input
    }],
    enabled: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    searchExpr: [{
      type: Input
    }],
    timeout: [{
      type: Input
    }]
  });
})();
var DxoDataGridColumnHeaderFilterSearchModule = class _DxoDataGridColumnHeaderFilterSearchModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnHeaderFilterSearchModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnHeaderFilterSearchModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridColumnHeaderFilterSearchModule,
    declarations: [DxoDataGridColumnHeaderFilterSearchComponent],
    exports: [DxoDataGridColumnHeaderFilterSearchComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnHeaderFilterSearchModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridColumnHeaderFilterSearchComponent],
      exports: [DxoDataGridColumnHeaderFilterSearchComponent]
    }]
  }], null, null);
})();
var DxoDataGridColumnHeaderFilterComponent = class _DxoDataGridColumnHeaderFilterComponent extends NestedOption {
  get allowSearch() {
    return this._getOption("allowSearch");
  }
  set allowSearch(value) {
    this._setOption("allowSearch", value);
  }
  get allowSelectAll() {
    return this._getOption("allowSelectAll");
  }
  set allowSelectAll(value) {
    this._setOption("allowSelectAll", value);
  }
  get dataSource() {
    return this._getOption("dataSource");
  }
  set dataSource(value) {
    this._setOption("dataSource", value);
  }
  get groupInterval() {
    return this._getOption("groupInterval");
  }
  set groupInterval(value) {
    this._setOption("groupInterval", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  get search() {
    return this._getOption("search");
  }
  set search(value) {
    this._setOption("search", value);
  }
  get searchMode() {
    return this._getOption("searchMode");
  }
  set searchMode(value) {
    this._setOption("searchMode", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  get _optionPath() {
    return "headerFilter";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnHeaderFilterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnHeaderFilterComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridColumnHeaderFilterComponent,
    selectors: [["dxo-data-grid-column-header-filter"]],
    inputs: {
      allowSearch: "allowSearch",
      allowSelectAll: "allowSelectAll",
      dataSource: "dataSource",
      groupInterval: "groupInterval",
      height: "height",
      search: "search",
      searchMode: "searchMode",
      width: "width"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridColumnHeaderFilterComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnHeaderFilterComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-column-header-filter",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowSearch: [{
      type: Input
    }],
    allowSelectAll: [{
      type: Input
    }],
    dataSource: [{
      type: Input
    }],
    groupInterval: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    search: [{
      type: Input
    }],
    searchMode: [{
      type: Input
    }],
    width: [{
      type: Input
    }]
  });
})();
var DxoDataGridColumnHeaderFilterModule = class _DxoDataGridColumnHeaderFilterModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnHeaderFilterModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnHeaderFilterModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridColumnHeaderFilterModule,
    declarations: [DxoDataGridColumnHeaderFilterComponent],
    exports: [DxoDataGridColumnHeaderFilterComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnHeaderFilterModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridColumnHeaderFilterComponent],
      exports: [DxoDataGridColumnHeaderFilterComponent]
    }]
  }], null, null);
})();
var DxoDataGridColumnLookupComponent = class _DxoDataGridColumnLookupComponent extends NestedOption {
  get allowClearing() {
    return this._getOption("allowClearing");
  }
  set allowClearing(value) {
    this._setOption("allowClearing", value);
  }
  get calculateCellValue() {
    return this._getOption("calculateCellValue");
  }
  set calculateCellValue(value) {
    this._setOption("calculateCellValue", value);
  }
  get dataSource() {
    return this._getOption("dataSource");
  }
  set dataSource(value) {
    this._setOption("dataSource", value);
  }
  get displayExpr() {
    return this._getOption("displayExpr");
  }
  set displayExpr(value) {
    this._setOption("displayExpr", value);
  }
  get valueExpr() {
    return this._getOption("valueExpr");
  }
  set valueExpr(value) {
    this._setOption("valueExpr", value);
  }
  get _optionPath() {
    return "lookup";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnLookupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnLookupComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridColumnLookupComponent,
    selectors: [["dxo-data-grid-column-lookup"]],
    inputs: {
      allowClearing: "allowClearing",
      calculateCellValue: "calculateCellValue",
      dataSource: "dataSource",
      displayExpr: "displayExpr",
      valueExpr: "valueExpr"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridColumnLookupComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnLookupComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-column-lookup",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowClearing: [{
      type: Input
    }],
    calculateCellValue: [{
      type: Input
    }],
    dataSource: [{
      type: Input
    }],
    displayExpr: [{
      type: Input
    }],
    valueExpr: [{
      type: Input
    }]
  });
})();
var DxoDataGridColumnLookupModule = class _DxoDataGridColumnLookupModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridColumnLookupModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridColumnLookupModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridColumnLookupModule,
    declarations: [DxoDataGridColumnLookupComponent],
    exports: [DxoDataGridColumnLookupComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridColumnLookupModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridColumnLookupComponent],
      exports: [DxoDataGridColumnLookupComponent]
    }]
  }], null, null);
})();
var DxoDataGridCursorOffsetComponent = class _DxoDataGridCursorOffsetComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "cursorOffset";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridCursorOffsetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridCursorOffsetComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridCursorOffsetComponent,
    selectors: [["dxo-data-grid-cursor-offset"]],
    inputs: {
      x: "x",
      y: "y"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridCursorOffsetComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridCursorOffsetComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-cursor-offset",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoDataGridCursorOffsetModule = class _DxoDataGridCursorOffsetModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridCursorOffsetModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridCursorOffsetModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridCursorOffsetModule,
    declarations: [DxoDataGridCursorOffsetComponent],
    exports: [DxoDataGridCursorOffsetComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridCursorOffsetModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridCursorOffsetComponent],
      exports: [DxoDataGridCursorOffsetComponent]
    }]
  }], null, null);
})();
var DxiDataGridCustomOperationComponent = class _DxiDataGridCustomOperationComponent extends CollectionNestedOption {
  get calculateFilterExpression() {
    return this._getOption("calculateFilterExpression");
  }
  set calculateFilterExpression(value) {
    this._setOption("calculateFilterExpression", value);
  }
  get caption() {
    return this._getOption("caption");
  }
  set caption(value) {
    this._setOption("caption", value);
  }
  get customizeText() {
    return this._getOption("customizeText");
  }
  set customizeText(value) {
    this._setOption("customizeText", value);
  }
  get dataTypes() {
    return this._getOption("dataTypes");
  }
  set dataTypes(value) {
    this._setOption("dataTypes", value);
  }
  get editorTemplate() {
    return this._getOption("editorTemplate");
  }
  set editorTemplate(value) {
    this._setOption("editorTemplate", value);
  }
  get hasValue() {
    return this._getOption("hasValue");
  }
  set hasValue(value) {
    this._setOption("hasValue", value);
  }
  get icon() {
    return this._getOption("icon");
  }
  set icon(value) {
    this._setOption("icon", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get _optionPath() {
    return "customOperations";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridCustomOperationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridCustomOperationComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridCustomOperationComponent,
    selectors: [["dxi-data-grid-custom-operation"]],
    inputs: {
      calculateFilterExpression: "calculateFilterExpression",
      caption: "caption",
      customizeText: "customizeText",
      dataTypes: "dataTypes",
      editorTemplate: "editorTemplate",
      hasValue: "hasValue",
      icon: "icon",
      name: "name"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridCustomOperationComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridCustomOperationComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-custom-operation",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    calculateFilterExpression: [{
      type: Input
    }],
    caption: [{
      type: Input
    }],
    customizeText: [{
      type: Input
    }],
    dataTypes: [{
      type: Input
    }],
    editorTemplate: [{
      type: Input
    }],
    hasValue: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    name: [{
      type: Input
    }]
  });
})();
var DxiDataGridCustomOperationModule = class _DxiDataGridCustomOperationModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridCustomOperationModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridCustomOperationModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridCustomOperationModule,
    declarations: [DxiDataGridCustomOperationComponent],
    exports: [DxiDataGridCustomOperationComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridCustomOperationModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridCustomOperationComponent],
      exports: [DxiDataGridCustomOperationComponent]
    }]
  }], null, null);
})();
var DxoDataGridDataGridHeaderFilterSearchComponent = class _DxoDataGridDataGridHeaderFilterSearchComponent extends NestedOption {
  get editorOptions() {
    return this._getOption("editorOptions");
  }
  set editorOptions(value) {
    this._setOption("editorOptions", value);
  }
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get mode() {
    return this._getOption("mode");
  }
  set mode(value) {
    this._setOption("mode", value);
  }
  get timeout() {
    return this._getOption("timeout");
  }
  set timeout(value) {
    this._setOption("timeout", value);
  }
  get _optionPath() {
    return "search";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridDataGridHeaderFilterSearchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridDataGridHeaderFilterSearchComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridDataGridHeaderFilterSearchComponent,
    selectors: [["dxo-data-grid-data-grid-header-filter-search"]],
    inputs: {
      editorOptions: "editorOptions",
      enabled: "enabled",
      mode: "mode",
      timeout: "timeout"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridDataGridHeaderFilterSearchComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridDataGridHeaderFilterSearchComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-data-grid-header-filter-search",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    editorOptions: [{
      type: Input
    }],
    enabled: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    timeout: [{
      type: Input
    }]
  });
})();
var DxoDataGridDataGridHeaderFilterSearchModule = class _DxoDataGridDataGridHeaderFilterSearchModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridDataGridHeaderFilterSearchModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridDataGridHeaderFilterSearchModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridDataGridHeaderFilterSearchModule,
    declarations: [DxoDataGridDataGridHeaderFilterSearchComponent],
    exports: [DxoDataGridDataGridHeaderFilterSearchComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridDataGridHeaderFilterSearchModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridDataGridHeaderFilterSearchComponent],
      exports: [DxoDataGridDataGridHeaderFilterSearchComponent]
    }]
  }], null, null);
})();
var DxoDataGridDataGridHeaderFilterTextsComponent = class _DxoDataGridDataGridHeaderFilterTextsComponent extends NestedOption {
  get cancel() {
    return this._getOption("cancel");
  }
  set cancel(value) {
    this._setOption("cancel", value);
  }
  get emptyValue() {
    return this._getOption("emptyValue");
  }
  set emptyValue(value) {
    this._setOption("emptyValue", value);
  }
  get ok() {
    return this._getOption("ok");
  }
  set ok(value) {
    this._setOption("ok", value);
  }
  get _optionPath() {
    return "texts";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridDataGridHeaderFilterTextsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridDataGridHeaderFilterTextsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridDataGridHeaderFilterTextsComponent,
    selectors: [["dxo-data-grid-data-grid-header-filter-texts"]],
    inputs: {
      cancel: "cancel",
      emptyValue: "emptyValue",
      ok: "ok"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridDataGridHeaderFilterTextsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridDataGridHeaderFilterTextsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-data-grid-header-filter-texts",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    cancel: [{
      type: Input
    }],
    emptyValue: [{
      type: Input
    }],
    ok: [{
      type: Input
    }]
  });
})();
var DxoDataGridDataGridHeaderFilterTextsModule = class _DxoDataGridDataGridHeaderFilterTextsModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridDataGridHeaderFilterTextsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridDataGridHeaderFilterTextsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridDataGridHeaderFilterTextsModule,
    declarations: [DxoDataGridDataGridHeaderFilterTextsComponent],
    exports: [DxoDataGridDataGridHeaderFilterTextsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridDataGridHeaderFilterTextsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridDataGridHeaderFilterTextsComponent],
      exports: [DxoDataGridDataGridHeaderFilterTextsComponent]
    }]
  }], null, null);
})();
var DxoDataGridDataGridHeaderFilterComponent = class _DxoDataGridDataGridHeaderFilterComponent extends NestedOption {
  get allowSearch() {
    return this._getOption("allowSearch");
  }
  set allowSearch(value) {
    this._setOption("allowSearch", value);
  }
  get allowSelectAll() {
    return this._getOption("allowSelectAll");
  }
  set allowSelectAll(value) {
    this._setOption("allowSelectAll", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  get search() {
    return this._getOption("search");
  }
  set search(value) {
    this._setOption("search", value);
  }
  get searchTimeout() {
    return this._getOption("searchTimeout");
  }
  set searchTimeout(value) {
    this._setOption("searchTimeout", value);
  }
  get texts() {
    return this._getOption("texts");
  }
  set texts(value) {
    this._setOption("texts", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  get _optionPath() {
    return "headerFilter";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridDataGridHeaderFilterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridDataGridHeaderFilterComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridDataGridHeaderFilterComponent,
    selectors: [["dxo-data-grid-data-grid-header-filter"]],
    inputs: {
      allowSearch: "allowSearch",
      allowSelectAll: "allowSelectAll",
      height: "height",
      search: "search",
      searchTimeout: "searchTimeout",
      texts: "texts",
      visible: "visible",
      width: "width"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridDataGridHeaderFilterComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridDataGridHeaderFilterComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-data-grid-header-filter",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowSearch: [{
      type: Input
    }],
    allowSelectAll: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    search: [{
      type: Input
    }],
    searchTimeout: [{
      type: Input
    }],
    texts: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }]
  });
})();
var DxoDataGridDataGridHeaderFilterModule = class _DxoDataGridDataGridHeaderFilterModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridDataGridHeaderFilterModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridDataGridHeaderFilterModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridDataGridHeaderFilterModule,
    declarations: [DxoDataGridDataGridHeaderFilterComponent],
    exports: [DxoDataGridDataGridHeaderFilterComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridDataGridHeaderFilterModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridDataGridHeaderFilterComponent],
      exports: [DxoDataGridDataGridHeaderFilterComponent]
    }]
  }], null, null);
})();
var DxoDataGridDataGridSelectionComponent = class _DxoDataGridDataGridSelectionComponent extends NestedOption {
  get allowSelectAll() {
    return this._getOption("allowSelectAll");
  }
  set allowSelectAll(value) {
    this._setOption("allowSelectAll", value);
  }
  get deferred() {
    return this._getOption("deferred");
  }
  set deferred(value) {
    this._setOption("deferred", value);
  }
  get mode() {
    return this._getOption("mode");
  }
  set mode(value) {
    this._setOption("mode", value);
  }
  get selectAllMode() {
    return this._getOption("selectAllMode");
  }
  set selectAllMode(value) {
    this._setOption("selectAllMode", value);
  }
  get sensitivity() {
    return this._getOption("sensitivity");
  }
  set sensitivity(value) {
    this._setOption("sensitivity", value);
  }
  get showCheckBoxesMode() {
    return this._getOption("showCheckBoxesMode");
  }
  set showCheckBoxesMode(value) {
    this._setOption("showCheckBoxesMode", value);
  }
  get _optionPath() {
    return "selection";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridDataGridSelectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridDataGridSelectionComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridDataGridSelectionComponent,
    selectors: [["dxo-data-grid-data-grid-selection"]],
    inputs: {
      allowSelectAll: "allowSelectAll",
      deferred: "deferred",
      mode: "mode",
      selectAllMode: "selectAllMode",
      sensitivity: "sensitivity",
      showCheckBoxesMode: "showCheckBoxesMode"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridDataGridSelectionComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridDataGridSelectionComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-data-grid-selection",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowSelectAll: [{
      type: Input
    }],
    deferred: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    selectAllMode: [{
      type: Input
    }],
    sensitivity: [{
      type: Input
    }],
    showCheckBoxesMode: [{
      type: Input
    }]
  });
})();
var DxoDataGridDataGridSelectionModule = class _DxoDataGridDataGridSelectionModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridDataGridSelectionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridDataGridSelectionModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridDataGridSelectionModule,
    declarations: [DxoDataGridDataGridSelectionComponent],
    exports: [DxoDataGridDataGridSelectionComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridDataGridSelectionModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridDataGridSelectionComponent],
      exports: [DxoDataGridDataGridSelectionComponent]
    }]
  }], null, null);
})();
var DxoDataGridEditingTextsComponent = class _DxoDataGridEditingTextsComponent extends NestedOption {
  get addRow() {
    return this._getOption("addRow");
  }
  set addRow(value) {
    this._setOption("addRow", value);
  }
  get cancelAllChanges() {
    return this._getOption("cancelAllChanges");
  }
  set cancelAllChanges(value) {
    this._setOption("cancelAllChanges", value);
  }
  get cancelRowChanges() {
    return this._getOption("cancelRowChanges");
  }
  set cancelRowChanges(value) {
    this._setOption("cancelRowChanges", value);
  }
  get confirmDeleteMessage() {
    return this._getOption("confirmDeleteMessage");
  }
  set confirmDeleteMessage(value) {
    this._setOption("confirmDeleteMessage", value);
  }
  get confirmDeleteTitle() {
    return this._getOption("confirmDeleteTitle");
  }
  set confirmDeleteTitle(value) {
    this._setOption("confirmDeleteTitle", value);
  }
  get deleteRow() {
    return this._getOption("deleteRow");
  }
  set deleteRow(value) {
    this._setOption("deleteRow", value);
  }
  get editRow() {
    return this._getOption("editRow");
  }
  set editRow(value) {
    this._setOption("editRow", value);
  }
  get saveAllChanges() {
    return this._getOption("saveAllChanges");
  }
  set saveAllChanges(value) {
    this._setOption("saveAllChanges", value);
  }
  get saveRowChanges() {
    return this._getOption("saveRowChanges");
  }
  set saveRowChanges(value) {
    this._setOption("saveRowChanges", value);
  }
  get undeleteRow() {
    return this._getOption("undeleteRow");
  }
  set undeleteRow(value) {
    this._setOption("undeleteRow", value);
  }
  get validationCancelChanges() {
    return this._getOption("validationCancelChanges");
  }
  set validationCancelChanges(value) {
    this._setOption("validationCancelChanges", value);
  }
  get _optionPath() {
    return "texts";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridEditingTextsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridEditingTextsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridEditingTextsComponent,
    selectors: [["dxo-data-grid-editing-texts"]],
    inputs: {
      addRow: "addRow",
      cancelAllChanges: "cancelAllChanges",
      cancelRowChanges: "cancelRowChanges",
      confirmDeleteMessage: "confirmDeleteMessage",
      confirmDeleteTitle: "confirmDeleteTitle",
      deleteRow: "deleteRow",
      editRow: "editRow",
      saveAllChanges: "saveAllChanges",
      saveRowChanges: "saveRowChanges",
      undeleteRow: "undeleteRow",
      validationCancelChanges: "validationCancelChanges"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridEditingTextsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridEditingTextsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-editing-texts",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    addRow: [{
      type: Input
    }],
    cancelAllChanges: [{
      type: Input
    }],
    cancelRowChanges: [{
      type: Input
    }],
    confirmDeleteMessage: [{
      type: Input
    }],
    confirmDeleteTitle: [{
      type: Input
    }],
    deleteRow: [{
      type: Input
    }],
    editRow: [{
      type: Input
    }],
    saveAllChanges: [{
      type: Input
    }],
    saveRowChanges: [{
      type: Input
    }],
    undeleteRow: [{
      type: Input
    }],
    validationCancelChanges: [{
      type: Input
    }]
  });
})();
var DxoDataGridEditingTextsModule = class _DxoDataGridEditingTextsModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridEditingTextsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridEditingTextsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridEditingTextsModule,
    declarations: [DxoDataGridEditingTextsComponent],
    exports: [DxoDataGridEditingTextsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridEditingTextsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridEditingTextsComponent],
      exports: [DxoDataGridEditingTextsComponent]
    }]
  }], null, null);
})();
var DxoDataGridEditingComponent = class _DxoDataGridEditingComponent extends NestedOption {
  get allowAdding() {
    return this._getOption("allowAdding");
  }
  set allowAdding(value) {
    this._setOption("allowAdding", value);
  }
  get allowDeleting() {
    return this._getOption("allowDeleting");
  }
  set allowDeleting(value) {
    this._setOption("allowDeleting", value);
  }
  get allowUpdating() {
    return this._getOption("allowUpdating");
  }
  set allowUpdating(value) {
    this._setOption("allowUpdating", value);
  }
  get changes() {
    return this._getOption("changes");
  }
  set changes(value) {
    this._setOption("changes", value);
  }
  get confirmDelete() {
    return this._getOption("confirmDelete");
  }
  set confirmDelete(value) {
    this._setOption("confirmDelete", value);
  }
  get editColumnName() {
    return this._getOption("editColumnName");
  }
  set editColumnName(value) {
    this._setOption("editColumnName", value);
  }
  get editRowKey() {
    return this._getOption("editRowKey");
  }
  set editRowKey(value) {
    this._setOption("editRowKey", value);
  }
  get form() {
    return this._getOption("form");
  }
  set form(value) {
    this._setOption("form", value);
  }
  get mode() {
    return this._getOption("mode");
  }
  set mode(value) {
    this._setOption("mode", value);
  }
  get newRowPosition() {
    return this._getOption("newRowPosition");
  }
  set newRowPosition(value) {
    this._setOption("newRowPosition", value);
  }
  get popup() {
    return this._getOption("popup");
  }
  set popup(value) {
    this._setOption("popup", value);
  }
  get refreshMode() {
    return this._getOption("refreshMode");
  }
  set refreshMode(value) {
    this._setOption("refreshMode", value);
  }
  get selectTextOnEditStart() {
    return this._getOption("selectTextOnEditStart");
  }
  set selectTextOnEditStart(value) {
    this._setOption("selectTextOnEditStart", value);
  }
  get startEditAction() {
    return this._getOption("startEditAction");
  }
  set startEditAction(value) {
    this._setOption("startEditAction", value);
  }
  get texts() {
    return this._getOption("texts");
  }
  set texts(value) {
    this._setOption("texts", value);
  }
  get useIcons() {
    return this._getOption("useIcons");
  }
  set useIcons(value) {
    this._setOption("useIcons", value);
  }
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  changesChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  editColumnNameChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  editRowKeyChange;
  get _optionPath() {
    return "editing";
  }
  get changesChildren() {
    return this._getOption("changes");
  }
  set changesChildren(value) {
    this.setChildren("changes", value);
  }
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "changesChange"
    }, {
      emit: "editColumnNameChange"
    }, {
      emit: "editRowKeyChange"
    }]);
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridEditingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridEditingComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridEditingComponent,
    selectors: [["dxo-data-grid-editing"]],
    contentQueries: function DxoDataGridEditingComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, DxiDataGridChangeComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.changesChildren = _t);
      }
    },
    inputs: {
      allowAdding: "allowAdding",
      allowDeleting: "allowDeleting",
      allowUpdating: "allowUpdating",
      changes: "changes",
      confirmDelete: "confirmDelete",
      editColumnName: "editColumnName",
      editRowKey: "editRowKey",
      form: "form",
      mode: "mode",
      newRowPosition: "newRowPosition",
      popup: "popup",
      refreshMode: "refreshMode",
      selectTextOnEditStart: "selectTextOnEditStart",
      startEditAction: "startEditAction",
      texts: "texts",
      useIcons: "useIcons"
    },
    outputs: {
      changesChange: "changesChange",
      editColumnNameChange: "editColumnNameChange",
      editRowKeyChange: "editRowKeyChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridEditingComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridEditingComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-editing",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowAdding: [{
      type: Input
    }],
    allowDeleting: [{
      type: Input
    }],
    allowUpdating: [{
      type: Input
    }],
    changes: [{
      type: Input
    }],
    confirmDelete: [{
      type: Input
    }],
    editColumnName: [{
      type: Input
    }],
    editRowKey: [{
      type: Input
    }],
    form: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    newRowPosition: [{
      type: Input
    }],
    popup: [{
      type: Input
    }],
    refreshMode: [{
      type: Input
    }],
    selectTextOnEditStart: [{
      type: Input
    }],
    startEditAction: [{
      type: Input
    }],
    texts: [{
      type: Input
    }],
    useIcons: [{
      type: Input
    }],
    changesChange: [{
      type: Output
    }],
    editColumnNameChange: [{
      type: Output
    }],
    editRowKeyChange: [{
      type: Output
    }],
    changesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridChangeComponent)]
    }]
  });
})();
var DxoDataGridEditingModule = class _DxoDataGridEditingModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridEditingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridEditingModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridEditingModule,
    declarations: [DxoDataGridEditingComponent],
    exports: [DxoDataGridEditingComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridEditingModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridEditingComponent],
      exports: [DxoDataGridEditingComponent]
    }]
  }], null, null);
})();
var DxoDataGridExportTextsComponent = class _DxoDataGridExportTextsComponent extends NestedOption {
  get exportAll() {
    return this._getOption("exportAll");
  }
  set exportAll(value) {
    this._setOption("exportAll", value);
  }
  get exportSelectedRows() {
    return this._getOption("exportSelectedRows");
  }
  set exportSelectedRows(value) {
    this._setOption("exportSelectedRows", value);
  }
  get exportTo() {
    return this._getOption("exportTo");
  }
  set exportTo(value) {
    this._setOption("exportTo", value);
  }
  get _optionPath() {
    return "texts";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridExportTextsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridExportTextsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridExportTextsComponent,
    selectors: [["dxo-data-grid-export-texts"]],
    inputs: {
      exportAll: "exportAll",
      exportSelectedRows: "exportSelectedRows",
      exportTo: "exportTo"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridExportTextsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridExportTextsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-export-texts",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    exportAll: [{
      type: Input
    }],
    exportSelectedRows: [{
      type: Input
    }],
    exportTo: [{
      type: Input
    }]
  });
})();
var DxoDataGridExportTextsModule = class _DxoDataGridExportTextsModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridExportTextsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridExportTextsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridExportTextsModule,
    declarations: [DxoDataGridExportTextsComponent],
    exports: [DxoDataGridExportTextsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridExportTextsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridExportTextsComponent],
      exports: [DxoDataGridExportTextsComponent]
    }]
  }], null, null);
})();
var DxoDataGridExportComponent = class _DxoDataGridExportComponent extends NestedOption {
  get allowExportSelectedData() {
    return this._getOption("allowExportSelectedData");
  }
  set allowExportSelectedData(value) {
    this._setOption("allowExportSelectedData", value);
  }
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get formats() {
    return this._getOption("formats");
  }
  set formats(value) {
    this._setOption("formats", value);
  }
  get texts() {
    return this._getOption("texts");
  }
  set texts(value) {
    this._setOption("texts", value);
  }
  get _optionPath() {
    return "export";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridExportComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridExportComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridExportComponent,
    selectors: [["dxo-data-grid-export"]],
    inputs: {
      allowExportSelectedData: "allowExportSelectedData",
      enabled: "enabled",
      formats: "formats",
      texts: "texts"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridExportComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridExportComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-export",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowExportSelectedData: [{
      type: Input
    }],
    enabled: [{
      type: Input
    }],
    formats: [{
      type: Input
    }],
    texts: [{
      type: Input
    }]
  });
})();
var DxoDataGridExportModule = class _DxoDataGridExportModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridExportModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridExportModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridExportModule,
    declarations: [DxoDataGridExportComponent],
    exports: [DxoDataGridExportComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridExportModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridExportComponent],
      exports: [DxoDataGridExportComponent]
    }]
  }], null, null);
})();
var DxiDataGridFieldComponent = class _DxiDataGridFieldComponent extends CollectionNestedOption {
  get calculateFilterExpression() {
    return this._getOption("calculateFilterExpression");
  }
  set calculateFilterExpression(value) {
    this._setOption("calculateFilterExpression", value);
  }
  get caption() {
    return this._getOption("caption");
  }
  set caption(value) {
    this._setOption("caption", value);
  }
  get customizeText() {
    return this._getOption("customizeText");
  }
  set customizeText(value) {
    this._setOption("customizeText", value);
  }
  get dataField() {
    return this._getOption("dataField");
  }
  set dataField(value) {
    this._setOption("dataField", value);
  }
  get dataType() {
    return this._getOption("dataType");
  }
  set dataType(value) {
    this._setOption("dataType", value);
  }
  get editorOptions() {
    return this._getOption("editorOptions");
  }
  set editorOptions(value) {
    this._setOption("editorOptions", value);
  }
  get editorTemplate() {
    return this._getOption("editorTemplate");
  }
  set editorTemplate(value) {
    this._setOption("editorTemplate", value);
  }
  get falseText() {
    return this._getOption("falseText");
  }
  set falseText(value) {
    this._setOption("falseText", value);
  }
  get filterOperations() {
    return this._getOption("filterOperations");
  }
  set filterOperations(value) {
    this._setOption("filterOperations", value);
  }
  get format() {
    return this._getOption("format");
  }
  set format(value) {
    this._setOption("format", value);
  }
  get lookup() {
    return this._getOption("lookup");
  }
  set lookup(value) {
    this._setOption("lookup", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get trueText() {
    return this._getOption("trueText");
  }
  set trueText(value) {
    this._setOption("trueText", value);
  }
  get _optionPath() {
    return "fields";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridFieldComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridFieldComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridFieldComponent,
    selectors: [["dxi-data-grid-field"]],
    inputs: {
      calculateFilterExpression: "calculateFilterExpression",
      caption: "caption",
      customizeText: "customizeText",
      dataField: "dataField",
      dataType: "dataType",
      editorOptions: "editorOptions",
      editorTemplate: "editorTemplate",
      falseText: "falseText",
      filterOperations: "filterOperations",
      format: "format",
      lookup: "lookup",
      name: "name",
      trueText: "trueText"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridFieldComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridFieldComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-field",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    calculateFilterExpression: [{
      type: Input
    }],
    caption: [{
      type: Input
    }],
    customizeText: [{
      type: Input
    }],
    dataField: [{
      type: Input
    }],
    dataType: [{
      type: Input
    }],
    editorOptions: [{
      type: Input
    }],
    editorTemplate: [{
      type: Input
    }],
    falseText: [{
      type: Input
    }],
    filterOperations: [{
      type: Input
    }],
    format: [{
      type: Input
    }],
    lookup: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    trueText: [{
      type: Input
    }]
  });
})();
var DxiDataGridFieldModule = class _DxiDataGridFieldModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridFieldModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridFieldModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridFieldModule,
    declarations: [DxiDataGridFieldComponent],
    exports: [DxiDataGridFieldComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridFieldModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridFieldComponent],
      exports: [DxiDataGridFieldComponent]
    }]
  }], null, null);
})();
var DxoDataGridFieldLookupComponent = class _DxoDataGridFieldLookupComponent extends NestedOption {
  get allowClearing() {
    return this._getOption("allowClearing");
  }
  set allowClearing(value) {
    this._setOption("allowClearing", value);
  }
  get dataSource() {
    return this._getOption("dataSource");
  }
  set dataSource(value) {
    this._setOption("dataSource", value);
  }
  get displayExpr() {
    return this._getOption("displayExpr");
  }
  set displayExpr(value) {
    this._setOption("displayExpr", value);
  }
  get valueExpr() {
    return this._getOption("valueExpr");
  }
  set valueExpr(value) {
    this._setOption("valueExpr", value);
  }
  get _optionPath() {
    return "lookup";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridFieldLookupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFieldLookupComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridFieldLookupComponent,
    selectors: [["dxo-data-grid-field-lookup"]],
    inputs: {
      allowClearing: "allowClearing",
      dataSource: "dataSource",
      displayExpr: "displayExpr",
      valueExpr: "valueExpr"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridFieldLookupComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFieldLookupComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-field-lookup",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowClearing: [{
      type: Input
    }],
    dataSource: [{
      type: Input
    }],
    displayExpr: [{
      type: Input
    }],
    valueExpr: [{
      type: Input
    }]
  });
})();
var DxoDataGridFieldLookupModule = class _DxoDataGridFieldLookupModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridFieldLookupModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFieldLookupModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridFieldLookupModule,
    declarations: [DxoDataGridFieldLookupComponent],
    exports: [DxoDataGridFieldLookupComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFieldLookupModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridFieldLookupComponent],
      exports: [DxoDataGridFieldLookupComponent]
    }]
  }], null, null);
})();
var DxiDataGridToolbarItemComponent = class _DxiDataGridToolbarItemComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get html() {
    return this._getOption("html");
  }
  set html(value) {
    this._setOption("html", value);
  }
  get locateInMenu() {
    return this._getOption("locateInMenu");
  }
  set locateInMenu(value) {
    this._setOption("locateInMenu", value);
  }
  get location() {
    return this._getOption("location");
  }
  set location(value) {
    this._setOption("location", value);
  }
  get menuItemTemplate() {
    return this._getOption("menuItemTemplate");
  }
  set menuItemTemplate(value) {
    this._setOption("menuItemTemplate", value);
  }
  get options() {
    return this._getOption("options");
  }
  set options(value) {
    this._setOption("options", value);
  }
  get showText() {
    return this._getOption("showText");
  }
  set showText(value) {
    this._setOption("showText", value);
  }
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  get toolbar() {
    return this._getOption("toolbar");
  }
  set toolbar(value) {
    this._setOption("toolbar", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get widget() {
    return this._getOption("widget");
  }
  set widget(value) {
    this._setOption("widget", value);
  }
  get _optionPath() {
    return "toolbarItems";
  }
  constructor(parentOptionHost, optionHost, renderer, document, templateHost, element) {
    super();
    this.renderer = renderer;
    this.document = document;
    this.element = element;
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    templateHost.setHost(this);
  }
  setTemplate(template) {
    this.template = template;
  }
  ngAfterViewInit() {
    extractTemplate(this, this.element, this.renderer, this.document);
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridToolbarItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridToolbarItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridToolbarItemComponent,
    selectors: [["dxi-data-grid-toolbar-item"]],
    inputs: {
      cssClass: "cssClass",
      disabled: "disabled",
      html: "html",
      locateInMenu: "locateInMenu",
      location: "location",
      menuItemTemplate: "menuItemTemplate",
      options: "options",
      showText: "showText",
      template: "template",
      text: "text",
      toolbar: "toolbar",
      visible: "visible",
      widget: "widget"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiDataGridToolbarItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridToolbarItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-toolbar-item",
      template: "<ng-content></ng-content>",
      providers: [NestedOptionHost, DxTemplateHost],
      styles: [":host{display:block}\n"]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: Renderer2
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: DxTemplateHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: ElementRef
  }], {
    cssClass: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    html: [{
      type: Input
    }],
    locateInMenu: [{
      type: Input
    }],
    location: [{
      type: Input
    }],
    menuItemTemplate: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    showText: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    toolbar: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    widget: [{
      type: Input
    }]
  });
})();
var DxiDataGridToolbarItemModule = class _DxiDataGridToolbarItemModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridToolbarItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridToolbarItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridToolbarItemModule,
    declarations: [DxiDataGridToolbarItemComponent],
    exports: [DxiDataGridToolbarItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridToolbarItemModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridToolbarItemComponent],
      exports: [DxiDataGridToolbarItemComponent]
    }]
  }], null, null);
})();
var DxoDataGridFilterBuilderPopupComponent = class _DxoDataGridFilterBuilderPopupComponent extends NestedOption {
  get accessKey() {
    return this._getOption("accessKey");
  }
  set accessKey(value) {
    this._setOption("accessKey", value);
  }
  get animation() {
    return this._getOption("animation");
  }
  set animation(value) {
    this._setOption("animation", value);
  }
  get closeOnOutsideClick() {
    return this._getOption("closeOnOutsideClick");
  }
  set closeOnOutsideClick(value) {
    this._setOption("closeOnOutsideClick", value);
  }
  get container() {
    return this._getOption("container");
  }
  set container(value) {
    this._setOption("container", value);
  }
  get contentTemplate() {
    return this._getOption("contentTemplate");
  }
  set contentTemplate(value) {
    this._setOption("contentTemplate", value);
  }
  get deferRendering() {
    return this._getOption("deferRendering");
  }
  set deferRendering(value) {
    this._setOption("deferRendering", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get dragAndResizeArea() {
    return this._getOption("dragAndResizeArea");
  }
  set dragAndResizeArea(value) {
    this._setOption("dragAndResizeArea", value);
  }
  get dragEnabled() {
    return this._getOption("dragEnabled");
  }
  set dragEnabled(value) {
    this._setOption("dragEnabled", value);
  }
  get dragOutsideBoundary() {
    return this._getOption("dragOutsideBoundary");
  }
  set dragOutsideBoundary(value) {
    this._setOption("dragOutsideBoundary", value);
  }
  get enableBodyScroll() {
    return this._getOption("enableBodyScroll");
  }
  set enableBodyScroll(value) {
    this._setOption("enableBodyScroll", value);
  }
  get focusStateEnabled() {
    return this._getOption("focusStateEnabled");
  }
  set focusStateEnabled(value) {
    this._setOption("focusStateEnabled", value);
  }
  get fullScreen() {
    return this._getOption("fullScreen");
  }
  set fullScreen(value) {
    this._setOption("fullScreen", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  get hideOnOutsideClick() {
    return this._getOption("hideOnOutsideClick");
  }
  set hideOnOutsideClick(value) {
    this._setOption("hideOnOutsideClick", value);
  }
  get hideOnParentScroll() {
    return this._getOption("hideOnParentScroll");
  }
  set hideOnParentScroll(value) {
    this._setOption("hideOnParentScroll", value);
  }
  get hint() {
    return this._getOption("hint");
  }
  set hint(value) {
    this._setOption("hint", value);
  }
  get hoverStateEnabled() {
    return this._getOption("hoverStateEnabled");
  }
  set hoverStateEnabled(value) {
    this._setOption("hoverStateEnabled", value);
  }
  get maxHeight() {
    return this._getOption("maxHeight");
  }
  set maxHeight(value) {
    this._setOption("maxHeight", value);
  }
  get maxWidth() {
    return this._getOption("maxWidth");
  }
  set maxWidth(value) {
    this._setOption("maxWidth", value);
  }
  get minHeight() {
    return this._getOption("minHeight");
  }
  set minHeight(value) {
    this._setOption("minHeight", value);
  }
  get minWidth() {
    return this._getOption("minWidth");
  }
  set minWidth(value) {
    this._setOption("minWidth", value);
  }
  get onContentReady() {
    return this._getOption("onContentReady");
  }
  set onContentReady(value) {
    this._setOption("onContentReady", value);
  }
  get onDisposing() {
    return this._getOption("onDisposing");
  }
  set onDisposing(value) {
    this._setOption("onDisposing", value);
  }
  get onHidden() {
    return this._getOption("onHidden");
  }
  set onHidden(value) {
    this._setOption("onHidden", value);
  }
  get onHiding() {
    return this._getOption("onHiding");
  }
  set onHiding(value) {
    this._setOption("onHiding", value);
  }
  get onInitialized() {
    return this._getOption("onInitialized");
  }
  set onInitialized(value) {
    this._setOption("onInitialized", value);
  }
  get onOptionChanged() {
    return this._getOption("onOptionChanged");
  }
  set onOptionChanged(value) {
    this._setOption("onOptionChanged", value);
  }
  get onResize() {
    return this._getOption("onResize");
  }
  set onResize(value) {
    this._setOption("onResize", value);
  }
  get onResizeEnd() {
    return this._getOption("onResizeEnd");
  }
  set onResizeEnd(value) {
    this._setOption("onResizeEnd", value);
  }
  get onResizeStart() {
    return this._getOption("onResizeStart");
  }
  set onResizeStart(value) {
    this._setOption("onResizeStart", value);
  }
  get onShowing() {
    return this._getOption("onShowing");
  }
  set onShowing(value) {
    this._setOption("onShowing", value);
  }
  get onShown() {
    return this._getOption("onShown");
  }
  set onShown(value) {
    this._setOption("onShown", value);
  }
  get onTitleRendered() {
    return this._getOption("onTitleRendered");
  }
  set onTitleRendered(value) {
    this._setOption("onTitleRendered", value);
  }
  get position() {
    return this._getOption("position");
  }
  set position(value) {
    this._setOption("position", value);
  }
  get resizeEnabled() {
    return this._getOption("resizeEnabled");
  }
  set resizeEnabled(value) {
    this._setOption("resizeEnabled", value);
  }
  get restorePosition() {
    return this._getOption("restorePosition");
  }
  set restorePosition(value) {
    this._setOption("restorePosition", value);
  }
  get rtlEnabled() {
    return this._getOption("rtlEnabled");
  }
  set rtlEnabled(value) {
    this._setOption("rtlEnabled", value);
  }
  get shading() {
    return this._getOption("shading");
  }
  set shading(value) {
    this._setOption("shading", value);
  }
  get shadingColor() {
    return this._getOption("shadingColor");
  }
  set shadingColor(value) {
    this._setOption("shadingColor", value);
  }
  get showCloseButton() {
    return this._getOption("showCloseButton");
  }
  set showCloseButton(value) {
    this._setOption("showCloseButton", value);
  }
  get showTitle() {
    return this._getOption("showTitle");
  }
  set showTitle(value) {
    this._setOption("showTitle", value);
  }
  get tabIndex() {
    return this._getOption("tabIndex");
  }
  set tabIndex(value) {
    this._setOption("tabIndex", value);
  }
  get title() {
    return this._getOption("title");
  }
  set title(value) {
    this._setOption("title", value);
  }
  get titleTemplate() {
    return this._getOption("titleTemplate");
  }
  set titleTemplate(value) {
    this._setOption("titleTemplate", value);
  }
  get toolbarItems() {
    return this._getOption("toolbarItems");
  }
  set toolbarItems(value) {
    this._setOption("toolbarItems", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  get wrapperAttr() {
    return this._getOption("wrapperAttr");
  }
  set wrapperAttr(value) {
    this._setOption("wrapperAttr", value);
  }
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  heightChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  positionChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  visibleChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  widthChange;
  get _optionPath() {
    return "filterBuilderPopup";
  }
  get toolbarItemsChildren() {
    return this._getOption("toolbarItems");
  }
  set toolbarItemsChildren(value) {
    this.setChildren("toolbarItems", value);
  }
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "heightChange"
    }, {
      emit: "positionChange"
    }, {
      emit: "visibleChange"
    }, {
      emit: "widthChange"
    }]);
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridFilterBuilderPopupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFilterBuilderPopupComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridFilterBuilderPopupComponent,
    selectors: [["dxo-data-grid-filter-builder-popup"]],
    contentQueries: function DxoDataGridFilterBuilderPopupComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, DxiDataGridToolbarItemComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.toolbarItemsChildren = _t);
      }
    },
    inputs: {
      accessKey: "accessKey",
      animation: "animation",
      closeOnOutsideClick: "closeOnOutsideClick",
      container: "container",
      contentTemplate: "contentTemplate",
      deferRendering: "deferRendering",
      disabled: "disabled",
      dragAndResizeArea: "dragAndResizeArea",
      dragEnabled: "dragEnabled",
      dragOutsideBoundary: "dragOutsideBoundary",
      enableBodyScroll: "enableBodyScroll",
      focusStateEnabled: "focusStateEnabled",
      fullScreen: "fullScreen",
      height: "height",
      hideOnOutsideClick: "hideOnOutsideClick",
      hideOnParentScroll: "hideOnParentScroll",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      maxHeight: "maxHeight",
      maxWidth: "maxWidth",
      minHeight: "minHeight",
      minWidth: "minWidth",
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onHidden: "onHidden",
      onHiding: "onHiding",
      onInitialized: "onInitialized",
      onOptionChanged: "onOptionChanged",
      onResize: "onResize",
      onResizeEnd: "onResizeEnd",
      onResizeStart: "onResizeStart",
      onShowing: "onShowing",
      onShown: "onShown",
      onTitleRendered: "onTitleRendered",
      position: "position",
      resizeEnabled: "resizeEnabled",
      restorePosition: "restorePosition",
      rtlEnabled: "rtlEnabled",
      shading: "shading",
      shadingColor: "shadingColor",
      showCloseButton: "showCloseButton",
      showTitle: "showTitle",
      tabIndex: "tabIndex",
      title: "title",
      titleTemplate: "titleTemplate",
      toolbarItems: "toolbarItems",
      visible: "visible",
      width: "width",
      wrapperAttr: "wrapperAttr"
    },
    outputs: {
      heightChange: "heightChange",
      positionChange: "positionChange",
      visibleChange: "visibleChange",
      widthChange: "widthChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridFilterBuilderPopupComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFilterBuilderPopupComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-filter-builder-popup",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    accessKey: [{
      type: Input
    }],
    animation: [{
      type: Input
    }],
    closeOnOutsideClick: [{
      type: Input
    }],
    container: [{
      type: Input
    }],
    contentTemplate: [{
      type: Input
    }],
    deferRendering: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    dragAndResizeArea: [{
      type: Input
    }],
    dragEnabled: [{
      type: Input
    }],
    dragOutsideBoundary: [{
      type: Input
    }],
    enableBodyScroll: [{
      type: Input
    }],
    focusStateEnabled: [{
      type: Input
    }],
    fullScreen: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    hideOnOutsideClick: [{
      type: Input
    }],
    hideOnParentScroll: [{
      type: Input
    }],
    hint: [{
      type: Input
    }],
    hoverStateEnabled: [{
      type: Input
    }],
    maxHeight: [{
      type: Input
    }],
    maxWidth: [{
      type: Input
    }],
    minHeight: [{
      type: Input
    }],
    minWidth: [{
      type: Input
    }],
    onContentReady: [{
      type: Input
    }],
    onDisposing: [{
      type: Input
    }],
    onHidden: [{
      type: Input
    }],
    onHiding: [{
      type: Input
    }],
    onInitialized: [{
      type: Input
    }],
    onOptionChanged: [{
      type: Input
    }],
    onResize: [{
      type: Input
    }],
    onResizeEnd: [{
      type: Input
    }],
    onResizeStart: [{
      type: Input
    }],
    onShowing: [{
      type: Input
    }],
    onShown: [{
      type: Input
    }],
    onTitleRendered: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    resizeEnabled: [{
      type: Input
    }],
    restorePosition: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    shading: [{
      type: Input
    }],
    shadingColor: [{
      type: Input
    }],
    showCloseButton: [{
      type: Input
    }],
    showTitle: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    titleTemplate: [{
      type: Input
    }],
    toolbarItems: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    wrapperAttr: [{
      type: Input
    }],
    heightChange: [{
      type: Output
    }],
    positionChange: [{
      type: Output
    }],
    visibleChange: [{
      type: Output
    }],
    widthChange: [{
      type: Output
    }],
    toolbarItemsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridToolbarItemComponent)]
    }]
  });
})();
var DxoDataGridFilterBuilderPopupModule = class _DxoDataGridFilterBuilderPopupModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridFilterBuilderPopupModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFilterBuilderPopupModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridFilterBuilderPopupModule,
    declarations: [DxoDataGridFilterBuilderPopupComponent],
    exports: [DxoDataGridFilterBuilderPopupComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFilterBuilderPopupModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridFilterBuilderPopupComponent],
      exports: [DxoDataGridFilterBuilderPopupComponent]
    }]
  }], null, null);
})();
var DxoDataGridFilterBuilderComponent = class _DxoDataGridFilterBuilderComponent extends NestedOption {
  get accessKey() {
    return this._getOption("accessKey");
  }
  set accessKey(value) {
    this._setOption("accessKey", value);
  }
  get activeStateEnabled() {
    return this._getOption("activeStateEnabled");
  }
  set activeStateEnabled(value) {
    this._setOption("activeStateEnabled", value);
  }
  get allowHierarchicalFields() {
    return this._getOption("allowHierarchicalFields");
  }
  set allowHierarchicalFields(value) {
    this._setOption("allowHierarchicalFields", value);
  }
  get customOperations() {
    return this._getOption("customOperations");
  }
  set customOperations(value) {
    this._setOption("customOperations", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get elementAttr() {
    return this._getOption("elementAttr");
  }
  set elementAttr(value) {
    this._setOption("elementAttr", value);
  }
  get fields() {
    return this._getOption("fields");
  }
  set fields(value) {
    this._setOption("fields", value);
  }
  get filterOperationDescriptions() {
    return this._getOption("filterOperationDescriptions");
  }
  set filterOperationDescriptions(value) {
    this._setOption("filterOperationDescriptions", value);
  }
  get focusStateEnabled() {
    return this._getOption("focusStateEnabled");
  }
  set focusStateEnabled(value) {
    this._setOption("focusStateEnabled", value);
  }
  get groupOperationDescriptions() {
    return this._getOption("groupOperationDescriptions");
  }
  set groupOperationDescriptions(value) {
    this._setOption("groupOperationDescriptions", value);
  }
  get groupOperations() {
    return this._getOption("groupOperations");
  }
  set groupOperations(value) {
    this._setOption("groupOperations", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  get hint() {
    return this._getOption("hint");
  }
  set hint(value) {
    this._setOption("hint", value);
  }
  get hoverStateEnabled() {
    return this._getOption("hoverStateEnabled");
  }
  set hoverStateEnabled(value) {
    this._setOption("hoverStateEnabled", value);
  }
  get maxGroupLevel() {
    return this._getOption("maxGroupLevel");
  }
  set maxGroupLevel(value) {
    this._setOption("maxGroupLevel", value);
  }
  get onContentReady() {
    return this._getOption("onContentReady");
  }
  set onContentReady(value) {
    this._setOption("onContentReady", value);
  }
  get onDisposing() {
    return this._getOption("onDisposing");
  }
  set onDisposing(value) {
    this._setOption("onDisposing", value);
  }
  get onEditorPrepared() {
    return this._getOption("onEditorPrepared");
  }
  set onEditorPrepared(value) {
    this._setOption("onEditorPrepared", value);
  }
  get onEditorPreparing() {
    return this._getOption("onEditorPreparing");
  }
  set onEditorPreparing(value) {
    this._setOption("onEditorPreparing", value);
  }
  get onInitialized() {
    return this._getOption("onInitialized");
  }
  set onInitialized(value) {
    this._setOption("onInitialized", value);
  }
  get onOptionChanged() {
    return this._getOption("onOptionChanged");
  }
  set onOptionChanged(value) {
    this._setOption("onOptionChanged", value);
  }
  get onValueChanged() {
    return this._getOption("onValueChanged");
  }
  set onValueChanged(value) {
    this._setOption("onValueChanged", value);
  }
  get rtlEnabled() {
    return this._getOption("rtlEnabled");
  }
  set rtlEnabled(value) {
    this._setOption("rtlEnabled", value);
  }
  get tabIndex() {
    return this._getOption("tabIndex");
  }
  set tabIndex(value) {
    this._setOption("tabIndex", value);
  }
  get value() {
    return this._getOption("value");
  }
  set value(value) {
    this._setOption("value", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  valueChange;
  get _optionPath() {
    return "filterBuilder";
  }
  get customOperationsChildren() {
    return this._getOption("customOperations");
  }
  set customOperationsChildren(value) {
    this.setChildren("customOperations", value);
  }
  get fieldsChildren() {
    return this._getOption("fields");
  }
  set fieldsChildren(value) {
    this.setChildren("fields", value);
  }
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "valueChange"
    }]);
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridFilterBuilderComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFilterBuilderComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridFilterBuilderComponent,
    selectors: [["dxo-data-grid-filter-builder"]],
    contentQueries: function DxoDataGridFilterBuilderComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, DxiDataGridCustomOperationComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridFieldComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.customOperationsChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.fieldsChildren = _t);
      }
    },
    inputs: {
      accessKey: "accessKey",
      activeStateEnabled: "activeStateEnabled",
      allowHierarchicalFields: "allowHierarchicalFields",
      customOperations: "customOperations",
      disabled: "disabled",
      elementAttr: "elementAttr",
      fields: "fields",
      filterOperationDescriptions: "filterOperationDescriptions",
      focusStateEnabled: "focusStateEnabled",
      groupOperationDescriptions: "groupOperationDescriptions",
      groupOperations: "groupOperations",
      height: "height",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      maxGroupLevel: "maxGroupLevel",
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onEditorPrepared: "onEditorPrepared",
      onEditorPreparing: "onEditorPreparing",
      onInitialized: "onInitialized",
      onOptionChanged: "onOptionChanged",
      onValueChanged: "onValueChanged",
      rtlEnabled: "rtlEnabled",
      tabIndex: "tabIndex",
      value: "value",
      visible: "visible",
      width: "width"
    },
    outputs: {
      valueChange: "valueChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridFilterBuilderComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFilterBuilderComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-filter-builder",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    accessKey: [{
      type: Input
    }],
    activeStateEnabled: [{
      type: Input
    }],
    allowHierarchicalFields: [{
      type: Input
    }],
    customOperations: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    elementAttr: [{
      type: Input
    }],
    fields: [{
      type: Input
    }],
    filterOperationDescriptions: [{
      type: Input
    }],
    focusStateEnabled: [{
      type: Input
    }],
    groupOperationDescriptions: [{
      type: Input
    }],
    groupOperations: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    hint: [{
      type: Input
    }],
    hoverStateEnabled: [{
      type: Input
    }],
    maxGroupLevel: [{
      type: Input
    }],
    onContentReady: [{
      type: Input
    }],
    onDisposing: [{
      type: Input
    }],
    onEditorPrepared: [{
      type: Input
    }],
    onEditorPreparing: [{
      type: Input
    }],
    onInitialized: [{
      type: Input
    }],
    onOptionChanged: [{
      type: Input
    }],
    onValueChanged: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    valueChange: [{
      type: Output
    }],
    customOperationsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridCustomOperationComponent)]
    }],
    fieldsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridFieldComponent)]
    }]
  });
})();
var DxoDataGridFilterBuilderModule = class _DxoDataGridFilterBuilderModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridFilterBuilderModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFilterBuilderModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridFilterBuilderModule,
    declarations: [DxoDataGridFilterBuilderComponent],
    exports: [DxoDataGridFilterBuilderComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFilterBuilderModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridFilterBuilderComponent],
      exports: [DxoDataGridFilterBuilderComponent]
    }]
  }], null, null);
})();
var DxoDataGridFilterOperationDescriptionsComponent = class _DxoDataGridFilterOperationDescriptionsComponent extends NestedOption {
  get between() {
    return this._getOption("between");
  }
  set between(value) {
    this._setOption("between", value);
  }
  get contains() {
    return this._getOption("contains");
  }
  set contains(value) {
    this._setOption("contains", value);
  }
  get endsWith() {
    return this._getOption("endsWith");
  }
  set endsWith(value) {
    this._setOption("endsWith", value);
  }
  get equal() {
    return this._getOption("equal");
  }
  set equal(value) {
    this._setOption("equal", value);
  }
  get greaterThan() {
    return this._getOption("greaterThan");
  }
  set greaterThan(value) {
    this._setOption("greaterThan", value);
  }
  get greaterThanOrEqual() {
    return this._getOption("greaterThanOrEqual");
  }
  set greaterThanOrEqual(value) {
    this._setOption("greaterThanOrEqual", value);
  }
  get isBlank() {
    return this._getOption("isBlank");
  }
  set isBlank(value) {
    this._setOption("isBlank", value);
  }
  get isNotBlank() {
    return this._getOption("isNotBlank");
  }
  set isNotBlank(value) {
    this._setOption("isNotBlank", value);
  }
  get lessThan() {
    return this._getOption("lessThan");
  }
  set lessThan(value) {
    this._setOption("lessThan", value);
  }
  get lessThanOrEqual() {
    return this._getOption("lessThanOrEqual");
  }
  set lessThanOrEqual(value) {
    this._setOption("lessThanOrEqual", value);
  }
  get notContains() {
    return this._getOption("notContains");
  }
  set notContains(value) {
    this._setOption("notContains", value);
  }
  get notEqual() {
    return this._getOption("notEqual");
  }
  set notEqual(value) {
    this._setOption("notEqual", value);
  }
  get startsWith() {
    return this._getOption("startsWith");
  }
  set startsWith(value) {
    this._setOption("startsWith", value);
  }
  get _optionPath() {
    return "filterOperationDescriptions";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridFilterOperationDescriptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFilterOperationDescriptionsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridFilterOperationDescriptionsComponent,
    selectors: [["dxo-data-grid-filter-operation-descriptions"]],
    inputs: {
      between: "between",
      contains: "contains",
      endsWith: "endsWith",
      equal: "equal",
      greaterThan: "greaterThan",
      greaterThanOrEqual: "greaterThanOrEqual",
      isBlank: "isBlank",
      isNotBlank: "isNotBlank",
      lessThan: "lessThan",
      lessThanOrEqual: "lessThanOrEqual",
      notContains: "notContains",
      notEqual: "notEqual",
      startsWith: "startsWith"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridFilterOperationDescriptionsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFilterOperationDescriptionsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-filter-operation-descriptions",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    between: [{
      type: Input
    }],
    contains: [{
      type: Input
    }],
    endsWith: [{
      type: Input
    }],
    equal: [{
      type: Input
    }],
    greaterThan: [{
      type: Input
    }],
    greaterThanOrEqual: [{
      type: Input
    }],
    isBlank: [{
      type: Input
    }],
    isNotBlank: [{
      type: Input
    }],
    lessThan: [{
      type: Input
    }],
    lessThanOrEqual: [{
      type: Input
    }],
    notContains: [{
      type: Input
    }],
    notEqual: [{
      type: Input
    }],
    startsWith: [{
      type: Input
    }]
  });
})();
var DxoDataGridFilterOperationDescriptionsModule = class _DxoDataGridFilterOperationDescriptionsModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridFilterOperationDescriptionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFilterOperationDescriptionsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridFilterOperationDescriptionsModule,
    declarations: [DxoDataGridFilterOperationDescriptionsComponent],
    exports: [DxoDataGridFilterOperationDescriptionsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFilterOperationDescriptionsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridFilterOperationDescriptionsComponent],
      exports: [DxoDataGridFilterOperationDescriptionsComponent]
    }]
  }], null, null);
})();
var DxoDataGridFilterPanelTextsComponent = class _DxoDataGridFilterPanelTextsComponent extends NestedOption {
  get clearFilter() {
    return this._getOption("clearFilter");
  }
  set clearFilter(value) {
    this._setOption("clearFilter", value);
  }
  get createFilter() {
    return this._getOption("createFilter");
  }
  set createFilter(value) {
    this._setOption("createFilter", value);
  }
  get filterEnabledHint() {
    return this._getOption("filterEnabledHint");
  }
  set filterEnabledHint(value) {
    this._setOption("filterEnabledHint", value);
  }
  get _optionPath() {
    return "texts";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridFilterPanelTextsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFilterPanelTextsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridFilterPanelTextsComponent,
    selectors: [["dxo-data-grid-filter-panel-texts"]],
    inputs: {
      clearFilter: "clearFilter",
      createFilter: "createFilter",
      filterEnabledHint: "filterEnabledHint"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridFilterPanelTextsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFilterPanelTextsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-filter-panel-texts",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    clearFilter: [{
      type: Input
    }],
    createFilter: [{
      type: Input
    }],
    filterEnabledHint: [{
      type: Input
    }]
  });
})();
var DxoDataGridFilterPanelTextsModule = class _DxoDataGridFilterPanelTextsModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridFilterPanelTextsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFilterPanelTextsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridFilterPanelTextsModule,
    declarations: [DxoDataGridFilterPanelTextsComponent],
    exports: [DxoDataGridFilterPanelTextsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFilterPanelTextsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridFilterPanelTextsComponent],
      exports: [DxoDataGridFilterPanelTextsComponent]
    }]
  }], null, null);
})();
var DxoDataGridFilterPanelComponent = class _DxoDataGridFilterPanelComponent extends NestedOption {
  get customizeText() {
    return this._getOption("customizeText");
  }
  set customizeText(value) {
    this._setOption("customizeText", value);
  }
  get filterEnabled() {
    return this._getOption("filterEnabled");
  }
  set filterEnabled(value) {
    this._setOption("filterEnabled", value);
  }
  get texts() {
    return this._getOption("texts");
  }
  set texts(value) {
    this._setOption("texts", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  filterEnabledChange;
  get _optionPath() {
    return "filterPanel";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "filterEnabledChange"
    }]);
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridFilterPanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFilterPanelComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridFilterPanelComponent,
    selectors: [["dxo-data-grid-filter-panel"]],
    inputs: {
      customizeText: "customizeText",
      filterEnabled: "filterEnabled",
      texts: "texts",
      visible: "visible"
    },
    outputs: {
      filterEnabledChange: "filterEnabledChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridFilterPanelComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFilterPanelComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-filter-panel",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    customizeText: [{
      type: Input
    }],
    filterEnabled: [{
      type: Input
    }],
    texts: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    filterEnabledChange: [{
      type: Output
    }]
  });
})();
var DxoDataGridFilterPanelModule = class _DxoDataGridFilterPanelModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridFilterPanelModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFilterPanelModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridFilterPanelModule,
    declarations: [DxoDataGridFilterPanelComponent],
    exports: [DxoDataGridFilterPanelComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFilterPanelModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridFilterPanelComponent],
      exports: [DxoDataGridFilterPanelComponent]
    }]
  }], null, null);
})();
var DxoDataGridFilterRowComponent = class _DxoDataGridFilterRowComponent extends NestedOption {
  get applyFilter() {
    return this._getOption("applyFilter");
  }
  set applyFilter(value) {
    this._setOption("applyFilter", value);
  }
  get applyFilterText() {
    return this._getOption("applyFilterText");
  }
  set applyFilterText(value) {
    this._setOption("applyFilterText", value);
  }
  get betweenEndText() {
    return this._getOption("betweenEndText");
  }
  set betweenEndText(value) {
    this._setOption("betweenEndText", value);
  }
  get betweenStartText() {
    return this._getOption("betweenStartText");
  }
  set betweenStartText(value) {
    this._setOption("betweenStartText", value);
  }
  get operationDescriptions() {
    return this._getOption("operationDescriptions");
  }
  set operationDescriptions(value) {
    this._setOption("operationDescriptions", value);
  }
  get resetOperationText() {
    return this._getOption("resetOperationText");
  }
  set resetOperationText(value) {
    this._setOption("resetOperationText", value);
  }
  get showAllText() {
    return this._getOption("showAllText");
  }
  set showAllText(value) {
    this._setOption("showAllText", value);
  }
  get showOperationChooser() {
    return this._getOption("showOperationChooser");
  }
  set showOperationChooser(value) {
    this._setOption("showOperationChooser", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get _optionPath() {
    return "filterRow";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridFilterRowComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFilterRowComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridFilterRowComponent,
    selectors: [["dxo-data-grid-filter-row"]],
    inputs: {
      applyFilter: "applyFilter",
      applyFilterText: "applyFilterText",
      betweenEndText: "betweenEndText",
      betweenStartText: "betweenStartText",
      operationDescriptions: "operationDescriptions",
      resetOperationText: "resetOperationText",
      showAllText: "showAllText",
      showOperationChooser: "showOperationChooser",
      visible: "visible"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridFilterRowComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFilterRowComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-filter-row",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    applyFilter: [{
      type: Input
    }],
    applyFilterText: [{
      type: Input
    }],
    betweenEndText: [{
      type: Input
    }],
    betweenStartText: [{
      type: Input
    }],
    operationDescriptions: [{
      type: Input
    }],
    resetOperationText: [{
      type: Input
    }],
    showAllText: [{
      type: Input
    }],
    showOperationChooser: [{
      type: Input
    }],
    visible: [{
      type: Input
    }]
  });
})();
var DxoDataGridFilterRowModule = class _DxoDataGridFilterRowModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridFilterRowModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFilterRowModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridFilterRowModule,
    declarations: [DxoDataGridFilterRowComponent],
    exports: [DxoDataGridFilterRowComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFilterRowModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridFilterRowComponent],
      exports: [DxoDataGridFilterRowComponent]
    }]
  }], null, null);
})();
var DxoDataGridFormItemComponent = class _DxoDataGridFormItemComponent extends NestedOption {
  renderer;
  document;
  element;
  get colSpan() {
    return this._getOption("colSpan");
  }
  set colSpan(value) {
    this._setOption("colSpan", value);
  }
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get dataField() {
    return this._getOption("dataField");
  }
  set dataField(value) {
    this._setOption("dataField", value);
  }
  get editorOptions() {
    return this._getOption("editorOptions");
  }
  set editorOptions(value) {
    this._setOption("editorOptions", value);
  }
  get editorType() {
    return this._getOption("editorType");
  }
  set editorType(value) {
    this._setOption("editorType", value);
  }
  get helpText() {
    return this._getOption("helpText");
  }
  set helpText(value) {
    this._setOption("helpText", value);
  }
  get isRequired() {
    return this._getOption("isRequired");
  }
  set isRequired(value) {
    this._setOption("isRequired", value);
  }
  get itemType() {
    return this._getOption("itemType");
  }
  set itemType(value) {
    this._setOption("itemType", value);
  }
  get label() {
    return this._getOption("label");
  }
  set label(value) {
    this._setOption("label", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  get validationRules() {
    return this._getOption("validationRules");
  }
  set validationRules(value) {
    this._setOption("validationRules", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get visibleIndex() {
    return this._getOption("visibleIndex");
  }
  set visibleIndex(value) {
    this._setOption("visibleIndex", value);
  }
  get _optionPath() {
    return "formItem";
  }
  get asyncRulesChildren() {
    return this._getOption("validationRules");
  }
  set asyncRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get compareRulesChildren() {
    return this._getOption("validationRules");
  }
  set compareRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get customRulesChildren() {
    return this._getOption("validationRules");
  }
  set customRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get emailRulesChildren() {
    return this._getOption("validationRules");
  }
  set emailRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get numericRulesChildren() {
    return this._getOption("validationRules");
  }
  set numericRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get patternRulesChildren() {
    return this._getOption("validationRules");
  }
  set patternRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get rangeRulesChildren() {
    return this._getOption("validationRules");
  }
  set rangeRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get requiredRulesChildren() {
    return this._getOption("validationRules");
  }
  set requiredRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get stringLengthRulesChildren() {
    return this._getOption("validationRules");
  }
  set stringLengthRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  get validationRulesChildren() {
    return this._getOption("validationRules");
  }
  set validationRulesChildren(value) {
    this.setChildren("validationRules", value);
  }
  constructor(parentOptionHost, optionHost, renderer, document, templateHost, element) {
    super();
    this.renderer = renderer;
    this.document = document;
    this.element = element;
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    templateHost.setHost(this);
  }
  setTemplate(template) {
    this.template = template;
  }
  ngAfterViewInit() {
    extractTemplate(this, this.element, this.renderer, this.document);
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridFormItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFormItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridFormItemComponent,
    selectors: [["dxo-data-grid-form-item"]],
    contentQueries: function DxoDataGridFormItemComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, DxiDataGridAsyncRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridCompareRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridCustomRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridEmailRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridNumericRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridPatternRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridRangeRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridRequiredRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridStringLengthRuleComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridValidationRuleComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.asyncRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.compareRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.customRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.emailRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.numericRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.patternRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.rangeRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.requiredRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.stringLengthRulesChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.validationRulesChildren = _t);
      }
    },
    inputs: {
      colSpan: "colSpan",
      cssClass: "cssClass",
      dataField: "dataField",
      editorOptions: "editorOptions",
      editorType: "editorType",
      helpText: "helpText",
      isRequired: "isRequired",
      itemType: "itemType",
      label: "label",
      name: "name",
      template: "template",
      validationRules: "validationRules",
      visible: "visible",
      visibleIndex: "visibleIndex"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxoDataGridFormItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFormItemComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-form-item",
      template: "<ng-content></ng-content>",
      providers: [NestedOptionHost, DxTemplateHost],
      styles: [":host{display:block}\n"]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: Renderer2
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: DxTemplateHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: ElementRef
  }], {
    colSpan: [{
      type: Input
    }],
    cssClass: [{
      type: Input
    }],
    dataField: [{
      type: Input
    }],
    editorOptions: [{
      type: Input
    }],
    editorType: [{
      type: Input
    }],
    helpText: [{
      type: Input
    }],
    isRequired: [{
      type: Input
    }],
    itemType: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    validationRules: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    visibleIndex: [{
      type: Input
    }],
    asyncRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridAsyncRuleComponent)]
    }],
    compareRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridCompareRuleComponent)]
    }],
    customRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridCustomRuleComponent)]
    }],
    emailRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridEmailRuleComponent)]
    }],
    numericRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridNumericRuleComponent)]
    }],
    patternRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridPatternRuleComponent)]
    }],
    rangeRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridRangeRuleComponent)]
    }],
    requiredRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridRequiredRuleComponent)]
    }],
    stringLengthRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridStringLengthRuleComponent)]
    }],
    validationRulesChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridValidationRuleComponent)]
    }]
  });
})();
var DxoDataGridFormItemModule = class _DxoDataGridFormItemModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridFormItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFormItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridFormItemModule,
    declarations: [DxoDataGridFormItemComponent],
    exports: [DxoDataGridFormItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFormItemModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridFormItemComponent],
      exports: [DxoDataGridFormItemComponent]
    }]
  }], null, null);
})();
var DxoDataGridFormComponent = class _DxoDataGridFormComponent extends NestedOption {
  get accessKey() {
    return this._getOption("accessKey");
  }
  set accessKey(value) {
    this._setOption("accessKey", value);
  }
  get activeStateEnabled() {
    return this._getOption("activeStateEnabled");
  }
  set activeStateEnabled(value) {
    this._setOption("activeStateEnabled", value);
  }
  get alignItemLabels() {
    return this._getOption("alignItemLabels");
  }
  set alignItemLabels(value) {
    this._setOption("alignItemLabels", value);
  }
  get alignItemLabelsInAllGroups() {
    return this._getOption("alignItemLabelsInAllGroups");
  }
  set alignItemLabelsInAllGroups(value) {
    this._setOption("alignItemLabelsInAllGroups", value);
  }
  get colCount() {
    return this._getOption("colCount");
  }
  set colCount(value) {
    this._setOption("colCount", value);
  }
  get colCountByScreen() {
    return this._getOption("colCountByScreen");
  }
  set colCountByScreen(value) {
    this._setOption("colCountByScreen", value);
  }
  get customizeItem() {
    return this._getOption("customizeItem");
  }
  set customizeItem(value) {
    this._setOption("customizeItem", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get elementAttr() {
    return this._getOption("elementAttr");
  }
  set elementAttr(value) {
    this._setOption("elementAttr", value);
  }
  get focusStateEnabled() {
    return this._getOption("focusStateEnabled");
  }
  set focusStateEnabled(value) {
    this._setOption("focusStateEnabled", value);
  }
  get formData() {
    return this._getOption("formData");
  }
  set formData(value) {
    this._setOption("formData", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  get hint() {
    return this._getOption("hint");
  }
  set hint(value) {
    this._setOption("hint", value);
  }
  get hoverStateEnabled() {
    return this._getOption("hoverStateEnabled");
  }
  set hoverStateEnabled(value) {
    this._setOption("hoverStateEnabled", value);
  }
  get isDirty() {
    return this._getOption("isDirty");
  }
  set isDirty(value) {
    this._setOption("isDirty", value);
  }
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  get labelLocation() {
    return this._getOption("labelLocation");
  }
  set labelLocation(value) {
    this._setOption("labelLocation", value);
  }
  get labelMode() {
    return this._getOption("labelMode");
  }
  set labelMode(value) {
    this._setOption("labelMode", value);
  }
  get minColWidth() {
    return this._getOption("minColWidth");
  }
  set minColWidth(value) {
    this._setOption("minColWidth", value);
  }
  get onContentReady() {
    return this._getOption("onContentReady");
  }
  set onContentReady(value) {
    this._setOption("onContentReady", value);
  }
  get onDisposing() {
    return this._getOption("onDisposing");
  }
  set onDisposing(value) {
    this._setOption("onDisposing", value);
  }
  get onEditorEnterKey() {
    return this._getOption("onEditorEnterKey");
  }
  set onEditorEnterKey(value) {
    this._setOption("onEditorEnterKey", value);
  }
  get onFieldDataChanged() {
    return this._getOption("onFieldDataChanged");
  }
  set onFieldDataChanged(value) {
    this._setOption("onFieldDataChanged", value);
  }
  get onInitialized() {
    return this._getOption("onInitialized");
  }
  set onInitialized(value) {
    this._setOption("onInitialized", value);
  }
  get onOptionChanged() {
    return this._getOption("onOptionChanged");
  }
  set onOptionChanged(value) {
    this._setOption("onOptionChanged", value);
  }
  get optionalMark() {
    return this._getOption("optionalMark");
  }
  set optionalMark(value) {
    this._setOption("optionalMark", value);
  }
  get readOnly() {
    return this._getOption("readOnly");
  }
  set readOnly(value) {
    this._setOption("readOnly", value);
  }
  get requiredMark() {
    return this._getOption("requiredMark");
  }
  set requiredMark(value) {
    this._setOption("requiredMark", value);
  }
  get requiredMessage() {
    return this._getOption("requiredMessage");
  }
  set requiredMessage(value) {
    this._setOption("requiredMessage", value);
  }
  get rtlEnabled() {
    return this._getOption("rtlEnabled");
  }
  set rtlEnabled(value) {
    this._setOption("rtlEnabled", value);
  }
  get screenByWidth() {
    return this._getOption("screenByWidth");
  }
  set screenByWidth(value) {
    this._setOption("screenByWidth", value);
  }
  get scrollingEnabled() {
    return this._getOption("scrollingEnabled");
  }
  set scrollingEnabled(value) {
    this._setOption("scrollingEnabled", value);
  }
  get showColonAfterLabel() {
    return this._getOption("showColonAfterLabel");
  }
  set showColonAfterLabel(value) {
    this._setOption("showColonAfterLabel", value);
  }
  get showOptionalMark() {
    return this._getOption("showOptionalMark");
  }
  set showOptionalMark(value) {
    this._setOption("showOptionalMark", value);
  }
  get showRequiredMark() {
    return this._getOption("showRequiredMark");
  }
  set showRequiredMark(value) {
    this._setOption("showRequiredMark", value);
  }
  get showValidationSummary() {
    return this._getOption("showValidationSummary");
  }
  set showValidationSummary(value) {
    this._setOption("showValidationSummary", value);
  }
  get tabIndex() {
    return this._getOption("tabIndex");
  }
  set tabIndex(value) {
    this._setOption("tabIndex", value);
  }
  get validationGroup() {
    return this._getOption("validationGroup");
  }
  set validationGroup(value) {
    this._setOption("validationGroup", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  formDataChange;
  get _optionPath() {
    return "form";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "formDataChange"
    }]);
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridFormComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFormComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridFormComponent,
    selectors: [["dxo-data-grid-form"]],
    inputs: {
      accessKey: "accessKey",
      activeStateEnabled: "activeStateEnabled",
      alignItemLabels: "alignItemLabels",
      alignItemLabelsInAllGroups: "alignItemLabelsInAllGroups",
      colCount: "colCount",
      colCountByScreen: "colCountByScreen",
      customizeItem: "customizeItem",
      disabled: "disabled",
      elementAttr: "elementAttr",
      focusStateEnabled: "focusStateEnabled",
      formData: "formData",
      height: "height",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      isDirty: "isDirty",
      items: "items",
      labelLocation: "labelLocation",
      labelMode: "labelMode",
      minColWidth: "minColWidth",
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onEditorEnterKey: "onEditorEnterKey",
      onFieldDataChanged: "onFieldDataChanged",
      onInitialized: "onInitialized",
      onOptionChanged: "onOptionChanged",
      optionalMark: "optionalMark",
      readOnly: "readOnly",
      requiredMark: "requiredMark",
      requiredMessage: "requiredMessage",
      rtlEnabled: "rtlEnabled",
      screenByWidth: "screenByWidth",
      scrollingEnabled: "scrollingEnabled",
      showColonAfterLabel: "showColonAfterLabel",
      showOptionalMark: "showOptionalMark",
      showRequiredMark: "showRequiredMark",
      showValidationSummary: "showValidationSummary",
      tabIndex: "tabIndex",
      validationGroup: "validationGroup",
      visible: "visible",
      width: "width"
    },
    outputs: {
      formDataChange: "formDataChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridFormComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFormComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-form",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    accessKey: [{
      type: Input
    }],
    activeStateEnabled: [{
      type: Input
    }],
    alignItemLabels: [{
      type: Input
    }],
    alignItemLabelsInAllGroups: [{
      type: Input
    }],
    colCount: [{
      type: Input
    }],
    colCountByScreen: [{
      type: Input
    }],
    customizeItem: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    elementAttr: [{
      type: Input
    }],
    focusStateEnabled: [{
      type: Input
    }],
    formData: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    hint: [{
      type: Input
    }],
    hoverStateEnabled: [{
      type: Input
    }],
    isDirty: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    labelLocation: [{
      type: Input
    }],
    labelMode: [{
      type: Input
    }],
    minColWidth: [{
      type: Input
    }],
    onContentReady: [{
      type: Input
    }],
    onDisposing: [{
      type: Input
    }],
    onEditorEnterKey: [{
      type: Input
    }],
    onFieldDataChanged: [{
      type: Input
    }],
    onInitialized: [{
      type: Input
    }],
    onOptionChanged: [{
      type: Input
    }],
    optionalMark: [{
      type: Input
    }],
    readOnly: [{
      type: Input
    }],
    requiredMark: [{
      type: Input
    }],
    requiredMessage: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    screenByWidth: [{
      type: Input
    }],
    scrollingEnabled: [{
      type: Input
    }],
    showColonAfterLabel: [{
      type: Input
    }],
    showOptionalMark: [{
      type: Input
    }],
    showRequiredMark: [{
      type: Input
    }],
    showValidationSummary: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    validationGroup: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    formDataChange: [{
      type: Output
    }]
  });
})();
var DxoDataGridFormModule = class _DxoDataGridFormModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridFormModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFormModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridFormModule,
    declarations: [DxoDataGridFormComponent],
    exports: [DxoDataGridFormComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFormModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridFormComponent],
      exports: [DxoDataGridFormComponent]
    }]
  }], null, null);
})();
var DxoDataGridFormatComponent = class _DxoDataGridFormatComponent extends NestedOption {
  get currency() {
    return this._getOption("currency");
  }
  set currency(value) {
    this._setOption("currency", value);
  }
  get formatter() {
    return this._getOption("formatter");
  }
  set formatter(value) {
    this._setOption("formatter", value);
  }
  get parser() {
    return this._getOption("parser");
  }
  set parser(value) {
    this._setOption("parser", value);
  }
  get precision() {
    return this._getOption("precision");
  }
  set precision(value) {
    this._setOption("precision", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get useCurrencyAccountingStyle() {
    return this._getOption("useCurrencyAccountingStyle");
  }
  set useCurrencyAccountingStyle(value) {
    this._setOption("useCurrencyAccountingStyle", value);
  }
  get _optionPath() {
    return "format";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridFormatComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFormatComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridFormatComponent,
    selectors: [["dxo-data-grid-format"]],
    inputs: {
      currency: "currency",
      formatter: "formatter",
      parser: "parser",
      precision: "precision",
      type: "type",
      useCurrencyAccountingStyle: "useCurrencyAccountingStyle"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridFormatComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFormatComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-format",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    currency: [{
      type: Input
    }],
    formatter: [{
      type: Input
    }],
    parser: [{
      type: Input
    }],
    precision: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    useCurrencyAccountingStyle: [{
      type: Input
    }]
  });
})();
var DxoDataGridFormatModule = class _DxoDataGridFormatModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridFormatModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFormatModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridFormatModule,
    declarations: [DxoDataGridFormatComponent],
    exports: [DxoDataGridFormatComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFormatModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridFormatComponent],
      exports: [DxoDataGridFormatComponent]
    }]
  }], null, null);
})();
var DxoDataGridFromComponent = class _DxoDataGridFromComponent extends NestedOption {
  get left() {
    return this._getOption("left");
  }
  set left(value) {
    this._setOption("left", value);
  }
  get opacity() {
    return this._getOption("opacity");
  }
  set opacity(value) {
    this._setOption("opacity", value);
  }
  get position() {
    return this._getOption("position");
  }
  set position(value) {
    this._setOption("position", value);
  }
  get scale() {
    return this._getOption("scale");
  }
  set scale(value) {
    this._setOption("scale", value);
  }
  get top() {
    return this._getOption("top");
  }
  set top(value) {
    this._setOption("top", value);
  }
  get _optionPath() {
    return "from";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridFromComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFromComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridFromComponent,
    selectors: [["dxo-data-grid-from"]],
    inputs: {
      left: "left",
      opacity: "opacity",
      position: "position",
      scale: "scale",
      top: "top"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridFromComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFromComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-from",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    left: [{
      type: Input
    }],
    opacity: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    scale: [{
      type: Input
    }],
    top: [{
      type: Input
    }]
  });
})();
var DxoDataGridFromModule = class _DxoDataGridFromModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridFromModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridFromModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridFromModule,
    declarations: [DxoDataGridFromComponent],
    exports: [DxoDataGridFromComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridFromModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridFromComponent],
      exports: [DxoDataGridFromComponent]
    }]
  }], null, null);
})();
var DxiDataGridGroupItemComponent = class _DxiDataGridGroupItemComponent extends CollectionNestedOption {
  get alignByColumn() {
    return this._getOption("alignByColumn");
  }
  set alignByColumn(value) {
    this._setOption("alignByColumn", value);
  }
  get column() {
    return this._getOption("column");
  }
  set column(value) {
    this._setOption("column", value);
  }
  get customizeText() {
    return this._getOption("customizeText");
  }
  set customizeText(value) {
    this._setOption("customizeText", value);
  }
  get displayFormat() {
    return this._getOption("displayFormat");
  }
  set displayFormat(value) {
    this._setOption("displayFormat", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get showInColumn() {
    return this._getOption("showInColumn");
  }
  set showInColumn(value) {
    this._setOption("showInColumn", value);
  }
  get showInGroupFooter() {
    return this._getOption("showInGroupFooter");
  }
  set showInGroupFooter(value) {
    this._setOption("showInGroupFooter", value);
  }
  get skipEmptyValues() {
    return this._getOption("skipEmptyValues");
  }
  set skipEmptyValues(value) {
    this._setOption("skipEmptyValues", value);
  }
  get summaryType() {
    return this._getOption("summaryType");
  }
  set summaryType(value) {
    this._setOption("summaryType", value);
  }
  get valueFormat() {
    return this._getOption("valueFormat");
  }
  set valueFormat(value) {
    this._setOption("valueFormat", value);
  }
  get _optionPath() {
    return "groupItems";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridGroupItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridGroupItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridGroupItemComponent,
    selectors: [["dxi-data-grid-group-item"]],
    inputs: {
      alignByColumn: "alignByColumn",
      column: "column",
      customizeText: "customizeText",
      displayFormat: "displayFormat",
      name: "name",
      showInColumn: "showInColumn",
      showInGroupFooter: "showInGroupFooter",
      skipEmptyValues: "skipEmptyValues",
      summaryType: "summaryType",
      valueFormat: "valueFormat"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridGroupItemComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridGroupItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-group-item",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    alignByColumn: [{
      type: Input
    }],
    column: [{
      type: Input
    }],
    customizeText: [{
      type: Input
    }],
    displayFormat: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    showInColumn: [{
      type: Input
    }],
    showInGroupFooter: [{
      type: Input
    }],
    skipEmptyValues: [{
      type: Input
    }],
    summaryType: [{
      type: Input
    }],
    valueFormat: [{
      type: Input
    }]
  });
})();
var DxiDataGridGroupItemModule = class _DxiDataGridGroupItemModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridGroupItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridGroupItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridGroupItemModule,
    declarations: [DxiDataGridGroupItemComponent],
    exports: [DxiDataGridGroupItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridGroupItemModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridGroupItemComponent],
      exports: [DxiDataGridGroupItemComponent]
    }]
  }], null, null);
})();
var DxoDataGridGroupOperationDescriptionsComponent = class _DxoDataGridGroupOperationDescriptionsComponent extends NestedOption {
  get and() {
    return this._getOption("and");
  }
  set and(value) {
    this._setOption("and", value);
  }
  get notAnd() {
    return this._getOption("notAnd");
  }
  set notAnd(value) {
    this._setOption("notAnd", value);
  }
  get notOr() {
    return this._getOption("notOr");
  }
  set notOr(value) {
    this._setOption("notOr", value);
  }
  get or() {
    return this._getOption("or");
  }
  set or(value) {
    this._setOption("or", value);
  }
  get _optionPath() {
    return "groupOperationDescriptions";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridGroupOperationDescriptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridGroupOperationDescriptionsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridGroupOperationDescriptionsComponent,
    selectors: [["dxo-data-grid-group-operation-descriptions"]],
    inputs: {
      and: "and",
      notAnd: "notAnd",
      notOr: "notOr",
      or: "or"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridGroupOperationDescriptionsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridGroupOperationDescriptionsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-group-operation-descriptions",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    and: [{
      type: Input
    }],
    notAnd: [{
      type: Input
    }],
    notOr: [{
      type: Input
    }],
    or: [{
      type: Input
    }]
  });
})();
var DxoDataGridGroupOperationDescriptionsModule = class _DxoDataGridGroupOperationDescriptionsModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridGroupOperationDescriptionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridGroupOperationDescriptionsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridGroupOperationDescriptionsModule,
    declarations: [DxoDataGridGroupOperationDescriptionsComponent],
    exports: [DxoDataGridGroupOperationDescriptionsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridGroupOperationDescriptionsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridGroupOperationDescriptionsComponent],
      exports: [DxoDataGridGroupOperationDescriptionsComponent]
    }]
  }], null, null);
})();
var DxoDataGridGroupPanelComponent = class _DxoDataGridGroupPanelComponent extends NestedOption {
  get allowColumnDragging() {
    return this._getOption("allowColumnDragging");
  }
  set allowColumnDragging(value) {
    this._setOption("allowColumnDragging", value);
  }
  get emptyPanelText() {
    return this._getOption("emptyPanelText");
  }
  set emptyPanelText(value) {
    this._setOption("emptyPanelText", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  visibleChange;
  get _optionPath() {
    return "groupPanel";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "visibleChange"
    }]);
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridGroupPanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridGroupPanelComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridGroupPanelComponent,
    selectors: [["dxo-data-grid-group-panel"]],
    inputs: {
      allowColumnDragging: "allowColumnDragging",
      emptyPanelText: "emptyPanelText",
      visible: "visible"
    },
    outputs: {
      visibleChange: "visibleChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridGroupPanelComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridGroupPanelComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-group-panel",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowColumnDragging: [{
      type: Input
    }],
    emptyPanelText: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    visibleChange: [{
      type: Output
    }]
  });
})();
var DxoDataGridGroupPanelModule = class _DxoDataGridGroupPanelModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridGroupPanelModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridGroupPanelModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridGroupPanelModule,
    declarations: [DxoDataGridGroupPanelComponent],
    exports: [DxoDataGridGroupPanelComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridGroupPanelModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridGroupPanelComponent],
      exports: [DxoDataGridGroupPanelComponent]
    }]
  }], null, null);
})();
var DxoDataGridGroupingTextsComponent = class _DxoDataGridGroupingTextsComponent extends NestedOption {
  get groupByThisColumn() {
    return this._getOption("groupByThisColumn");
  }
  set groupByThisColumn(value) {
    this._setOption("groupByThisColumn", value);
  }
  get groupContinuedMessage() {
    return this._getOption("groupContinuedMessage");
  }
  set groupContinuedMessage(value) {
    this._setOption("groupContinuedMessage", value);
  }
  get groupContinuesMessage() {
    return this._getOption("groupContinuesMessage");
  }
  set groupContinuesMessage(value) {
    this._setOption("groupContinuesMessage", value);
  }
  get ungroup() {
    return this._getOption("ungroup");
  }
  set ungroup(value) {
    this._setOption("ungroup", value);
  }
  get ungroupAll() {
    return this._getOption("ungroupAll");
  }
  set ungroupAll(value) {
    this._setOption("ungroupAll", value);
  }
  get _optionPath() {
    return "texts";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridGroupingTextsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridGroupingTextsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridGroupingTextsComponent,
    selectors: [["dxo-data-grid-grouping-texts"]],
    inputs: {
      groupByThisColumn: "groupByThisColumn",
      groupContinuedMessage: "groupContinuedMessage",
      groupContinuesMessage: "groupContinuesMessage",
      ungroup: "ungroup",
      ungroupAll: "ungroupAll"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridGroupingTextsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridGroupingTextsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-grouping-texts",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    groupByThisColumn: [{
      type: Input
    }],
    groupContinuedMessage: [{
      type: Input
    }],
    groupContinuesMessage: [{
      type: Input
    }],
    ungroup: [{
      type: Input
    }],
    ungroupAll: [{
      type: Input
    }]
  });
})();
var DxoDataGridGroupingTextsModule = class _DxoDataGridGroupingTextsModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridGroupingTextsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridGroupingTextsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridGroupingTextsModule,
    declarations: [DxoDataGridGroupingTextsComponent],
    exports: [DxoDataGridGroupingTextsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridGroupingTextsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridGroupingTextsComponent],
      exports: [DxoDataGridGroupingTextsComponent]
    }]
  }], null, null);
})();
var DxoDataGridGroupingComponent = class _DxoDataGridGroupingComponent extends NestedOption {
  get allowCollapsing() {
    return this._getOption("allowCollapsing");
  }
  set allowCollapsing(value) {
    this._setOption("allowCollapsing", value);
  }
  get autoExpandAll() {
    return this._getOption("autoExpandAll");
  }
  set autoExpandAll(value) {
    this._setOption("autoExpandAll", value);
  }
  get contextMenuEnabled() {
    return this._getOption("contextMenuEnabled");
  }
  set contextMenuEnabled(value) {
    this._setOption("contextMenuEnabled", value);
  }
  get expandMode() {
    return this._getOption("expandMode");
  }
  set expandMode(value) {
    this._setOption("expandMode", value);
  }
  get texts() {
    return this._getOption("texts");
  }
  set texts(value) {
    this._setOption("texts", value);
  }
  get _optionPath() {
    return "grouping";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridGroupingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridGroupingComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridGroupingComponent,
    selectors: [["dxo-data-grid-grouping"]],
    inputs: {
      allowCollapsing: "allowCollapsing",
      autoExpandAll: "autoExpandAll",
      contextMenuEnabled: "contextMenuEnabled",
      expandMode: "expandMode",
      texts: "texts"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridGroupingComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridGroupingComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-grouping",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowCollapsing: [{
      type: Input
    }],
    autoExpandAll: [{
      type: Input
    }],
    contextMenuEnabled: [{
      type: Input
    }],
    expandMode: [{
      type: Input
    }],
    texts: [{
      type: Input
    }]
  });
})();
var DxoDataGridGroupingModule = class _DxoDataGridGroupingModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridGroupingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridGroupingModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridGroupingModule,
    declarations: [DxoDataGridGroupingComponent],
    exports: [DxoDataGridGroupingComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridGroupingModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridGroupingComponent],
      exports: [DxoDataGridGroupingComponent]
    }]
  }], null, null);
})();
var DxoDataGridHeaderFilterComponent = class _DxoDataGridHeaderFilterComponent extends NestedOption {
  get allowSearch() {
    return this._getOption("allowSearch");
  }
  set allowSearch(value) {
    this._setOption("allowSearch", value);
  }
  get allowSelectAll() {
    return this._getOption("allowSelectAll");
  }
  set allowSelectAll(value) {
    this._setOption("allowSelectAll", value);
  }
  get dataSource() {
    return this._getOption("dataSource");
  }
  set dataSource(value) {
    this._setOption("dataSource", value);
  }
  get groupInterval() {
    return this._getOption("groupInterval");
  }
  set groupInterval(value) {
    this._setOption("groupInterval", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  get search() {
    return this._getOption("search");
  }
  set search(value) {
    this._setOption("search", value);
  }
  get searchMode() {
    return this._getOption("searchMode");
  }
  set searchMode(value) {
    this._setOption("searchMode", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  get searchTimeout() {
    return this._getOption("searchTimeout");
  }
  set searchTimeout(value) {
    this._setOption("searchTimeout", value);
  }
  get texts() {
    return this._getOption("texts");
  }
  set texts(value) {
    this._setOption("texts", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get _optionPath() {
    return "headerFilter";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridHeaderFilterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridHeaderFilterComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridHeaderFilterComponent,
    selectors: [["dxo-data-grid-header-filter"]],
    inputs: {
      allowSearch: "allowSearch",
      allowSelectAll: "allowSelectAll",
      dataSource: "dataSource",
      groupInterval: "groupInterval",
      height: "height",
      search: "search",
      searchMode: "searchMode",
      width: "width",
      searchTimeout: "searchTimeout",
      texts: "texts",
      visible: "visible"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridHeaderFilterComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridHeaderFilterComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-header-filter",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowSearch: [{
      type: Input
    }],
    allowSelectAll: [{
      type: Input
    }],
    dataSource: [{
      type: Input
    }],
    groupInterval: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    search: [{
      type: Input
    }],
    searchMode: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    searchTimeout: [{
      type: Input
    }],
    texts: [{
      type: Input
    }],
    visible: [{
      type: Input
    }]
  });
})();
var DxoDataGridHeaderFilterModule = class _DxoDataGridHeaderFilterModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridHeaderFilterModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridHeaderFilterModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridHeaderFilterModule,
    declarations: [DxoDataGridHeaderFilterComponent],
    exports: [DxoDataGridHeaderFilterComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridHeaderFilterModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridHeaderFilterComponent],
      exports: [DxoDataGridHeaderFilterComponent]
    }]
  }], null, null);
})();
var DxoDataGridHideComponent = class _DxoDataGridHideComponent extends NestedOption {
  get complete() {
    return this._getOption("complete");
  }
  set complete(value) {
    this._setOption("complete", value);
  }
  get delay() {
    return this._getOption("delay");
  }
  set delay(value) {
    this._setOption("delay", value);
  }
  get direction() {
    return this._getOption("direction");
  }
  set direction(value) {
    this._setOption("direction", value);
  }
  get duration() {
    return this._getOption("duration");
  }
  set duration(value) {
    this._setOption("duration", value);
  }
  get easing() {
    return this._getOption("easing");
  }
  set easing(value) {
    this._setOption("easing", value);
  }
  get from() {
    return this._getOption("from");
  }
  set from(value) {
    this._setOption("from", value);
  }
  get staggerDelay() {
    return this._getOption("staggerDelay");
  }
  set staggerDelay(value) {
    this._setOption("staggerDelay", value);
  }
  get start() {
    return this._getOption("start");
  }
  set start(value) {
    this._setOption("start", value);
  }
  get to() {
    return this._getOption("to");
  }
  set to(value) {
    this._setOption("to", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "hide";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridHideComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridHideComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridHideComponent,
    selectors: [["dxo-data-grid-hide"]],
    inputs: {
      complete: "complete",
      delay: "delay",
      direction: "direction",
      duration: "duration",
      easing: "easing",
      from: "from",
      staggerDelay: "staggerDelay",
      start: "start",
      to: "to",
      type: "type"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridHideComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridHideComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-hide",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    complete: [{
      type: Input
    }],
    delay: [{
      type: Input
    }],
    direction: [{
      type: Input
    }],
    duration: [{
      type: Input
    }],
    easing: [{
      type: Input
    }],
    from: [{
      type: Input
    }],
    staggerDelay: [{
      type: Input
    }],
    start: [{
      type: Input
    }],
    to: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxoDataGridHideModule = class _DxoDataGridHideModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridHideModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridHideModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridHideModule,
    declarations: [DxoDataGridHideComponent],
    exports: [DxoDataGridHideComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridHideModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridHideComponent],
      exports: [DxoDataGridHideComponent]
    }]
  }], null, null);
})();
var DxoDataGridIconsComponent = class _DxoDataGridIconsComponent extends NestedOption {
  get fix() {
    return this._getOption("fix");
  }
  set fix(value) {
    this._setOption("fix", value);
  }
  get leftPosition() {
    return this._getOption("leftPosition");
  }
  set leftPosition(value) {
    this._setOption("leftPosition", value);
  }
  get rightPosition() {
    return this._getOption("rightPosition");
  }
  set rightPosition(value) {
    this._setOption("rightPosition", value);
  }
  get stickyPosition() {
    return this._getOption("stickyPosition");
  }
  set stickyPosition(value) {
    this._setOption("stickyPosition", value);
  }
  get unfix() {
    return this._getOption("unfix");
  }
  set unfix(value) {
    this._setOption("unfix", value);
  }
  get _optionPath() {
    return "icons";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridIconsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridIconsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridIconsComponent,
    selectors: [["dxo-data-grid-icons"]],
    inputs: {
      fix: "fix",
      leftPosition: "leftPosition",
      rightPosition: "rightPosition",
      stickyPosition: "stickyPosition",
      unfix: "unfix"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridIconsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridIconsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-icons",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    fix: [{
      type: Input
    }],
    leftPosition: [{
      type: Input
    }],
    rightPosition: [{
      type: Input
    }],
    stickyPosition: [{
      type: Input
    }],
    unfix: [{
      type: Input
    }]
  });
})();
var DxoDataGridIconsModule = class _DxoDataGridIconsModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridIconsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridIconsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridIconsModule,
    declarations: [DxoDataGridIconsComponent],
    exports: [DxoDataGridIconsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridIconsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridIconsComponent],
      exports: [DxoDataGridIconsComponent]
    }]
  }], null, null);
})();
var DxiDataGridItemComponent = class _DxiDataGridItemComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get html() {
    return this._getOption("html");
  }
  set html(value) {
    this._setOption("html", value);
  }
  get locateInMenu() {
    return this._getOption("locateInMenu");
  }
  set locateInMenu(value) {
    this._setOption("locateInMenu", value);
  }
  get location() {
    return this._getOption("location");
  }
  set location(value) {
    this._setOption("location", value);
  }
  get menuItemTemplate() {
    return this._getOption("menuItemTemplate");
  }
  set menuItemTemplate(value) {
    this._setOption("menuItemTemplate", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get options() {
    return this._getOption("options");
  }
  set options(value) {
    this._setOption("options", value);
  }
  get showText() {
    return this._getOption("showText");
  }
  set showText(value) {
    this._setOption("showText", value);
  }
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get widget() {
    return this._getOption("widget");
  }
  set widget(value) {
    this._setOption("widget", value);
  }
  get _optionPath() {
    return "items";
  }
  constructor(parentOptionHost, optionHost, renderer, document, templateHost, element) {
    super();
    this.renderer = renderer;
    this.document = document;
    this.element = element;
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    templateHost.setHost(this);
  }
  setTemplate(template) {
    this.template = template;
  }
  ngAfterViewInit() {
    extractTemplate(this, this.element, this.renderer, this.document);
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridItemComponent,
    selectors: [["dxi-data-grid-item"]],
    inputs: {
      cssClass: "cssClass",
      disabled: "disabled",
      html: "html",
      locateInMenu: "locateInMenu",
      location: "location",
      menuItemTemplate: "menuItemTemplate",
      name: "name",
      options: "options",
      showText: "showText",
      template: "template",
      text: "text",
      visible: "visible",
      widget: "widget"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiDataGridItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-item",
      template: "<ng-content></ng-content>",
      providers: [NestedOptionHost, DxTemplateHost],
      styles: [":host{display:block}\n"]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: Renderer2
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: DxTemplateHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: ElementRef
  }], {
    cssClass: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    html: [{
      type: Input
    }],
    locateInMenu: [{
      type: Input
    }],
    location: [{
      type: Input
    }],
    menuItemTemplate: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    showText: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    widget: [{
      type: Input
    }]
  });
})();
var DxiDataGridItemModule = class _DxiDataGridItemModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridItemModule,
    declarations: [DxiDataGridItemComponent],
    exports: [DxiDataGridItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridItemModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridItemComponent],
      exports: [DxiDataGridItemComponent]
    }]
  }], null, null);
})();
var DxoDataGridKeyboardNavigationComponent = class _DxoDataGridKeyboardNavigationComponent extends NestedOption {
  get editOnKeyPress() {
    return this._getOption("editOnKeyPress");
  }
  set editOnKeyPress(value) {
    this._setOption("editOnKeyPress", value);
  }
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get enterKeyAction() {
    return this._getOption("enterKeyAction");
  }
  set enterKeyAction(value) {
    this._setOption("enterKeyAction", value);
  }
  get enterKeyDirection() {
    return this._getOption("enterKeyDirection");
  }
  set enterKeyDirection(value) {
    this._setOption("enterKeyDirection", value);
  }
  get _optionPath() {
    return "keyboardNavigation";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridKeyboardNavigationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridKeyboardNavigationComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridKeyboardNavigationComponent,
    selectors: [["dxo-data-grid-keyboard-navigation"]],
    inputs: {
      editOnKeyPress: "editOnKeyPress",
      enabled: "enabled",
      enterKeyAction: "enterKeyAction",
      enterKeyDirection: "enterKeyDirection"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridKeyboardNavigationComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridKeyboardNavigationComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-keyboard-navigation",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    editOnKeyPress: [{
      type: Input
    }],
    enabled: [{
      type: Input
    }],
    enterKeyAction: [{
      type: Input
    }],
    enterKeyDirection: [{
      type: Input
    }]
  });
})();
var DxoDataGridKeyboardNavigationModule = class _DxoDataGridKeyboardNavigationModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridKeyboardNavigationModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridKeyboardNavigationModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridKeyboardNavigationModule,
    declarations: [DxoDataGridKeyboardNavigationComponent],
    exports: [DxoDataGridKeyboardNavigationComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridKeyboardNavigationModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridKeyboardNavigationComponent],
      exports: [DxoDataGridKeyboardNavigationComponent]
    }]
  }], null, null);
})();
var DxoDataGridLabelComponent = class _DxoDataGridLabelComponent extends NestedOption {
  renderer;
  document;
  element;
  get alignment() {
    return this._getOption("alignment");
  }
  set alignment(value) {
    this._setOption("alignment", value);
  }
  get location() {
    return this._getOption("location");
  }
  set location(value) {
    this._setOption("location", value);
  }
  get showColon() {
    return this._getOption("showColon");
  }
  set showColon(value) {
    this._setOption("showColon", value);
  }
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get _optionPath() {
    return "label";
  }
  constructor(parentOptionHost, optionHost, renderer, document, templateHost, element) {
    super();
    this.renderer = renderer;
    this.document = document;
    this.element = element;
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    templateHost.setHost(this);
  }
  setTemplate(template) {
    this.template = template;
  }
  ngAfterViewInit() {
    extractTemplate(this, this.element, this.renderer, this.document);
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridLabelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridLabelComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridLabelComponent,
    selectors: [["dxo-data-grid-label"]],
    inputs: {
      alignment: "alignment",
      location: "location",
      showColon: "showColon",
      template: "template",
      text: "text",
      visible: "visible"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxoDataGridLabelComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridLabelComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-label",
      template: "<ng-content></ng-content>",
      providers: [NestedOptionHost, DxTemplateHost],
      styles: [":host{display:block}\n"]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: Renderer2
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: DxTemplateHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: ElementRef
  }], {
    alignment: [{
      type: Input
    }],
    location: [{
      type: Input
    }],
    showColon: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    visible: [{
      type: Input
    }]
  });
})();
var DxoDataGridLabelModule = class _DxoDataGridLabelModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridLabelModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridLabelModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridLabelModule,
    declarations: [DxoDataGridLabelComponent],
    exports: [DxoDataGridLabelComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridLabelModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridLabelComponent],
      exports: [DxoDataGridLabelComponent]
    }]
  }], null, null);
})();
var DxoDataGridLoadPanelComponent = class _DxoDataGridLoadPanelComponent extends NestedOption {
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  get indicatorSrc() {
    return this._getOption("indicatorSrc");
  }
  set indicatorSrc(value) {
    this._setOption("indicatorSrc", value);
  }
  get shading() {
    return this._getOption("shading");
  }
  set shading(value) {
    this._setOption("shading", value);
  }
  get shadingColor() {
    return this._getOption("shadingColor");
  }
  set shadingColor(value) {
    this._setOption("shadingColor", value);
  }
  get showIndicator() {
    return this._getOption("showIndicator");
  }
  set showIndicator(value) {
    this._setOption("showIndicator", value);
  }
  get showPane() {
    return this._getOption("showPane");
  }
  set showPane(value) {
    this._setOption("showPane", value);
  }
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  get _optionPath() {
    return "loadPanel";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridLoadPanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridLoadPanelComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridLoadPanelComponent,
    selectors: [["dxo-data-grid-load-panel"]],
    inputs: {
      enabled: "enabled",
      height: "height",
      indicatorSrc: "indicatorSrc",
      shading: "shading",
      shadingColor: "shadingColor",
      showIndicator: "showIndicator",
      showPane: "showPane",
      text: "text",
      width: "width"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridLoadPanelComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridLoadPanelComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-load-panel",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    enabled: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    indicatorSrc: [{
      type: Input
    }],
    shading: [{
      type: Input
    }],
    shadingColor: [{
      type: Input
    }],
    showIndicator: [{
      type: Input
    }],
    showPane: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    width: [{
      type: Input
    }]
  });
})();
var DxoDataGridLoadPanelModule = class _DxoDataGridLoadPanelModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridLoadPanelModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridLoadPanelModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridLoadPanelModule,
    declarations: [DxoDataGridLoadPanelComponent],
    exports: [DxoDataGridLoadPanelComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridLoadPanelModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridLoadPanelComponent],
      exports: [DxoDataGridLoadPanelComponent]
    }]
  }], null, null);
})();
var DxoDataGridLookupComponent = class _DxoDataGridLookupComponent extends NestedOption {
  get allowClearing() {
    return this._getOption("allowClearing");
  }
  set allowClearing(value) {
    this._setOption("allowClearing", value);
  }
  get calculateCellValue() {
    return this._getOption("calculateCellValue");
  }
  set calculateCellValue(value) {
    this._setOption("calculateCellValue", value);
  }
  get dataSource() {
    return this._getOption("dataSource");
  }
  set dataSource(value) {
    this._setOption("dataSource", value);
  }
  get displayExpr() {
    return this._getOption("displayExpr");
  }
  set displayExpr(value) {
    this._setOption("displayExpr", value);
  }
  get valueExpr() {
    return this._getOption("valueExpr");
  }
  set valueExpr(value) {
    this._setOption("valueExpr", value);
  }
  get _optionPath() {
    return "lookup";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridLookupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridLookupComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridLookupComponent,
    selectors: [["dxo-data-grid-lookup"]],
    inputs: {
      allowClearing: "allowClearing",
      calculateCellValue: "calculateCellValue",
      dataSource: "dataSource",
      displayExpr: "displayExpr",
      valueExpr: "valueExpr"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridLookupComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridLookupComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-lookup",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowClearing: [{
      type: Input
    }],
    calculateCellValue: [{
      type: Input
    }],
    dataSource: [{
      type: Input
    }],
    displayExpr: [{
      type: Input
    }],
    valueExpr: [{
      type: Input
    }]
  });
})();
var DxoDataGridLookupModule = class _DxoDataGridLookupModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridLookupModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridLookupModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridLookupModule,
    declarations: [DxoDataGridLookupComponent],
    exports: [DxoDataGridLookupComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridLookupModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridLookupComponent],
      exports: [DxoDataGridLookupComponent]
    }]
  }], null, null);
})();
var DxoDataGridMasterDetailComponent = class _DxoDataGridMasterDetailComponent extends NestedOption {
  renderer;
  document;
  element;
  get autoExpandAll() {
    return this._getOption("autoExpandAll");
  }
  set autoExpandAll(value) {
    this._setOption("autoExpandAll", value);
  }
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  get _optionPath() {
    return "masterDetail";
  }
  constructor(parentOptionHost, optionHost, renderer, document, templateHost, element) {
    super();
    this.renderer = renderer;
    this.document = document;
    this.element = element;
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    templateHost.setHost(this);
  }
  setTemplate(template) {
    this.template = template;
  }
  ngAfterViewInit() {
    extractTemplate(this, this.element, this.renderer, this.document);
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridMasterDetailComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridMasterDetailComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridMasterDetailComponent,
    selectors: [["dxo-data-grid-master-detail"]],
    inputs: {
      autoExpandAll: "autoExpandAll",
      enabled: "enabled",
      template: "template"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxoDataGridMasterDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridMasterDetailComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-master-detail",
      template: "<ng-content></ng-content>",
      providers: [NestedOptionHost, DxTemplateHost],
      styles: [":host{display:block}\n"]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: Renderer2
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: DxTemplateHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: ElementRef
  }], {
    autoExpandAll: [{
      type: Input
    }],
    enabled: [{
      type: Input
    }],
    template: [{
      type: Input
    }]
  });
})();
var DxoDataGridMasterDetailModule = class _DxoDataGridMasterDetailModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridMasterDetailModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridMasterDetailModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridMasterDetailModule,
    declarations: [DxoDataGridMasterDetailComponent],
    exports: [DxoDataGridMasterDetailComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridMasterDetailModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridMasterDetailComponent],
      exports: [DxoDataGridMasterDetailComponent]
    }]
  }], null, null);
})();
var DxoDataGridMyComponent = class _DxoDataGridMyComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "my";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridMyComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridMyComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridMyComponent,
    selectors: [["dxo-data-grid-my"]],
    inputs: {
      x: "x",
      y: "y"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridMyComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridMyComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-my",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoDataGridMyModule = class _DxoDataGridMyModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridMyModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridMyModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridMyModule,
    declarations: [DxoDataGridMyComponent],
    exports: [DxoDataGridMyComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridMyModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridMyComponent],
      exports: [DxoDataGridMyComponent]
    }]
  }], null, null);
})();
var DxoDataGridOffsetComponent = class _DxoDataGridOffsetComponent extends NestedOption {
  get x() {
    return this._getOption("x");
  }
  set x(value) {
    this._setOption("x", value);
  }
  get y() {
    return this._getOption("y");
  }
  set y(value) {
    this._setOption("y", value);
  }
  get _optionPath() {
    return "offset";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridOffsetComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridOffsetComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridOffsetComponent,
    selectors: [["dxo-data-grid-offset"]],
    inputs: {
      x: "x",
      y: "y"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridOffsetComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridOffsetComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-offset",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    x: [{
      type: Input
    }],
    y: [{
      type: Input
    }]
  });
})();
var DxoDataGridOffsetModule = class _DxoDataGridOffsetModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridOffsetModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridOffsetModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridOffsetModule,
    declarations: [DxoDataGridOffsetComponent],
    exports: [DxoDataGridOffsetComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridOffsetModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridOffsetComponent],
      exports: [DxoDataGridOffsetComponent]
    }]
  }], null, null);
})();
var DxoDataGridOperationDescriptionsComponent = class _DxoDataGridOperationDescriptionsComponent extends NestedOption {
  get between() {
    return this._getOption("between");
  }
  set between(value) {
    this._setOption("between", value);
  }
  get contains() {
    return this._getOption("contains");
  }
  set contains(value) {
    this._setOption("contains", value);
  }
  get endsWith() {
    return this._getOption("endsWith");
  }
  set endsWith(value) {
    this._setOption("endsWith", value);
  }
  get equal() {
    return this._getOption("equal");
  }
  set equal(value) {
    this._setOption("equal", value);
  }
  get greaterThan() {
    return this._getOption("greaterThan");
  }
  set greaterThan(value) {
    this._setOption("greaterThan", value);
  }
  get greaterThanOrEqual() {
    return this._getOption("greaterThanOrEqual");
  }
  set greaterThanOrEqual(value) {
    this._setOption("greaterThanOrEqual", value);
  }
  get lessThan() {
    return this._getOption("lessThan");
  }
  set lessThan(value) {
    this._setOption("lessThan", value);
  }
  get lessThanOrEqual() {
    return this._getOption("lessThanOrEqual");
  }
  set lessThanOrEqual(value) {
    this._setOption("lessThanOrEqual", value);
  }
  get notContains() {
    return this._getOption("notContains");
  }
  set notContains(value) {
    this._setOption("notContains", value);
  }
  get notEqual() {
    return this._getOption("notEqual");
  }
  set notEqual(value) {
    this._setOption("notEqual", value);
  }
  get startsWith() {
    return this._getOption("startsWith");
  }
  set startsWith(value) {
    this._setOption("startsWith", value);
  }
  get _optionPath() {
    return "operationDescriptions";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridOperationDescriptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridOperationDescriptionsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridOperationDescriptionsComponent,
    selectors: [["dxo-data-grid-operation-descriptions"]],
    inputs: {
      between: "between",
      contains: "contains",
      endsWith: "endsWith",
      equal: "equal",
      greaterThan: "greaterThan",
      greaterThanOrEqual: "greaterThanOrEqual",
      lessThan: "lessThan",
      lessThanOrEqual: "lessThanOrEqual",
      notContains: "notContains",
      notEqual: "notEqual",
      startsWith: "startsWith"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridOperationDescriptionsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridOperationDescriptionsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-operation-descriptions",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    between: [{
      type: Input
    }],
    contains: [{
      type: Input
    }],
    endsWith: [{
      type: Input
    }],
    equal: [{
      type: Input
    }],
    greaterThan: [{
      type: Input
    }],
    greaterThanOrEqual: [{
      type: Input
    }],
    lessThan: [{
      type: Input
    }],
    lessThanOrEqual: [{
      type: Input
    }],
    notContains: [{
      type: Input
    }],
    notEqual: [{
      type: Input
    }],
    startsWith: [{
      type: Input
    }]
  });
})();
var DxoDataGridOperationDescriptionsModule = class _DxoDataGridOperationDescriptionsModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridOperationDescriptionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridOperationDescriptionsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridOperationDescriptionsModule,
    declarations: [DxoDataGridOperationDescriptionsComponent],
    exports: [DxoDataGridOperationDescriptionsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridOperationDescriptionsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridOperationDescriptionsComponent],
      exports: [DxoDataGridOperationDescriptionsComponent]
    }]
  }], null, null);
})();
var DxoDataGridPagerComponent = class _DxoDataGridPagerComponent extends NestedOption {
  get allowedPageSizes() {
    return this._getOption("allowedPageSizes");
  }
  set allowedPageSizes(value) {
    this._setOption("allowedPageSizes", value);
  }
  get displayMode() {
    return this._getOption("displayMode");
  }
  set displayMode(value) {
    this._setOption("displayMode", value);
  }
  get infoText() {
    return this._getOption("infoText");
  }
  set infoText(value) {
    this._setOption("infoText", value);
  }
  get label() {
    return this._getOption("label");
  }
  set label(value) {
    this._setOption("label", value);
  }
  get showInfo() {
    return this._getOption("showInfo");
  }
  set showInfo(value) {
    this._setOption("showInfo", value);
  }
  get showNavigationButtons() {
    return this._getOption("showNavigationButtons");
  }
  set showNavigationButtons(value) {
    this._setOption("showNavigationButtons", value);
  }
  get showPageSizeSelector() {
    return this._getOption("showPageSizeSelector");
  }
  set showPageSizeSelector(value) {
    this._setOption("showPageSizeSelector", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get _optionPath() {
    return "pager";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridPagerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridPagerComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridPagerComponent,
    selectors: [["dxo-data-grid-pager"]],
    inputs: {
      allowedPageSizes: "allowedPageSizes",
      displayMode: "displayMode",
      infoText: "infoText",
      label: "label",
      showInfo: "showInfo",
      showNavigationButtons: "showNavigationButtons",
      showPageSizeSelector: "showPageSizeSelector",
      visible: "visible"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridPagerComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridPagerComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-pager",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowedPageSizes: [{
      type: Input
    }],
    displayMode: [{
      type: Input
    }],
    infoText: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    showInfo: [{
      type: Input
    }],
    showNavigationButtons: [{
      type: Input
    }],
    showPageSizeSelector: [{
      type: Input
    }],
    visible: [{
      type: Input
    }]
  });
})();
var DxoDataGridPagerModule = class _DxoDataGridPagerModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridPagerModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridPagerModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridPagerModule,
    declarations: [DxoDataGridPagerComponent],
    exports: [DxoDataGridPagerComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridPagerModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridPagerComponent],
      exports: [DxoDataGridPagerComponent]
    }]
  }], null, null);
})();
var DxoDataGridPagingComponent = class _DxoDataGridPagingComponent extends NestedOption {
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get pageIndex() {
    return this._getOption("pageIndex");
  }
  set pageIndex(value) {
    this._setOption("pageIndex", value);
  }
  get pageSize() {
    return this._getOption("pageSize");
  }
  set pageSize(value) {
    this._setOption("pageSize", value);
  }
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  pageIndexChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  pageSizeChange;
  get _optionPath() {
    return "paging";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "pageIndexChange"
    }, {
      emit: "pageSizeChange"
    }]);
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridPagingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridPagingComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridPagingComponent,
    selectors: [["dxo-data-grid-paging"]],
    inputs: {
      enabled: "enabled",
      pageIndex: "pageIndex",
      pageSize: "pageSize"
    },
    outputs: {
      pageIndexChange: "pageIndexChange",
      pageSizeChange: "pageSizeChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridPagingComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridPagingComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-paging",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    enabled: [{
      type: Input
    }],
    pageIndex: [{
      type: Input
    }],
    pageSize: [{
      type: Input
    }],
    pageIndexChange: [{
      type: Output
    }],
    pageSizeChange: [{
      type: Output
    }]
  });
})();
var DxoDataGridPagingModule = class _DxoDataGridPagingModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridPagingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridPagingModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridPagingModule,
    declarations: [DxoDataGridPagingComponent],
    exports: [DxoDataGridPagingComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridPagingModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridPagingComponent],
      exports: [DxoDataGridPagingComponent]
    }]
  }], null, null);
})();
var DxoDataGridPopupComponent = class _DxoDataGridPopupComponent extends NestedOption {
  get accessKey() {
    return this._getOption("accessKey");
  }
  set accessKey(value) {
    this._setOption("accessKey", value);
  }
  get animation() {
    return this._getOption("animation");
  }
  set animation(value) {
    this._setOption("animation", value);
  }
  get closeOnOutsideClick() {
    return this._getOption("closeOnOutsideClick");
  }
  set closeOnOutsideClick(value) {
    this._setOption("closeOnOutsideClick", value);
  }
  get container() {
    return this._getOption("container");
  }
  set container(value) {
    this._setOption("container", value);
  }
  get contentTemplate() {
    return this._getOption("contentTemplate");
  }
  set contentTemplate(value) {
    this._setOption("contentTemplate", value);
  }
  get deferRendering() {
    return this._getOption("deferRendering");
  }
  set deferRendering(value) {
    this._setOption("deferRendering", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get dragAndResizeArea() {
    return this._getOption("dragAndResizeArea");
  }
  set dragAndResizeArea(value) {
    this._setOption("dragAndResizeArea", value);
  }
  get dragEnabled() {
    return this._getOption("dragEnabled");
  }
  set dragEnabled(value) {
    this._setOption("dragEnabled", value);
  }
  get dragOutsideBoundary() {
    return this._getOption("dragOutsideBoundary");
  }
  set dragOutsideBoundary(value) {
    this._setOption("dragOutsideBoundary", value);
  }
  get enableBodyScroll() {
    return this._getOption("enableBodyScroll");
  }
  set enableBodyScroll(value) {
    this._setOption("enableBodyScroll", value);
  }
  get focusStateEnabled() {
    return this._getOption("focusStateEnabled");
  }
  set focusStateEnabled(value) {
    this._setOption("focusStateEnabled", value);
  }
  get fullScreen() {
    return this._getOption("fullScreen");
  }
  set fullScreen(value) {
    this._setOption("fullScreen", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  get hideOnOutsideClick() {
    return this._getOption("hideOnOutsideClick");
  }
  set hideOnOutsideClick(value) {
    this._setOption("hideOnOutsideClick", value);
  }
  get hideOnParentScroll() {
    return this._getOption("hideOnParentScroll");
  }
  set hideOnParentScroll(value) {
    this._setOption("hideOnParentScroll", value);
  }
  get hint() {
    return this._getOption("hint");
  }
  set hint(value) {
    this._setOption("hint", value);
  }
  get hoverStateEnabled() {
    return this._getOption("hoverStateEnabled");
  }
  set hoverStateEnabled(value) {
    this._setOption("hoverStateEnabled", value);
  }
  get maxHeight() {
    return this._getOption("maxHeight");
  }
  set maxHeight(value) {
    this._setOption("maxHeight", value);
  }
  get maxWidth() {
    return this._getOption("maxWidth");
  }
  set maxWidth(value) {
    this._setOption("maxWidth", value);
  }
  get minHeight() {
    return this._getOption("minHeight");
  }
  set minHeight(value) {
    this._setOption("minHeight", value);
  }
  get minWidth() {
    return this._getOption("minWidth");
  }
  set minWidth(value) {
    this._setOption("minWidth", value);
  }
  get onContentReady() {
    return this._getOption("onContentReady");
  }
  set onContentReady(value) {
    this._setOption("onContentReady", value);
  }
  get onDisposing() {
    return this._getOption("onDisposing");
  }
  set onDisposing(value) {
    this._setOption("onDisposing", value);
  }
  get onHidden() {
    return this._getOption("onHidden");
  }
  set onHidden(value) {
    this._setOption("onHidden", value);
  }
  get onHiding() {
    return this._getOption("onHiding");
  }
  set onHiding(value) {
    this._setOption("onHiding", value);
  }
  get onInitialized() {
    return this._getOption("onInitialized");
  }
  set onInitialized(value) {
    this._setOption("onInitialized", value);
  }
  get onOptionChanged() {
    return this._getOption("onOptionChanged");
  }
  set onOptionChanged(value) {
    this._setOption("onOptionChanged", value);
  }
  get onResize() {
    return this._getOption("onResize");
  }
  set onResize(value) {
    this._setOption("onResize", value);
  }
  get onResizeEnd() {
    return this._getOption("onResizeEnd");
  }
  set onResizeEnd(value) {
    this._setOption("onResizeEnd", value);
  }
  get onResizeStart() {
    return this._getOption("onResizeStart");
  }
  set onResizeStart(value) {
    this._setOption("onResizeStart", value);
  }
  get onShowing() {
    return this._getOption("onShowing");
  }
  set onShowing(value) {
    this._setOption("onShowing", value);
  }
  get onShown() {
    return this._getOption("onShown");
  }
  set onShown(value) {
    this._setOption("onShown", value);
  }
  get onTitleRendered() {
    return this._getOption("onTitleRendered");
  }
  set onTitleRendered(value) {
    this._setOption("onTitleRendered", value);
  }
  get position() {
    return this._getOption("position");
  }
  set position(value) {
    this._setOption("position", value);
  }
  get resizeEnabled() {
    return this._getOption("resizeEnabled");
  }
  set resizeEnabled(value) {
    this._setOption("resizeEnabled", value);
  }
  get restorePosition() {
    return this._getOption("restorePosition");
  }
  set restorePosition(value) {
    this._setOption("restorePosition", value);
  }
  get rtlEnabled() {
    return this._getOption("rtlEnabled");
  }
  set rtlEnabled(value) {
    this._setOption("rtlEnabled", value);
  }
  get shading() {
    return this._getOption("shading");
  }
  set shading(value) {
    this._setOption("shading", value);
  }
  get shadingColor() {
    return this._getOption("shadingColor");
  }
  set shadingColor(value) {
    this._setOption("shadingColor", value);
  }
  get showCloseButton() {
    return this._getOption("showCloseButton");
  }
  set showCloseButton(value) {
    this._setOption("showCloseButton", value);
  }
  get showTitle() {
    return this._getOption("showTitle");
  }
  set showTitle(value) {
    this._setOption("showTitle", value);
  }
  get tabIndex() {
    return this._getOption("tabIndex");
  }
  set tabIndex(value) {
    this._setOption("tabIndex", value);
  }
  get title() {
    return this._getOption("title");
  }
  set title(value) {
    this._setOption("title", value);
  }
  get titleTemplate() {
    return this._getOption("titleTemplate");
  }
  set titleTemplate(value) {
    this._setOption("titleTemplate", value);
  }
  get toolbarItems() {
    return this._getOption("toolbarItems");
  }
  set toolbarItems(value) {
    this._setOption("toolbarItems", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  get wrapperAttr() {
    return this._getOption("wrapperAttr");
  }
  set wrapperAttr(value) {
    this._setOption("wrapperAttr", value);
  }
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  heightChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  positionChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  visibleChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  widthChange;
  get _optionPath() {
    return "popup";
  }
  get toolbarItemsChildren() {
    return this._getOption("toolbarItems");
  }
  set toolbarItemsChildren(value) {
    this.setChildren("toolbarItems", value);
  }
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "heightChange"
    }, {
      emit: "positionChange"
    }, {
      emit: "visibleChange"
    }, {
      emit: "widthChange"
    }]);
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridPopupComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridPopupComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridPopupComponent,
    selectors: [["dxo-data-grid-popup"]],
    contentQueries: function DxoDataGridPopupComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, DxiDataGridToolbarItemComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.toolbarItemsChildren = _t);
      }
    },
    inputs: {
      accessKey: "accessKey",
      animation: "animation",
      closeOnOutsideClick: "closeOnOutsideClick",
      container: "container",
      contentTemplate: "contentTemplate",
      deferRendering: "deferRendering",
      disabled: "disabled",
      dragAndResizeArea: "dragAndResizeArea",
      dragEnabled: "dragEnabled",
      dragOutsideBoundary: "dragOutsideBoundary",
      enableBodyScroll: "enableBodyScroll",
      focusStateEnabled: "focusStateEnabled",
      fullScreen: "fullScreen",
      height: "height",
      hideOnOutsideClick: "hideOnOutsideClick",
      hideOnParentScroll: "hideOnParentScroll",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      maxHeight: "maxHeight",
      maxWidth: "maxWidth",
      minHeight: "minHeight",
      minWidth: "minWidth",
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onHidden: "onHidden",
      onHiding: "onHiding",
      onInitialized: "onInitialized",
      onOptionChanged: "onOptionChanged",
      onResize: "onResize",
      onResizeEnd: "onResizeEnd",
      onResizeStart: "onResizeStart",
      onShowing: "onShowing",
      onShown: "onShown",
      onTitleRendered: "onTitleRendered",
      position: "position",
      resizeEnabled: "resizeEnabled",
      restorePosition: "restorePosition",
      rtlEnabled: "rtlEnabled",
      shading: "shading",
      shadingColor: "shadingColor",
      showCloseButton: "showCloseButton",
      showTitle: "showTitle",
      tabIndex: "tabIndex",
      title: "title",
      titleTemplate: "titleTemplate",
      toolbarItems: "toolbarItems",
      visible: "visible",
      width: "width",
      wrapperAttr: "wrapperAttr"
    },
    outputs: {
      heightChange: "heightChange",
      positionChange: "positionChange",
      visibleChange: "visibleChange",
      widthChange: "widthChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridPopupComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridPopupComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-popup",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    accessKey: [{
      type: Input
    }],
    animation: [{
      type: Input
    }],
    closeOnOutsideClick: [{
      type: Input
    }],
    container: [{
      type: Input
    }],
    contentTemplate: [{
      type: Input
    }],
    deferRendering: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    dragAndResizeArea: [{
      type: Input
    }],
    dragEnabled: [{
      type: Input
    }],
    dragOutsideBoundary: [{
      type: Input
    }],
    enableBodyScroll: [{
      type: Input
    }],
    focusStateEnabled: [{
      type: Input
    }],
    fullScreen: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    hideOnOutsideClick: [{
      type: Input
    }],
    hideOnParentScroll: [{
      type: Input
    }],
    hint: [{
      type: Input
    }],
    hoverStateEnabled: [{
      type: Input
    }],
    maxHeight: [{
      type: Input
    }],
    maxWidth: [{
      type: Input
    }],
    minHeight: [{
      type: Input
    }],
    minWidth: [{
      type: Input
    }],
    onContentReady: [{
      type: Input
    }],
    onDisposing: [{
      type: Input
    }],
    onHidden: [{
      type: Input
    }],
    onHiding: [{
      type: Input
    }],
    onInitialized: [{
      type: Input
    }],
    onOptionChanged: [{
      type: Input
    }],
    onResize: [{
      type: Input
    }],
    onResizeEnd: [{
      type: Input
    }],
    onResizeStart: [{
      type: Input
    }],
    onShowing: [{
      type: Input
    }],
    onShown: [{
      type: Input
    }],
    onTitleRendered: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    resizeEnabled: [{
      type: Input
    }],
    restorePosition: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    shading: [{
      type: Input
    }],
    shadingColor: [{
      type: Input
    }],
    showCloseButton: [{
      type: Input
    }],
    showTitle: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    titleTemplate: [{
      type: Input
    }],
    toolbarItems: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    wrapperAttr: [{
      type: Input
    }],
    heightChange: [{
      type: Output
    }],
    positionChange: [{
      type: Output
    }],
    visibleChange: [{
      type: Output
    }],
    widthChange: [{
      type: Output
    }],
    toolbarItemsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridToolbarItemComponent)]
    }]
  });
})();
var DxoDataGridPopupModule = class _DxoDataGridPopupModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridPopupModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridPopupModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridPopupModule,
    declarations: [DxoDataGridPopupComponent],
    exports: [DxoDataGridPopupComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridPopupModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridPopupComponent],
      exports: [DxoDataGridPopupComponent]
    }]
  }], null, null);
})();
var DxoDataGridPositionComponent = class _DxoDataGridPositionComponent extends NestedOption {
  get at() {
    return this._getOption("at");
  }
  set at(value) {
    this._setOption("at", value);
  }
  get boundary() {
    return this._getOption("boundary");
  }
  set boundary(value) {
    this._setOption("boundary", value);
  }
  get boundaryOffset() {
    return this._getOption("boundaryOffset");
  }
  set boundaryOffset(value) {
    this._setOption("boundaryOffset", value);
  }
  get collision() {
    return this._getOption("collision");
  }
  set collision(value) {
    this._setOption("collision", value);
  }
  get my() {
    return this._getOption("my");
  }
  set my(value) {
    this._setOption("my", value);
  }
  get of() {
    return this._getOption("of");
  }
  set of(value) {
    this._setOption("of", value);
  }
  get offset() {
    return this._getOption("offset");
  }
  set offset(value) {
    this._setOption("offset", value);
  }
  get _optionPath() {
    return "position";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridPositionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridPositionComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridPositionComponent,
    selectors: [["dxo-data-grid-position"]],
    inputs: {
      at: "at",
      boundary: "boundary",
      boundaryOffset: "boundaryOffset",
      collision: "collision",
      my: "my",
      of: "of",
      offset: "offset"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridPositionComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridPositionComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-position",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    at: [{
      type: Input
    }],
    boundary: [{
      type: Input
    }],
    boundaryOffset: [{
      type: Input
    }],
    collision: [{
      type: Input
    }],
    my: [{
      type: Input
    }],
    of: [{
      type: Input
    }],
    offset: [{
      type: Input
    }]
  });
})();
var DxoDataGridPositionModule = class _DxoDataGridPositionModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridPositionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridPositionModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridPositionModule,
    declarations: [DxoDataGridPositionComponent],
    exports: [DxoDataGridPositionComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridPositionModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridPositionComponent],
      exports: [DxoDataGridPositionComponent]
    }]
  }], null, null);
})();
var DxoDataGridRemoteOperationsComponent = class _DxoDataGridRemoteOperationsComponent extends NestedOption {
  get filtering() {
    return this._getOption("filtering");
  }
  set filtering(value) {
    this._setOption("filtering", value);
  }
  get grouping() {
    return this._getOption("grouping");
  }
  set grouping(value) {
    this._setOption("grouping", value);
  }
  get groupPaging() {
    return this._getOption("groupPaging");
  }
  set groupPaging(value) {
    this._setOption("groupPaging", value);
  }
  get paging() {
    return this._getOption("paging");
  }
  set paging(value) {
    this._setOption("paging", value);
  }
  get sorting() {
    return this._getOption("sorting");
  }
  set sorting(value) {
    this._setOption("sorting", value);
  }
  get summary() {
    return this._getOption("summary");
  }
  set summary(value) {
    this._setOption("summary", value);
  }
  get _optionPath() {
    return "remoteOperations";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridRemoteOperationsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridRemoteOperationsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridRemoteOperationsComponent,
    selectors: [["dxo-data-grid-remote-operations"]],
    inputs: {
      filtering: "filtering",
      grouping: "grouping",
      groupPaging: "groupPaging",
      paging: "paging",
      sorting: "sorting",
      summary: "summary"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridRemoteOperationsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridRemoteOperationsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-remote-operations",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    filtering: [{
      type: Input
    }],
    grouping: [{
      type: Input
    }],
    groupPaging: [{
      type: Input
    }],
    paging: [{
      type: Input
    }],
    sorting: [{
      type: Input
    }],
    summary: [{
      type: Input
    }]
  });
})();
var DxoDataGridRemoteOperationsModule = class _DxoDataGridRemoteOperationsModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridRemoteOperationsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridRemoteOperationsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridRemoteOperationsModule,
    declarations: [DxoDataGridRemoteOperationsComponent],
    exports: [DxoDataGridRemoteOperationsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridRemoteOperationsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridRemoteOperationsComponent],
      exports: [DxoDataGridRemoteOperationsComponent]
    }]
  }], null, null);
})();
var DxoDataGridRowDraggingComponent = class _DxoDataGridRowDraggingComponent extends NestedOption {
  get allowDropInsideItem() {
    return this._getOption("allowDropInsideItem");
  }
  set allowDropInsideItem(value) {
    this._setOption("allowDropInsideItem", value);
  }
  get allowReordering() {
    return this._getOption("allowReordering");
  }
  set allowReordering(value) {
    this._setOption("allowReordering", value);
  }
  get autoScroll() {
    return this._getOption("autoScroll");
  }
  set autoScroll(value) {
    this._setOption("autoScroll", value);
  }
  get boundary() {
    return this._getOption("boundary");
  }
  set boundary(value) {
    this._setOption("boundary", value);
  }
  get container() {
    return this._getOption("container");
  }
  set container(value) {
    this._setOption("container", value);
  }
  get cursorOffset() {
    return this._getOption("cursorOffset");
  }
  set cursorOffset(value) {
    this._setOption("cursorOffset", value);
  }
  get data() {
    return this._getOption("data");
  }
  set data(value) {
    this._setOption("data", value);
  }
  get dragDirection() {
    return this._getOption("dragDirection");
  }
  set dragDirection(value) {
    this._setOption("dragDirection", value);
  }
  get dragTemplate() {
    return this._getOption("dragTemplate");
  }
  set dragTemplate(value) {
    this._setOption("dragTemplate", value);
  }
  get dropFeedbackMode() {
    return this._getOption("dropFeedbackMode");
  }
  set dropFeedbackMode(value) {
    this._setOption("dropFeedbackMode", value);
  }
  get filter() {
    return this._getOption("filter");
  }
  set filter(value) {
    this._setOption("filter", value);
  }
  get group() {
    return this._getOption("group");
  }
  set group(value) {
    this._setOption("group", value);
  }
  get handle() {
    return this._getOption("handle");
  }
  set handle(value) {
    this._setOption("handle", value);
  }
  get onAdd() {
    return this._getOption("onAdd");
  }
  set onAdd(value) {
    this._setOption("onAdd", value);
  }
  get onDragChange() {
    return this._getOption("onDragChange");
  }
  set onDragChange(value) {
    this._setOption("onDragChange", value);
  }
  get onDragEnd() {
    return this._getOption("onDragEnd");
  }
  set onDragEnd(value) {
    this._setOption("onDragEnd", value);
  }
  get onDragMove() {
    return this._getOption("onDragMove");
  }
  set onDragMove(value) {
    this._setOption("onDragMove", value);
  }
  get onDragStart() {
    return this._getOption("onDragStart");
  }
  set onDragStart(value) {
    this._setOption("onDragStart", value);
  }
  get onRemove() {
    return this._getOption("onRemove");
  }
  set onRemove(value) {
    this._setOption("onRemove", value);
  }
  get onReorder() {
    return this._getOption("onReorder");
  }
  set onReorder(value) {
    this._setOption("onReorder", value);
  }
  get scrollSensitivity() {
    return this._getOption("scrollSensitivity");
  }
  set scrollSensitivity(value) {
    this._setOption("scrollSensitivity", value);
  }
  get scrollSpeed() {
    return this._getOption("scrollSpeed");
  }
  set scrollSpeed(value) {
    this._setOption("scrollSpeed", value);
  }
  get showDragIcons() {
    return this._getOption("showDragIcons");
  }
  set showDragIcons(value) {
    this._setOption("showDragIcons", value);
  }
  get _optionPath() {
    return "rowDragging";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridRowDraggingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridRowDraggingComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridRowDraggingComponent,
    selectors: [["dxo-data-grid-row-dragging"]],
    inputs: {
      allowDropInsideItem: "allowDropInsideItem",
      allowReordering: "allowReordering",
      autoScroll: "autoScroll",
      boundary: "boundary",
      container: "container",
      cursorOffset: "cursorOffset",
      data: "data",
      dragDirection: "dragDirection",
      dragTemplate: "dragTemplate",
      dropFeedbackMode: "dropFeedbackMode",
      filter: "filter",
      group: "group",
      handle: "handle",
      onAdd: "onAdd",
      onDragChange: "onDragChange",
      onDragEnd: "onDragEnd",
      onDragMove: "onDragMove",
      onDragStart: "onDragStart",
      onRemove: "onRemove",
      onReorder: "onReorder",
      scrollSensitivity: "scrollSensitivity",
      scrollSpeed: "scrollSpeed",
      showDragIcons: "showDragIcons"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridRowDraggingComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridRowDraggingComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-row-dragging",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowDropInsideItem: [{
      type: Input
    }],
    allowReordering: [{
      type: Input
    }],
    autoScroll: [{
      type: Input
    }],
    boundary: [{
      type: Input
    }],
    container: [{
      type: Input
    }],
    cursorOffset: [{
      type: Input
    }],
    data: [{
      type: Input
    }],
    dragDirection: [{
      type: Input
    }],
    dragTemplate: [{
      type: Input
    }],
    dropFeedbackMode: [{
      type: Input
    }],
    filter: [{
      type: Input
    }],
    group: [{
      type: Input
    }],
    handle: [{
      type: Input
    }],
    onAdd: [{
      type: Input
    }],
    onDragChange: [{
      type: Input
    }],
    onDragEnd: [{
      type: Input
    }],
    onDragMove: [{
      type: Input
    }],
    onDragStart: [{
      type: Input
    }],
    onRemove: [{
      type: Input
    }],
    onReorder: [{
      type: Input
    }],
    scrollSensitivity: [{
      type: Input
    }],
    scrollSpeed: [{
      type: Input
    }],
    showDragIcons: [{
      type: Input
    }]
  });
})();
var DxoDataGridRowDraggingModule = class _DxoDataGridRowDraggingModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridRowDraggingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridRowDraggingModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridRowDraggingModule,
    declarations: [DxoDataGridRowDraggingComponent],
    exports: [DxoDataGridRowDraggingComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridRowDraggingModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridRowDraggingComponent],
      exports: [DxoDataGridRowDraggingComponent]
    }]
  }], null, null);
})();
var DxoDataGridScrollingComponent = class _DxoDataGridScrollingComponent extends NestedOption {
  get columnRenderingMode() {
    return this._getOption("columnRenderingMode");
  }
  set columnRenderingMode(value) {
    this._setOption("columnRenderingMode", value);
  }
  get mode() {
    return this._getOption("mode");
  }
  set mode(value) {
    this._setOption("mode", value);
  }
  get preloadEnabled() {
    return this._getOption("preloadEnabled");
  }
  set preloadEnabled(value) {
    this._setOption("preloadEnabled", value);
  }
  get renderAsync() {
    return this._getOption("renderAsync");
  }
  set renderAsync(value) {
    this._setOption("renderAsync", value);
  }
  get rowRenderingMode() {
    return this._getOption("rowRenderingMode");
  }
  set rowRenderingMode(value) {
    this._setOption("rowRenderingMode", value);
  }
  get scrollByContent() {
    return this._getOption("scrollByContent");
  }
  set scrollByContent(value) {
    this._setOption("scrollByContent", value);
  }
  get scrollByThumb() {
    return this._getOption("scrollByThumb");
  }
  set scrollByThumb(value) {
    this._setOption("scrollByThumb", value);
  }
  get showScrollbar() {
    return this._getOption("showScrollbar");
  }
  set showScrollbar(value) {
    this._setOption("showScrollbar", value);
  }
  get useNative() {
    return this._getOption("useNative");
  }
  set useNative(value) {
    this._setOption("useNative", value);
  }
  get _optionPath() {
    return "scrolling";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridScrollingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridScrollingComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridScrollingComponent,
    selectors: [["dxo-data-grid-scrolling"]],
    inputs: {
      columnRenderingMode: "columnRenderingMode",
      mode: "mode",
      preloadEnabled: "preloadEnabled",
      renderAsync: "renderAsync",
      rowRenderingMode: "rowRenderingMode",
      scrollByContent: "scrollByContent",
      scrollByThumb: "scrollByThumb",
      showScrollbar: "showScrollbar",
      useNative: "useNative"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridScrollingComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridScrollingComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-scrolling",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    columnRenderingMode: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    preloadEnabled: [{
      type: Input
    }],
    renderAsync: [{
      type: Input
    }],
    rowRenderingMode: [{
      type: Input
    }],
    scrollByContent: [{
      type: Input
    }],
    scrollByThumb: [{
      type: Input
    }],
    showScrollbar: [{
      type: Input
    }],
    useNative: [{
      type: Input
    }]
  });
})();
var DxoDataGridScrollingModule = class _DxoDataGridScrollingModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridScrollingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridScrollingModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridScrollingModule,
    declarations: [DxoDataGridScrollingComponent],
    exports: [DxoDataGridScrollingComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridScrollingModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridScrollingComponent],
      exports: [DxoDataGridScrollingComponent]
    }]
  }], null, null);
})();
var DxoDataGridSearchPanelComponent = class _DxoDataGridSearchPanelComponent extends NestedOption {
  get highlightCaseSensitive() {
    return this._getOption("highlightCaseSensitive");
  }
  set highlightCaseSensitive(value) {
    this._setOption("highlightCaseSensitive", value);
  }
  get highlightSearchText() {
    return this._getOption("highlightSearchText");
  }
  set highlightSearchText(value) {
    this._setOption("highlightSearchText", value);
  }
  get placeholder() {
    return this._getOption("placeholder");
  }
  set placeholder(value) {
    this._setOption("placeholder", value);
  }
  get searchVisibleColumnsOnly() {
    return this._getOption("searchVisibleColumnsOnly");
  }
  set searchVisibleColumnsOnly(value) {
    this._setOption("searchVisibleColumnsOnly", value);
  }
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  textChange;
  get _optionPath() {
    return "searchPanel";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "textChange"
    }]);
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridSearchPanelComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridSearchPanelComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridSearchPanelComponent,
    selectors: [["dxo-data-grid-search-panel"]],
    inputs: {
      highlightCaseSensitive: "highlightCaseSensitive",
      highlightSearchText: "highlightSearchText",
      placeholder: "placeholder",
      searchVisibleColumnsOnly: "searchVisibleColumnsOnly",
      text: "text",
      visible: "visible",
      width: "width"
    },
    outputs: {
      textChange: "textChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridSearchPanelComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridSearchPanelComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-search-panel",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    highlightCaseSensitive: [{
      type: Input
    }],
    highlightSearchText: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    searchVisibleColumnsOnly: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    textChange: [{
      type: Output
    }]
  });
})();
var DxoDataGridSearchPanelModule = class _DxoDataGridSearchPanelModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridSearchPanelModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridSearchPanelModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridSearchPanelModule,
    declarations: [DxoDataGridSearchPanelComponent],
    exports: [DxoDataGridSearchPanelComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridSearchPanelModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridSearchPanelComponent],
      exports: [DxoDataGridSearchPanelComponent]
    }]
  }], null, null);
})();
var DxoDataGridSearchComponent = class _DxoDataGridSearchComponent extends NestedOption {
  get editorOptions() {
    return this._getOption("editorOptions");
  }
  set editorOptions(value) {
    this._setOption("editorOptions", value);
  }
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get mode() {
    return this._getOption("mode");
  }
  set mode(value) {
    this._setOption("mode", value);
  }
  get searchExpr() {
    return this._getOption("searchExpr");
  }
  set searchExpr(value) {
    this._setOption("searchExpr", value);
  }
  get timeout() {
    return this._getOption("timeout");
  }
  set timeout(value) {
    this._setOption("timeout", value);
  }
  get _optionPath() {
    return "search";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridSearchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridSearchComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridSearchComponent,
    selectors: [["dxo-data-grid-search"]],
    inputs: {
      editorOptions: "editorOptions",
      enabled: "enabled",
      mode: "mode",
      searchExpr: "searchExpr",
      timeout: "timeout"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridSearchComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridSearchComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-search",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    editorOptions: [{
      type: Input
    }],
    enabled: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    searchExpr: [{
      type: Input
    }],
    timeout: [{
      type: Input
    }]
  });
})();
var DxoDataGridSearchModule = class _DxoDataGridSearchModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridSearchModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridSearchModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridSearchModule,
    declarations: [DxoDataGridSearchComponent],
    exports: [DxoDataGridSearchComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridSearchModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridSearchComponent],
      exports: [DxoDataGridSearchComponent]
    }]
  }], null, null);
})();
var DxoDataGridSelectionComponent = class _DxoDataGridSelectionComponent extends NestedOption {
  get allowSelectAll() {
    return this._getOption("allowSelectAll");
  }
  set allowSelectAll(value) {
    this._setOption("allowSelectAll", value);
  }
  get deferred() {
    return this._getOption("deferred");
  }
  set deferred(value) {
    this._setOption("deferred", value);
  }
  get mode() {
    return this._getOption("mode");
  }
  set mode(value) {
    this._setOption("mode", value);
  }
  get selectAllMode() {
    return this._getOption("selectAllMode");
  }
  set selectAllMode(value) {
    this._setOption("selectAllMode", value);
  }
  get sensitivity() {
    return this._getOption("sensitivity");
  }
  set sensitivity(value) {
    this._setOption("sensitivity", value);
  }
  get showCheckBoxesMode() {
    return this._getOption("showCheckBoxesMode");
  }
  set showCheckBoxesMode(value) {
    this._setOption("showCheckBoxesMode", value);
  }
  get recursive() {
    return this._getOption("recursive");
  }
  set recursive(value) {
    this._setOption("recursive", value);
  }
  get selectByClick() {
    return this._getOption("selectByClick");
  }
  set selectByClick(value) {
    this._setOption("selectByClick", value);
  }
  get _optionPath() {
    return "selection";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridSelectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridSelectionComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridSelectionComponent,
    selectors: [["dxo-data-grid-selection"]],
    inputs: {
      allowSelectAll: "allowSelectAll",
      deferred: "deferred",
      mode: "mode",
      selectAllMode: "selectAllMode",
      sensitivity: "sensitivity",
      showCheckBoxesMode: "showCheckBoxesMode",
      recursive: "recursive",
      selectByClick: "selectByClick"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridSelectionComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridSelectionComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-selection",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    allowSelectAll: [{
      type: Input
    }],
    deferred: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    selectAllMode: [{
      type: Input
    }],
    sensitivity: [{
      type: Input
    }],
    showCheckBoxesMode: [{
      type: Input
    }],
    recursive: [{
      type: Input
    }],
    selectByClick: [{
      type: Input
    }]
  });
})();
var DxoDataGridSelectionModule = class _DxoDataGridSelectionModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridSelectionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridSelectionModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridSelectionModule,
    declarations: [DxoDataGridSelectionComponent],
    exports: [DxoDataGridSelectionComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridSelectionModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridSelectionComponent],
      exports: [DxoDataGridSelectionComponent]
    }]
  }], null, null);
})();
var DxoDataGridShowComponent = class _DxoDataGridShowComponent extends NestedOption {
  get complete() {
    return this._getOption("complete");
  }
  set complete(value) {
    this._setOption("complete", value);
  }
  get delay() {
    return this._getOption("delay");
  }
  set delay(value) {
    this._setOption("delay", value);
  }
  get direction() {
    return this._getOption("direction");
  }
  set direction(value) {
    this._setOption("direction", value);
  }
  get duration() {
    return this._getOption("duration");
  }
  set duration(value) {
    this._setOption("duration", value);
  }
  get easing() {
    return this._getOption("easing");
  }
  set easing(value) {
    this._setOption("easing", value);
  }
  get from() {
    return this._getOption("from");
  }
  set from(value) {
    this._setOption("from", value);
  }
  get staggerDelay() {
    return this._getOption("staggerDelay");
  }
  set staggerDelay(value) {
    this._setOption("staggerDelay", value);
  }
  get start() {
    return this._getOption("start");
  }
  set start(value) {
    this._setOption("start", value);
  }
  get to() {
    return this._getOption("to");
  }
  set to(value) {
    this._setOption("to", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "show";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridShowComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridShowComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridShowComponent,
    selectors: [["dxo-data-grid-show"]],
    inputs: {
      complete: "complete",
      delay: "delay",
      direction: "direction",
      duration: "duration",
      easing: "easing",
      from: "from",
      staggerDelay: "staggerDelay",
      start: "start",
      to: "to",
      type: "type"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridShowComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridShowComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-show",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    complete: [{
      type: Input
    }],
    delay: [{
      type: Input
    }],
    direction: [{
      type: Input
    }],
    duration: [{
      type: Input
    }],
    easing: [{
      type: Input
    }],
    from: [{
      type: Input
    }],
    staggerDelay: [{
      type: Input
    }],
    start: [{
      type: Input
    }],
    to: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxoDataGridShowModule = class _DxoDataGridShowModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridShowModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridShowModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridShowModule,
    declarations: [DxoDataGridShowComponent],
    exports: [DxoDataGridShowComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridShowModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridShowComponent],
      exports: [DxoDataGridShowComponent]
    }]
  }], null, null);
})();
var DxiDataGridSortByGroupSummaryInfoComponent = class _DxiDataGridSortByGroupSummaryInfoComponent extends CollectionNestedOption {
  get groupColumn() {
    return this._getOption("groupColumn");
  }
  set groupColumn(value) {
    this._setOption("groupColumn", value);
  }
  get sortOrder() {
    return this._getOption("sortOrder");
  }
  set sortOrder(value) {
    this._setOption("sortOrder", value);
  }
  get summaryItem() {
    return this._getOption("summaryItem");
  }
  set summaryItem(value) {
    this._setOption("summaryItem", value);
  }
  get _optionPath() {
    return "sortByGroupSummaryInfo";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridSortByGroupSummaryInfoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridSortByGroupSummaryInfoComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridSortByGroupSummaryInfoComponent,
    selectors: [["dxi-data-grid-sort-by-group-summary-info"]],
    inputs: {
      groupColumn: "groupColumn",
      sortOrder: "sortOrder",
      summaryItem: "summaryItem"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridSortByGroupSummaryInfoComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridSortByGroupSummaryInfoComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-sort-by-group-summary-info",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    groupColumn: [{
      type: Input
    }],
    sortOrder: [{
      type: Input
    }],
    summaryItem: [{
      type: Input
    }]
  });
})();
var DxiDataGridSortByGroupSummaryInfoModule = class _DxiDataGridSortByGroupSummaryInfoModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridSortByGroupSummaryInfoModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridSortByGroupSummaryInfoModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridSortByGroupSummaryInfoModule,
    declarations: [DxiDataGridSortByGroupSummaryInfoComponent],
    exports: [DxiDataGridSortByGroupSummaryInfoComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridSortByGroupSummaryInfoModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridSortByGroupSummaryInfoComponent],
      exports: [DxiDataGridSortByGroupSummaryInfoComponent]
    }]
  }], null, null);
})();
var DxoDataGridSortingComponent = class _DxoDataGridSortingComponent extends NestedOption {
  get ascendingText() {
    return this._getOption("ascendingText");
  }
  set ascendingText(value) {
    this._setOption("ascendingText", value);
  }
  get clearText() {
    return this._getOption("clearText");
  }
  set clearText(value) {
    this._setOption("clearText", value);
  }
  get descendingText() {
    return this._getOption("descendingText");
  }
  set descendingText(value) {
    this._setOption("descendingText", value);
  }
  get mode() {
    return this._getOption("mode");
  }
  set mode(value) {
    this._setOption("mode", value);
  }
  get showSortIndexes() {
    return this._getOption("showSortIndexes");
  }
  set showSortIndexes(value) {
    this._setOption("showSortIndexes", value);
  }
  get _optionPath() {
    return "sorting";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridSortingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridSortingComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridSortingComponent,
    selectors: [["dxo-data-grid-sorting"]],
    inputs: {
      ascendingText: "ascendingText",
      clearText: "clearText",
      descendingText: "descendingText",
      mode: "mode",
      showSortIndexes: "showSortIndexes"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridSortingComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridSortingComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-sorting",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    ascendingText: [{
      type: Input
    }],
    clearText: [{
      type: Input
    }],
    descendingText: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    showSortIndexes: [{
      type: Input
    }]
  });
})();
var DxoDataGridSortingModule = class _DxoDataGridSortingModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridSortingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridSortingModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridSortingModule,
    declarations: [DxoDataGridSortingComponent],
    exports: [DxoDataGridSortingComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridSortingModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridSortingComponent],
      exports: [DxoDataGridSortingComponent]
    }]
  }], null, null);
})();
var DxoDataGridStateStoringComponent = class _DxoDataGridStateStoringComponent extends NestedOption {
  get customLoad() {
    return this._getOption("customLoad");
  }
  set customLoad(value) {
    this._setOption("customLoad", value);
  }
  get customSave() {
    return this._getOption("customSave");
  }
  set customSave(value) {
    this._setOption("customSave", value);
  }
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get savingTimeout() {
    return this._getOption("savingTimeout");
  }
  set savingTimeout(value) {
    this._setOption("savingTimeout", value);
  }
  get storageKey() {
    return this._getOption("storageKey");
  }
  set storageKey(value) {
    this._setOption("storageKey", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get _optionPath() {
    return "stateStoring";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridStateStoringComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridStateStoringComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridStateStoringComponent,
    selectors: [["dxo-data-grid-state-storing"]],
    inputs: {
      customLoad: "customLoad",
      customSave: "customSave",
      enabled: "enabled",
      savingTimeout: "savingTimeout",
      storageKey: "storageKey",
      type: "type"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridStateStoringComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridStateStoringComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-state-storing",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    customLoad: [{
      type: Input
    }],
    customSave: [{
      type: Input
    }],
    enabled: [{
      type: Input
    }],
    savingTimeout: [{
      type: Input
    }],
    storageKey: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var DxoDataGridStateStoringModule = class _DxoDataGridStateStoringModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridStateStoringModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridStateStoringModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridStateStoringModule,
    declarations: [DxoDataGridStateStoringComponent],
    exports: [DxoDataGridStateStoringComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridStateStoringModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridStateStoringComponent],
      exports: [DxoDataGridStateStoringComponent]
    }]
  }], null, null);
})();
var DxoDataGridSummaryTextsComponent = class _DxoDataGridSummaryTextsComponent extends NestedOption {
  get avg() {
    return this._getOption("avg");
  }
  set avg(value) {
    this._setOption("avg", value);
  }
  get avgOtherColumn() {
    return this._getOption("avgOtherColumn");
  }
  set avgOtherColumn(value) {
    this._setOption("avgOtherColumn", value);
  }
  get count() {
    return this._getOption("count");
  }
  set count(value) {
    this._setOption("count", value);
  }
  get max() {
    return this._getOption("max");
  }
  set max(value) {
    this._setOption("max", value);
  }
  get maxOtherColumn() {
    return this._getOption("maxOtherColumn");
  }
  set maxOtherColumn(value) {
    this._setOption("maxOtherColumn", value);
  }
  get min() {
    return this._getOption("min");
  }
  set min(value) {
    this._setOption("min", value);
  }
  get minOtherColumn() {
    return this._getOption("minOtherColumn");
  }
  set minOtherColumn(value) {
    this._setOption("minOtherColumn", value);
  }
  get sum() {
    return this._getOption("sum");
  }
  set sum(value) {
    this._setOption("sum", value);
  }
  get sumOtherColumn() {
    return this._getOption("sumOtherColumn");
  }
  set sumOtherColumn(value) {
    this._setOption("sumOtherColumn", value);
  }
  get _optionPath() {
    return "texts";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridSummaryTextsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridSummaryTextsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridSummaryTextsComponent,
    selectors: [["dxo-data-grid-summary-texts"]],
    inputs: {
      avg: "avg",
      avgOtherColumn: "avgOtherColumn",
      count: "count",
      max: "max",
      maxOtherColumn: "maxOtherColumn",
      min: "min",
      minOtherColumn: "minOtherColumn",
      sum: "sum",
      sumOtherColumn: "sumOtherColumn"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridSummaryTextsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridSummaryTextsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-summary-texts",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    avg: [{
      type: Input
    }],
    avgOtherColumn: [{
      type: Input
    }],
    count: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    maxOtherColumn: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    minOtherColumn: [{
      type: Input
    }],
    sum: [{
      type: Input
    }],
    sumOtherColumn: [{
      type: Input
    }]
  });
})();
var DxoDataGridSummaryTextsModule = class _DxoDataGridSummaryTextsModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridSummaryTextsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridSummaryTextsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridSummaryTextsModule,
    declarations: [DxoDataGridSummaryTextsComponent],
    exports: [DxoDataGridSummaryTextsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridSummaryTextsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridSummaryTextsComponent],
      exports: [DxoDataGridSummaryTextsComponent]
    }]
  }], null, null);
})();
var DxiDataGridTotalItemComponent = class _DxiDataGridTotalItemComponent extends CollectionNestedOption {
  get alignment() {
    return this._getOption("alignment");
  }
  set alignment(value) {
    this._setOption("alignment", value);
  }
  get column() {
    return this._getOption("column");
  }
  set column(value) {
    this._setOption("column", value);
  }
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get customizeText() {
    return this._getOption("customizeText");
  }
  set customizeText(value) {
    this._setOption("customizeText", value);
  }
  get displayFormat() {
    return this._getOption("displayFormat");
  }
  set displayFormat(value) {
    this._setOption("displayFormat", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get showInColumn() {
    return this._getOption("showInColumn");
  }
  set showInColumn(value) {
    this._setOption("showInColumn", value);
  }
  get skipEmptyValues() {
    return this._getOption("skipEmptyValues");
  }
  set skipEmptyValues(value) {
    this._setOption("skipEmptyValues", value);
  }
  get summaryType() {
    return this._getOption("summaryType");
  }
  set summaryType(value) {
    this._setOption("summaryType", value);
  }
  get valueFormat() {
    return this._getOption("valueFormat");
  }
  set valueFormat(value) {
    this._setOption("valueFormat", value);
  }
  get _optionPath() {
    return "totalItems";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiDataGridTotalItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridTotalItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiDataGridTotalItemComponent,
    selectors: [["dxi-data-grid-total-item"]],
    inputs: {
      alignment: "alignment",
      column: "column",
      cssClass: "cssClass",
      customizeText: "customizeText",
      displayFormat: "displayFormat",
      name: "name",
      showInColumn: "showInColumn",
      skipEmptyValues: "skipEmptyValues",
      summaryType: "summaryType",
      valueFormat: "valueFormat"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiDataGridTotalItemComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridTotalItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-data-grid-total-item",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    alignment: [{
      type: Input
    }],
    column: [{
      type: Input
    }],
    cssClass: [{
      type: Input
    }],
    customizeText: [{
      type: Input
    }],
    displayFormat: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    showInColumn: [{
      type: Input
    }],
    skipEmptyValues: [{
      type: Input
    }],
    summaryType: [{
      type: Input
    }],
    valueFormat: [{
      type: Input
    }]
  });
})();
var DxiDataGridTotalItemModule = class _DxiDataGridTotalItemModule {
  /** @nocollapse */
  static ɵfac = function DxiDataGridTotalItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiDataGridTotalItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiDataGridTotalItemModule,
    declarations: [DxiDataGridTotalItemComponent],
    exports: [DxiDataGridTotalItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiDataGridTotalItemModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiDataGridTotalItemComponent],
      exports: [DxiDataGridTotalItemComponent]
    }]
  }], null, null);
})();
var DxoDataGridSummaryComponent = class _DxoDataGridSummaryComponent extends NestedOption {
  get calculateCustomSummary() {
    return this._getOption("calculateCustomSummary");
  }
  set calculateCustomSummary(value) {
    this._setOption("calculateCustomSummary", value);
  }
  get groupItems() {
    return this._getOption("groupItems");
  }
  set groupItems(value) {
    this._setOption("groupItems", value);
  }
  get recalculateWhileEditing() {
    return this._getOption("recalculateWhileEditing");
  }
  set recalculateWhileEditing(value) {
    this._setOption("recalculateWhileEditing", value);
  }
  get skipEmptyValues() {
    return this._getOption("skipEmptyValues");
  }
  set skipEmptyValues(value) {
    this._setOption("skipEmptyValues", value);
  }
  get texts() {
    return this._getOption("texts");
  }
  set texts(value) {
    this._setOption("texts", value);
  }
  get totalItems() {
    return this._getOption("totalItems");
  }
  set totalItems(value) {
    this._setOption("totalItems", value);
  }
  get _optionPath() {
    return "summary";
  }
  get groupItemsChildren() {
    return this._getOption("groupItems");
  }
  set groupItemsChildren(value) {
    this.setChildren("groupItems", value);
  }
  get totalItemsChildren() {
    return this._getOption("totalItems");
  }
  set totalItemsChildren(value) {
    this.setChildren("totalItems", value);
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridSummaryComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridSummaryComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridSummaryComponent,
    selectors: [["dxo-data-grid-summary"]],
    contentQueries: function DxoDataGridSummaryComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, DxiDataGridGroupItemComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiDataGridTotalItemComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.groupItemsChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.totalItemsChildren = _t);
      }
    },
    inputs: {
      calculateCustomSummary: "calculateCustomSummary",
      groupItems: "groupItems",
      recalculateWhileEditing: "recalculateWhileEditing",
      skipEmptyValues: "skipEmptyValues",
      texts: "texts",
      totalItems: "totalItems"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridSummaryComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridSummaryComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-summary",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    calculateCustomSummary: [{
      type: Input
    }],
    groupItems: [{
      type: Input
    }],
    recalculateWhileEditing: [{
      type: Input
    }],
    skipEmptyValues: [{
      type: Input
    }],
    texts: [{
      type: Input
    }],
    totalItems: [{
      type: Input
    }],
    groupItemsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridGroupItemComponent)]
    }],
    totalItemsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridTotalItemComponent)]
    }]
  });
})();
var DxoDataGridSummaryModule = class _DxoDataGridSummaryModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridSummaryModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridSummaryModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridSummaryModule,
    declarations: [DxoDataGridSummaryComponent],
    exports: [DxoDataGridSummaryComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridSummaryModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridSummaryComponent],
      exports: [DxoDataGridSummaryComponent]
    }]
  }], null, null);
})();
var DxoDataGridTextsComponent = class _DxoDataGridTextsComponent extends NestedOption {
  get addRow() {
    return this._getOption("addRow");
  }
  set addRow(value) {
    this._setOption("addRow", value);
  }
  get cancelAllChanges() {
    return this._getOption("cancelAllChanges");
  }
  set cancelAllChanges(value) {
    this._setOption("cancelAllChanges", value);
  }
  get cancelRowChanges() {
    return this._getOption("cancelRowChanges");
  }
  set cancelRowChanges(value) {
    this._setOption("cancelRowChanges", value);
  }
  get confirmDeleteMessage() {
    return this._getOption("confirmDeleteMessage");
  }
  set confirmDeleteMessage(value) {
    this._setOption("confirmDeleteMessage", value);
  }
  get confirmDeleteTitle() {
    return this._getOption("confirmDeleteTitle");
  }
  set confirmDeleteTitle(value) {
    this._setOption("confirmDeleteTitle", value);
  }
  get deleteRow() {
    return this._getOption("deleteRow");
  }
  set deleteRow(value) {
    this._setOption("deleteRow", value);
  }
  get editRow() {
    return this._getOption("editRow");
  }
  set editRow(value) {
    this._setOption("editRow", value);
  }
  get saveAllChanges() {
    return this._getOption("saveAllChanges");
  }
  set saveAllChanges(value) {
    this._setOption("saveAllChanges", value);
  }
  get saveRowChanges() {
    return this._getOption("saveRowChanges");
  }
  set saveRowChanges(value) {
    this._setOption("saveRowChanges", value);
  }
  get undeleteRow() {
    return this._getOption("undeleteRow");
  }
  set undeleteRow(value) {
    this._setOption("undeleteRow", value);
  }
  get validationCancelChanges() {
    return this._getOption("validationCancelChanges");
  }
  set validationCancelChanges(value) {
    this._setOption("validationCancelChanges", value);
  }
  get exportAll() {
    return this._getOption("exportAll");
  }
  set exportAll(value) {
    this._setOption("exportAll", value);
  }
  get exportSelectedRows() {
    return this._getOption("exportSelectedRows");
  }
  set exportSelectedRows(value) {
    this._setOption("exportSelectedRows", value);
  }
  get exportTo() {
    return this._getOption("exportTo");
  }
  set exportTo(value) {
    this._setOption("exportTo", value);
  }
  get groupByThisColumn() {
    return this._getOption("groupByThisColumn");
  }
  set groupByThisColumn(value) {
    this._setOption("groupByThisColumn", value);
  }
  get groupContinuedMessage() {
    return this._getOption("groupContinuedMessage");
  }
  set groupContinuedMessage(value) {
    this._setOption("groupContinuedMessage", value);
  }
  get groupContinuesMessage() {
    return this._getOption("groupContinuesMessage");
  }
  set groupContinuesMessage(value) {
    this._setOption("groupContinuesMessage", value);
  }
  get ungroup() {
    return this._getOption("ungroup");
  }
  set ungroup(value) {
    this._setOption("ungroup", value);
  }
  get ungroupAll() {
    return this._getOption("ungroupAll");
  }
  set ungroupAll(value) {
    this._setOption("ungroupAll", value);
  }
  get avg() {
    return this._getOption("avg");
  }
  set avg(value) {
    this._setOption("avg", value);
  }
  get avgOtherColumn() {
    return this._getOption("avgOtherColumn");
  }
  set avgOtherColumn(value) {
    this._setOption("avgOtherColumn", value);
  }
  get count() {
    return this._getOption("count");
  }
  set count(value) {
    this._setOption("count", value);
  }
  get max() {
    return this._getOption("max");
  }
  set max(value) {
    this._setOption("max", value);
  }
  get maxOtherColumn() {
    return this._getOption("maxOtherColumn");
  }
  set maxOtherColumn(value) {
    this._setOption("maxOtherColumn", value);
  }
  get min() {
    return this._getOption("min");
  }
  set min(value) {
    this._setOption("min", value);
  }
  get minOtherColumn() {
    return this._getOption("minOtherColumn");
  }
  set minOtherColumn(value) {
    this._setOption("minOtherColumn", value);
  }
  get sum() {
    return this._getOption("sum");
  }
  set sum(value) {
    this._setOption("sum", value);
  }
  get sumOtherColumn() {
    return this._getOption("sumOtherColumn");
  }
  set sumOtherColumn(value) {
    this._setOption("sumOtherColumn", value);
  }
  get fix() {
    return this._getOption("fix");
  }
  set fix(value) {
    this._setOption("fix", value);
  }
  get leftPosition() {
    return this._getOption("leftPosition");
  }
  set leftPosition(value) {
    this._setOption("leftPosition", value);
  }
  get rightPosition() {
    return this._getOption("rightPosition");
  }
  set rightPosition(value) {
    this._setOption("rightPosition", value);
  }
  get stickyPosition() {
    return this._getOption("stickyPosition");
  }
  set stickyPosition(value) {
    this._setOption("stickyPosition", value);
  }
  get unfix() {
    return this._getOption("unfix");
  }
  set unfix(value) {
    this._setOption("unfix", value);
  }
  get clearFilter() {
    return this._getOption("clearFilter");
  }
  set clearFilter(value) {
    this._setOption("clearFilter", value);
  }
  get createFilter() {
    return this._getOption("createFilter");
  }
  set createFilter(value) {
    this._setOption("createFilter", value);
  }
  get filterEnabledHint() {
    return this._getOption("filterEnabledHint");
  }
  set filterEnabledHint(value) {
    this._setOption("filterEnabledHint", value);
  }
  get cancel() {
    return this._getOption("cancel");
  }
  set cancel(value) {
    this._setOption("cancel", value);
  }
  get emptyValue() {
    return this._getOption("emptyValue");
  }
  set emptyValue(value) {
    this._setOption("emptyValue", value);
  }
  get ok() {
    return this._getOption("ok");
  }
  set ok(value) {
    this._setOption("ok", value);
  }
  get _optionPath() {
    return "texts";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridTextsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridTextsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridTextsComponent,
    selectors: [["dxo-data-grid-texts"]],
    inputs: {
      addRow: "addRow",
      cancelAllChanges: "cancelAllChanges",
      cancelRowChanges: "cancelRowChanges",
      confirmDeleteMessage: "confirmDeleteMessage",
      confirmDeleteTitle: "confirmDeleteTitle",
      deleteRow: "deleteRow",
      editRow: "editRow",
      saveAllChanges: "saveAllChanges",
      saveRowChanges: "saveRowChanges",
      undeleteRow: "undeleteRow",
      validationCancelChanges: "validationCancelChanges",
      exportAll: "exportAll",
      exportSelectedRows: "exportSelectedRows",
      exportTo: "exportTo",
      groupByThisColumn: "groupByThisColumn",
      groupContinuedMessage: "groupContinuedMessage",
      groupContinuesMessage: "groupContinuesMessage",
      ungroup: "ungroup",
      ungroupAll: "ungroupAll",
      avg: "avg",
      avgOtherColumn: "avgOtherColumn",
      count: "count",
      max: "max",
      maxOtherColumn: "maxOtherColumn",
      min: "min",
      minOtherColumn: "minOtherColumn",
      sum: "sum",
      sumOtherColumn: "sumOtherColumn",
      fix: "fix",
      leftPosition: "leftPosition",
      rightPosition: "rightPosition",
      stickyPosition: "stickyPosition",
      unfix: "unfix",
      clearFilter: "clearFilter",
      createFilter: "createFilter",
      filterEnabledHint: "filterEnabledHint",
      cancel: "cancel",
      emptyValue: "emptyValue",
      ok: "ok"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridTextsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridTextsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-texts",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    addRow: [{
      type: Input
    }],
    cancelAllChanges: [{
      type: Input
    }],
    cancelRowChanges: [{
      type: Input
    }],
    confirmDeleteMessage: [{
      type: Input
    }],
    confirmDeleteTitle: [{
      type: Input
    }],
    deleteRow: [{
      type: Input
    }],
    editRow: [{
      type: Input
    }],
    saveAllChanges: [{
      type: Input
    }],
    saveRowChanges: [{
      type: Input
    }],
    undeleteRow: [{
      type: Input
    }],
    validationCancelChanges: [{
      type: Input
    }],
    exportAll: [{
      type: Input
    }],
    exportSelectedRows: [{
      type: Input
    }],
    exportTo: [{
      type: Input
    }],
    groupByThisColumn: [{
      type: Input
    }],
    groupContinuedMessage: [{
      type: Input
    }],
    groupContinuesMessage: [{
      type: Input
    }],
    ungroup: [{
      type: Input
    }],
    ungroupAll: [{
      type: Input
    }],
    avg: [{
      type: Input
    }],
    avgOtherColumn: [{
      type: Input
    }],
    count: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    maxOtherColumn: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    minOtherColumn: [{
      type: Input
    }],
    sum: [{
      type: Input
    }],
    sumOtherColumn: [{
      type: Input
    }],
    fix: [{
      type: Input
    }],
    leftPosition: [{
      type: Input
    }],
    rightPosition: [{
      type: Input
    }],
    stickyPosition: [{
      type: Input
    }],
    unfix: [{
      type: Input
    }],
    clearFilter: [{
      type: Input
    }],
    createFilter: [{
      type: Input
    }],
    filterEnabledHint: [{
      type: Input
    }],
    cancel: [{
      type: Input
    }],
    emptyValue: [{
      type: Input
    }],
    ok: [{
      type: Input
    }]
  });
})();
var DxoDataGridTextsModule = class _DxoDataGridTextsModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridTextsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridTextsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridTextsModule,
    declarations: [DxoDataGridTextsComponent],
    exports: [DxoDataGridTextsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridTextsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridTextsComponent],
      exports: [DxoDataGridTextsComponent]
    }]
  }], null, null);
})();
var DxoDataGridToComponent = class _DxoDataGridToComponent extends NestedOption {
  get left() {
    return this._getOption("left");
  }
  set left(value) {
    this._setOption("left", value);
  }
  get opacity() {
    return this._getOption("opacity");
  }
  set opacity(value) {
    this._setOption("opacity", value);
  }
  get position() {
    return this._getOption("position");
  }
  set position(value) {
    this._setOption("position", value);
  }
  get scale() {
    return this._getOption("scale");
  }
  set scale(value) {
    this._setOption("scale", value);
  }
  get top() {
    return this._getOption("top");
  }
  set top(value) {
    this._setOption("top", value);
  }
  get _optionPath() {
    return "to";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridToComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridToComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridToComponent,
    selectors: [["dxo-data-grid-to"]],
    inputs: {
      left: "left",
      opacity: "opacity",
      position: "position",
      scale: "scale",
      top: "top"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridToComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridToComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-to",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    left: [{
      type: Input
    }],
    opacity: [{
      type: Input
    }],
    position: [{
      type: Input
    }],
    scale: [{
      type: Input
    }],
    top: [{
      type: Input
    }]
  });
})();
var DxoDataGridToModule = class _DxoDataGridToModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridToModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridToModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridToModule,
    declarations: [DxoDataGridToComponent],
    exports: [DxoDataGridToComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridToModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridToComponent],
      exports: [DxoDataGridToComponent]
    }]
  }], null, null);
})();
var DxoDataGridToolbarComponent = class _DxoDataGridToolbarComponent extends NestedOption {
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get _optionPath() {
    return "toolbar";
  }
  get itemsChildren() {
    return this._getOption("items");
  }
  set itemsChildren(value) {
    this.setChildren("items", value);
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridToolbarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridToolbarComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridToolbarComponent,
    selectors: [["dxo-data-grid-toolbar"]],
    contentQueries: function DxoDataGridToolbarComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, DxiDataGridItemComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemsChildren = _t);
      }
    },
    inputs: {
      disabled: "disabled",
      items: "items",
      visible: "visible"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridToolbarComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridToolbarComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-toolbar",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    disabled: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    itemsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiDataGridItemComponent)]
    }]
  });
})();
var DxoDataGridToolbarModule = class _DxoDataGridToolbarModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridToolbarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridToolbarModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridToolbarModule,
    declarations: [DxoDataGridToolbarComponent],
    exports: [DxoDataGridToolbarComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridToolbarModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridToolbarComponent],
      exports: [DxoDataGridToolbarComponent]
    }]
  }], null, null);
})();
var DxoDataGridValueFormatComponent = class _DxoDataGridValueFormatComponent extends NestedOption {
  get currency() {
    return this._getOption("currency");
  }
  set currency(value) {
    this._setOption("currency", value);
  }
  get formatter() {
    return this._getOption("formatter");
  }
  set formatter(value) {
    this._setOption("formatter", value);
  }
  get parser() {
    return this._getOption("parser");
  }
  set parser(value) {
    this._setOption("parser", value);
  }
  get precision() {
    return this._getOption("precision");
  }
  set precision(value) {
    this._setOption("precision", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get useCurrencyAccountingStyle() {
    return this._getOption("useCurrencyAccountingStyle");
  }
  set useCurrencyAccountingStyle(value) {
    this._setOption("useCurrencyAccountingStyle", value);
  }
  get _optionPath() {
    return "valueFormat";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoDataGridValueFormatComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridValueFormatComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoDataGridValueFormatComponent,
    selectors: [["dxo-data-grid-value-format"]],
    inputs: {
      currency: "currency",
      formatter: "formatter",
      parser: "parser",
      precision: "precision",
      type: "type",
      useCurrencyAccountingStyle: "useCurrencyAccountingStyle"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoDataGridValueFormatComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridValueFormatComponent, [{
    type: Component,
    args: [{
      selector: "dxo-data-grid-value-format",
      template: "",
      providers: [NestedOptionHost]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    currency: [{
      type: Input
    }],
    formatter: [{
      type: Input
    }],
    parser: [{
      type: Input
    }],
    precision: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    useCurrencyAccountingStyle: [{
      type: Input
    }]
  });
})();
var DxoDataGridValueFormatModule = class _DxoDataGridValueFormatModule {
  /** @nocollapse */
  static ɵfac = function DxoDataGridValueFormatModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoDataGridValueFormatModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoDataGridValueFormatModule,
    declarations: [DxoDataGridValueFormatComponent],
    exports: [DxoDataGridValueFormatComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoDataGridValueFormatModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoDataGridValueFormatComponent],
      exports: [DxoDataGridValueFormatComponent]
    }]
  }], null, null);
})();

export {
  DxoDataGridAnimationComponent,
  DxoDataGridAnimationModule,
  DxiDataGridAsyncRuleComponent,
  DxiDataGridAsyncRuleModule,
  DxoDataGridAtComponent,
  DxoDataGridAtModule,
  DxoDataGridBoundaryOffsetComponent,
  DxoDataGridBoundaryOffsetModule,
  DxiDataGridButtonComponent,
  DxiDataGridButtonModule,
  DxiDataGridChangeComponent,
  DxiDataGridChangeModule,
  DxoDataGridColCountByScreenComponent,
  DxoDataGridColCountByScreenModule,
  DxoDataGridCollisionComponent,
  DxoDataGridCollisionModule,
  DxoDataGridColumnChooserSearchComponent,
  DxoDataGridColumnChooserSearchModule,
  DxoDataGridColumnChooserSelectionComponent,
  DxoDataGridColumnChooserSelectionModule,
  DxoDataGridColumnChooserComponent,
  DxoDataGridColumnChooserModule,
  DxiDataGridCompareRuleComponent,
  DxiDataGridCompareRuleModule,
  DxiDataGridCustomRuleComponent,
  DxiDataGridCustomRuleModule,
  DxiDataGridEmailRuleComponent,
  DxiDataGridEmailRuleModule,
  DxiDataGridNumericRuleComponent,
  DxiDataGridNumericRuleModule,
  DxiDataGridPatternRuleComponent,
  DxiDataGridPatternRuleModule,
  DxiDataGridRangeRuleComponent,
  DxiDataGridRangeRuleModule,
  DxiDataGridRequiredRuleComponent,
  DxiDataGridRequiredRuleModule,
  DxiDataGridStringLengthRuleComponent,
  DxiDataGridStringLengthRuleModule,
  DxiDataGridValidationRuleComponent,
  DxiDataGridValidationRuleModule,
  DxiDataGridColumnComponent,
  DxiDataGridColumnModule,
  DxoDataGridColumnFixingTextsComponent,
  DxoDataGridColumnFixingTextsModule,
  DxoDataGridColumnFixingComponent,
  DxoDataGridColumnFixingModule,
  DxoDataGridColumnHeaderFilterSearchComponent,
  DxoDataGridColumnHeaderFilterSearchModule,
  DxoDataGridColumnHeaderFilterComponent,
  DxoDataGridColumnHeaderFilterModule,
  DxoDataGridColumnLookupComponent,
  DxoDataGridColumnLookupModule,
  DxoDataGridCursorOffsetComponent,
  DxoDataGridCursorOffsetModule,
  DxiDataGridCustomOperationComponent,
  DxiDataGridCustomOperationModule,
  DxoDataGridDataGridHeaderFilterSearchComponent,
  DxoDataGridDataGridHeaderFilterSearchModule,
  DxoDataGridDataGridHeaderFilterTextsComponent,
  DxoDataGridDataGridHeaderFilterTextsModule,
  DxoDataGridDataGridHeaderFilterComponent,
  DxoDataGridDataGridHeaderFilterModule,
  DxoDataGridDataGridSelectionComponent,
  DxoDataGridDataGridSelectionModule,
  DxoDataGridEditingTextsComponent,
  DxoDataGridEditingTextsModule,
  DxoDataGridEditingComponent,
  DxoDataGridEditingModule,
  DxoDataGridExportTextsComponent,
  DxoDataGridExportTextsModule,
  DxoDataGridExportComponent,
  DxoDataGridExportModule,
  DxiDataGridFieldComponent,
  DxiDataGridFieldModule,
  DxoDataGridFieldLookupComponent,
  DxoDataGridFieldLookupModule,
  DxiDataGridToolbarItemComponent,
  DxiDataGridToolbarItemModule,
  DxoDataGridFilterBuilderPopupComponent,
  DxoDataGridFilterBuilderPopupModule,
  DxoDataGridFilterBuilderComponent,
  DxoDataGridFilterBuilderModule,
  DxoDataGridFilterOperationDescriptionsComponent,
  DxoDataGridFilterOperationDescriptionsModule,
  DxoDataGridFilterPanelTextsComponent,
  DxoDataGridFilterPanelTextsModule,
  DxoDataGridFilterPanelComponent,
  DxoDataGridFilterPanelModule,
  DxoDataGridFilterRowComponent,
  DxoDataGridFilterRowModule,
  DxoDataGridFormItemComponent,
  DxoDataGridFormItemModule,
  DxoDataGridFormComponent,
  DxoDataGridFormModule,
  DxoDataGridFormatComponent,
  DxoDataGridFormatModule,
  DxoDataGridFromComponent,
  DxoDataGridFromModule,
  DxiDataGridGroupItemComponent,
  DxiDataGridGroupItemModule,
  DxoDataGridGroupOperationDescriptionsComponent,
  DxoDataGridGroupOperationDescriptionsModule,
  DxoDataGridGroupPanelComponent,
  DxoDataGridGroupPanelModule,
  DxoDataGridGroupingTextsComponent,
  DxoDataGridGroupingTextsModule,
  DxoDataGridGroupingComponent,
  DxoDataGridGroupingModule,
  DxoDataGridHeaderFilterComponent,
  DxoDataGridHeaderFilterModule,
  DxoDataGridHideComponent,
  DxoDataGridHideModule,
  DxoDataGridIconsComponent,
  DxoDataGridIconsModule,
  DxiDataGridItemComponent,
  DxiDataGridItemModule,
  DxoDataGridKeyboardNavigationComponent,
  DxoDataGridKeyboardNavigationModule,
  DxoDataGridLabelComponent,
  DxoDataGridLabelModule,
  DxoDataGridLoadPanelComponent,
  DxoDataGridLoadPanelModule,
  DxoDataGridLookupComponent,
  DxoDataGridLookupModule,
  DxoDataGridMasterDetailComponent,
  DxoDataGridMasterDetailModule,
  DxoDataGridMyComponent,
  DxoDataGridMyModule,
  DxoDataGridOffsetComponent,
  DxoDataGridOffsetModule,
  DxoDataGridOperationDescriptionsComponent,
  DxoDataGridOperationDescriptionsModule,
  DxoDataGridPagerComponent,
  DxoDataGridPagerModule,
  DxoDataGridPagingComponent,
  DxoDataGridPagingModule,
  DxoDataGridPopupComponent,
  DxoDataGridPopupModule,
  DxoDataGridPositionComponent,
  DxoDataGridPositionModule,
  DxoDataGridRemoteOperationsComponent,
  DxoDataGridRemoteOperationsModule,
  DxoDataGridRowDraggingComponent,
  DxoDataGridRowDraggingModule,
  DxoDataGridScrollingComponent,
  DxoDataGridScrollingModule,
  DxoDataGridSearchPanelComponent,
  DxoDataGridSearchPanelModule,
  DxoDataGridSearchComponent,
  DxoDataGridSearchModule,
  DxoDataGridSelectionComponent,
  DxoDataGridSelectionModule,
  DxoDataGridShowComponent,
  DxoDataGridShowModule,
  DxiDataGridSortByGroupSummaryInfoComponent,
  DxiDataGridSortByGroupSummaryInfoModule,
  DxoDataGridSortingComponent,
  DxoDataGridSortingModule,
  DxoDataGridStateStoringComponent,
  DxoDataGridStateStoringModule,
  DxoDataGridSummaryTextsComponent,
  DxoDataGridSummaryTextsModule,
  DxiDataGridTotalItemComponent,
  DxiDataGridTotalItemModule,
  DxoDataGridSummaryComponent,
  DxoDataGridSummaryModule,
  DxoDataGridTextsComponent,
  DxoDataGridTextsModule,
  DxoDataGridToComponent,
  DxoDataGridToModule,
  DxoDataGridToolbarComponent,
  DxoDataGridToolbarModule,
  DxoDataGridValueFormatComponent,
  DxoDataGridValueFormatModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-data-grid-nested.mjs:
  (*!
   * devextreme-angular
   * Version: 24.2.7
   * Build date: Mon Apr 28 2025
   *
   * Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
   *
   * This software may be modified and distributed under the terms
   * of the MIT license. See the LICENSE file in the root of the project for details.
   *
   * https://github.com/DevExpress/devextreme-angular
   *)
*/
//# sourceMappingURL=chunk-I2EWY6XY.js.map
