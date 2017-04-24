(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["select-item"] = factory(require("react"), require("react-dom"));
	else
		root["select-item"] = factory(root["react"], root["react-dom"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(1);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var idInc = 0;

var keyHandlers = {
  38: 'handleUpKey',
  40: 'handleDownKey',
  32: 'handleSpaceKey',
  13: 'handleEnterKey',
  27: 'handleEscKey',
  74: 'handleDownKey',
  75: 'handleUpKey'
};

function interceptEvent(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
}

var SelectItem = function (_React$Component) {
  _inherits(SelectItem, _React$Component);

  function SelectItem(props) {
    _classCallCheck(this, SelectItem);

    var _this = _possibleConstructorReturn(this, (SelectItem.__proto__ || Object.getPrototypeOf(SelectItem)).call(this, props));

    _this.handleFocus = function () {
      clearTimeout(_this.blurTimeout);
    };

    _this.handleSearchBlur = function () {
      var menuNode = _reactDom2.default.findDOMNode(_this.refs.menu);
      _this.setState({ searchVisible: false });
      if (document.hasFocus(menuNode)) {
        return _this.handleClose();
      }
    };

    _this.handleBlur = function () {
      clearTimeout(_this.blurTimeout);
      _this.blurTimeout = setTimeout(_this.handleClose, 0);
    };

    _this.handleMouseDown = function () {
      _this.clickingOption = true;
    };

    _this.handleChange = function (val, cb) {
      return function (event) {
        _this.clickingOption = false;
        interceptEvent(event);
        if (_this.isMultiple()) {
          var selected = [];
          if (val !== null) {
            selected = _this.value().slice(0);
            var index = selected.indexOf(val);
            if (index !== -1) {
              selected.splice(index, 1);
            } else {
              selected.push(val);
            }
          }
          _this.updatePendingValue(selected, cb) || _this.props.onChange(selected);
          if (_this.state.searchEnabled) {
            _this.setState({ open: true });
          }
        } else {
          _this.updatePendingValue(val, cb) || _this.props.onChange(val);
          _this.handleClose();
          if (!_this.state.searchEnabled) {
            _this.refs.button.focus();
          }
        }
      };
    };

    _this.handleNativeChange = function (event) {
      var val = event.target.value;
      if (_this.isMultiple()) {
        var children = [].slice.call(event.target.childNodes, 0);
        val = children.reduce(function (memo, child) {
          if (child.selected) {
            memo.push(child.value);
          }
          return memo;
        }, []);
      }
      _this.props.onChange(val);
    };

    _this.handleClear = function (event) {
      interceptEvent(event);
      _this.handleChange(null, function () {
        // only called when change="true"
        this.props.onChange(this.state.pendingValue);
      })(event);
      _this.handleClose(event);
    };

    _this.toggleOpenClose = function (event) {
      interceptEvent(event);
      _this.setState({ open: !_this.state.open });
      if (_this.state.open) {
        return _this.setState({ open: false, searchVisible: false });
      }

      _this.handleOpen();
    };

    _this.handleOpen = function (event) {
      interceptEvent(event);
      _this.setState({ open: true, searchVisible: _this.state.searchEnabled }, function () {
        if (this.state.searchEnabled) {
          this.refs.searchInput.focus();
        } else {
          this.refs.menu.focus();
        }
      });
    };

    _this.handleClose = function (event) {
      interceptEvent(event);
      if (!_this.clickingOption) {
        _this.setState({ open: false, searchVisible: false, focusedIndex: -1 });
      }
      if (_this.changeOnClose()) {
        _this.props.onChange(_this.state.pendingValue);
      }
    };

    _this.handleKeyDown = function (event) {
      if (_this.state.searchEnabled && [27, 38, 40, 13].indexOf(event.which) === -1) {
        return;
      }
      if (keyHandlers[event.which]) {
        _this[keyHandlers[event.which]](event);
      }
    };

    _this.handleUpKey = function (event) {
      interceptEvent(event);
      _this.moveFocus(-1);
    };

    _this.handleDownKey = function (event) {
      interceptEvent(event);
      if (!_this.state.open) {
        _this.handleOpen(event);
      }
      _this.moveFocus(1);
    };

    _this.handleSpaceKey = function (event) {
      if (_this.state.searchEnabled) {
        return;
      }
      interceptEvent(event);
      if (!_this.state.open) {
        _this.handleOpen(event);
      } else if (_this.state.focusedIndex !== -1) {
        _this.handleEnterKey();
      }
    };

    _this.handleEnterKey = function (event) {
      if (_this.state.focusedIndex !== -1) {
        _this.handleChange(_this.options()[_this.state.focusedIndex].value)(event);
      }
    };

    _this.handleEscKey = function (event) {
      if (_this.state.open) {
        _this.handleClose(event);
      } else {
        _this.handleClear(event);
      }
    };

    _this.renderNativeSelect = function () {
      var id = _this.state.id + '-native-select';
      var multiple = _this.isMultiple();
      var empty = multiple ? null : _react2.default.createElement(
        "option",
        { key: "empty", disabled: true },
        "No Selection"
      );
      var options = [empty].concat(_this.props.children);
      var selectProps = {
        id: id,
        multiple: multiple,
        onKeyDown: function onKeyDown(e) {
          e.stopPropagation();
        },
        value: _this.props.value || (multiple ? [] : ''),
        onChange: _this.handleNativeChange
      };
      return _react2.default.createElement(
        "div",
        { className: "react-select-box-native" },
        _react2.default.createElement(
          "label",
          { htmlFor: id },
          _this.props.label
        ),
        _react2.default.createElement(
          "select",
          selectProps,
          options
        )
      );
    };

    _this.renderDefaultButton = function () {

      var buttonProps = {
        id: _this.state.id,
        ref: 'button',
        className: 'react-select-box',
        onClick: _this.toggleOpenClose,
        onBlur: _this.handleBlur,
        tabIndex: '0',
        'aria-hidden': true
      };

      return _react2.default.createElement(
        "button",
        buttonProps,
        _react2.default.createElement(
          "div",
          { className: "react-select-box-label" },
          _this.label()
        )
      );
    };

    _this.renderSearchButton = function () {
      if (_this.state.searchVisible) {
        return _this.renderSearchInput();
      }

      var buttonProps = {
        id: _this.state.id,
        ref: 'button',
        className: 'react-select-box',
        onClick: _this.handleOpen,
        onBlur: _this.handleBlur,
        tabIndex: '0',
        'aria-hidden': true
      };

      return _react2.default.createElement(
        "button",
        buttonProps,
        _react2.default.createElement(
          "div",
          { className: "react-select-box-label" },
          _this.label()
        )
      );
    };

    _this.renderSearchInput = function () {
      var inputProps = {
        id: _this.state.id + '-search',
        ref: "searchInput",
        value: _this.state.searchText,
        className: 'react-select-box',
        onFocus: _this.handleFocus(),
        onChange: function onChange(e) {
          _this.setState({
            searchText: e.currentTarget.value
          });
        },
        onBlur: _this.handleSearchBlur,
        tabIndex: '0',
        'type': "text",
        'aria-hidden': true
      };
      return _react2.default.createElement("input", inputProps);
    };

    _this.renderOptionMenu = function () {
      var className = 'react-select-box-options';
      var selectOptions = _this.options();
      if (!_this.state.open) {
        className += ' react-select-box-hidden';
      }

      var divProps = {
        className: className,
        onBlur: _this.handleBlur,
        onFocus: _this.handleFocus,
        'aria-hidden': true,
        ref: 'menu',
        tabIndex: 0
      };

      return _react2.default.createElement(
        "div",
        divProps,
        _react2.default.createElement(
          "div",
          { className: 'react-select-box-off-screen' + (selectOptions.length === 0 ? ' no-items' : '') },
          selectOptions.length > 0 ? selectOptions.map(_this.renderOption) : _this.props.noItemsText
        ),
        _this.renderCloseButton()
      );
    };

    _this.renderOption = function (option, i) {
      var className = 'react-select-box-option';
      if (i === _this.state.focusedIndex) {
        className += ' react-select-box-option-focused';
      }
      if (_this.isSelected(option.value)) {
        className += ' react-select-box-option-selected';
      }
      var aProps = {
        id: _this.state.id + '-' + i,
        href: '#',
        onClick: _this.handleChange(option.value),
        onMouseDown: _this.handleMouseDown,
        className: className,
        tabIndex: -1,
        onBlur: _this.handleBlur,
        onFocus: _this.handleFocus
      };

      return _react2.default.createElement(
        "a",
        _extends({ key: i }, aProps),
        option.label
      );
    };

    _this.renderClearButton = function () {
      if (_this.hasValue()) {
        var brnProps = {
          'aria-label': _this.props.clearText,
          className: 'react-select-box-clear',
          onClick: _this.handleClear
        };
        return _react2.default.createElement("button", brnProps);
      }
    };

    _this.renderCloseButton = function () {
      if (_this.isMultiple() && _this.props.closeText) {
        var btnProps = {
          onClick: _this.handleClose,
          className: 'react-select-box-close',
          onBlur: _this.handleBlur,
          onFocus: _this.handleFocus
        };
        return _react2.default.createElement(
          "button",
          btnProps,
          _this.props.closeText
        );
      }
    };

    _this.clickingOption = false;
    _this.blurTimeout = null;
    _this.state = {
      id: 'react-select-box-' + ++idInc,
      open: false,
      focusedIndex: -1,
      pendingValue: [],
      searchVisible: false,
      searchEnabled: typeof _this.props.filterFn === 'function',
      searchText: ""
    };
    return _this;
  }

  _createClass(SelectItem, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.updatePendingValue(this.props.value);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(next) {
      this.updatePendingValue(next.value);
    }
  }, {
    key: "changeOnClose",
    value: function changeOnClose() {
      return this.isMultiple() && String(this.props.changeOnClose) === 'true';
    }
  }, {
    key: "updatePendingValue",
    value: function updatePendingValue(value, cb) {
      if (this.changeOnClose()) {
        this.setState({ pendingValue: value }, cb);
        return true;
      }
      return false;
    }
  }, {
    key: "moveFocus",
    value: function moveFocus(move) {
      var len = _react2.default.Children.count(this.props.children);
      var idx = (this.state.focusedIndex + move + len) % len;
      this.setState({ focusedIndex: idx });
    }
  }, {
    key: "label",
    value: function label() {
      var _this2 = this;

      var selected = this.options().filter(function (option) {
        return _this2.isSelected(option.value);
      }).map(function (option) {
        return option.label;
      });

      return selected.length > 0 ? selected.join(', ') : this.props.label;
    }
  }, {
    key: "isMultiple",
    value: function isMultiple() {
      return String(this.props.multiple) === 'true';
    }
  }, {
    key: "isSearchable",
    value: function isSearchable() {
      return this.state.searchEnabled;
    }
  }, {
    key: "options",
    value: function options() {
      var _this3 = this;

      var options = [];
      _react2.default.Children.forEach(this.props.children, function (option) {
        options.push({
          value: option.props.value,
          label: option.props.children
        });
      });

      if (this.state.searchEnabled && this.state.searchText.length > 0) {
        return options.filter(function (item) {
          return _this3.props.filterFn(_this3.state.searchText, item);
        });
      } else {
        return options;
      }
    }
  }, {
    key: "value",
    value: function value() {
      var value = this.changeOnClose() ? this.state.pendingValue : this.props.value;

      if (!this.isMultiple() || Array.isArray(value)) {
        return value;
      }
      if (value !== null) {
        return [value];
      }
      return [];
    }
  }, {
    key: "hasValue",
    value: function hasValue() {
      if (this.isMultiple()) {
        return this.value().length > 0;
      }
      return this.value() !== null;
    }
  }, {
    key: "isSelected",
    value: function isSelected(value) {
      if (this.isMultiple()) {
        return this.value().indexOf(value) !== -1;
      }
      return this.value() === value;
    }
  }, {
    key: "render",
    value: function render() {
      var className = 'react-select-box-container';
      if (this.props.className) {
        className += ' ' + this.props.className;
      }
      if (this.isMultiple()) {
        className += ' react-select-box-multi';
      }
      if (!this.hasValue()) {
        className += ' react-select-box-empty';
      }
      return _react2.default.createElement(
        "div",
        { onKeyDown: this.handleKeyDown, className: className },
        this.isSearchable() ? this.renderSearchButton() : this.renderDefaultButton(),
        this.renderOptionMenu(),
        this.renderClearButton(),
        this.renderNativeSelect()
      );
    }
  }]);

  return SelectItem;
}(_react2.default.Component);

SelectItem.defaultProps = {
  closeText: 'Close',
  clearText: 'Remove selection'
};
exports.default = SelectItem;

/***/ })
/******/ ]);
});