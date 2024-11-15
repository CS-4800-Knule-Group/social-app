import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { image } from "../../node_modules/@aws-amplify/ui/dist/types/theme/tokens/components/image";
import FollowingList from "./FollowingList";

const testPFP = new image(100, 100);

const fakeFollowing = [
    { username: thing2, profilePic: testPFP, userID: 2 }


]

describe("Testing Following List Modal", () => {
    test("Renders Modal", () => {
        render(<FollowingList followers={fakeFollowing} />)
        expect(screen.getByRole("login-form")).toBeDefined();
    })

    test("Renders Close Icon", () => {
        render(<FollowingList followers={fakeFollowing} />)
        expect(screen.getByText("X")).toBeDefined();
    })

    test("Icon Closes Modal", () => {
        render(<FollowingList followers={fakeFollowing} />)
        userEvent.click(screen.getByText("X"));
        expect(screen.getByRole("login-form")).toBeUndefined
    })

    test("Renders Profile Pic", () => {
        render(<FollowingList followers={fakeFollowing} />)
        expect(screen.getByRole('following-profilePic')).toBeDefined();
    })

    test("Renders Username", () => {
        render(<FollowingList followers={fakeFollowing} />)
        expect(screen.getByText("thing1")).toBeDefined();
    })

    test("Generates Link", () => {
        render(<FollowingList followers={fakeFollowing} />)
        expect(screen.getByRole("Link")).toBeDefined();
    })
})