module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 62);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/resize-event");

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/locale");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("element-ui/lib/utils/util");

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/tabs/src/tab-bar.vue?vue&type=template&id=01d67ee3&
var tab_barvue_type_template_id_01d67ee3_render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", {
    staticClass: "el-tabs__active-bar",
    class: "is-" + _vm.rootTabs.tabPosition,
    style: _vm.barStyle,
  })
}
var staticRenderFns = []
tab_barvue_type_template_id_01d67ee3_render._withStripped = true


// CONCATENATED MODULE: ./packages/tabs/src/tab-bar.vue?vue&type=template&id=01d67ee3&

// EXTERNAL MODULE: external "element-ui/lib/utils/util"
var util_ = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/tabs/src/tab-bar.vue?vue&type=script&lang=js&
//
//
//


/* harmony default export */ var tab_barvue_type_script_lang_js_ = ({
  name: 'TabBar',

  props: {
    tabs: Array,
    parent: Object
  },

  inject: ['rootTabs'],

  computed: {
    barStyle: {
      get: function get() {
        var _this = this;

        var style = {};
        var offset = 0;
        var tabSize = 0;
        var sizeName = ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'width' : 'height';
        var sizeDir = sizeName === 'width' ? 'x' : 'y';
        var firstUpperCase = function firstUpperCase(str) {
          return str.toLowerCase().replace(/( |^)[a-z]/g, function (L) {
            return L.toUpperCase();
          });
        };
        this.tabs.every(function (tab, index) {
          var $el = Object(util_["arrayFind"])(_this.$parent.$refs.tabs || [], function (t) {
            return t.id.replace('tab-', '') === tab.paneName;
          });
          if (!$el) {
            return false;
          }

          if (!tab.active) {
            offset += $el['client' + firstUpperCase(sizeName)];
            return true;
          } else {
            tabSize = $el['client' + firstUpperCase(sizeName)];
            var tabStyles = window.getComputedStyle($el);
            if (sizeName === 'width' && _this.tabs.length > 1) {
              tabSize -= parseFloat(tabStyles.paddingLeft) + parseFloat(tabStyles.paddingRight);
            }
            if (sizeName === 'width') {
              offset += parseFloat(tabStyles.paddingLeft);
            }
            return false;
          }
        });

        var tabDropdown = this.parent.$refs.tabDropdown;
        var _parent = this.parent,
            moreShow = _parent.moreShow,
            moreLabel = _parent.moreLabel;

        if (moreShow && moreLabel && tabDropdown) {
          tabSize = tabDropdown.$el['client' + firstUpperCase(sizeName)];
          var tabStyles = window.getComputedStyle(tabDropdown.$el);
          if (sizeName === 'width') {
            tabSize -= parseFloat(tabStyles.paddingLeft) + parseFloat(tabStyles.paddingRight);
            offset += parseFloat(tabStyles.paddingLeft);
          }
        }

        var transform = 'translate' + firstUpperCase(sizeDir) + '(' + offset + 'px)';
        style[sizeName] = tabSize + 'px';
        style.transform = transform;
        style.msTransform = transform;
        style.webkitTransform = transform;

        return style;
      }
    }
  }
});
// CONCATENATED MODULE: ./packages/tabs/src/tab-bar.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tab_barvue_type_script_lang_js_ = (tab_barvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./packages/tabs/src/tab-bar.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  src_tab_barvue_type_script_lang_js_,
  tab_barvue_type_template_id_01d67ee3_render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var tab_bar = (component.exports);
// EXTERNAL MODULE: external "element-ui/lib/utils/resize-event"
var resize_event_ = __webpack_require__(14);

// EXTERNAL MODULE: external "element-ui/lib/locale"
var locale_ = __webpack_require__(18);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/tabs/src/tab-nav.vue?vue&type=script&lang=js&





function noop() {}
var tab_navvue_type_script_lang_js_firstUpperCase = function firstUpperCase(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, function (L) {
    return L.toUpperCase();
  });
};

