import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import HeaderLogo from "./HeaderLogo"


describe("Testing Header.jsx", () =>{
    test("Renders Profile Text", () =>{
        render(<BrowserRouter><Header/></BrowserRouter>)
        expect(screen.getByText("Profile")).toBeDefined();
    })

    test("Renders Home Text", () =>{
        render(<BrowserRouter><Header/></BrowserRouter>)
        expect(screen.getByTestId("Home")).toBeDefined();
    })

    test("Renders Explore Text", () =>{
        render(<BrowserRouter><Header/></BrowserRouter>)
        expect(screen.getByText("Explore")).toBeDefined();
    })
    
    test("Renders DMs Text", () =>{
        render(<BrowserRouter><Header/></BrowserRouter>)
        expect(screen.getByText("DM's")).toBeDefined();
    })

    test("Renders Logo Image", () => {
        render(<BrowserRouter><HeaderLogo/></BrowserRouter>)
        const logoImage = screen.getByAltText("Knule Logo");
        expect(logoImage).toHaveAttribute('src', '/Knule-Logo-White.png');
    })

    test("Click on home", () => {
        render(<BrowserRouter><Header/></BrowserRouter>)
        screen.debug();
        fireEvent.click(screen.getByTestId('Home'))
        //screen.debug();
        expect(screen.findByText("Home")).toHaveBeenCalledOnce();
    })
})