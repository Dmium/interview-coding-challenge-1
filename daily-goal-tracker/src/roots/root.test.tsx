import { render } from "@testing-library/react";
import { Root } from "./root";

describe("pageLayout", () => {
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
});