/* harmony default export */ var tab_navvue_type_script_lang_js_ = ({
  name: 'TabNav',

  components: {
    TabBar: tab_bar
  },

  inject: ['rootTabs'],

  props: {
    panes: Array,
    currentName: String,
    editable: Boolean,
    onTabClick: {
      type: Function,
      default: noop
    },
    onTabRemove: {
      type: Function,
      default: noop
    },
    type: String,
    mode: String,
    stretch: Boolean
  },

  data: function data() {
    return {
      scrollable: false,
      navOffset: 0,
      isFocus: false,
      focusable: true,
      moreShow: false, // 默认展示 主要控制更多按钮，不能仅通过 moreIndex 控制
      moreIndex: -1
    };
  },


  computed: {
    navStyle: function navStyle() {
      var dir = ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'X' : 'Y';
      return {
        transform: 'translate' + dir + '(-' + this.navOffset + 'px)'
      };
    },
    sizeName: function sizeName() {
      return ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'width' : 'height';
    },
    moreLabel: function moreLabel() {
      if (this.moreShow) {
        var moreLabel = '';
        for (var index = 0; index < this.panes.length; index++) {
          var pane = this.panes[index];
          if (pane.active) {
            // 只按照label 展示, 不展示插槽
            // 非收起 tabItem active，更多按钮 展示更多
            moreLabel = this.moreIndex < index ? pane.label : '';
            break;
          }
        }

        return moreLabel;
      }
      return '';
    }
  },

  methods: {
    t: function t() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return locale_["t"].apply(this, args);
    },
    scrollPrev: function scrollPrev() {
      var containerSize = this.$refs.navScroll['offset' + tab_navvue_type_script_lang_js_firstUpperCase(this.sizeName)];
      var currentOffset = this.navOffset;

      if (!currentOffset) return;

      var newOffset = currentOffset > containerSize ? currentOffset - containerSize : 0;

      this.navOffset = newOffset;
    },
    scrollNext: function scrollNext() {
      var navSize = this.$refs.nav['offset' + tab_navvue_type_script_lang_js_firstUpperCase(this.sizeName)];
      var containerSize = this.$refs.navScroll['offset' + tab_navvue_type_script_lang_js_firstUpperCase(this.sizeName)];
      var currentOffset = this.navOffset;

      if (navSize - currentOffset <= containerSize) return;

      var newOffset = navSize - currentOffset > containerSize * 2 ? currentOffset + containerSize : navSize - containerSize;

      this.navOffset = newOffset;
    },
    scrollToActiveTab: function scrollToActiveTab() {
      if (!this.scrollable) return;
      var nav = this.$refs.nav;
      var activeTab = this.$el.querySelector('.is-active');
      if (!activeTab) return;
      var navScroll = this.$refs.navScroll;
      var isHorizontal = ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1;
      var activeTabBounding = activeTab.getBoundingClientRect();
      var navScrollBounding = navScroll.getBoundingClientRect();
      var maxOffset = isHorizontal ? nav.offsetWidth - navScrollBounding.width : nav.offsetHeight - navScrollBounding.height;
      var currentOffset = this.navOffset;
      var newOffset = currentOffset;

      if (isHorizontal) {
        if (activeTabBounding.left < navScrollBounding.left) {
          newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
        }
        if (activeTabBounding.right > navScrollBounding.right) {
          newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
        }
      } else {
        if (activeTabBounding.top < navScrollBounding.top) {
          newOffset = currentOffset - (navScrollBounding.top - activeTabBounding.top);
        }
        if (activeTabBounding.bottom > navScrollBounding.bottom) {
          newOffset = currentOffset + (activeTabBounding.bottom - navScrollBounding.bottom);
        }
      }
      newOffset = Math.max(newOffset, 0);
      this.navOffset = Math.min(newOffset, maxOffset);
    },
    updateMoreIndex: function updateMoreIndex() {
      var _this = this;

      this.moreIndex = -1;
      this.moreShow = false;
      this.$nextTick(function () {
        var sizeName = _this.sizeName;
        var navSize = _this.$refs.nav['offset' + tab_navvue_type_script_lang_js_firstUpperCase(sizeName)];
        var containerSize = _this.$refs.navScroll['offset' + tab_navvue_type_script_lang_js_firstUpperCase(sizeName)];

        if (containerSize < navSize) {
          var moreIndex = -1;
          _this.moreIndex = moreIndex;
          _this.moreShow = true;

          _this.$nextTick(function () {
            var children = Array.from(_this.$refs.nav.childNodes || []);
            var tabItems = [];
            var dropdown = null;
            children.forEach(function (item) {
              if (item.className) {
                if (item.className.includes('el-tabs__item')) {
                  tabItems.push(item);
                } else if (item.className.includes('el-dropdown')) {
                  dropdown = item;
                }
              }
            });
            // 20 为间隔宽度
            var dropDownWith = dropdown ? dropdown.getBoundingClientRect().width : 0;
            var contentWidth = dropDownWith; // 初始默认按钮宽
            for (var index = 0; index < tabItems.length; index++) {
              var element = tabItems[index];
              contentWidth = element.getBoundingClientRect().width + contentWidth;
              if (contentWidth > containerSize) {
                moreIndex = index - 1;
                break;
              }
            }
            _this.moreIndex = moreIndex;
            _this.moreShow = moreIndex !== -1;
          });
        } else {
          _this.moreIndex = -1;
          _this.moreShow = false;
        }
      });
    },
    dropdownCommand: function dropdownCommand(command) {},
    update: function update() {
      if (!this.$refs.nav) return;
      var sizeName = this.sizeName;
      var navSize = this.$refs.nav['offset' + tab_navvue_type_script_lang_js_firstUpperCase(sizeName)];
      var containerSize = this.$refs.navScroll['offset' + tab_navvue_type_script_lang_js_firstUpperCase(sizeName)];

      // 更多类型，左右切换变为更多
      if (this.mode !== 'more') {
        if (containerSize < navSize) {
          var currentOffset = this.navOffset;
          this.scrollable = this.scrollable || {};
          this.scrollable.prev = currentOffset;
          this.scrollable.next = currentOffset + containerSize < navSize;
          if (navSize - currentOffset < containerSize) {
            this.navOffset = navSize - containerSize;
          }
        } else {
          var _currentOffset = this.navOffset;
          this.scrollable = false;
          if (_currentOffset > 0) {
            this.navOffset = 0;
          }
        }
      }
    },
    changeTab: function changeTab(e) {
      var keyCode = e.keyCode;
      var nextIndex = void 0;
      var currentIndex = void 0,
          tabList = void 0;
      if ([37, 38, 39, 40].indexOf(keyCode) !== -1) {
        // 左右上下键更换tab
        tabList = e.currentTarget.querySelectorAll('[role=tab]');
        currentIndex = Array.prototype.indexOf.call(tabList, e.target);
      } else {
        return;
      }
      if (keyCode === 37 || keyCode === 38) {
        // left
        if (currentIndex === 0) {
          // first
          nextIndex = tabList.length - 1;
        } else {
          nextIndex = currentIndex - 1;
        }
      } else {
        // right
        if (currentIndex < tabList.length - 1) {
          // not last
          nextIndex = currentIndex + 1;
        } else {
          nextIndex = 0;
        }
      }
      tabList[nextIndex].focus(); // 改变焦点元素
      tabList[nextIndex].click(); // 选中下一个tab
      this.setFocus();
    },
    setFocus: function setFocus() {
      if (this.focusable) {
        this.isFocus = true;
      }
    },
    removeFocus: function removeFocus() {
      this.isFocus = false;
    },
    visibilityChangeHandler: function visibilityChangeHandler() {
      var _this2 = this;

      var visibility = document.visibilityState;
      if (visibility === 'hidden') {
        this.focusable = false;
      } else if (visibility === 'visible') {
        setTimeout(function () {
          _this2.focusable = true;
        }, 50);
      }
    },
    windowBlurHandler: function windowBlurHandler() {
      this.focusable = false;
    },
    windowFocusHandler: function windowFocusHandler() {
      var _this3 = this;

      setTimeout(function () {
        _this3.focusable = true;
      }, 50);
    }
  },

  updated: function updated() {
    this.update();
  },
  render: function render(h) {
    var _this4 = this;

    var type = this.type,
        panes = this.panes,
        editable = this.editable,
        stretch = this.stretch,
        onTabClick = this.onTabClick,
        onTabRemove = this.onTabRemove,
        navStyle = this.navStyle,
        scrollable = this.scrollable,
        scrollNext = this.scrollNext,
        scrollPrev = this.scrollPrev,
        changeTab = this.changeTab,
        setFocus = this.setFocus,
        removeFocus = this.removeFocus,
        mode = this.mode,
        moreShow = this.moreShow,
        moreIndex = this.moreIndex;

    var scrollBtn = scrollable ? [h(
      'span',
      { 'class': ['el-tabs__nav-prev', scrollable.prev ? '' : 'is-disabled'], on: {
          'click': scrollPrev
        }
      },
      [h('i', { 'class': 'el-icon-arrow-left' })]
    ), h(
      'span',
      { 'class': ['el-tabs__nav-next', scrollable.next ? '' : 'is-disabled'], on: {
          'click': scrollNext
        }
      },
      [h('i', { 'class': 'el-icon-arrow-right' })]
    )] : null;

    var tabs = [];
    var dropdowns = [];

    this._l(panes, function (pane, index) {
      var tabName = pane.name || pane.index || index;
      var closable = pane.isClosable || editable;

      pane.index = '' + index;

      var btnClose = closable ? h('span', { 'class': 'el-icon-close', on: {
          'click': function click(ev) {
            onTabRemove(pane, ev);
          }
        }
      }) : null;

      var tabLabelContent = pane ? pane.$slots.label || pane.label : '';
      var tabindex = pane.active ? 0 : -1;

      if (moreIndex !== -1 && moreIndex < index) {
        dropdowns.push(h(
          'el-dropdown-item',
          {
            'class': {
              'el-tabs--dropdown-item': true,
              'is-active': pane.active,
              'is-disabled': pane.disabled
            },
            nativeOn: {
              'click': function click(ev) {
                removeFocus();onTabClick(pane, tabName, ev);_this4.updateMoreIndex();
              }
            }
          },
          [tabLabelContent]
        ));
      } else {
        var _ref;

        tabs.push(h(
          'div',
          {
            'class': (_ref = {
              'el-tabs__item': true
            }, _ref['is-' + _this4.rootTabs.tabPosition] = true, _ref['is-active'] = pane.active, _ref['is-disabled'] = pane.disabled, _ref['is-closable'] = closable, _ref['is-focus'] = _this4.isFocus, _ref),
            attrs: { id: 'tab-' + tabName,

              'aria-controls': 'pane-' + tabName,
              role: 'tab',
              'aria-selected': pane.active,

              tabindex: tabindex
            },
            key: 'tab-' + tabName, ref: 'tabs', refInFor: true,
            on: {
              'focus': function focus() {
                setFocus();
              },
              'blur': function blur() {
                removeFocus();
              },
              'click': function click(ev) {
                removeFocus();onTabClick(pane, tabName, ev);
              },
              'keydown': function keydown(ev) {
                if (closable && (ev.keyCode === 46 || ev.keyCode === 8)) {
                  onTabRemove(pane, ev);
                }
              }
            }
          },
          [tabLabelContent, btnClose]
        ));
      }
    });

    return h(
      'div',
      { 'class': ['el-tabs__nav-wrap', scrollable ? 'is-scrollable' : '', 'is-' + this.rootTabs.tabPosition] },
      [scrollBtn, h(
        'div',
        { 'class': ['el-tabs__nav-scroll'], ref: 'navScroll' },
        [h(
          'div',
          {
            'class': ['el-tabs__nav', 'is-' + this.rootTabs.tabPosition, stretch && ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'is-stretch' : '', this.mode === 'more' ? 'el-tabs__nav--more' : ''],
            ref: 'nav',
            style: navStyle,
            attrs: { role: 'tablist'
            },
            on: {
              'keydown': changeTab
            }
          },
          [!type ? h('tab-bar', {
            attrs: { tabs: panes, parent: this }
          }) : null, tabs, mode === 'more' && moreShow ? h(
            'el-dropdown',
            {
              ref: 'tabDropdown',
              'class': 'el-tabs--dropdown',
              attrs: { id: 'el-tabs--dropdown',

                trigger: 'click' },
              on: {
                'command': this.dropdownCommand
              }
            },
            [h(
              'el-button',
              { 'class': 'dropdown-btn' },
              [this.moreLabel || Object(locale_["t"])('el.tabs.more'), h('i', { 'class': 'el-icon-arrow-down' })]
            ), h(
              'el-dropdown-menu',
              { slot: 'dropdown' },
              [dropdowns]
            )]
          ) : null]
        )]
      )]
    );
  },
  mounted: function mounted() {
    var _this5 = this;

    Object(resize_event_["addResizeListener"])(this.$el, this.update);
    if (this.mode === 'more') {
      Object(resize_event_["addResizeListener"])(this.$el, this.updateMoreIndex);
    }
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);
    window.addEventListener('blur', this.windowBlurHandler);
    window.addEventListener('focus', this.windowFocusHandler);
    setTimeout(function () {
      _this5.scrollToActiveTab();
    }, 0);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el && this.update) Object(resize_event_["removeResizeListener"])(this.$el, this.update);
    if (this.mode === 'more' && this.$el && this.updateMoreIndex) Object(resize_event_["removeResizeListener"])(this.$el, this.updateMoreIndex);
    document.removeEventListener('visibilitychange', this.visibilityChangeHandler);
    window.removeEventListener('blur', this.windowBlurHandler);
    window.removeEventListener('focus', this.windowFocusHandler);
  }
});
// CONCATENATED MODULE: ./packages/tabs/src/tab-nav.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tab_navvue_type_script_lang_js_ = (tab_navvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/tabs/src/tab-nav.vue
var tab_nav_render, tab_nav_staticRenderFns




