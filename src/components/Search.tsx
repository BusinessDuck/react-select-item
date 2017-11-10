import * as classNames from "classnames/bind";
import * as React from "react";

export interface ISearchProps {
    getOptionProps: (option: any) => {};
    onClick: (value: any) => void;
    selected: boolean;
    option: any;
}

// RSI react-select-item v3
export class Search extends React.Component<ISearchProps, {}> {
    //todo will be implemented later
    public static defaultProps = {
        getOptionProps: () => ({}),
    };
}