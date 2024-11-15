import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import LoginForm from "./LoginForm";


describe("Testing LoginForm.jsx", () =>{
    test("Renders", () =>{
        render(<LoginForm/>)
        expect(screen.getByText("Sign In")).toBeDefined();
    })
})