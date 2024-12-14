import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import FollowerList from "./FollowerList";

const fakeFollowers = [
    { username: "thing1", profilePic: "/kirb.jpg", userID: 1 }
]

const onClose = vi.fn();

const mockedNavigator = vi.fn();

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockedNavigator,
  }));

describe("Testing Follower List Modal", () => {
    test("Renders Modal", () => {
        render(<FollowerList followers = {(fakeFollowers)}/>)
        expect(screen.getByTestId("followBackground")).toBeDefined();
    })

    test("Renders Close Icon", () => {
        render(<FollowerList followers= {(fakeFollowers)} />)
        expect(screen.getByText("X")).toBeDefined();
    })

    test("Renders Profile Pic", () => {
        render(<FollowerList followers= {(fakeFollowers)} />)
        expect(screen.getByTestId('follower-profilePic')).toBeDefined();
    })

    test("Renders Username", () => {
        render(<FollowerList followers= {(fakeFollowers)} />)
        expect(screen.getByText("thing1")).toBeDefined();
    })

    test("Generates Link", () => {
        render(<FollowerList followers= {(fakeFollowers)} />)
        expect(screen.getByTestId("Link")).toBeDefined();
    })
    
    test("Check onClose click", () => {
        render(<FollowerList followers={fakeFollowers} onClose={onClose}/>)
        fireEvent.click(screen.getByTestId("closeBtn"))
        expect(onClose).toHaveBeenCalledOnce();
    })
})