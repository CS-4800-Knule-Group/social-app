import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
//import { image } from "../../node_modules/@aws-amplify/ui/dist/types/theme/tokens/components/image";
import FollowingList from "./FollowingList";


const fakeFollowing = [
    { username: "thing2", userID: 2 }
]

const onClose = vi.fn();

const mockedNavigator = vi.fn();

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockedNavigator,
  }));

describe("Testing Following List Modal", () => {
    test("Renders Modal", () => {
        render(<FollowingList following={fakeFollowing} />)
        expect(screen.getByTestId("window")).toBeDefined();
    })

    test("Renders Close Icon", () => {
        render(<FollowingList following={fakeFollowing} />)
        expect(screen.getByText("X")).toBeDefined();
    })

    test("Icon Closes Modal without function", () => {
        render(<FollowingList following={fakeFollowing} />)
        fireEvent.click(screen.getByText("X"));
        expect(screen.getByTestId("Window")).toBeUndefined
    })

    test("Renders Profile Pic", () => {
        render(<FollowingList following={fakeFollowing} />)
        expect(screen.getByTestId('following-profilePic')).toBeDefined();
    })

    test("Renders Username", () => {
        render(<FollowingList following={fakeFollowing} />)
        expect(screen.getByText("thing2")).toBeDefined();
    })

    test("Generates Link", () => {
        render(<FollowingList following={fakeFollowing} />)
        expect(screen.getByTestId("openPage")).toBeDefined();
    })
    test("Check onClose click", () => {
        render(<FollowingList following={fakeFollowing} onClose={onClose}/>)
        fireEvent.click(screen.getByTestId("closeBtn"))
        expect(onClose).toHaveBeenCalledOnce();
    })
})