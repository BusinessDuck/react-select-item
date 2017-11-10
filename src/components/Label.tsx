import * as classNames from "classnames/bind";
import * as React from "react";

export interface ILabelProps {
    getLabelProps: (option: any) => {};
    getLabelElementProps: (option: any) => {};
    selectedOptions: any[];
    placeholder: string;
    props: any;
}

// RSI react-select-item v3
export class Label extends React.Component<ILabelProps, {}> {

    public static defaultProps = {
        getLabelElementProps: () => ({}),
        getLabelProps: () => ({}),
    };

    /**
     * Public render function for label component, may be extended and replaced
     * @returns {any}
     */
    public render() {
        return (
            <div {...this.getLabelProps()}>
                {this.renderLabel()}
            </div>
        );
    }

    /**
     * Merge input and default props (useful when extended)
     * @returns {React.DetailedHTMLProps<any, any>}
     */
    private getLabelProps() {
        const {getLabelProps, selectedOptions} = this.props;
        const className = classNames({
            "react-select-item-label": true,
        });
        const inputProps: React.DetailedHTMLProps<any, any> = getLabelProps(selectedOptions);
        const labelProps: React.DetailedHTMLProps<any, any> = {
            ...inputProps,
            className: classNames([className, inputProps.className]),
        };

        return labelProps;
    }

    /**
     * Render selected items into button area
     * @returns {string}
     */
    private renderLabel() {
        const {selectedOptions, placeholder, getLabelElementProps} = this.props;
        if (!selectedOptions.length) {
            return placeholder;
        }

        return selectedOptions.map((option, index) => {
            const concatSymbol = index === selectedOptions.length - 1 ? "" : ", ";
            return (
                <span key={index} {...getLabelElementProps(option)}>
                    {option.name + concatSymbol}
                </span>
            );
        });

    }
}
