import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import FollowerList from "./FollowerList";

const fakeFollowers = [
    { username: "thing1", profilePic: "/kirb.jpg", userID: 1 }
]

describe("Testing Follower List Modal", () => {
    test("Renders Modal", () => {
        render(<FollowerList followers = {(fakeFollowers)}/>)
        expect(screen.getByRole("followBackground")).toBeDefined();
    })

    test("Renders Close Icon", () => {
        render(<FollowerList followers= {(fakeFollowers)} />)
        expect(screen.getByText("X")).toBeDefined();
    })

    test("Renders Profile Pic", () => {
        render(<FollowerList followers= {(fakeFollowers)} />)
        expect(screen.getByRole('follower-profilePic')).toBeDefined();
    })

    test("Renders Username", () => {
        render(<FollowerList followers= {(fakeFollowers)} />)
        expect(screen.getByText("thing1")).toBeDefined();
    })

    test("Generates Link", () => {
        render(<FollowerList followers= {(fakeFollowers)} />)
        expect(screen.getByRole("Link")).toBeDefined();
    })
})