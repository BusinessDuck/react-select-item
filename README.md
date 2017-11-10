# React Select Item

[![Build Status](https://travis-ci.org/BusinessDuck/react-select-item.svg?branch=master)](https://travis-ci.org/BusinessDuck/react-select-item) [![npm version](https://badge.fury.io/js/react-select-item.svg)](https://badge.fury.io/js/react-select-item) [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MN45NZ5YF3NZ4) [![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

Simple and awesome react select component for rendering Select with options, complete with react ^14.0
Search inside options supported. Writing by ES2015. 

## Version 3.1.0 released [CHANGELOG](./Changelog.md)

## [Demo](https://businessduck.github.io/react-select-item/)

## Installation

```bash
$ npm install react-select-item --save
```

## Features


1. Very customizable components, you can see very different usage in [Demo](https://businessduck.github.io/react-select-item/)
Just extend default option or label and re-define render function by you own needed
```
class CustomOption extends Option<IOptionProps, {}> {
    /**
     * Available props:
     *
     * getOptionProps: (option: any) => {};
     * onClick: (value: any) => void;
     * selected: boolean;
     * option: any;
     * @param props
     */
    constructor(props) {
        super(props);
    }

    public render() {
        const {option} = this.props;
        return (
            <div {...this.getOptionProps()}>
                <span className="option-name"> {option.name}</span>
                <span className="option-date"> {option.value.creationTs || option.creationTs} </span>
            </div>
        );
    }
}
```
2. Adaptive options format
You can use value as object with "id" key or plaint value with text or number, in one time it works!
```
 const optionsList = [
            {
                disabled: true,
                name: "Red",
                value: {id: "red", creationTs: "20.01.2017 - 16:53:24"},
            },
            {
                name: "Blue",
                value: {id: "blue", creationTs: "20.01.2017 - 16:53:24"},
            },
            {
                name: "Yellow",
                value: {id: "yellow", creationTs: "20.01.2017 - 16:53:24"},
            },
            {
                creationTs: "20.01.2017 - 16:53:24",
                name: "Orange",
                value: "orange",
            },
        ];
```
3. Customizable search with text highlighting. You can use highlightTestSetter/Getter for highlight complaint objects
ot customize text passed from different places.


## Props Guide
| Property | Type | Description |
|---|---|---|
| LabelComponent | component | component for rendering label |
| OptionComponent | component | component for rendering option |
| getOptionProps | function | pass props to Option component |
| getLabelProps | function | pass props to Label component |
| closeOnChange | boolean | close options menu after item click |
| placeholder | string | default placeholder text |
| value | array | selected values |
| onChange | function | change handler function |
| onSearch | function | filter options by search input text |
| highlightTextGetter | function | get the highlight text from compound option object |
| highlightTextSetter | function | set the output compound object to the option label after search filter |
| search | boolean | enable or disable search |
| searchText | string | current search text value |
| multiple | boolean | enable or disable multiple select |
| searchEmptyPlaceholder | string | no items found text |
| searchPlaceholder | string | search placeholder text |
| className | classnames | class name, may be string or object, classnames inside |
| clearText | string | clear items button popup text |
| open | boolean | options menu statement flag |
| customLabelsRender | function | custom render for selected items |

## Development

### Start the dev server

```bash
$ npm run serve
$ npm run example
```

Defaults to port `4444`, check the localhost:4444 to view the library usage


## Example

```javascript
import React, { PropTypes } from "react";
import { noop } from "lodash";
import { Select as SelectItem } from "react-select-item";

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
          <SelectItem placeholder={this.props.label}
                     onChange={this.handleMultiChange}
                     value={this.state.values}
                     closeText={false}
                     className="form-control"
                     multiple={true}
                     options={this.props.options}
          />
        </div>
      </div>
    );
  }
}
```
