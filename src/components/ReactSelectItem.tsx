import * as classNames from "classnames/bind";
import * as React from "react";
import {
    ignoreKeyUp,
    keyHandlersMap,
} from "../constants/RSIConstants";
import "./styles.scss";

export namespace RSI {

    export interface IProps {
        label?: string;
        value?: any[];
        onChange: any;
        filterFn: any;
        search: boolean;
        multiple: boolean;
        noItemsText?: string;
        searchPlaceholder?: string;
        className?: string | object;
        clearText?: string;
        children?: React.ComponentElement<any, any>;
    }

    export interface IState {
        id: string;
        open: boolean;
        focusedIndex: number;
        pendingValue: number[];
        searchVisible: boolean;
        searchText: string;
        value: any[];
    }

    export interface IOption {
        disabled?: boolean;
        label: string;
        value: any;
    }

// RSI react-select-item v3
    export class Component extends React.Component<IProps, IState> {


        public static defaultProps: IProps = {
            clearText: "Remove selection",
            filterFn: () => null,
            multiple: false,
            onChange: () => null,
            search: true,
            searchPlaceholder: "Search...",
        };

        public state: IState = {
            focusedIndex: -1,
            id: "RSI",
            open: false,
            pendingValue: [],
            searchText: "",
            searchVisible: false,
            value: [],
        };

        public buttonRef: React.DOMElement<any, any>;
        public menuRef: React.DOMElement<any, any>;

        private keyActions: any = {
            handleDownKey: (event) => {
                this.interceptEvent(event);
                if (!this.state.open) {
                    // this.handleOpen(event);
                }
            },
            handleEnterKey: (event) => {
                if (this.state.focusedIndex !== -1) {
                    // this.handleChange(this.options()[ this.state.focusedIndex ].value)(event);
                }
            },
            handleEscKey: (event) => {
                if (this.state.open) {
                    // this.handleClose(event);
                } else {
                    // this.handleClear(event);
                }
            },
            handleSpaceKey: (event) => {
                if (this.props.search) {
                    return;
                }
                this.interceptEvent(event);
                if (!this.state.open) {
                    // this.handleOpen(event);
                } else if (this.state.focusedIndex !== -1) {
                    this.keyActions.handleEnterKey();
                }
            },
            handleUpKey: (event) => {
                this.interceptEvent(event);
            },
        };

        constructor(props) {
            super(props);
        }

        public render() {
            const className = classNames([
                "react-select-item-container",
                this.props.className,
                {
                    "react-select-item-empty": !this.hasValue(),
                },
            ]);
            return (
            <div onKeyDown={this.handleKeyDown} className={className}>
                {this.renderButton()}
                {this.renderOptionMenu()}
            </div>
            );
        }

        /**
         * Prevent default behaviour of the event
         * @param event
         */
        private interceptEvent(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
        }

        private isSelected(value) {
            return this.state.value.includes(value);
        }

        private getCurrentValue() {
            if (!this.props.multiple) {
                return this.state.value[0];
            }

            return this.state.value;
        }

        private getOptionsList() {
            const options: IOption[] = [];
            React.Children.forEach(this.props.children, (option: any) => {
                options.push({
                    disabled: !!option.props.disabled,
                    label: option.props.children,
                    value: option.props.value,
                });
            });

            if (this.props.search && this.state.searchText.length > 0) {
                return options.filter((item) => {
                    return this.props.filterFn(this.state.searchText, item);
                });
            }

            return options;
        }

        private handleButtonClick = () => {
            this.toggleOpenListState(!this.state.open);
        }

        private handleChange = (value) => {
            const resultValues: any[] = this.props.multiple ? this.state.value.slice() : [];
            if (resultValues.includes(value)) {
                resultValues.splice(resultValues.indexOf(value), 1);
            } else {
                resultValues.push(value);
            }
            this.setState({ value: resultValues });
            setTimeout(() => this.props.onChange(resultValues), 0);
        }

        private handleClear = () => {
            this.setState({value: []});
            setTimeout(() => this.props.onChange([]), 0);
        }

