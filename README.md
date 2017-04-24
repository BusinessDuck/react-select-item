# React Select Item
### This is a fork from [react-select-box](https://github.com/instructure/react-select-box)
#### Motivation
The parent repository does not look like something alive. And i want to continue with react-select-box as alternative project.

[![Build Status](https://travis-ci.org/BusinessDuck/react-select-item.svg?branch=master)](https://travis-ci.org/BusinessDuck/react-select-item) [![npm version](https://badge.fury.io/js/react-select-item.svg)](https://badge.fury.io/js/react-select-item) [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MN45NZ5YF3NZ4) [![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

Simple and awesome react select component for rendering Select with options, complete with react ^14.0
Search inside options supported. Writing by ES2015. 

## [Demo](https://businessduck.github.io/react-select-item/)

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

### Start the dev server (webpack + babel)

```bash
$ npm start
```

Defaults to port `8080`, check the localhost:8080 to view the library usage


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
    value: null,
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
