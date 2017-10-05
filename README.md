# React Select Item

[![Build Status](https://travis-ci.org/BusinessDuck/react-select-item.svg?branch=master)](https://travis-ci.org/BusinessDuck/react-select-item) [![npm version](https://badge.fury.io/js/react-select-item.svg)](https://badge.fury.io/js/react-select-item) [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MN45NZ5YF3NZ4) [![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

Simple and awesome react select component for rendering Select with options, complete with react ^14.0
Search inside options supported. Writing by ES2015. 

## Version 3.0.9 released [CHANGELOG](./Changelog.md)

## [Demo](https://businessduck.github.io/react-select-item/)

## Installation

```bash
$ npm install react-select-item --save
```
## Props Guide
| Property | Type | Description |
|---|---|---|
| closeOnChange | boolean | close options menu after item click |
| label | string | default placeholder text |
| value | array | selected values |
| onChange | function | change handler function |
| optionTransform | function | transform options from react children to native object |
| filterFn | function | filter options by search input text |
| highlightTextGetter | function | get the highlight text from compound option object |
| highlightTextSetter | function | set the output compound object to the option label after search filter |
| search | boolean | enable or disable search |
| searchText | string | current search text value |
| multiple | boolean | enable or disable multiple select |
| noItemsText | string | no items found text |
| searchPlaceholder | string | search placeholder text |
| className | classnames | class name, may be string or object, classnames inside |
| clearText | string | clear items button popup text |
| open | boolean | options menu statement flag |
| customLabelsRender | function | custom render for selected items |


## Migration from 2.x versions

```
1. DOM stricture was changed! If you have the dom depended staff, you need fix it
2. Change you onClick handler argument onClick(value: Array) => {} value is array every time now
3. Change value input prop - <SelectItem value={myValue: Array} /> value is array now
4. Search not will be able until flag search is false, if you using the filterFn - set up search to true
5. Import default deprecated, ise target import {SelectItem} instead of * as Select item
6. CSS styles location change 'react-select-item/dist/styles.css' instead of 'react-select-item/src/...'
```

## Development

### Start the dev server

```bash
$ npm run dev
$ npm run example
```

Defaults to port `4444`, check the localhost:4444 to view the library usage


## Example

```javascript
import React, { PropTypes } from "react";
import { noop } from "lodash";
import SelectItem from "react-select-item";

export default class MultiSelectFilter extends React.Component {

  static propTypes = {
    placeholder: PropTypes.string,
    isLoading: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.array,
    options: [],
    onChange: PropTypes.fn,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string
  };

  static defaultProps = {
    placeholder: "",
    isLoading: false,
    label: "",
    value: [],
    options: [],
    onChange: noop,
    className: ""
  };

  /**
   * Component constructor
   * The component is depended from Bootstrap 3.x (styles only)
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.value
    };
  }

  handleMultiChange = (value) => {
    this.setState({ values: value });
    this.props.onChange(value);
  };

  render() {
    return (
      <div className={this.props.wrapperClassName}>
        <div className="form-group">
          <label>{this.props.label}</label>
          <SelectItem label={this.props.label}
                     onChange={this.handleMultiChange}
                     value={this.state.values}
                     closeText={false}
                     className="form-control"
                     multiple={true}>
            { this.props.options.map((item, index) => (
                <option key={index} value={item.value}>{item.name}</option>
              )
            )}
          </SelectItem>
        </div>
      </div>
    );
  }
}
```
