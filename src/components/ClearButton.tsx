import * as classNames from "classnames/bind";
import * as React from "react";

export interface ICButtonProps {
    getOptionProps: (option: any) => {};
    onClick: (value: any) => void;
    selected: boolean;
    option: any;
}

// RSI react-select-item v3
export class ClearButton extends React.Component<ICButtonProps, {}> {

    public static defaultProps = {
        getOptionProps: () => ({}),
    };
}