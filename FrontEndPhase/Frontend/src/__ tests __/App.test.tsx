import { render } from "@testing-library/react"
// import App from "../App"
import React from "react"
import '@testing-library/jest-dom'
// import App from "../App";
import { App } from "../App";

describe("App", () => {

    test("Renders the main page", () => {
        // render(<App />)
        render(<App />);
        expect(true).toBeTruthy()
    })
})