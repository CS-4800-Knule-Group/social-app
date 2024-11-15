import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import EditModal from "./EditModal";

const dummyUser = {
    bio: "Test bio for Valorant Players",
    fullName: "Test Valorant Professional"
  };

describe("Testing EditModal.jsx", () =>{
    test("Renders Upload Text", () =>{
        render(<EditModal user={dummyUser}/>)
        expect(screen.getByText("Upload")).toBeDefined();
    })

    test("Renders New Username Text", () =>{
        render(<EditModal user={dummyUser}/>)
        expect(screen.getByText("New Username")).toBeDefined();
    })

    test("Renders New Bio Text", () =>{
        render(<EditModal user={dummyUser}/>)
        expect(screen.getByText("New Bio")).toBeDefined();
    })

    test("Renders New Banner Text", () =>{
        render(<EditModal user={dummyUser}/>)
        expect(screen.getByText("New Banner")).toBeDefined();
    })
    
    test("Renders New PFP Text", () =>{
        render(<EditModal user={dummyUser}/>)
        expect(screen.getByText("New Pfp")).toBeDefined();
    })

    test("Renders React File Upload Text", () =>{
        render(<EditModal user={dummyUser}/>)
        expect(screen.getByText("React File Upload")).toBeDefined();
    })
})