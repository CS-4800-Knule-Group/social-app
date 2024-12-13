import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import CopyrightFooter from './CopyrightFooter';

describe("Testing CopyrightFooter.jsx", () =>{
    test("Renders Data Text", () =>{
        render(<BrowserRouter><CopyrightFooter/></BrowserRouter>)
        expect(screen.getByText("Data")).toBeDefined();
    })

    test("Renders Jobs Text", () =>{
        render(<BrowserRouter><CopyrightFooter/></BrowserRouter>)
        expect(screen.getByText("Jobs")).toBeDefined();
    })

    test("Renders Contact Text", () =>{
        render(<BrowserRouter><CopyrightFooter/></BrowserRouter>)
        expect(screen.getByText("Contact")).toBeDefined();
    })

    test("Renders Copyright Text", () =>{
        render(<BrowserRouter><CopyrightFooter/></BrowserRouter>)
        expect(screen.getByText("© 2024 Knule from Knule Group")).toBeDefined();
    })
})