import * as classNames from "classnames/bind";
import * as React from "react";

import "./styles.scss";

export interface IProps {
    closeOnChange?: boolean;
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
export class Component extends React.Component<IProps, IState> {

    public static defaultProps: Partial<IProps> = {
        highlightTextGetter: (item) => {
            return item.label;
        },
        highlightTextSetter: (item, searchText, result) => {
            return(
                <span>
                     {result.map((value) => value)}
                </span>
            );
        },
        multiple: false,
        onChange: () => null,
        onSearch: () => null,
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
     * Update state open statement and value statement if new props is coming up
     * @param {Readonly<P>} nextProps
     */
    public componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open || this.state.open,
            searchText: nextProps.searchText || this.state.searchText,
            value: nextProps.value,
        });
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

    /**
     * Check value is selected, mean value should be in this.state.value array
     * @param value
     * @returns {any}
     */
    private isSelected({ value }): boolean {
        return this.state.value.includes(value);
    }

    /**
     * Get options array {disabled: ..., placeholder: ... , value: ... } from Reach children
     * @returns {RSI.IOption[]}
     */
    private getOptionsList() {
        return this.props.options;
    }

    /**
     * Handle click on main button RSI
     */
    private handleButtonClick = (e) => {
        if (!e || !e.target.classList.contains("react-select-item-clear")) {
            if (this.state.open) {
                this.setState({search: true});
            } else {
                this.toggleOpenListState(!this.state.open);
            }
        }
    }

    /**
     * Handle change value, onChange is called async (wrapped in zero timeout)
     * @param value
     */
    private handleChange = ({ value }) => {
        const resultValues: any[] = this.props.multiple ? this.state.value.slice() : [];
        if (resultValues.includes(value)) {
            resultValues.splice(resultValues.indexOf(value), 1);
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
     * Render selected items labels, may be replaced by custom render passed in prop customLabelsRender
     * @returns {string}
     */
    private renderLabel() {
        const selected = this.getOptionsList()
            .filter((option: any) => this.isSelected(option.value))
            .map((option: any) => option.label);

        if (this.props.customLabelsRender) {
            return this.props.customLabelsRender(selected, this.props.placeholder);
        }
        return selected.length > 0 ? selected.join(", ") : this.props.placeholder;
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

        return (
            <div {...buttonProps}>
                <div className="react-select-item-label">
                    {this.state.search ? this.renderSearchInput() : this.renderLabel()}
                </div>
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

    /**
     * Render items menu
     * @returns {any}
     */
    private renderOptionMenu() {
        const { searchEmptyPlaceholder, search, onSearch} = this.props;
        const className = classNames(["react-select-item-options", {
            "react-select-item-hidden": !this.state.open,
        }]);
        let selectOptions: any[] = this.getOptionsList();

        if (search && this.state.searchText.length > 0) {
            selectOptions = selectOptions.filter((item) => {
                return onSearch(this.state.searchText, item);
            });
            const { highlightTextGetter, highlightTextSetter } = this.props;
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
                {search ? this.renderSearchInput() : null}
                <div className={"react-select-item-off-screen" + (selectOptions.length === 0 ? " no-items" : "")}>
                    {
                        selectOptions.length > 0 ? selectOptions.map(this.renderOption) : searchEmptyPlaceholder
                    }
                </div>
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
        const className = classNames({
            "react-select-item-option": true,
            "react-select-item-option-disabled": option.disabled,
            "react-select-item-option-selected": this.isSelected(option.value),
        });
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
                item.label = textSetter(item, this.state.searchText, resultArray);
            }
            return item;
        });
    }
}
