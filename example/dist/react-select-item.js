(function() {
    if (typeof global === "object") {
        global.require = require;
    }
    var $fsx = global.$fsx = {}
    if ($fsx.r) {
        return;
    };
    $fsx.f = {}
    // cached modules
    $fsx.m = {};
    $fsx.r = function(id) {
        var cached = $fsx.m[id];
        // resolve if in cache
        if (cached) {
            return cached.m.exports;
        }
        var file = $fsx.f[id];
        if (!file)
            return;
        cached = $fsx.m[id] = {};
        cached.exports = {};
        cached.m = { exports: cached.exports };
        file(cached.m, cached.exports);
        return cached.m.exports;
    };
})();
// react-select-item/index.js
$fsx.f[0] = function(module,exports){
var ReactSelectItem_1 = $fsx.r(1);
exports.SelectItem = ReactSelectItem_1.Component;
}
// react-select-item/components/ReactSelectItem.jsx
$fsx.f[1] = function(module,exports){
var tslib_1 = require('tslib');
var classNames = require('classnames/bind');
var React = require('react');
var Component = function (_super) {
    tslib_1.__extends(Component, _super);
    function Component(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            open: false,
            searchText: '',
            value: []
        };
        _this.listenerActive = false;
        _this.handleButtonClick = function (e) {
            if (!e || !e.target.classList.contains('react-select-item-clear')) {
                _this.toggleOpenListState(!_this.state.open);
            }
        };
        _this.handleChange = function (value) {
            var resultValues = _this.props.multiple ? _this.state.value.slice() : [];
            if (resultValues.includes(value)) {
                resultValues.splice(resultValues.indexOf(value), 1);
            } else {
                resultValues.push(value);
            }
            _this.setState({ value: resultValues });
            setTimeout(function () {
                return _this.props.onChange(resultValues);
            }, 0);
        };
        _this.handleClear = function () {
            _this.setState({ value: [] });
            setTimeout(function () {
                return _this.props.onChange([]);
            }, 0);
        };
        _this.handleClickOutside = function (event) {
            var _a = _this, menuRef = _a.menuRef, buttonRef = _a.buttonRef;
            if (!menuRef || !buttonRef || buttonRef.contains(event.target) || menuRef.contains(event.target)) {
                return false;
            }
            _this.toggleOpenListState(false);
        };
        _this.toggleOpenListState = function (forceValue) {
            if (forceValue === void 0) {
                forceValue = _this.state.open;
            }
            if (forceValue) {
                if (!_this.listenerActive) {
                    document.addEventListener('mousedown', _this.handleClickOutside);
                    _this.listenerActive = true;
                }
                _this.setState({ searchText: '' });
            }
            _this.setState({ open: forceValue }, function () {
                if (!_this.state.open) {
                    document.removeEventListener('mousedown', _this.handleClickOutside);
                    _this.listenerActive = false;
                }
            });
        };
        _this.renderOption = function (option, i) {
            var className = classNames([
                'react-select-item-option',
                {
                    'react-select-item-option-disabled': option.disabled,
                    'react-select-item-option-selected': _this.isSelected(option.value)
                }
            ]);
            var aProps = {
                className: className,
                onClick: function (e) {
                    return option.disabled ? _this.interceptEvent(e) : _this.handleChange(option.value);
                },
                tabIndex: -1
            };
            return React.createElement('a', tslib_1.__assign({ key: i }, aProps), option.label);
        };
        _this.state.value = props.value || props.defaultValue;
        _this.state.open = props.open;
        _this.toggleOpenListState();
        return _this;
    }
    Component.prototype.render = function () {
        var className = classNames([
            'react-select-item-container',
            this.props.className,
            { 'react-select-item-empty': !this.hasValue() }
        ]);
        return React.createElement('div', { className: className }, this.renderButton(), this.renderOptionMenu());
    };
    Component.prototype.interceptEvent = function (event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    Component.prototype.isSelected = function (value) {
        return this.state.value.includes(value);
    };
    Component.prototype.getOptionsList = function () {
        var options = [];
        React.Children.forEach(this.props.children, function (option) {
            options.push({
                disabled: !!option.props.disabled,
                label: option.props.children,
                value: option.props.value
            });
        });
        return options;
    };
    Component.prototype.renderLabel = function () {
        var _this = this;
        var selected = this.getOptionsList().filter(function (option) {
            return _this.isSelected(option.value);
        }).map(function (option) {
            return option.label;
        });
        if (this.props.customLabelsRender) {
            return this.props.customLabelsRender(selected);
        }
        return selected.length > 0 ? selected.join(', ') : this.props.label;
    };
    Component.prototype.renderButton = function () {
        var _this = this;
        var buttonProps = {
            'aria-hidden': true,
            'className': 'react-select-item',
            'onClick': this.handleButtonClick,
            'ref': function (ref) {
                return _this.buttonRef = ref;
            },
            'tabIndex': '0'
        };
        return React.createElement('div', tslib_1.__assign({}, buttonProps), React.createElement('div', { className: 'react-select-item-label' }, this.renderLabel()), this.renderClearButton());
    };
    Component.prototype.renderSearchInput = function () {
        var _this = this;
        var inputProps = {
            'aria-hidden': true,
            'className': 'react-select-item-options-search',
            'onChange': function (e) {
                _this.setState({ searchText: e.currentTarget.value });
            },
            'placeholder': this.props.searchPlaceholder,
            'tabIndex': '0',
            'type': 'text',
            'value': this.state.searchText
        };
        return React.createElement('input', tslib_1.__assign({}, inputProps));
    };
    Component.prototype.renderOptionMenu = function () {
        var _this = this;
        var className = classNames([
            'react-select-item-options',
            { 'react-select-item-hidden': !this.state.open }
        ]);
        var selectOptions = this.getOptionsList();
        if (this.props.search && this.state.searchText.length > 0) {
            selectOptions = selectOptions.filter(function (item) {
                return _this.props.filterFn(_this.state.searchText, item);
            });
            selectOptions = this.highlightSearchText(selectOptions);
        }
        var divProps = {
            'aria-hidden': true,
            'className': className,
            'ref': function (ref) {
                return _this.menuRef = ref;
            },
            'tabIndex': 0
        };
        return React.createElement('div', tslib_1.__assign({}, divProps), this.props.search ? this.renderSearchInput() : null, React.createElement('div', { className: 'react-select-item-off-screen' + (selectOptions.length === 0 ? ' no-items' : '') }, selectOptions.length > 0 ? selectOptions.map(this.renderOption) : this.props.noItemsText));
    };
    Component.prototype.renderClearButton = function () {
        if (this.hasValue()) {
            var brnProps = {
                'aria-label': this.props.clearText,
                'className': 'react-select-item-clear',
                'onClick': this.handleClear
            };
            return React.createElement('button', tslib_1.__assign({}, brnProps));
        }
    };
    Component.prototype.hasValue = function () {
        return this.state.value.length > 0;
    };
    Component.prototype.highlightSearchText = function (selectOptions) {
        var _this = this;
        var highlight = function (value, key) {
            return React.createElement('span', {
                key: key,
                className: 'highlighter'
            }, value);
        };
        return selectOptions.map(function (item) {
            var reg = new RegExp(_this.state.searchText, 'gi');
            var matcher = item.label.match(reg);
            if (matcher && matcher[0]) {
                var split_1 = item.label.split(matcher[0]);
                var resultArray = split_1.reduce(function (result, submatch, currentIndex) {
                    if (submatch === '' && split_1[currentIndex - 1] !== submatch && currentIndex !== split_1.length - 1) {
                        result.push(highlight(matcher[0], currentIndex));
                    } else {
                        result.push(submatch);
                        if (currentIndex !== split_1.length - 1) {
                            result.push(highlight(matcher[0], currentIndex));
                        }
                    }
                    return result;
                }, []);
                item.label = React.createElement('span', null, resultArray.map(function (item) {
                    return item;
                }));
            }
            return item;
        });
    };
    Component.defaultProps = {
        clearText: 'Remove selection',
        filterFn: function () {
            return null;
        },
        multiple: false,
        onChange: function () {
            return null;
        },
        search: false,
        searchPlaceholder: 'Search...',
        noItemsText: 'No items found'
    };
    return Component;
}(React.Component);
exports.Component = Component;
}
module.exports = $fsx.r(0)