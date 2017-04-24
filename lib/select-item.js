import React from "react";
import ReactDOM from "react-dom";

let idInc = 0;

const keyHandlers = {
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
    event.stopPropagation()
  }
}

export default class SelectItem extends React.Component {
  static defaultProps = {
    closeText: 'Close',
    clearText: 'Remove selection'
  };

  constructor(props) {
    super(props);
    this.clickingOption = false;
    this.blurTimeout = null;
    this.state = {
      id: 'react-select-box-' + (++idInc),
      open: false,
      focusedIndex: -1,
      pendingValue: [],
      searchVisible: false,
      searchEnabled: typeof this.props.filterFn === 'function',
      searchText: ""
    };
  }

  componentWillMount() {
    this.updatePendingValue(this.props.value)
  }

  componentWillReceiveProps(next) {
    this.updatePendingValue(next.value)
  }

  changeOnClose() {
    return this.isMultiple() && String(this.props.changeOnClose) === 'true'
  }

  updatePendingValue(value, cb) {
    if (this.changeOnClose()) {
      this.setState({ pendingValue: value }, cb);
      return true
    }
    return false
  }

  handleFocus = () => {
    clearTimeout(this.blurTimeout)
  };

  handleSearchBlur = () => {
    let menuNode = ReactDOM.findDOMNode(this.refs.menu);
    this.setState({ searchVisible: false });
    if (document.hasFocus(menuNode)) {
      return this.handleClose();
    }
  };

  handleBlur = () => {
    clearTimeout(this.blurTimeout);
    this.blurTimeout = setTimeout(this.handleClose, 0)
  };

  handleMouseDown = () => {
    this.clickingOption = true
  };

  handleChange = (val, cb) => {
    return (event) => {
      this.clickingOption = false;
      interceptEvent(event);
      if (this.isMultiple()) {
        let selected = [];
        if (val !== null) {
          selected = this.value().slice(0);
          let index = selected.indexOf(val);
          if (index !== -1) {
            selected.splice(index, 1)
          } else {
            selected.push(val)
          }
        }
        this.updatePendingValue(selected, cb) || this.props.onChange(selected);
        if (this.state.searchEnabled) {
          this.setState({ open: true })
        }

      } else {
        this.updatePendingValue(val, cb) || this.props.onChange(val);
        this.handleClose();
        if (!this.state.searchEnabled) {
          this.refs.button.focus()
        }
      }
    }
  }

  handleNativeChange = (event) => {
    let val = event.target.value;
    if (this.isMultiple()) {
      let children = [].slice.call(event.target.childNodes, 0);
      val = children.reduce(function (memo, child) {
        if (child.selected) {
          memo.push(child.value)
        }
        return memo
      }, [])
    }
    this.props.onChange(val)
  };

  handleClear = (event) => {
    interceptEvent(event);
    this.handleChange(null, function () {
      // only called when change="true"
      this.props.onChange(this.state.pendingValue)
    })(event);
    this.handleClose(event);
  };

  toggleOpenClose = (event) => {
    interceptEvent(event);
    this.setState({ open: !this.state.open });
    if (this.state.open) {
      return this.setState({ open: false, searchVisible: false })
    }

    this.handleOpen()
  };

  handleOpen = (event) => {
    interceptEvent(event);
    this.setState({ open: true, searchVisible: this.state.searchEnabled }, function () {
      if (this.state.searchEnabled) {
        this.refs.searchInput.focus();
      } else {
        this.refs.menu.focus()
      }
    })
  };

  handleClose = (event) => {
    interceptEvent(event);
    if (!this.clickingOption) {
      this.setState({ open: false, searchVisible: false, focusedIndex: -1 })
    }
    if (this.changeOnClose()) {
      this.props.onChange(this.state.pendingValue)
    }
  };


  moveFocus(move) {
    let len = React.Children.count(this.props.children);
    let idx = (this.state.focusedIndex + move + len) % len;
    this.setState({ focusedIndex: idx })
  }

  handleKeyDown = (event) => {
    if (this.state.searchEnabled && [ 27, 38, 40, 13 ].indexOf(event.which) === -1) {
      return;
    }
    if (keyHandlers[ event.which ]) {
      this[ keyHandlers[ event.which ] ](event)
    }
  };

  handleUpKey = (event) => {
    interceptEvent(event);
    this.moveFocus(-1)
  };

  handleDownKey = (event) => {
    interceptEvent(event);
    if (!this.state.open) {
      this.handleOpen(event)
    }
    this.moveFocus(1)
  };

  handleSpaceKey = (event) => {
    if (this.state.searchEnabled) {
      return;
    }
    interceptEvent(event);
    if (!this.state.open) {
      this.handleOpen(event)
    } else if (this.state.focusedIndex !== -1) {
      this.handleEnterKey()
    }
  };

  handleEnterKey = (event) => {
    if (this.state.focusedIndex !== -1) {
      this.handleChange(this.options()[ this.state.focusedIndex ].value)(event)
    }
  };

  handleEscKey = (event) => {
    if (this.state.open) {
      this.handleClose(event)
    } else {
      this.handleClear(event)
    }
  };

  label() {
    let selected = this.options().filter((option) =>
      this.isSelected(option.value)).map((option) => {
      return option.label
    });

    return selected.length > 0 ? selected.join(', ') : this.props.label
  }

  isMultiple() {
    return String(this.props.multiple) === 'true'
  }

