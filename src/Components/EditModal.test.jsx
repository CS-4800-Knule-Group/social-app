import { fireEvent, render, screen } from "@testing-library/react";
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
        expect(screen.getByText("New PFP")).toBeDefined();
    })

    test("Renders Upload Text", () =>{
        render(<EditModal user={dummyUser}/>)
        expect(screen.getByText("Upload")).toBeDefined();
    })

    test("Renders X Exit", () =>{
        render(<EditModal user={dummyUser}/>)
        expect(screen.getByText("X")).toBeDefined();
    })

    test("Renders Upload Text", () =>{
        render(<EditModal user={dummyUser}/>)
        expect(screen.getByTestId("uploadButton")).toBeDefined();
    })

    test("Can Change Bio", () => {
        render(<EditModal user={dummyUser}/>)
        const bio = screen.getByTestId('bioField');
        fireEvent.change(bio, {target: {value: "NewBio"}})
        expect(screen.getByTestId('bioField').value).toBe("NewBio")
    })

    test("Can Change Username", () => {
        render(<EditModal user={dummyUser}/>)
        const bio = screen.getByTestId('nameField');
        fireEvent.change(bio, {target: {value: "NewName"}})
        expect(screen.getByTestId('nameField').value).toBe("NewName")
    })
})