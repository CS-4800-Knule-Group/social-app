import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Comment from "./Comment";

const dummyComment = {
    commentId: "EGeHOSTGWw",
    content: "same",
    createdAt: "December 13, 2024 at 12:14 PM",
    postId: "mmyW3QGY6z",
    userId: "4rAX6RNv"
}

const deleteComment = vi.fn();

const mockedNavigator = vi.fn();

vi.mock("react-router-dom", () => ({
    useNavigate: () => mockedNavigator,
  }));

describe("Testing Comment.jsx", () => {
    test("Render with input", () => {
        
        render(<Comment comment={dummyComment} deleteComment={deleteComment}/>)
        expect(screen.getByText("same")).toBeDefined();
    })

    test("Test 'delete-comment' click", () =>{
        render(<Comment comment={dummyComment} deleteComment={deleteComment}/>)
        fireEvent.click(screen.getByTestId('delete-Comment'))
        expect(deleteComment).toHaveBeenCalledOnce();
    })

    test("Test 'comment-username' click", () =>{
        render(<Comment comment={dummyComment} deleteComment={deleteComment}/>)
        fireEvent.click(screen.getByTestId('comment-username'))
        expect(deleteComment).toHaveBeenCalledOnce();
    })
    
})