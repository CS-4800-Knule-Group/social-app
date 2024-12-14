import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import FollowButton from "./FollowButton";

const testFxn = vi.fn();
const onFollow = () =>{
    followState = !followState;
}
let followState = false;
describe("FollowButton.jsx", ()=>{

    test("Renders", () =>{
        render(<FollowButton onFollow={testFxn} followed={followState}/>)
        expect(screen.getByText("Follow")).toBeDefined();
    })

    test("Click followClick", () => {
        render(<FollowButton onFollow={testFxn} followed={followState}/>)
        fireEvent.click(screen.getByTestId("followClick"))
        expect(testFxn).toHaveBeenCalledOnce();
    })

    test("Click Changes State", () => {
        render(<FollowButton onFollow={onFollow} followed={followState}/>)
        fireEvent.click(screen.getByTestId("followClick"))
        expect(screen.getByText("Follow")).toBeDefined();
    })
})