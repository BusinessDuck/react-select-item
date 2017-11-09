import * as React from "react";
import ReactDOM from "react-dom";
import {Select} from "./dist/react-select-item.js";
import "./dist/styles.css";
import "./example.css";
import {Select} from "../src/components/Select";

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
                name: "Orange",
                value: "orange",
            },
        ];

        const select1Props = {
            className: "my-example-select-box",
            closeOnChange: true,
            onChange: this.handleChange,
            open: this.state.open,
            options: optionsList,
            placeholder: "Favorite Color",
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
            options: optionsList,
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
                <h1>Select Item Examples</h1>
                <hr/>
                <h2>Basic</h2>
                <Select {...select1Props}/>
                <h2>Basic with search</h2>
                <Select {...select2Props}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Example/>,
    document.getElementById("container"),
);
