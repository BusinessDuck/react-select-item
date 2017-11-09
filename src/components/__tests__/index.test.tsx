import {shallow} from "enzyme";
import * as React from "react";
import {Select as SelectItem} from "../Select";

// it("Increment change after click", () => {
//     // Render a checkbox with placeholder in the document
//     const target = shallow(
//         <HelloWorld/>
//     );
//     const button  = target.find("button");
//     const counter = target.find("span.badge");
//
//     expect(button).toBeDefined();
//     expect(button.children().first().text()).toEqual("Message increment");
//     expect(counter.text()).toEqual("0");
//     button.simulate("click");
//     expect(target.find("span.badge").text()).toEqual("1");
// });


describe("SelectItem component", function() {

    const testOptions = [
        {value: "red", name: "Red"},
        {value: "green", name: "Green"},
        {value: "blue", name: "Blue"},
    ];
    const defaultProps: React.DetailedHTMLProps<any, any> = {
        label: "foo",
        value: [],
        onChange() {
        },
    };

    beforeEach(() => {
        this.shallow = shallow(
            <SelectItem {...defaultProps}>
                {testOptions.map((item: any, index: number) => (
                        <option key={index} value={item}>{item.name}</option>
                    ),
                )}
            </SelectItem>,
        );
        this.target = this.shallow.find("div.react-select-item");
    });

    it("Initialization test", () => {
        expect(this.target).toBeDefined();
        expect(this.target.length).toBe(1);
    });

    it("should render the placeholder when no value is selected", () => {
        const label = this.shallow.find("div.react-select-item-placeholder");
        expect(label).toBeDefined();
        expect(label.text()).toEqual(defaultProps.label);
    });

    it("should render the menu node with options", () => {
        const optionsNode = this.shallow.find("div.react-select-item-off-screen");
        expect(optionsNode).toBeDefined();
        expect(optionsNode.length).toBe(1);
        expect(optionsNode.children().length).toEqual(testOptions.length);
    });

    it("should open menu on button click event", () => {
        let menuNode = this.shallow.find("div.react-select-item-options");

        expect(menuNode).toBeDefined();
        expect(menuNode.hasClass("react-select-item-hidden")).toBeTruthy();
        this.target.simulate("click");

        menuNode = this.shallow.find("div.react-select-item-options");
        let optionsNode = this.shallow.find("div.react-select-item-off-screen");

        expect(menuNode.hasClass("react-select-item-hidden")).toBeFalsy();
        optionsNode.find("a").first().simulate("click", "red");

        optionsNode = this.shallow.find("div.react-select-item-off-screen");

        expect(optionsNode.find("a").first().hasClass("react-select-item-option-selected")).toBeTruthy();
        this.target.simulate("click");

        menuNode = this.shallow.find("div.react-select-item-options");

        expect(menuNode.hasClass("react-select-item-hidden")).toBeTruthy();

        const label = this.shallow.find(".react-select-item-placeholder");

        expect(label.length).toBe(1);
        expect(label.text()).toEqual(testOptions[0].name);
    });

});
