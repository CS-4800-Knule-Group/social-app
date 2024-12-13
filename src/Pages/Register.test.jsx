import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Register from './Register';

describe("Testing CopyrightFooter.jsx", () =>{
    test("Renders Footer Data Text", () =>{
        render(<BrowserRouter><Register/></BrowserRouter>)
        expect(screen.getByText("Data")).toBeDefined();
    })

    test("Renders Footer Jobs Text", () =>{
        render(<BrowserRouter><Register/></BrowserRouter>)
        expect(screen.getByText("Jobs")).toBeDefined();
    })

    test("Renders Footer Contact Text", () =>{
        render(<BrowserRouter><Register/></BrowserRouter>)
        expect(screen.getByText("Contact")).toBeDefined();
    })

    test("Renders Footer Copyright Text", () =>{
        render(<BrowserRouter><Register/></BrowserRouter>)
        expect(screen.getByText("© 2024 Knule from Knule Group")).toBeDefined();
    })

    test("Renders Title", () =>{
        render(<BrowserRouter><Register/></BrowserRouter>)
        expect(screen.getByText("Create an Account")).toBeDefined();
    })

    test("Renders Subtitle", () =>{
        render(<BrowserRouter><Register/></BrowserRouter>)
        expect(screen.getByText("To get started, we need some information about you.")).toBeDefined();
    })

    test("Renders Return To Login", () =>{
        render(<BrowserRouter><Register/></BrowserRouter>)
        expect(screen.getByText("Already have an account? Log In")).toBeDefined();
    })
})