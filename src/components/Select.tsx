import * as classNames from "classnames/bind";
import * as React from "react";
import {Label} from "./Label";
import {Option} from "./Option";

import "./styles.scss";

export interface IProps {
    LabelComponent: any;
    OptionComponent: any;
    closeOnChange?: boolean;
    getOptionProps?: (option: any) => {};
    getLabelProps?: (option: any) => {};
    getLabelElementProps?: (option: any) => {};
    getOptionId?: (value) => (string | number);
    placeholder?: string;
    value?: any[];
    options: any[];
    onChange: any;
    onSearch: any;
    highlightTextGetter: any;
    highlightTextSetter: any;
    search: boolean;
    multiple: boolean;
    searchEmptyPlaceholder?: string;
    searchPlaceholder?: string;
    className?: string | object;
    open?: boolean;
    customLabelsRender?: any;
}

export interface IState {
    open: boolean;
    searchText: string;
    search: boolean;
    value: any[];
}

// RSI react-select-item v3
export class Select extends React.Component<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        LabelComponent: Label,
        OptionComponent: Option,
        getOptionId: (value) => {
            if (typeof value === "object" && typeof value.id !== "undefined") {
                return value.id;
            }

            return value;
        },
        highlightTextGetter: (item) => {
            return item.name;
        },
        highlightTextSetter: (item, searchText, result) => {
            return (
                <span>
                     {result.map((value) => value)}
                </span>
            );
        },
        multiple: false,
        onChange: () => null,
        onSearch: (phrase, option) => {
            return option.name.indexOf(phrase) !== -1;
        },
        placeholder: "Select items",
        search: false,
        searchEmptyPlaceholder: "No items found",
        searchPlaceholder: "Search...",
    };

    public state: IState = {
        open: false,
        search: false,
        searchText: "",
        value: [],
    };

    public buttonRef: HTMLInputElement;

    public menuRef: HTMLInputElement;
    private listenerActive: boolean = false;

    /**
     * RSI constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state.value = props.value;
        this.state.open = props.open;
    }

    /**
     * Events after update
     */
    public componentDidUpdate() {
        if (this.buttonRef && this.buttonRef.classList.contains("react-select-item-search")) {
            this.buttonRef.focus();
        }
    }

    /**
     * Update state open statement and value statement if new props is coming up
     * @param {Readonly<P>} nextProps
     */
    public componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open || this.state.open,
            search: false,
            searchText: nextProps.searchText || this.state.searchText,
            value: nextProps.value,
        });
    }

    public renderNoSearchResults(): any {
        const {searchEmptyPlaceholder} = this.props;
        return <div className="select-item-no-results">{searchEmptyPlaceholder}</div>;
    }

    /**
     * Public render function component
     * @returns {any}
     */
    public render() {
        const className = classNames([
            "react-select-item-container",
            this.props.className,
            {
                "react-select-item-empty": !this.hasValue(),
            },
        ]);
        return (
            <div className={className}>
                {this.state.search ? this.renderSearchInput() : this.renderButton()}
                {this.renderOptionMenu()}
            </div>
        );
    }

    /**
     * Check value is selected, mean value should be in this.state.value array
     * @param value
     * @returns {any}
     */
    private isSelected(value): boolean {
        const {getOptionId} = this.props;
        return this.state.value.findIndex((currentValue) => getOptionId(currentValue) === getOptionId(value)) !== -1;
    }

    /**
     * Handle click on main button RSI
     */
    private handleButtonClick = (e) => {
        if (!e || !e.target.classList.contains("react-select-item-clear")) {
            if (this.props.search) {
                this.setState({search: true});
                this.toggleOpenListState(true);
            } else {
                this.toggleOpenListState(!this.state.open);
            }
        }
    }

    /**
     * Handle change value, onChange is called async (wrapped in zero timeout)
     * @param value
     */
    private handleChange = (value) => {
        const {getOptionId} = this.props;
        const resultValues: any[] = this.props.multiple ? this.state.value.slice() : [];
        const targetValueIndex = resultValues.findIndex((optionValue) => {
            return getOptionId(value) === getOptionId(optionValue);
        });
        if (targetValueIndex !== -1) {
            resultValues.splice(targetValueIndex, 1);
        } else {
            resultValues.push(value);
        }
        this.setState({value: resultValues, search: false});
        if (this.props.closeOnChange) {
            this.toggleOpenListState(false);
        }
        setTimeout(() => this.props.onChange(resultValues), 0);
    }

    /**
     * Clear selected values
     */
    private handleClear = () => {
        this.setState({value: []});
        setTimeout(() => this.props.onChange([]), 0);
    }

    /**
     * Track the outside of selector clicks and call close if click was outside of
     * @param event
     * @returns {boolean}
     */
    private handleClickOutside = (event) => {
        const {menuRef, buttonRef} = this;
        if ((!menuRef || !buttonRef) || buttonRef.contains(event.target) || menuRef.contains(event.target)) {
            return false;
        }
        this.setState({search: false});
        this.toggleOpenListState(false);
    }

    /**
     * Toogle open/close menu state with force value if needed
     * @param {boolean} forceValue
     */
    private toggleOpenListState = (forceValue = this.state.open) => {
        if (forceValue) {
            if (!this.listenerActive) {
                document.addEventListener("mousedown", this.handleClickOutside);
                this.listenerActive = true;
            }
            this.setState({searchText: ""});
        }
        this.setState({open: forceValue}, () => {
            if (!this.state.open) {
                document.removeEventListener("mousedown", this.handleClickOutside);
                this.listenerActive = false;
            }
        });
    }

    /**
     * Private render main button RSI
     * @returns {any}
     */
    private renderButton() {
        const buttonProps: React.DetailedHTMLProps<any, any> = {
            "aria-hidden": true,
            "className": "react-select-item",
            // "onBlur": this.handleBlur,
            "onClick": this.handleButtonClick,
            "ref": (ref) => this.buttonRef = ref,
            "tabIndex": "0",
        };
        const {LabelComponent, options, getLabelProps, placeholder, getLabelElementProps} = this.props;
        const labelProps: React.DetailedHTMLProps<any, any> = {
            getLabelElementProps,
            getLabelProps,
            placeholder,
            selectedOptions: options.filter((option: any) => this.isSelected(option.value)),
        };

        return (
            <div {...buttonProps}>
                {this.state.search ? this.renderSearchInput() : <LabelComponent {...labelProps}/>}
                {this.renderClearButton()}
            </div>
        );
    }

    /**
     * Render search input field inside of items menu
     * @returns {any}
     */
    private renderSearchInput() {
        const inputProps: React.DetailedHTMLProps<any, any> = {
            "aria-hidden": true,
            "className": "react-select-item-search",
            "onChange": (e) => {
                this.setState({
                    searchText: e.currentTarget.value,
                });
            },
            "placeholder": this.props.searchPlaceholder,
            "ref": (ref) => this.buttonRef = ref,
            "tabIndex": "0",
            "type": "text",
            "value": this.state.searchText,
        };
        return (
            <div>
                <input {...inputProps}/>
            </div>
        );
    }

    /**
     * Render items menu
     * @returns {any}
     */
    private renderOptionMenu() {
        const {search, onSearch} = this.props;
        const className = classNames(["react-select-item-options", {
            "react-select-item-hidden": !this.state.open,
        }]);
        let selectOptions: any[] = this.props.options.map((option) => ({...option}));

        if (search && this.state.searchText.length > 0) {
            selectOptions = selectOptions.filter((option) => {
                return onSearch(this.state.searchText, option);
            });
            const {highlightTextGetter, highlightTextSetter} = this.props;
            selectOptions = this.highlightSearchText(selectOptions, highlightTextGetter, highlightTextSetter);
        }

        const divProps = {
            "aria-hidden": true,
            "className": className,
            "ref": (ref) => this.menuRef = ref,
            "tabIndex": 0,
        };

        return (
            <div {...divProps}>
                {selectOptions.length > 0 ? selectOptions.map(this.renderOption) : this.renderNoSearchResults()}
            </div>

        );
    }

    /**
     * Render single option in items menu
     * @param option
     * @param i
     * @returns {any}
     */
    private renderOption = (option, i) => {
        const {getOptionProps, OptionComponent} = this.props;
        const optionProps: React.DetailedHTMLProps<any, any> = {
            getOptionProps,
            onClick: this.handleChange,
            option,
            selected: this.isSelected(option.value),
        };

        return <OptionComponent key={i} {...optionProps}/>;
    }

    /**
     * Draw the clear selected items button
     * @returns {any}
     */
    private renderClearButton() {
        if (this.hasValue()) {
            const brnProps: React.DetailedHTMLProps<any, any> = {
                className: "react-select-item-clear",
                onClick: this.handleClear,
            };
            return <button {...brnProps}/>;
        }
    }

    /**
     * Checking for some is selected
     * @returns {boolean}
     */
    private hasValue() {
        return this.state.value.length > 0;
    }

    /**
     * Highlight the search text putted in search input
     * @param {any[]} selectOptions
     * @returns {any[]}
     */
    private highlightSearchText(selectOptions: any[], textGetter: any, textSetter: any) {

        const highlight = (value, key) => <span key={key} className="highlighter">{value}</span>;

        return selectOptions.map((item) => {
            const reg = new RegExp(this.state.searchText, "gi");
            const matcher = textGetter(item).match(reg); // 0 - match index - pos
            if (matcher && matcher[0]) {
                const split = textGetter(item).split(matcher[0]);
                const resultArray = split.reduce((result, submatch, currentIndex) => {
                    if (submatch === "" && split[currentIndex - 1] !== submatch && currentIndex !== split.length - 1) {
                        result.push(highlight(matcher[0], currentIndex));
                    } else {
                        result.push(submatch);
                        if (currentIndex !== split.length - 1) {
                            result.push(highlight(matcher[0], currentIndex));
                        }
                    }
                    return result;
                }, []);
                item.name = textSetter(item, this.state.searchText, resultArray);
            }
            return item;
        });
    }
}