  isSearchable() {
    return this.state.searchEnabled;
  }

  options() {
    let options = [];
    React.Children.forEach(this.props.children, function (option) {
      options.push({
        value: option.props.value,
        label: option.props.children
      })
    });

    if (this.state.searchEnabled && this.state.searchText.length > 0) {
      return options.filter((item) => {
        return this.props.filterFn(this.state.searchText, item);
      });
    }
    else {
      return options;
    }
  }

  value() {
    let value = this.changeOnClose() ?
      this.state.pendingValue :
      this.props.value;

    if (!this.isMultiple() || Array.isArray(value)) {
      return value
    }
    if (value !== null) {
      return [ value ]
    }
    return []
  }

  hasValue() {
    if (this.isMultiple()) {
      return this.value().length > 0
    }
    return this.value() !== null
  }

  isSelected(value) {
    if (this.isMultiple()) {
      return this.value().indexOf(value) !== -1
    }
    return this.value() === value
  }

  render() {
    let className = 'react-select-box-container';
    if (this.props.className) {
      className += ' ' + this.props.className
    }
    if (this.isMultiple()) {
      className += ' react-select-box-multi';
    }
    if (!this.hasValue()) {
      className += ' react-select-box-empty'
    }
    return <div onKeyDown={this.handleKeyDown} className={className}>
      {this.isSearchable() ? this.renderSearchButton() : this.renderDefaultButton()}
      {this.renderOptionMenu()}
      {this.renderClearButton()}
      {this.renderNativeSelect()}
    </div>
  }

  renderNativeSelect = () => {
    let id = this.state.id + '-native-select';
    let multiple = this.isMultiple();
    let empty = multiple ? null : <option key="empty" disabled={true}>No Selection</option>;
    let options = [ empty ].concat(this.props.children);
    const selectProps = {
      id: id,
      multiple: multiple,
      onKeyDown: function (e) {
        e.stopPropagation()
      },
      value: this.props.value || (multiple ? [] : ''),
      onChange: this.handleNativeChange
    };
    return (
      <div className="react-select-box-native">
        <label htmlFor={id}>{this.props.label}</label>
        <select {...selectProps}>
          {options}
        </select>
      </div>
    )
  };

  renderDefaultButton = () => {

    const buttonProps = {
      id: this.state.id,
      ref: 'button',
      className: 'react-select-box',
      onClick: this.toggleOpenClose,
      onBlur: this.handleBlur,
      tabIndex: '0',
      'aria-hidden': true
    };

    return (
      <button {...buttonProps}>
        <div className="react-select-box-label">
          {this.label()}
        </div>
      </button>
    )
  };

  renderSearchButton = () => {
    if (this.state.searchVisible) {
      return this.renderSearchInput();
    }

    const buttonProps = {
      id: this.state.id,
      ref: 'button',
      className: 'react-select-box',
      onClick: this.handleOpen,
      onBlur: this.handleBlur,
      tabIndex: '0',
      'aria-hidden': true
    };

    return (
      <button {...buttonProps}>
        <div className="react-select-box-label">
          {this.label()}
        </div>
      </button>
    )
  };

  renderSearchInput = () => {
    const inputProps = {
      id: this.state.id + '-search',
      ref: "searchInput",
      value: this.state.searchText,
      className: 'react-select-box',
      onFocus: this.handleFocus(),
      onChange: (e) => {
        this.setState({
          searchText: e.currentTarget.value
        });
      },
      onBlur: this.handleSearchBlur,
      tabIndex: '0',
      'type': "text",
      'aria-hidden': true
    };
    return <input {...inputProps}/>
  };

  renderOptionMenu = () => {
    let className = 'react-select-box-options';
    let selectOptions = this.options();
    if (!this.state.open) {
      className += ' react-select-box-hidden'
    }

    const divProps = {
      className: className,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus,
      'aria-hidden': true,
      ref: 'menu',
      tabIndex: 0
    };

    return (
      <div {...divProps}>
        <div className={'react-select-box-off-screen' + (selectOptions.length === 0 ? ' no-items' : '')}>
          {selectOptions.length > 0 ? selectOptions.map(this.renderOption) : this.props.noItemsText}
        </div>
        { this.renderCloseButton() }
      </div>

    )
  };

  renderOption = (option, i) => {
    let className = 'react-select-box-option';
    if (i === this.state.focusedIndex) {
      className += ' react-select-box-option-focused'
    }
    if (this.isSelected(option.value)) {
      className += ' react-select-box-option-selected'
    }
    const aProps = {
      id: this.state.id + '-' + i,
      href: '#',
      onClick: this.handleChange(option.value),
      onMouseDown: this.handleMouseDown,
      className: className,
      tabIndex: -1,
      onBlur: this.handleBlur,
      onFocus: this.handleFocus
    };

    return <a key={i} {...aProps}>{option.label}</a>
  };

  renderClearButton = () => {
    if (this.hasValue()) {
      const brnProps = {
        'aria-label': this.props.clearText,
        className: 'react-select-box-clear',
        onClick: this.handleClear
      };
      return <button {...brnProps}/>
    }
  };

  renderCloseButton = () => {
    if (this.isMultiple() && this.props.closeText) {
      const btnProps = {
        onClick: this.handleClose,
        className: 'react-select-box-close',
        onBlur: this.handleBlur,
        onFocus: this.handleFocus
      };
      return <button {...btnProps}>{this.props.closeText}</button>
    }
  };
}
