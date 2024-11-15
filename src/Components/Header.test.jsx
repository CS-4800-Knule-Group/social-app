import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";


describe("Testing Header.jsx", () =>{
    test("Renders Profile Text", () =>{
        render(<BrowserRouter><Header/></BrowserRouter>)
        expect(screen.getByText("Profile")).toBeDefined();
    })

    test("Renders Feed Text", () =>{
        render(<BrowserRouter><Header/></BrowserRouter>)
        expect(screen.getByText("Feed")).toBeDefined();
    })

    test("Renders Explore Text", () =>{
        render(<BrowserRouter><Header/></BrowserRouter>)
        expect(screen.getByText("Explore")).toBeDefined();
    })

    test("Renders Register Text", () =>{
        render(<BrowserRouter><Header/></BrowserRouter>)
        expect(screen.getByText("Register")).toBeDefined();
    })
    
    test("Renders Data Text", () =>{
        render(<BrowserRouter><Header/></BrowserRouter>)
        expect(screen.getByText("Data")).toBeDefined();
    })

    test("Renders Logo Image", () => {
        render(<BrowserRouter><Header/></BrowserRouter>)
        const logoImage = screen.getByAltText("Knule Logo");
        expect(logoImage).toHaveAttribute('src', '/Knule-Logo-White.png');
    })
})