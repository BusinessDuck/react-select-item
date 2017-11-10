import * as React from "react";
import ReactDOM from "react-dom";
import {Select, Option, Label} from "./dist/react-select-item.js";
import "./dist/styles.css";
import "./example.css";

export interface IOptionProps {
    getOptionProps: (option: any) => {};
    onClick: (value: any) => void;
    selected: boolean;
    option: any;
}

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


export interface ILabelProps {
    getLabelProps: (option: any) => {};
    getLabelElementProps: (option: any) => {};
    selectedOptions: any[];
    placeholder: string;
    props: any;
}

class CustomLabel extends Label<ILabelProps, {}> {
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
        return (
            <div {...this.getLabelProps()}>
                {this.renderLabel()}
            </div>
        );
    }

    private renderLabel() {
        const {selectedOptions, getLabelElementProps, placeholder} = this.props;
        if (!selectedOptions.length) {
            return placeholder;
        }
        return selectedOptions.map((option, index) => {
        const elementProps = getLabelElementProps(option);
            return (
                <span key={index}>
                    <span className="option-badge" title={option.value.creationTs || option.creationTs}>
                    {option.name}
                        <span className="option-remove" onClick={() => elementProps.onClickRemove(option)}> X </span>
                    </span>
                </span>
            );
        });
    }
}

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

    public  getOptionId(value) {
        if (typeof value === "object" && typeof value.id !== "undefined") {
            return value.id;
        }

        return value;
    }

    public onClickRemove = ({value}) => {
        const colors = this.state.colors;
        const targetValueIndex = colors.findIndex((optionValue) => {
            return this.getOptionId(value) === this.getOptionId(optionValue);
        });
        if (targetValueIndex !== -1) {
            colors.splice(targetValueIndex, 1);
        }
        this.setState({colors});
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
                creationTs: "20.01.2017 - 16:53:24",
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
            placeholder: "Favorite Color",
            search: true,
            value: this.state.searchColor,
        };

        const select3Props = {
            LabelComponent: CustomLabel,
            OptionComponent: CustomOption,
            getLabelElementProps: () => ({onClickRemove: this.onClickRemove}),
            getLabelProps: () => ({className: "react-select-item-label-custom"}),
            label: "Favorite Colors",
            multiple: true,
            onChange: this.handleMultiChange,
            options: optionsList,
            search: true,
            value: this.state.colors,
        };



        return (
            <div className="example">
                <h1>Select Item Examples</h1>
                <hr/>
                <h2>Basic</h2>
                <Select {...select1Props}/>
                <h2>Basic with search</h2>
                <Select {...select2Props}/>
                <h2>Multiple with search (custom)</h2>
                <Select {...select3Props}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Example/>,
    document.getElementById("container"),
);