        private handleClickOutside = (event) => {
            const { menuRef, buttonRef } = this;
            if ((!menuRef || ! buttonRef) || buttonRef.contains(event.target) || menuRef.contains(event.target)) {
                return false;
            }
            this.toggleOpenListState(false);
        }

        private toggleOpenListState = (forceValue = this.state.open) => {
            if (forceValue) {
                document.addEventListener("mousedown", this.handleClickOutside);
            }
            this.setState({open: forceValue}, () => {
                if (!this.state.open) {
                    document.removeEventListener("mousedown", this.handleClickOutside);
                }
            });
        }

        private renderLabel() {
            const selected = this.getOptionsList().filter((option) =>
                this.isSelected(option.value)).map((option) => {
                return option.label;
            });

            return selected.length > 0 ? selected.join(", ") : this.props.label;
        }

        private renderButton() {
            const buttonProps: React.DetailedHTMLProps<any, any> = {
                "aria-hidden": true,
                "className": "react-select-item",
                "id": this.state.id,
                // "onBlur": this.handleBlur,
                "onClick": this.handleButtonClick,
                "ref": (ref) => this.buttonRef = ref,
                "tabIndex": "0",
            };

            return (
                <div { ...buttonProps }>
                    <div className="react-select-item-label">
                        {this.renderLabel()}
                    </div>
                    {this.renderClearButton()}
                </div>
            );
        }

        private renderSearchInput() {
            const inputProps: React.DetailedHTMLProps<any, any> = {
                "aria-hidden": true,
                "className": "react-select-item-options-search",
                "onChange": (e) => {
                    this.setState({
                        searchText: e.currentTarget.value,
                    });
                },
                "placeholder": this.props.searchPlaceholder,
                "tabIndex": "0",
                "type": "text",
                "value": this.state.searchText,
            };
            return <input {...inputProps}/>;
        }

        private renderOptionMenu() {
            const className = classNames(["react-select-item-options", {
                "react-select-item-hidden": !this.state.open,
            }]);
            const selectOptions = this.getOptionsList();

            const divProps = {
                "aria-hidden": true,
                "className": className,
                // "onBlur": this.handleBlur,
                // "onFocus": this.handleFocus,
                "ref": (ref) => this.menuRef = ref,
                "tabIndex": 0,
            };

            return (
                <div {...divProps}>
                    {this.props.search ? this.renderSearchInput() : null}
                    <div className={"react-select-item-off-screen" + (selectOptions.length === 0 ? " no-items" : "")}>
                        {selectOptions.length > 0 ? selectOptions.map(this.renderOption) : this.props.noItemsText}
                    </div>
                </div>

            );
        }

        private renderOption = (option, i) => {
            const className = classNames([
                "react-select-item-option",
                {
                    "react-select-item-option-disabled": option.disabled,
                    "react-select-item-option-selected": this.isSelected(option.value),
                },
            ]);
            const aProps: React.DetailedHTMLProps<any, any> = {
                className,
                // onBlur: this.handleBlur,
                onClick: (e) => option.disabled ? this.interceptEvent(e) : this.handleChange(option.value),
                // onFocus: this.handleFocus,
                // onMouseDown: this.handleMouseDown,
                tabIndex: -1,
            };

            return <a key={i} {...aProps}>{option.label}</a>;
        }

        private renderClearButton() {
            if (this.hasValue()) {
                const brnProps: React.DetailedHTMLProps<any, any> = {
                    "aria-label": this.props.clearText,
                    "className": "react-select-item-clear",
                    "onClick": this.handleClear,
                };
                return <button {...brnProps}/>;
            }
        }

        private handleKeyDown = (event) => {
            if (this.props.search && ignoreKeyUp.indexOf(event.which) === -1) {
                return;
            }
            if (keyHandlersMap[ event.which ]) {
                this.keyActions[ keyHandlersMap[ event.which ] ](event);
            }
        }

        private hasValue() {
            return this.state.value.length > 0;
        }
    }

}
