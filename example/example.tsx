import * as React from "react";
import ReactDOM from "react-dom";
import { SelectItem } from "./dist/react-select-item.js";
import "./dist/styles.css";
import "./example.css";

class Example extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            color: [],
            colors: [],
            searchColor: [],
            searchColors: [],
        };
    }

    public handleChange = (color) => {
        this.setState({color});
    }

    public handleMultiChange = (colors) => {
        this.setState({colors});
    }

    public handleSingleSearchChange = (color) => {
        this.setState({searchColor: color});
    }

    public handleMultiSearchChange = (colors) => {
        this.setState({searchColors: colors});
    }

    public render() {
        const childrens = [
            {value: "red", name: "Red", disabled: true, creationTs: "20.01.2017 - 16:53:24"},
            {value: "orange", name: "Orange", creationTs: "20.02.2017 - 12:33:04"},
            {value: "green", name: "Green", creationTs: "10.01.2017 - 11:13:14"},
            {value: "black", name: "Black", creationTs: "05.01.2017 - 15:23:01"},
            {value: "yellow", name: "Yellow", creationTs: "04.01.2017 - 22:53:34"},
            {value: "purple", name: "Purple", creationTs: "02.01.2017 - 11:25:51"},
            {
                creationTs: "01.01.2017 - 01:22:10",
                name: "Light greenish with a little bit of yellow",
                value: "greenish",
            },
        ];

        const select1Props = {
            className: "my-example-select-box",
            closeOnChange: true,
            label: "Favorite Color",
            onChange: this.handleChange,
            open: this.state.open,
            value: this.state.color,
        };

        const select2Props = {
            className: "my-example-select-box custom-select-item",
            customLabelsRender: (selected, placeholder) => {
                return selected.length > 0 ? selected[0] : placeholder;
            },
            filterFn: (text, item) => {
                return item.label[0].props.children.join("").toLowerCase().indexOf(text.toLowerCase()) !== -1;
            },
            highlightTextGetter: (item) => {
                return item.label[0].props.children.join("");
            },
            highlightTextSetter: (item, searchText, highlightedText) => {
                return (
                    <span>
                        <span className="option-name"> {highlightedText.map((node: any) => node)}</span>
                        <span className="option-date"> {item.value.creationTs} </span>
                    </span>
                );
            },
            label: "Favorite Color",
            noItemsText: "No items found",
            onChange: this.handleSingleSearchChange,
            optionTransform: (option) => {
                return {
                    creationTs: option.props.creationTs,
                    disabled: !!option.props.disabled,
                    label: option.props.children,
                    value: option.props.value,
                };
            },
            search: true,
            value: this.state.searchColor,
        };

        const select3Props = {
            label: "Favorite Colors",
            multiple: true,
            onChange: this.handleMultiChange,
            value: this.state.colors,
        };

        const select4Props = {
            label: "Favorite Colors",
            multiple: true,
            noItemsText: "No items found",
            onChange: this.handleMultiSearchChange,
            search: true,
            value: this.state.searchColors,
            filterFn(text, item) {
                return item.label.indexOf(text) !== -1;
            },

        };

        return (
            <div className="example">
                <h1>Select Item Example</h1>
                <SelectItem {...select1Props}>
                    {childrens.map((item: any, index) => (
                            <option key={index} value={item} disabled={item.disabled}>{item.name}</option> // tslint:disable-line
                        ),
                    )}
                </SelectItem>

                <h1>Select Search Example</h1>
                <SelectItem {...select2Props}>
                    {childrens.map((item: any, index) => (
                        <option key={index} value={item} disabled={item.disabled}>
                            <span className="option-name"> {item.name}</span>
                            <span className="option-date"> {item.creationTs} </span>
                        </option>
                        ),
                    )}
                </SelectItem>

                <h1>Select Multiple Example</h1>
                <SelectItem {...select3Props}>
                    {childrens.map((item, index) => (
                            <option key={index} value={item as any}>{item.name}</option>
                        ),
                    )}
                </SelectItem>

                <h1>Select Multiple Search Example</h1>
                <SelectItem {...select4Props}>
                    {childrens.map((item, index) => (
                            <option key={index} value={item as any}>{item.name}</option>
                        ),
                    )}
                </SelectItem>
            </div>
        );
    }
}

ReactDOM.render(
    <Example/>,
    document.getElementById("container"),
);
