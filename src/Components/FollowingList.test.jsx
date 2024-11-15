import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
//import { image } from "../../node_modules/@aws-amplify/ui/dist/types/theme/tokens/components/image";
import FollowingList from "./FollowingList";


const fakeFollowing = [
    { username: "thing2", userID: 2 }


]

describe("Testing Following List Modal", () => {
    test("Renders Modal", () => {
        render(<FollowingList following={fakeFollowing} />)
        expect(screen.getByRole("login-form")).toBeDefined();
    })

    test("Renders Close Icon", () => {
        render(<FollowingList following={fakeFollowing} />)
        expect(screen.getByText("X")).toBeDefined();
    })

    test("Icon Closes Modal", () => {
        render(<FollowingList following={fakeFollowing} />)
        userEvent.click(screen.getByText("X"));
        expect(screen.getByRole("login-form")).toBeUndefined
    })

    test("Renders Profile Pic", () => {
        render(<FollowingList following={fakeFollowing} />)
        expect(screen.getByRole('following-profilePic')).toBeDefined();
    })

    test("Renders Username", () => {
        render(<FollowingList following={fakeFollowing} />)
        expect(screen.getByText("thing1")).toBeDefined();
    })

    test("Generates Link", () => {
        render(<FollowingList following={fakeFollowing} />)
        expect(screen.getByRole("Link")).toBeDefined();
    })
})