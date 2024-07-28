import React from "react";
import { GoalSummary } from "../components/goalSummary";
import { PageLayout } from "../components/pageLayout";
import { getGoals } from "../models/goal";

export const Root: React.FC = () => {
  return (
    <PageLayout title="Daily Goal Tracker">
      <a
        href="/goals/new"
        className="btn btn-primary mb-3"
        data-testid="create-goal-link"
      >
        Track a new goal
      </a>
      {getGoals().map((goal) => {
        return (
          <div key={goal.id!}>
            <GoalSummary goal={goal} showLinks></GoalSummary>
          </div>
        );
      })}
    </PageLayout>
  );
};
