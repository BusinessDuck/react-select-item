import * as classNames from "classnames/bind";
import * as React from "react";

export interface IButtonProps {
    getOptionProps: (option: any) => {};
    onClick: (value: any) => void;
    selected: boolean;
    option: any;
}

// RSI react-select-item v3
export class Button extends React.Component<IButtonProps, {}> {

    public static defaultProps = {
        getOptionProps: () => ({}),
    };
}