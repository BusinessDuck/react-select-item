# React Select Item

[![Build Status](https://travis-ci.org/BusinessDuck/react-select-item.svg?branch=master)](https://travis-ci.org/BusinessDuck/react-select-item) [![npm version](https://badge.fury.io/js/react-select-item.svg)](https://badge.fury.io/js/react-select-item) [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MN45NZ5YF3NZ4) [![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

Simple and awesome react select component for rendering Select with options, complete with react ^14.0
Search inside options supported. Writing by ES2015. 

## Version 3 released [CHANGELOG](./Changelog.md)

## [Demo](https://businessduck.github.io/react-select-item/)

### Migration from 2.x versions

```
1. DOM stricture was changed! If you have the dom depended staff, you need fix it
2. Change you onClick handler argument onClick(value: Array) => {} value is array every time now
3. Change value input prop - <SelectItem value={myValue: Array} /> value is array now
4. Search not will be able until flag search is false, if you using the filterFn - set up search to true
```
### The Webpack Issues
if you see in console

```javascript
react-select-item.js:3 Uncaught Error: Cannot find module "."
    at webpackMissingModule (react-select-item.js:3)
    at react-select-item.js:3

```
OR
```
WARNING in ./~/react-select-item/dist/react-select-item.js
3:25-32 Critical dependency: require function is used in a way in which dependencies cannot be statically extracted
```

You need to add to webpack plugins:

` new webpack.ContextReplacementPlugin(/react-select-item/, 'react-select-item.js'), `

its temporary solution, will be don't need in next version


## Installation

```bash
$ npm install react-select-item --save
```

## Development

```bash
$ git clone git@github.com:BusinessDuck/react-select-item.git
$ npm install
```

### Run the tests

```bash
$ npm test
```

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
