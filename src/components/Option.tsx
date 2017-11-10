import * as classNames from "classnames/bind";
import * as React from "react";

export interface IOptionProps {
    getOptionProps: (option: any) => {};
    onClick: (value: any) => void;
    selected: boolean;
    option: any;
    props: any;
}

// RSI react-select-item v3
export class Option extends React.Component<IOptionProps, {}> {

    public static defaultProps = {
        getOptionProps: () => ({}),
    };

    constructor(props) {
        super(props);
    }

    public render() {
        const {name} = this.props.option;
        return <div {...this.getOptionProps()}>{name}</div>;
    }

    private onClick = () => {
        const {value, disabled} = this.props.option;
        const {onClick} = this.props;
        if (disabled) {
            return null;
        }
        return onClick(value);
    }

    private getOptionProps() {
        const {getOptionProps, selected} = this.props;
        const {value, disabled} = this.props.option;
        const inputProps: React.DetailedHTMLProps<any, any> = getOptionProps(value);
        const className = classNames({
            "react-select-item-option": true,
            "react-select-item-option-disabled": disabled,
            "react-select-item-option-selected": selected,
        });
        const optionProps: React.DetailedHTMLProps<any, any> = {
            ...inputProps,
            className: classNames([className, inputProps.className]),
            onClick: this.onClick,
            tabIndex: -1,
        };

        return optionProps;
    }
}
