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

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-gantt-nested.mjs
var _c0 = ["*"];
var DxiGanttColumnComponent = class _DxiGanttColumnComponent extends CollectionNestedOption {
  get alignment() {
    return this._getOption("alignment");
  }
  set alignment(value) {
    this._setOption("alignment", value);
  }
  get allowFiltering() {
    return this._getOption("allowFiltering");
  }
  set allowFiltering(value) {
    this._setOption("allowFiltering", value);
  }
  get allowHeaderFiltering() {
    return this._getOption("allowHeaderFiltering");
  }
  set allowHeaderFiltering(value) {
    this._setOption("allowHeaderFiltering", value);
  }
  get allowSorting() {
    return this._getOption("allowSorting");
  }
  set allowSorting(value) {
    this._setOption("allowSorting", value);
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
  get format() {
    return this._getOption("format");
  }
  set format(value) {
    this._setOption("format", value);
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
  get minWidth() {
    return this._getOption("minWidth");
  }
  set minWidth(value) {
    this._setOption("minWidth", value);
  }
  get selectedFilterOperation() {
    return this._getOption("selectedFilterOperation");
  }
  set selectedFilterOperation(value) {
    this._setOption("selectedFilterOperation", value);
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
  constructor(parentOptionHost, optionHost) {
    super();
    this._createEventEmitters([{
      emit: "filterValueChange"
    }, {
      emit: "filterValuesChange"
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
  static ɵfac = function DxiGanttColumnComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiGanttColumnComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiGanttColumnComponent,
    selectors: [["dxi-gantt-column"]],
    inputs: {
      alignment: "alignment",
      allowFiltering: "allowFiltering",
      allowHeaderFiltering: "allowHeaderFiltering",
      allowSorting: "allowSorting",
      calculateCellValue: "calculateCellValue",
      calculateDisplayValue: "calculateDisplayValue",
      calculateFilterExpression: "calculateFilterExpression",
      calculateSortValue: "calculateSortValue",
      caption: "caption",
      cellTemplate: "cellTemplate",
      cssClass: "cssClass",
      customizeText: "customizeText",
      dataField: "dataField",
      dataType: "dataType",
      encodeHtml: "encodeHtml",
      falseText: "falseText",
      filterOperations: "filterOperations",
      filterType: "filterType",
      filterValue: "filterValue",
      filterValues: "filterValues",
      format: "format",
      headerCellTemplate: "headerCellTemplate",
      headerFilter: "headerFilter",
      minWidth: "minWidth",
      selectedFilterOperation: "selectedFilterOperation",
      sortIndex: "sortIndex",
      sortingMethod: "sortingMethod",
      sortOrder: "sortOrder",
      trueText: "trueText",
      visible: "visible",
      visibleIndex: "visibleIndex",
      width: "width"
    },
    outputs: {
      filterValueChange: "filterValueChange",
      filterValuesChange: "filterValuesChange",
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
    template: function DxiGanttColumnComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiGanttColumnComponent, [{
    type: Component,
    args: [{
      selector: "dxi-gantt-column",
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
    allowFiltering: [{
      type: Input
    }],
    allowHeaderFiltering: [{
      type: Input
    }],
    allowSorting: [{
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
    calculateSortValue: [{
      type: Input
    }],
    caption: [{
      type: Input
    }],
    cellTemplate: [{
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
    format: [{
      type: Input
    }],
    headerCellTemplate: [{
      type: Input
    }],
    headerFilter: [{
      type: Input
    }],
    minWidth: [{
      type: Input
    }],
    selectedFilterOperation: [{
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
    }]
  });
})();
var DxiGanttColumnModule = class _DxiGanttColumnModule {
  /** @nocollapse */
  static ɵfac = function DxiGanttColumnModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiGanttColumnModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiGanttColumnModule,
    declarations: [DxiGanttColumnComponent],
    exports: [DxiGanttColumnComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiGanttColumnModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiGanttColumnComponent],
      exports: [DxiGanttColumnComponent]
    }]
  }], null, null);
})();
var DxoGanttColumnHeaderFilterSearchComponent = class _DxoGanttColumnHeaderFilterSearchComponent extends NestedOption {
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
  static ɵfac = function DxoGanttColumnHeaderFilterSearchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttColumnHeaderFilterSearchComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttColumnHeaderFilterSearchComponent,
    selectors: [["dxo-gantt-column-header-filter-search"]],
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
    template: function DxoGanttColumnHeaderFilterSearchComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttColumnHeaderFilterSearchComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-column-header-filter-search",
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
var DxoGanttColumnHeaderFilterSearchModule = class _DxoGanttColumnHeaderFilterSearchModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttColumnHeaderFilterSearchModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttColumnHeaderFilterSearchModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttColumnHeaderFilterSearchModule,
    declarations: [DxoGanttColumnHeaderFilterSearchComponent],
    exports: [DxoGanttColumnHeaderFilterSearchComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttColumnHeaderFilterSearchModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttColumnHeaderFilterSearchComponent],
      exports: [DxoGanttColumnHeaderFilterSearchComponent]
    }]
  }], null, null);
})();
var DxoGanttColumnHeaderFilterComponent = class _DxoGanttColumnHeaderFilterComponent extends NestedOption {
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
  static ɵfac = function DxoGanttColumnHeaderFilterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttColumnHeaderFilterComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttColumnHeaderFilterComponent,
    selectors: [["dxo-gantt-column-header-filter"]],
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
    template: function DxoGanttColumnHeaderFilterComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttColumnHeaderFilterComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-column-header-filter",
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
var DxoGanttColumnHeaderFilterModule = class _DxoGanttColumnHeaderFilterModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttColumnHeaderFilterModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttColumnHeaderFilterModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttColumnHeaderFilterModule,
    declarations: [DxoGanttColumnHeaderFilterComponent],
    exports: [DxoGanttColumnHeaderFilterComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttColumnHeaderFilterModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttColumnHeaderFilterComponent],
      exports: [DxoGanttColumnHeaderFilterComponent]
    }]
  }], null, null);
})();
var DxiGanttContextMenuItemItemComponent = class _DxiGanttContextMenuItemItemComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  get beginGroup() {
    return this._getOption("beginGroup");
  }
  set beginGroup(value) {
    this._setOption("beginGroup", value);
  }
  get closeMenuOnClick() {
    return this._getOption("closeMenuOnClick");
  }
  set closeMenuOnClick(value) {
    this._setOption("closeMenuOnClick", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get icon() {
    return this._getOption("icon");
  }
  set icon(value) {
    this._setOption("icon", value);
  }
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  get selectable() {
    return this._getOption("selectable");
  }
  set selectable(value) {
    this._setOption("selectable", value);
  }
  get selected() {
    return this._getOption("selected");
  }
  set selected(value) {
    this._setOption("selected", value);
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
  static ɵfac = function DxiGanttContextMenuItemItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiGanttContextMenuItemItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiGanttContextMenuItemItemComponent,
    selectors: [["dxi-gantt-context-menu-item-item"]],
    inputs: {
      beginGroup: "beginGroup",
      closeMenuOnClick: "closeMenuOnClick",
      disabled: "disabled",
      icon: "icon",
      items: "items",
      selectable: "selectable",
      selected: "selected",
      template: "template",
      text: "text",
      visible: "visible"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiGanttContextMenuItemItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiGanttContextMenuItemItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-gantt-context-menu-item-item",
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
    beginGroup: [{
      type: Input
    }],
    closeMenuOnClick: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    selectable: [{
      type: Input
    }],
    selected: [{
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
var DxiGanttContextMenuItemItemModule = class _DxiGanttContextMenuItemItemModule {
  /** @nocollapse */
  static ɵfac = function DxiGanttContextMenuItemItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiGanttContextMenuItemItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiGanttContextMenuItemItemModule,
    declarations: [DxiGanttContextMenuItemItemComponent],
    exports: [DxiGanttContextMenuItemItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiGanttContextMenuItemItemModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiGanttContextMenuItemItemComponent],
      exports: [DxiGanttContextMenuItemItemComponent]
    }]
  }], null, null);
})();
var DxiGanttItemComponent = class _DxiGanttItemComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  get beginGroup() {
    return this._getOption("beginGroup");
  }
  set beginGroup(value) {
    this._setOption("beginGroup", value);
  }
  get closeMenuOnClick() {
    return this._getOption("closeMenuOnClick");
  }
  set closeMenuOnClick(value) {
    this._setOption("closeMenuOnClick", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get icon() {
    return this._getOption("icon");
  }
  set icon(value) {
    this._setOption("icon", value);
  }
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get selectable() {
    return this._getOption("selectable");
  }
  set selectable(value) {
    this._setOption("selectable", value);
  }
  get selected() {
    return this._getOption("selected");
  }
  set selected(value) {
    this._setOption("selected", value);
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
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
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
  get widget() {
    return this._getOption("widget");
  }
  set widget(value) {
    this._setOption("widget", value);
  }
  get _optionPath() {
    return "items";
  }
  get contextMenuItemItemsChildren() {
    return this._getOption("items");
  }
  set contextMenuItemItemsChildren(value) {
    this.setChildren("items", value);
  }
  get itemsChildren() {
    return this._getOption("items");
  }
  set itemsChildren(value) {
    this.setChildren("items", value);
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
  static ɵfac = function DxiGanttItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiGanttItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiGanttItemComponent,
    selectors: [["dxi-gantt-item"]],
    contentQueries: function DxiGanttItemComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, DxiGanttContextMenuItemItemComponent, 4);
        ɵɵcontentQuery(dirIndex, _DxiGanttItemComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contextMenuItemItemsChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemsChildren = _t);
      }
    },
    inputs: {
      beginGroup: "beginGroup",
      closeMenuOnClick: "closeMenuOnClick",
      disabled: "disabled",
      icon: "icon",
      items: "items",
      name: "name",
      selectable: "selectable",
      selected: "selected",
      template: "template",
      text: "text",
      visible: "visible",
      cssClass: "cssClass",
      html: "html",
      locateInMenu: "locateInMenu",
      location: "location",
      menuItemTemplate: "menuItemTemplate",
      options: "options",
      showText: "showText",
      widget: "widget"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiGanttItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiGanttItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-gantt-item",
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
    beginGroup: [{
      type: Input
    }],
    closeMenuOnClick: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    selectable: [{
      type: Input
    }],
    selected: [{
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
    cssClass: [{
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
    widget: [{
      type: Input
    }],
    contextMenuItemItemsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiGanttContextMenuItemItemComponent)]
    }],
    itemsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiGanttItemComponent)]
    }]
  });
})();
var DxiGanttItemModule = class _DxiGanttItemModule {
  /** @nocollapse */
  static ɵfac = function DxiGanttItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiGanttItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiGanttItemModule,
    declarations: [DxiGanttItemComponent],
    exports: [DxiGanttItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiGanttItemModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiGanttItemComponent],
      exports: [DxiGanttItemComponent]
    }]
  }], null, null);
})();
var DxiGanttContextMenuItemComponent = class _DxiGanttContextMenuItemComponent extends CollectionNestedOption {
  renderer;
  document;
  element;
  get beginGroup() {
    return this._getOption("beginGroup");
  }
  set beginGroup(value) {
    this._setOption("beginGroup", value);
  }
  get closeMenuOnClick() {
    return this._getOption("closeMenuOnClick");
  }
  set closeMenuOnClick(value) {
    this._setOption("closeMenuOnClick", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get icon() {
    return this._getOption("icon");
  }
  set icon(value) {
    this._setOption("icon", value);
  }
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get selectable() {
    return this._getOption("selectable");
  }
  set selectable(value) {
    this._setOption("selectable", value);
  }
  get selected() {
    return this._getOption("selected");
  }
  set selected(value) {
    this._setOption("selected", value);
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
    return "items";
  }
  get contextMenuItemItemsChildren() {
    return this._getOption("items");
  }
  set contextMenuItemItemsChildren(value) {
    this.setChildren("items", value);
  }
  get itemsChildren() {
    return this._getOption("items");
  }
  set itemsChildren(value) {
    this.setChildren("items", value);
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
  static ɵfac = function DxiGanttContextMenuItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiGanttContextMenuItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiGanttContextMenuItemComponent,
    selectors: [["dxi-gantt-context-menu-item"]],
    contentQueries: function DxiGanttContextMenuItemComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, DxiGanttContextMenuItemItemComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiGanttItemComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contextMenuItemItemsChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemsChildren = _t);
      }
    },
    inputs: {
      beginGroup: "beginGroup",
      closeMenuOnClick: "closeMenuOnClick",
      disabled: "disabled",
      icon: "icon",
      items: "items",
      name: "name",
      selectable: "selectable",
      selected: "selected",
      template: "template",
      text: "text",
      visible: "visible"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxiGanttContextMenuItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiGanttContextMenuItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-gantt-context-menu-item",
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
    beginGroup: [{
      type: Input
    }],
    closeMenuOnClick: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    items: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    selectable: [{
      type: Input
    }],
    selected: [{
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
    contextMenuItemItemsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiGanttContextMenuItemItemComponent)]
    }],
    itemsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiGanttItemComponent)]
    }]
  });
})();
var DxiGanttContextMenuItemModule = class _DxiGanttContextMenuItemModule {
  /** @nocollapse */
  static ɵfac = function DxiGanttContextMenuItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiGanttContextMenuItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiGanttContextMenuItemModule,
    declarations: [DxiGanttContextMenuItemComponent],
    exports: [DxiGanttContextMenuItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiGanttContextMenuItemModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiGanttContextMenuItemComponent],
      exports: [DxiGanttContextMenuItemComponent]
    }]
  }], null, null);
})();
var DxoGanttContextMenuComponent = class _DxoGanttContextMenuComponent extends NestedOption {
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
  }
  get _optionPath() {
    return "contextMenu";
  }
  get contextMenuItemsChildren() {
    return this._getOption("items");
  }
  set contextMenuItemsChildren(value) {
    this.setChildren("items", value);
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
  static ɵfac = function DxoGanttContextMenuComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttContextMenuComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttContextMenuComponent,
    selectors: [["dxo-gantt-context-menu"]],
    contentQueries: function DxoGanttContextMenuComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, DxiGanttContextMenuItemComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiGanttItemComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.contextMenuItemsChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemsChildren = _t);
      }
    },
    inputs: {
      enabled: "enabled",
      items: "items"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoGanttContextMenuComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttContextMenuComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-context-menu",
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
    items: [{
      type: Input
    }],
    contextMenuItemsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiGanttContextMenuItemComponent)]
    }],
    itemsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiGanttItemComponent)]
    }]
  });
})();
var DxoGanttContextMenuModule = class _DxoGanttContextMenuModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttContextMenuModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttContextMenuModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttContextMenuModule,
    declarations: [DxoGanttContextMenuComponent],
    exports: [DxoGanttContextMenuComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttContextMenuModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttContextMenuComponent],
      exports: [DxoGanttContextMenuComponent]
    }]
  }], null, null);
})();
var DxoGanttDependenciesComponent = class _DxoGanttDependenciesComponent extends NestedOption {
  get dataSource() {
    return this._getOption("dataSource");
  }
  set dataSource(value) {
    this._setOption("dataSource", value);
  }
  get keyExpr() {
    return this._getOption("keyExpr");
  }
  set keyExpr(value) {
    this._setOption("keyExpr", value);
  }
  get predecessorIdExpr() {
    return this._getOption("predecessorIdExpr");
  }
  set predecessorIdExpr(value) {
    this._setOption("predecessorIdExpr", value);
  }
  get successorIdExpr() {
    return this._getOption("successorIdExpr");
  }
  set successorIdExpr(value) {
    this._setOption("successorIdExpr", value);
  }
  get typeExpr() {
    return this._getOption("typeExpr");
  }
  set typeExpr(value) {
    this._setOption("typeExpr", value);
  }
  get _optionPath() {
    return "dependencies";
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
  static ɵfac = function DxoGanttDependenciesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttDependenciesComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttDependenciesComponent,
    selectors: [["dxo-gantt-dependencies"]],
    inputs: {
      dataSource: "dataSource",
      keyExpr: "keyExpr",
      predecessorIdExpr: "predecessorIdExpr",
      successorIdExpr: "successorIdExpr",
      typeExpr: "typeExpr"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoGanttDependenciesComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttDependenciesComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-dependencies",
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
    dataSource: [{
      type: Input
    }],
    keyExpr: [{
      type: Input
    }],
    predecessorIdExpr: [{
      type: Input
    }],
    successorIdExpr: [{
      type: Input
    }],
    typeExpr: [{
      type: Input
    }]
  });
})();
var DxoGanttDependenciesModule = class _DxoGanttDependenciesModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttDependenciesModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttDependenciesModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttDependenciesModule,
    declarations: [DxoGanttDependenciesComponent],
    exports: [DxoGanttDependenciesComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttDependenciesModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttDependenciesComponent],
      exports: [DxoGanttDependenciesComponent]
    }]
  }], null, null);
})();
var DxoGanttEditingComponent = class _DxoGanttEditingComponent extends NestedOption {
  get allowDependencyAdding() {
    return this._getOption("allowDependencyAdding");
  }
  set allowDependencyAdding(value) {
    this._setOption("allowDependencyAdding", value);
  }
  get allowDependencyDeleting() {
    return this._getOption("allowDependencyDeleting");
  }
  set allowDependencyDeleting(value) {
    this._setOption("allowDependencyDeleting", value);
  }
  get allowResourceAdding() {
    return this._getOption("allowResourceAdding");
  }
  set allowResourceAdding(value) {
    this._setOption("allowResourceAdding", value);
  }
  get allowResourceDeleting() {
    return this._getOption("allowResourceDeleting");
  }
  set allowResourceDeleting(value) {
    this._setOption("allowResourceDeleting", value);
  }
  get allowResourceUpdating() {
    return this._getOption("allowResourceUpdating");
  }
  set allowResourceUpdating(value) {
    this._setOption("allowResourceUpdating", value);
  }
  get allowTaskAdding() {
    return this._getOption("allowTaskAdding");
  }
  set allowTaskAdding(value) {
    this._setOption("allowTaskAdding", value);
  }
  get allowTaskDeleting() {
    return this._getOption("allowTaskDeleting");
  }
  set allowTaskDeleting(value) {
    this._setOption("allowTaskDeleting", value);
  }
  get allowTaskResourceUpdating() {
    return this._getOption("allowTaskResourceUpdating");
  }
  set allowTaskResourceUpdating(value) {
    this._setOption("allowTaskResourceUpdating", value);
  }
  get allowTaskUpdating() {
    return this._getOption("allowTaskUpdating");
  }
  set allowTaskUpdating(value) {
    this._setOption("allowTaskUpdating", value);
  }
  get enabled() {
    return this._getOption("enabled");
  }
  set enabled(value) {
    this._setOption("enabled", value);
  }
  get _optionPath() {
    return "editing";
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
  static ɵfac = function DxoGanttEditingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttEditingComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttEditingComponent,
    selectors: [["dxo-gantt-editing"]],
    inputs: {
      allowDependencyAdding: "allowDependencyAdding",
      allowDependencyDeleting: "allowDependencyDeleting",
      allowResourceAdding: "allowResourceAdding",
      allowResourceDeleting: "allowResourceDeleting",
      allowResourceUpdating: "allowResourceUpdating",
      allowTaskAdding: "allowTaskAdding",
      allowTaskDeleting: "allowTaskDeleting",
      allowTaskResourceUpdating: "allowTaskResourceUpdating",
      allowTaskUpdating: "allowTaskUpdating",
      enabled: "enabled"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoGanttEditingComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttEditingComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-editing",
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
    allowDependencyAdding: [{
      type: Input
    }],
    allowDependencyDeleting: [{
      type: Input
    }],
    allowResourceAdding: [{
      type: Input
    }],
    allowResourceDeleting: [{
      type: Input
    }],
    allowResourceUpdating: [{
      type: Input
    }],
    allowTaskAdding: [{
      type: Input
    }],
    allowTaskDeleting: [{
      type: Input
    }],
    allowTaskResourceUpdating: [{
      type: Input
    }],
    allowTaskUpdating: [{
      type: Input
    }],
    enabled: [{
      type: Input
    }]
  });
})();
var DxoGanttEditingModule = class _DxoGanttEditingModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttEditingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttEditingModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttEditingModule,
    declarations: [DxoGanttEditingComponent],
    exports: [DxoGanttEditingComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttEditingModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttEditingComponent],
      exports: [DxoGanttEditingComponent]
    }]
  }], null, null);
})();
var DxoGanttFilterRowComponent = class _DxoGanttFilterRowComponent extends NestedOption {
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
  static ɵfac = function DxoGanttFilterRowComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttFilterRowComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttFilterRowComponent,
    selectors: [["dxo-gantt-filter-row"]],
    inputs: {
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
    template: function DxoGanttFilterRowComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttFilterRowComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-filter-row",
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
var DxoGanttFilterRowModule = class _DxoGanttFilterRowModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttFilterRowModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttFilterRowModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttFilterRowModule,
    declarations: [DxoGanttFilterRowComponent],
    exports: [DxoGanttFilterRowComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttFilterRowModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttFilterRowComponent],
      exports: [DxoGanttFilterRowComponent]
    }]
  }], null, null);
})();
var DxoGanttFormatComponent = class _DxoGanttFormatComponent extends NestedOption {
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
  static ɵfac = function DxoGanttFormatComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttFormatComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttFormatComponent,
    selectors: [["dxo-gantt-format"]],
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
    template: function DxoGanttFormatComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttFormatComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-format",
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
var DxoGanttFormatModule = class _DxoGanttFormatModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttFormatModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttFormatModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttFormatModule,
    declarations: [DxoGanttFormatComponent],
    exports: [DxoGanttFormatComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttFormatModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttFormatComponent],
      exports: [DxoGanttFormatComponent]
    }]
  }], null, null);
})();
var DxoGanttGanttHeaderFilterSearchComponent = class _DxoGanttGanttHeaderFilterSearchComponent extends NestedOption {
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
  static ɵfac = function DxoGanttGanttHeaderFilterSearchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttGanttHeaderFilterSearchComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttGanttHeaderFilterSearchComponent,
    selectors: [["dxo-gantt-gantt-header-filter-search"]],
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
    template: function DxoGanttGanttHeaderFilterSearchComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttGanttHeaderFilterSearchComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-gantt-header-filter-search",
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
var DxoGanttGanttHeaderFilterSearchModule = class _DxoGanttGanttHeaderFilterSearchModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttGanttHeaderFilterSearchModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttGanttHeaderFilterSearchModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttGanttHeaderFilterSearchModule,
    declarations: [DxoGanttGanttHeaderFilterSearchComponent],
    exports: [DxoGanttGanttHeaderFilterSearchComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttGanttHeaderFilterSearchModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttGanttHeaderFilterSearchComponent],
      exports: [DxoGanttGanttHeaderFilterSearchComponent]
    }]
  }], null, null);
})();
var DxoGanttGanttHeaderFilterComponent = class _DxoGanttGanttHeaderFilterComponent extends NestedOption {
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
  static ɵfac = function DxoGanttGanttHeaderFilterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttGanttHeaderFilterComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttGanttHeaderFilterComponent,
    selectors: [["dxo-gantt-gantt-header-filter"]],
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
    template: function DxoGanttGanttHeaderFilterComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttGanttHeaderFilterComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-gantt-header-filter",
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
var DxoGanttGanttHeaderFilterModule = class _DxoGanttGanttHeaderFilterModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttGanttHeaderFilterModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttGanttHeaderFilterModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttGanttHeaderFilterModule,
    declarations: [DxoGanttGanttHeaderFilterComponent],
    exports: [DxoGanttGanttHeaderFilterComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttGanttHeaderFilterModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttGanttHeaderFilterComponent],
      exports: [DxoGanttGanttHeaderFilterComponent]
    }]
  }], null, null);
})();
var DxoGanttHeaderFilterComponent = class _DxoGanttHeaderFilterComponent extends NestedOption {
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
  static ɵfac = function DxoGanttHeaderFilterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttHeaderFilterComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttHeaderFilterComponent,
    selectors: [["dxo-gantt-header-filter"]],
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
    template: function DxoGanttHeaderFilterComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttHeaderFilterComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-header-filter",
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
var DxoGanttHeaderFilterModule = class _DxoGanttHeaderFilterModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttHeaderFilterModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttHeaderFilterModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttHeaderFilterModule,
    declarations: [DxoGanttHeaderFilterComponent],
    exports: [DxoGanttHeaderFilterComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttHeaderFilterModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttHeaderFilterComponent],
      exports: [DxoGanttHeaderFilterComponent]
    }]
  }], null, null);
})();
var DxoGanttOperationDescriptionsComponent = class _DxoGanttOperationDescriptionsComponent extends NestedOption {
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
  static ɵfac = function DxoGanttOperationDescriptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttOperationDescriptionsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttOperationDescriptionsComponent,
    selectors: [["dxo-gantt-operation-descriptions"]],
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
    template: function DxoGanttOperationDescriptionsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttOperationDescriptionsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-operation-descriptions",
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
var DxoGanttOperationDescriptionsModule = class _DxoGanttOperationDescriptionsModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttOperationDescriptionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttOperationDescriptionsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttOperationDescriptionsModule,
    declarations: [DxoGanttOperationDescriptionsComponent],
    exports: [DxoGanttOperationDescriptionsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttOperationDescriptionsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttOperationDescriptionsComponent],
      exports: [DxoGanttOperationDescriptionsComponent]
    }]
  }], null, null);
})();
var DxoGanttResourceAssignmentsComponent = class _DxoGanttResourceAssignmentsComponent extends NestedOption {
  get dataSource() {
    return this._getOption("dataSource");
  }
  set dataSource(value) {
    this._setOption("dataSource", value);
  }
  get keyExpr() {
    return this._getOption("keyExpr");
  }
  set keyExpr(value) {
    this._setOption("keyExpr", value);
  }
  get resourceIdExpr() {
    return this._getOption("resourceIdExpr");
  }
  set resourceIdExpr(value) {
    this._setOption("resourceIdExpr", value);
  }
  get taskIdExpr() {
    return this._getOption("taskIdExpr");
  }
  set taskIdExpr(value) {
    this._setOption("taskIdExpr", value);
  }
  get _optionPath() {
    return "resourceAssignments";
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
  static ɵfac = function DxoGanttResourceAssignmentsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttResourceAssignmentsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttResourceAssignmentsComponent,
    selectors: [["dxo-gantt-resource-assignments"]],
    inputs: {
      dataSource: "dataSource",
      keyExpr: "keyExpr",
      resourceIdExpr: "resourceIdExpr",
      taskIdExpr: "taskIdExpr"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoGanttResourceAssignmentsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttResourceAssignmentsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-resource-assignments",
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
    dataSource: [{
      type: Input
    }],
    keyExpr: [{
      type: Input
    }],
    resourceIdExpr: [{
      type: Input
    }],
    taskIdExpr: [{
      type: Input
    }]
  });
})();
var DxoGanttResourceAssignmentsModule = class _DxoGanttResourceAssignmentsModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttResourceAssignmentsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttResourceAssignmentsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttResourceAssignmentsModule,
    declarations: [DxoGanttResourceAssignmentsComponent],
    exports: [DxoGanttResourceAssignmentsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttResourceAssignmentsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttResourceAssignmentsComponent],
      exports: [DxoGanttResourceAssignmentsComponent]
    }]
  }], null, null);
})();
var DxoGanttResourcesComponent = class _DxoGanttResourcesComponent extends NestedOption {
  get colorExpr() {
    return this._getOption("colorExpr");
  }
  set colorExpr(value) {
    this._setOption("colorExpr", value);
  }
  get dataSource() {
    return this._getOption("dataSource");
  }
  set dataSource(value) {
    this._setOption("dataSource", value);
  }
  get keyExpr() {
    return this._getOption("keyExpr");
  }
  set keyExpr(value) {
    this._setOption("keyExpr", value);
  }
  get textExpr() {
    return this._getOption("textExpr");
  }
  set textExpr(value) {
    this._setOption("textExpr", value);
  }
  get _optionPath() {
    return "resources";
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
  static ɵfac = function DxoGanttResourcesComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttResourcesComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttResourcesComponent,
    selectors: [["dxo-gantt-resources"]],
    inputs: {
      colorExpr: "colorExpr",
      dataSource: "dataSource",
      keyExpr: "keyExpr",
      textExpr: "textExpr"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoGanttResourcesComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttResourcesComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-resources",
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
    colorExpr: [{
      type: Input
    }],
    dataSource: [{
      type: Input
    }],
    keyExpr: [{
      type: Input
    }],
    textExpr: [{
      type: Input
    }]
  });
})();
var DxoGanttResourcesModule = class _DxoGanttResourcesModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttResourcesModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttResourcesModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttResourcesModule,
    declarations: [DxoGanttResourcesComponent],
    exports: [DxoGanttResourcesComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttResourcesModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttResourcesComponent],
      exports: [DxoGanttResourcesComponent]
    }]
  }], null, null);
})();
var DxoGanttScaleTypeRangeComponent = class _DxoGanttScaleTypeRangeComponent extends NestedOption {
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
  get _optionPath() {
    return "scaleTypeRange";
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
  static ɵfac = function DxoGanttScaleTypeRangeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttScaleTypeRangeComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttScaleTypeRangeComponent,
    selectors: [["dxo-gantt-scale-type-range"]],
    inputs: {
      max: "max",
      min: "min"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoGanttScaleTypeRangeComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttScaleTypeRangeComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-scale-type-range",
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
    max: [{
      type: Input
    }],
    min: [{
      type: Input
    }]
  });
})();
var DxoGanttScaleTypeRangeModule = class _DxoGanttScaleTypeRangeModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttScaleTypeRangeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttScaleTypeRangeModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttScaleTypeRangeModule,
    declarations: [DxoGanttScaleTypeRangeComponent],
    exports: [DxoGanttScaleTypeRangeComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttScaleTypeRangeModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttScaleTypeRangeComponent],
      exports: [DxoGanttScaleTypeRangeComponent]
    }]
  }], null, null);
})();
var DxoGanttSearchComponent = class _DxoGanttSearchComponent extends NestedOption {
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
  static ɵfac = function DxoGanttSearchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttSearchComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttSearchComponent,
    selectors: [["dxo-gantt-search"]],
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
    template: function DxoGanttSearchComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttSearchComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-search",
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
var DxoGanttSearchModule = class _DxoGanttSearchModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttSearchModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttSearchModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttSearchModule,
    declarations: [DxoGanttSearchComponent],
    exports: [DxoGanttSearchComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttSearchModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttSearchComponent],
      exports: [DxoGanttSearchComponent]
    }]
  }], null, null);
})();
var DxoGanttSortingComponent = class _DxoGanttSortingComponent extends NestedOption {
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
  static ɵfac = function DxoGanttSortingComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttSortingComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttSortingComponent,
    selectors: [["dxo-gantt-sorting"]],
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
    template: function DxoGanttSortingComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttSortingComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-sorting",
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
var DxoGanttSortingModule = class _DxoGanttSortingModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttSortingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttSortingModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttSortingModule,
    declarations: [DxoGanttSortingComponent],
    exports: [DxoGanttSortingComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttSortingModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttSortingComponent],
      exports: [DxoGanttSortingComponent]
    }]
  }], null, null);
})();
var DxiGanttStripLineComponent = class _DxiGanttStripLineComponent extends CollectionNestedOption {
  get cssClass() {
    return this._getOption("cssClass");
  }
  set cssClass(value) {
    this._setOption("cssClass", value);
  }
  get end() {
    return this._getOption("end");
  }
  set end(value) {
    this._setOption("end", value);
  }
  get start() {
    return this._getOption("start");
  }
  set start(value) {
    this._setOption("start", value);
  }
  get title() {
    return this._getOption("title");
  }
  set title(value) {
    this._setOption("title", value);
  }
  get _optionPath() {
    return "stripLines";
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
  static ɵfac = function DxiGanttStripLineComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiGanttStripLineComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiGanttStripLineComponent,
    selectors: [["dxi-gantt-strip-line"]],
    inputs: {
      cssClass: "cssClass",
      end: "end",
      start: "start",
      title: "title"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiGanttStripLineComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiGanttStripLineComponent, [{
    type: Component,
    args: [{
      selector: "dxi-gantt-strip-line",
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
    cssClass: [{
      type: Input
    }],
    end: [{
      type: Input
    }],
    start: [{
      type: Input
    }],
    title: [{
      type: Input
    }]
  });
})();
var DxiGanttStripLineModule = class _DxiGanttStripLineModule {
  /** @nocollapse */
  static ɵfac = function DxiGanttStripLineModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiGanttStripLineModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiGanttStripLineModule,
    declarations: [DxiGanttStripLineComponent],
    exports: [DxiGanttStripLineComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiGanttStripLineModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiGanttStripLineComponent],
      exports: [DxiGanttStripLineComponent]
    }]
  }], null, null);
})();
var DxoGanttTasksComponent = class _DxoGanttTasksComponent extends NestedOption {
  get colorExpr() {
    return this._getOption("colorExpr");
  }
  set colorExpr(value) {
    this._setOption("colorExpr", value);
  }
  get dataSource() {
    return this._getOption("dataSource");
  }
  set dataSource(value) {
    this._setOption("dataSource", value);
  }
  get endExpr() {
    return this._getOption("endExpr");
  }
  set endExpr(value) {
    this._setOption("endExpr", value);
  }
  get keyExpr() {
    return this._getOption("keyExpr");
  }
  set keyExpr(value) {
    this._setOption("keyExpr", value);
  }
  get parentIdExpr() {
    return this._getOption("parentIdExpr");
  }
  set parentIdExpr(value) {
    this._setOption("parentIdExpr", value);
  }
  get progressExpr() {
    return this._getOption("progressExpr");
  }
  set progressExpr(value) {
    this._setOption("progressExpr", value);
  }
  get startExpr() {
    return this._getOption("startExpr");
  }
  set startExpr(value) {
    this._setOption("startExpr", value);
  }
  get titleExpr() {
    return this._getOption("titleExpr");
  }
  set titleExpr(value) {
    this._setOption("titleExpr", value);
  }
  get _optionPath() {
    return "tasks";
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
  static ɵfac = function DxoGanttTasksComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttTasksComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttTasksComponent,
    selectors: [["dxo-gantt-tasks"]],
    inputs: {
      colorExpr: "colorExpr",
      dataSource: "dataSource",
      endExpr: "endExpr",
      keyExpr: "keyExpr",
      parentIdExpr: "parentIdExpr",
      progressExpr: "progressExpr",
      startExpr: "startExpr",
      titleExpr: "titleExpr"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoGanttTasksComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttTasksComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-tasks",
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
    colorExpr: [{
      type: Input
    }],
    dataSource: [{
      type: Input
    }],
    endExpr: [{
      type: Input
    }],
    keyExpr: [{
      type: Input
    }],
    parentIdExpr: [{
      type: Input
    }],
    progressExpr: [{
      type: Input
    }],
    startExpr: [{
      type: Input
    }],
    titleExpr: [{
      type: Input
    }]
  });
})();
var DxoGanttTasksModule = class _DxoGanttTasksModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttTasksModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttTasksModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttTasksModule,
    declarations: [DxoGanttTasksComponent],
    exports: [DxoGanttTasksComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttTasksModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttTasksComponent],
      exports: [DxoGanttTasksComponent]
    }]
  }], null, null);
})();
var DxoGanttTextsComponent = class _DxoGanttTextsComponent extends NestedOption {
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
  static ɵfac = function DxoGanttTextsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttTextsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttTextsComponent,
    selectors: [["dxo-gantt-texts"]],
    inputs: {
      cancel: "cancel",
      emptyValue: "emptyValue",
      ok: "ok"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoGanttTextsComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttTextsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-texts",
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
var DxoGanttTextsModule = class _DxoGanttTextsModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttTextsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttTextsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttTextsModule,
    declarations: [DxoGanttTextsComponent],
    exports: [DxoGanttTextsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttTextsModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttTextsComponent],
      exports: [DxoGanttTextsComponent]
    }]
  }], null, null);
})();
var DxiGanttToolbarItemComponent = class _DxiGanttToolbarItemComponent extends CollectionNestedOption {
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
  static ɵfac = function DxiGanttToolbarItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiGanttToolbarItemComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiGanttToolbarItemComponent,
    selectors: [["dxi-gantt-toolbar-item"]],
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
    template: function DxiGanttToolbarItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiGanttToolbarItemComponent, [{
    type: Component,
    args: [{
      selector: "dxi-gantt-toolbar-item",
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
var DxiGanttToolbarItemModule = class _DxiGanttToolbarItemModule {
  /** @nocollapse */
  static ɵfac = function DxiGanttToolbarItemModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiGanttToolbarItemModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiGanttToolbarItemModule,
    declarations: [DxiGanttToolbarItemComponent],
    exports: [DxiGanttToolbarItemComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiGanttToolbarItemModule, [{
    type: NgModule,
    args: [{
      declarations: [DxiGanttToolbarItemComponent],
      exports: [DxiGanttToolbarItemComponent]
    }]
  }], null, null);
})();
var DxoGanttToolbarComponent = class _DxoGanttToolbarComponent extends NestedOption {
  get items() {
    return this._getOption("items");
  }
  set items(value) {
    this._setOption("items", value);
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
  get toolbarItemsChildren() {
    return this._getOption("items");
  }
  set toolbarItemsChildren(value) {
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
  static ɵfac = function DxoGanttToolbarComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttToolbarComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttToolbarComponent,
    selectors: [["dxo-gantt-toolbar"]],
    contentQueries: function DxoGanttToolbarComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, DxiGanttItemComponent, 4);
        ɵɵcontentQuery(dirIndex, DxiGanttToolbarItemComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemsChildren = _t);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.toolbarItemsChildren = _t);
      }
    },
    inputs: {
      items: "items"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoGanttToolbarComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttToolbarComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-toolbar",
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
    items: [{
      type: Input
    }],
    itemsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiGanttItemComponent)]
    }],
    toolbarItemsChildren: [{
      type: ContentChildren,
      args: [forwardRef(() => DxiGanttToolbarItemComponent)]
    }]
  });
})();
var DxoGanttToolbarModule = class _DxoGanttToolbarModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttToolbarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttToolbarModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttToolbarModule,
    declarations: [DxoGanttToolbarComponent],
    exports: [DxoGanttToolbarComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttToolbarModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttToolbarComponent],
      exports: [DxoGanttToolbarComponent]
    }]
  }], null, null);
})();
var DxoGanttValidationComponent = class _DxoGanttValidationComponent extends NestedOption {
  get autoUpdateParentTasks() {
    return this._getOption("autoUpdateParentTasks");
  }
  set autoUpdateParentTasks(value) {
    this._setOption("autoUpdateParentTasks", value);
  }
  get enablePredecessorGap() {
    return this._getOption("enablePredecessorGap");
  }
  set enablePredecessorGap(value) {
    this._setOption("enablePredecessorGap", value);
  }
  get validateDependencies() {
    return this._getOption("validateDependencies");
  }
  set validateDependencies(value) {
    this._setOption("validateDependencies", value);
  }
  get _optionPath() {
    return "validation";
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
  static ɵfac = function DxoGanttValidationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttValidationComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoGanttValidationComponent,
    selectors: [["dxo-gantt-validation"]],
    inputs: {
      autoUpdateParentTasks: "autoUpdateParentTasks",
      enablePredecessorGap: "enablePredecessorGap",
      validateDependencies: "validateDependencies"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxoGanttValidationComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttValidationComponent, [{
    type: Component,
    args: [{
      selector: "dxo-gantt-validation",
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
    autoUpdateParentTasks: [{
      type: Input
    }],
    enablePredecessorGap: [{
      type: Input
    }],
    validateDependencies: [{
      type: Input
    }]
  });
})();
var DxoGanttValidationModule = class _DxoGanttValidationModule {
  /** @nocollapse */
  static ɵfac = function DxoGanttValidationModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoGanttValidationModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoGanttValidationModule,
    declarations: [DxoGanttValidationComponent],
    exports: [DxoGanttValidationComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoGanttValidationModule, [{
    type: NgModule,
    args: [{
      declarations: [DxoGanttValidationComponent],
      exports: [DxoGanttValidationComponent]
    }]
  }], null, null);
})();

export {
  DxiGanttColumnComponent,
  DxiGanttColumnModule,
  DxoGanttColumnHeaderFilterSearchComponent,
  DxoGanttColumnHeaderFilterSearchModule,
  DxoGanttColumnHeaderFilterComponent,
  DxoGanttColumnHeaderFilterModule,
  DxiGanttContextMenuItemItemComponent,
  DxiGanttContextMenuItemItemModule,
  DxiGanttItemComponent,
  DxiGanttItemModule,
  DxiGanttContextMenuItemComponent,
  DxiGanttContextMenuItemModule,
  DxoGanttContextMenuComponent,
  DxoGanttContextMenuModule,
  DxoGanttDependenciesComponent,
  DxoGanttDependenciesModule,
  DxoGanttEditingComponent,
  DxoGanttEditingModule,
  DxoGanttFilterRowComponent,
  DxoGanttFilterRowModule,
  DxoGanttFormatComponent,
  DxoGanttFormatModule,
  DxoGanttGanttHeaderFilterSearchComponent,
  DxoGanttGanttHeaderFilterSearchModule,
  DxoGanttGanttHeaderFilterComponent,
  DxoGanttGanttHeaderFilterModule,
  DxoGanttHeaderFilterComponent,
  DxoGanttHeaderFilterModule,
  DxoGanttOperationDescriptionsComponent,
  DxoGanttOperationDescriptionsModule,
  DxoGanttResourceAssignmentsComponent,
  DxoGanttResourceAssignmentsModule,
  DxoGanttResourcesComponent,
  DxoGanttResourcesModule,
  DxoGanttScaleTypeRangeComponent,
  DxoGanttScaleTypeRangeModule,
  DxoGanttSearchComponent,
  DxoGanttSearchModule,
  DxoGanttSortingComponent,
  DxoGanttSortingModule,
  DxiGanttStripLineComponent,
  DxiGanttStripLineModule,
  DxoGanttTasksComponent,
  DxoGanttTasksModule,
  DxoGanttTextsComponent,
  DxoGanttTextsModule,
  DxiGanttToolbarItemComponent,
  DxiGanttToolbarItemModule,
  DxoGanttToolbarComponent,
  DxoGanttToolbarModule,
  DxoGanttValidationComponent,
  DxoGanttValidationModule
};
/*! Bundled license information:

devextreme-angular/fesm2022/devextreme-angular-ui-gantt-nested.mjs:
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
//# sourceMappingURL=chunk-YM37DDVM.js.map
