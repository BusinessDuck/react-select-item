import * as React from "react";
import * as ReactDOM from "react-dom";
import { RSI } from "./components/ReactSelectItem";
import "./styles/main.scss";

/**
 * Render application into a div
 */
export const render = (element) => {
    const handleChange = (color) => {
        console.log(color);
    };

    const childrens = [
        { value: "red", name: "Red", disabled: true },
        { value: "orange", name: "Orange" },
        { value: "green", name: "Green" },
        { value: "black", name: "Black" },
        { value: "yellow", name: "Yellow" },
        { value: "purple", name: "Purple" },
        { value: "greenish", name: "Light greenish with a little bit of yellow" },
    ];

    const RSIProps: React.DetailedHTMLProps<any, any> = {
        className: "my-example-select-box",
        label: "Favorite Color",
        multiple: true,
        search: true,
        noItemsText: "No items found",
        onChange: handleChange,
        // value: this.state.searchColor,
        filterFn(text, item) {
            return item.label.indexOf(text) !== -1;
        },
    };

    ReactDOM.render(
        <div className="test">
            <RSI.Component {...RSIProps}>
                { childrens.map(
                    (item, index) => <option key={index} value={item.value}>{item.name}</option>,
                )}
            </RSI.Component>
        </div>
        ,
        document.querySelector(element) as HTMLElement,
    );
};
