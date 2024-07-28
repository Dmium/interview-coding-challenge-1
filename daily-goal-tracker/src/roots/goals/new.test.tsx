import { render } from "@testing-library/react";
import { NewGoal } from "./new";

describe("pageLayout", () => {
  it("should have the correct title content", async () => {
    const component = render(<NewGoal></NewGoal>);

    const title = await component.findByRole("heading");
    expect(title.textContent).toEqual("Track a new goal");
  });
});
