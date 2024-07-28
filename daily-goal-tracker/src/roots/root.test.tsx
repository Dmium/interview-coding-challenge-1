import { render } from "@testing-library/react";
import { clearGoals, insertGoal } from "../models/goal";
import { Root } from "./root";

describe("root", () => {
  it("should have the correct title content", async () => {
    const component = render(<Root></Root>);

    const title = await component.findByRole("heading");
    expect(title.textContent).toEqual("Daily Goal Tracker");
  });
  it("should link to create a new task", async () => {
    const component = render(<Root></Root>);

    const createGoalLink = await component.findByTestId("create-goal-link");
    expect(createGoalLink.textContent).toEqual("Track a new goal");
    expect(createGoalLink.getAttribute("href")).toEqual("/goals/new");
  });
  it("should link to create a new task", async () => {
    const component = render(<Root></Root>);

    const createGoalLink = await component.findByTestId("create-goal-link");
    expect(createGoalLink.textContent).toEqual("Track a new goal");
    expect(createGoalLink.getAttribute("href")).toEqual("/goals/new");
  });
  it("should render goals", async () => {
    clearGoals();
    insertGoal({
      description: "A desc",
      type: "numerical",
    });
    insertGoal({
      description: "A second desc",
      type: "numerical",
    });

    const component = render(<Root></Root>);

    expect(component.queryAllByTestId("goal-card-0")).toHaveLength(1);
    expect(component.queryAllByTestId("goal-card-1")).toHaveLength(1);
  });
});