/* normalize component */

var tab_nav_component = Object(componentNormalizer["a" /* default */])(
  src_tab_navvue_type_script_lang_js_,
  tab_nav_render,
  tab_nav_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var tab_nav = (tab_nav_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./packages/tabs/src/tabs.vue?vue&type=script&lang=js&



/* harmony default export */ var tabsvue_type_script_lang_js_ = ({
  name: 'ElTabs',

  components: {
    TabNav: tab_nav
  },

  props: {
    type: String,
    activeName: String,
    closable: Boolean,
    addable: Boolean,
    value: {},
    editable: Boolean,
    tabPosition: {
      type: String,
      default: 'top'
    },
    beforeLeave: Function,
    stretch: Boolean,
    navMode: {
      type: String,
      default: 'default' // default more
    }
  },

  provide: function provide() {
    return {
      rootTabs: this
    };
  },
  data: function data() {
    return {
      currentName: this.value || this.activeName,
      panes: []
    };
  },


  watch: {
    activeName: function activeName(value) {
      this.setCurrentName(value);
    },
    value: function value(_value) {
      this.setCurrentName(_value);
    },
    currentName: function currentName(value) {
      var _this = this;

      if (this.$refs.nav) {
        this.$nextTick(function () {
          _this.$refs.nav.$nextTick(function (_) {
            _this.$refs.nav.scrollToActiveTab();
          });
        });
      }
    }
  },

  methods: {
    calcPaneInstances: function calcPaneInstances() {
      var _this2 = this;

      var isForceUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.$slots.default) {
        var paneSlots = this.$slots.default.filter(function (vnode) {
          return vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'ElTabPane';
        });
        // update indeed
        var panes = paneSlots.map(function (_ref) {
          var componentInstance = _ref.componentInstance;
          return componentInstance;
        });
        var panesChanged = !(panes.length === this.panes.length && panes.every(function (pane, index) {
          return pane === _this2.panes[index];
        }));
        if (isForceUpdate || panesChanged) {
          this.panes = panes;
        }
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }
    },
    handleTabClick: function handleTabClick(tab, tabName, event) {
      if (tab.disabled) return;
      this.setCurrentName(tabName);
      this.$emit('tab-click', tab, event);
    },
    handleTabRemove: function handleTabRemove(pane, ev) {
      if (pane.disabled) return;
      ev.stopPropagation();
      this.$emit('edit', pane.name, 'remove');
      this.$emit('tab-remove', pane.name);
    },
    handleTabAdd: function handleTabAdd() {
      this.$emit('edit', null, 'add');
      this.$emit('tab-add');
    },
    setCurrentName: function setCurrentName(value) {
      var _this3 = this;

      var changeCurrentName = function changeCurrentName() {
        _this3.currentName = value;
        _this3.$emit('input', value);
      };
      if (this.currentName !== value && this.beforeLeave) {
        var before = this.beforeLeave(value, this.currentName);
        if (before && before.then) {
          before.then(function () {
            changeCurrentName();
            _this3.$refs.nav && _this3.$refs.nav.removeFocus();
          }, function () {
            // https://github.com/ElemeFE/element/pull/14816
            // ignore promise rejection in `before-leave` hook
          });
        } else if (before !== false) {
          changeCurrentName();
        }
      } else {
        changeCurrentName();
      }
    }
  },

  render: function render(h) {
    var _ref2;

    var type = this.type,
        navMode = this.navMode,
        handleTabClick = this.handleTabClick,
        handleTabRemove = this.handleTabRemove,
        handleTabAdd = this.handleTabAdd,
        currentName = this.currentName,
        panes = this.panes,
        editable = this.editable,
        addable = this.addable,
        tabPosition = this.tabPosition,
        stretch = this.stretch;


    var newButton = editable || addable ? h(
      'span',
      {
        'class': 'el-tabs__new-tab',
        on: {
          'click': handleTabAdd,
          'keydown': function keydown(ev) {
            if (ev.keyCode === 13) {
              handleTabAdd();
            }
          }
        },
        attrs: {
          tabindex: '0'
        }
      },
      [h('i', { 'class': 'el-icon-plus' })]
    ) : null;

    var navData = {
      props: {
        currentName: currentName,
        onTabClick: handleTabClick,
        onTabRemove: handleTabRemove,
        editable: editable,
        type: type,
        mode: navMode,
        panes: panes,
        stretch: stretch
      },
      ref: 'nav'
    };
    var header = h(
      'div',
      { 'class': ['el-tabs__header', 'is-' + tabPosition] },
      [newButton, h('tab-nav', navData)]
    );
    var panels = h(
      'div',
      { 'class': 'el-tabs__content' },
      [this.$slots.default]
    );

    return h(
      'div',
      { 'class': (_ref2 = {
          'el-tabs': true,
          'el-tabs--card': type === 'card'
        }, _ref2['el-tabs--' + tabPosition] = true, _ref2['el-tabs--border-card'] = type === 'border-card', _ref2) },
      [tabPosition !== 'bottom' ? [header, panels] : [panels, header]]
    );
  },
  created: function created() {
    if (!this.currentName) {
      this.setCurrentName('0');
    }

    this.$on('tab-nav-update', this.calcPaneInstances.bind(null, true));
  },
  mounted: function mounted() {
    this.calcPaneInstances();
  },
  updated: function updated() {
    this.calcPaneInstances();
  }
});
// CONCATENATED MODULE: ./packages/tabs/src/tabs.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_tabsvue_type_script_lang_js_ = (tabsvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./packages/tabs/src/tabs.vue
var tabs_render, tabs_staticRenderFns




/* normalize component */

var tabs_component = Object(componentNormalizer["a" /* default */])(
  src_tabsvue_type_script_lang_js_,
  tabs_render,
  tabs_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src_tabs = (tabs_component.exports);
// CONCATENATED MODULE: ./packages/tabs/index.js


/* istanbul ignore next */
src_tabs.install = function (Vue) {
  Vue.component(src_tabs.name, src_tabs);
};

/* harmony default export */ var packages_tabs = __webpack_exports__["default"] = (src_tabs);

/***/ })

/******/ });