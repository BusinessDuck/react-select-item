import * as React from "react";
import * as ReactDOM from "react-dom";
import { DemoComponent } from "./demo";
import "./styles/main.scss";

/**
 * Render application into a div
 */
export const render = (element) => {

    ReactDOM.render(
        <div className="test">
            <DemoComponent/>
        </div>
        ,
        document.querySelector(element) as HTMLElement,
    );
};
