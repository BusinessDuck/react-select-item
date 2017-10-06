/* global window */
/* tslint:disable */
window.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};
/* tslint:enable */

// setup file
import * as Enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

