import { render } from "@testing-library/react";
import { Goal } from "../models/goal";
import { GoalSummary } from "./goalSummary";

describe("goalSummary", () => {
  it("should render a numerical goal", async () => {
    const goal: Goal = {
      description: "A description",
      type: "numerical",
      id: 1,
    };

    const component = render(<GoalSummary goal={goal}></GoalSummary>);

    const cardText = component.getByTestId("goal-card-1").textContent;
    expect(cardText).toContain("A description");
    expect(cardText).toContain("Numerical");
  });
  it("should render a yes/no goal", async () => {
    const goal: Goal = {
      description: "A description",
      type: "yes/no",
      id: 1,
    };

    const component = render(<GoalSummary goal={goal}></GoalSummary>);

    const cardText = component.getByTestId("goal-card-1").textContent;
    expect(cardText).toContain("A description");
    expect(cardText).toContain("Yes/No");
  });
  it("should render links if requested", async () => {
    const goal: Goal = {
      description: "A description",
      type: "yes/no",
      id: 1,
    };

    const component = render(<GoalSummary goal={goal} showLinks></GoalSummary>);

    expect(component.queryAllByTestId("record-link")).toHaveLength(1);
    expect(component.queryAllByTestId("report-link")).toHaveLength(1);
  });
  it("should not render links by default", async () => {
    const goal: Goal = {
      description: "A description",
      type: "yes/no",
      id: 1,
    };

    const component = render(<GoalSummary goal={goal}></GoalSummary>);

    expect(component.queryAllByTestId("record-link")).toHaveLength(0);
    expect(component.queryAllByTestId("report-link")).toHaveLength(0);
  });
});
