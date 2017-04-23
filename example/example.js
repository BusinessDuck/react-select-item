var React = require('react')
var ReactDom = require('react-dom');
var SelectBox = React.createFactory(require('../src/select-item'))

var container = document.createElement('div')
var div = React.createElement.bind(null, 'div')
var option = React.createElement.bind(null, 'option')
var h1 = React.createElement.bind(null, 'h1')

var Example = React.createFactory(React.createClass({
	displayName: 'Example',
	getInitialState: function () {
		return {
			color: null,
			searchColor: null,
			colors: [],
			searchColors: []
		}
	},
	handleChange: function (color) {
		this.setState({color: color})
	},
	handleMultiChange: function (colors) {
		this.setState({colors: colors})
	},
	handleSingleSearchChange: function (color) {
		this.setState({searchColor: color})
	},
	handleMultiSearchChange: function (colors) {
		this.setState({searchColors: colors})
	},
	render: function () {
		return (
			div({className: "example"},
				h1(null, "Select Item Example"),
				SelectBox(
					{
						label: "Favorite Color",
						className: 'my-example-select-box',
						onChange: this.handleChange,
						value: this.state.color
					},
					option({key: 'red', value: 'red'}, 'Red'),
					option({value: 'green'}, 'Green'),
					option({value: 'blue'}, 'Blue'),
					option({value: 'black'}, 'Black'),
					option({value: 'orange'}, 'Orange'),
					option({value: 'greenish'}, 'Light greenish with a little bit of yellow')
				),
				h1(null, "Search Example"),
				SelectBox(
					{
						label: "Favorite Color",
						className: 'my-example-select-box',
						onChange: this.handleSingleSearchChange,
						value: this.state.searchColor,
						noItemsText: "No items found",
						filterFn: function (text, item) {
							return item.label.indexOf(text) !== -1
						},
					},
					option({key: 'red', value: 'red'}, 'Red'),
					option({value: 'green'}, 'Green'),
					option({value: 'blue'}, 'Blue'),
					option({value: 'black'}, 'Black'),
					option({value: 'orange'}, 'Orange'),
					option({value: 'greenish'}, 'Light greenish with a little bit of yellow')
				),
				h1(null, "Multi Select Example"),
				SelectBox(
					{
						label: "Favorite Colors",
						onChange: this.handleMultiChange,
						value: this.state.colors,
						multiple: true
					},
					option({value: 'red'}, 'Red'),
					option({value: 'green'}, 'Green'),
					option({value: 'blue'}, 'Blue'),
					option({value: 'black'}, 'Black'),
					option({value: 'orange'}, 'Orange'),
					option({value: 'greenish'}, 'Light greenish with a little bit of yellow')
				),
				h1(null, "Search Multiple Example"),
				SelectBox(
					{
						label: "Favorite Colors",
						onChange: this.handleMultiSearchChange,
						value: this.state.searchColors,
						multiple: true,
						noItemsText: "No items found",
						filterFn: function (text, item) {
							return item.label.indexOf(text) !== -1
						},

					},
					option({value: 'red'}, 'Red'),
					option({value: 'green'}, 'Green'),
					option({value: 'blue'}, 'Blue'),
					option({value: 'black'}, 'Black'),
					option({value: 'orange'}, 'Orange'),
					option({value: 'greenish'}, 'Light greenish with a little bit of yellow')
				)
			))
	}
}))

document.body.appendChild(container)
ReactDom.render(Example(null), container)
