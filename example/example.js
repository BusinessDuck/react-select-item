import React from "react";
import ReactDOM from "react-dom";
import SelectItem from "../src/select-item";

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: null,
      searchColor: null,
      colors: [],
      searchColors: []
    };
  }

  handleChange = (color) => {
    this.setState({ color: color })
  };

  handleMultiChange = (colors) => {
    this.setState({ colors: colors })
  };

  handleSingleSearchChange = (color) => {
    this.setState({ searchColor: color })
  };

  handleMultiSearchChange = (colors) => {
    this.setState({ searchColors: colors })
  };

  render() {
    const childrens = [
      { value: 'red', name: 'Red', disabled: true },
      { value: 'orange', name: 'Orange' },
      { value: 'green', name: 'Green' },
      { value: 'black', name: 'Black' },
      { value: 'yellow', name: 'Yellow' },
      { value: 'purple', name: 'Purple' },
      { value: 'greenish', name: 'Light greenish with a little bit of yellow' }
    ];

    const select1Props = {
      label: "Favorite Color",
      className: 'my-example-select-box',
      onChange: this.handleChange,
      value: this.state.color
    };

    const select2Props = {
      label: "Favorite Color",
      className: 'my-example-select-box',
      onChange: this.handleSingleSearchChange,
      value: this.state.searchColor,
      noItemsText: "No items found",
      filterFn: function (text, item) {
        return item.label.indexOf(text) !== -1
      },
    };

    const select3Props = {
      label: "Favorite Colors",
      onChange: this.handleMultiChange,
      value: this.state.colors,
      multiple: true
    };

    const select4Props = {
      label: "Favorite Colors",
      onChange: this.handleMultiSearchChange,
      value: this.state.searchColors,
      multiple: true,
      noItemsText: "No items found",
      filterFn: function (text, item) {
        return item.label.indexOf(text) !== -1
      },

    };

    return (
      <div className="example">
        <h1>Select Item Example</h1>
        <SelectItem {...select1Props}>
          { childrens.map((item, index) => (
              <option key={index} value={item.value} disabled={item.disabled}>{item.name}</option>
            )
          )}
        </SelectItem>

        <h1>Select Search Example</h1>
        <SelectItem {...select2Props}>
          { childrens.map((item, index) => (
              <option key={index} value={item.value}>{item.name}</option>
            )
          )}
        </SelectItem>

        <h1>Select Multiple Example</h1>
        <SelectItem {...select3Props}>
          { childrens.map((item, index) => (
              <option key={index} value={item.value}>{item.name}</option>
            )
          )}
        </SelectItem>

        <h1>Select Multiple Search Example</h1>
        <SelectItem {...select4Props}>
          { childrens.map((item, index) => (
              <option key={index} value={item.value}>{item.name}</option>
            )
          )}
        </SelectItem>
      </div>
    )
  }
}

ReactDOM.render(
  <Example/>,
  document.getElementById('container')
);
