import { fireEvent, render } from "@testing-library/react";
import { Goal } from "../../models/goal";
import { NewGoal } from "./new";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("new", () => {
  it("should have the correct title content", async () => {
    const component = render(<NewGoal></NewGoal>);

    const title = await component.findByRole("heading");
    expect(title.textContent).toEqual("Track a new goal");
  });
  it("should store a new numerical goal on save", async () => {
    localStorage.setItem("goals", "[]");
    const component = render(<NewGoal></NewGoal>);
    const descriptionInput = await component.findByTestId("description");
    const submitButton = await component.findByTestId("save");

    fireEvent.change(descriptionInput, { target: { value: "A description" } });
    fireEvent.click(submitButton);

    expect(JSON.parse(localStorage.getItem("goals")!)).toEqual([
      { id: 0, description: "A description", records: [], type: "numerical" },
    ]);
  });
  it("should store a new yes/no goal if selected", async () => {
    localStorage.setItem("goals", "[]");
    const component = render(<NewGoal></NewGoal>);
    const descriptionInput = await component.findByTestId("description");
    const yesNoInput = await component.findByTestId("yes-no");
    const submitButton = await component.findByTestId("save");

    fireEvent.change(descriptionInput, { target: { value: "A description" } });
    fireEvent.click(yesNoInput);
    fireEvent.click(submitButton);

    expect(JSON.parse(localStorage.getItem("goals")!)).toEqual([
      { id: 0, description: "A description", records: [], type: "yes/no" },
    ]);
  });
  it("should store a new numerical goal if selected", async () => {
    localStorage.setItem("goals", "[]");
    const component = render(<NewGoal></NewGoal>);
    const descriptionInput = await component.findByTestId("description");
    const numericalInput = await component.findByTestId("numerical");
    const submitButton = await component.findByTestId("save");

    fireEvent.change(descriptionInput, { target: { value: "A description" } });
    fireEvent.click(numericalInput);
    fireEvent.click(submitButton);

    expect(JSON.parse(localStorage.getItem("goals")!)).toEqual([
      { id: 0, description: "A description", records: [], type: "numerical" },
    ]);
  });
  it("should store a second goal", async () => {
    const goal: Goal = {
      records: [],
      description: "Old goal",
      type: "yes/no",
      id: 0,
    };
    localStorage.setItem("goals", JSON.stringify([goal]));
    const component = render(<NewGoal></NewGoal>);
    const descriptionInput = await component.findByTestId("description");
    const submitButton = await component.findByTestId("save");

    fireEvent.change(descriptionInput, { target: { value: "A description" } });
    fireEvent.click(submitButton);

    expect(JSON.parse(localStorage.getItem("goals")!)).toEqual([
      goal,
      { id: 1, description: "A description", records: [], type: "numerical" },
    ]);
  });
});
