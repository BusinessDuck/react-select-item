import * as React from "react";
import {RSI} from "./components/ReactSelectItem";

export class DemoComponent extends React.Component<{}, {}> {

    constructor(props) {
        super(props);
        this.state = {
            className: "my-example-select-box",
            label: "Favorite Color",
            multiple: true,
            search: true,
            noItemsText: "No items found",
            onChange: this.handleChange,
            value: ["red", "orange"],
            open: true,
            filterFn(text, item) {
                return item.label.indexOf(text) !== -1;
            },
        };
    }

    handleChange = (color) => {
        console.log(color);
    };

    public render() {

        const childrens = [
            {value: "red", name: "Red", disabled: true},
            {value: "orange", name: "Orange"},
            {value: "green", name: "Green"},
            {value: "black", name: "Black"},
            {value: "yellow", name: "Yellow"},
            {value: "purple", name: "Purple"},
            {value: "greenish", name: "Light greenish with a little bit of yellow"},
        ];

        return (
            <div>
                <RSI.Component {...this.state}>
                    {childrens.map(
                        (item, index) => <option key={index} value={item.value}>{item.name}</option>,
                    )}
                </RSI.Component>
            </div>
        );
    }
}