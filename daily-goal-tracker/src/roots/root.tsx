import React from "react";
import { PageLayout } from "../components/pageLayout";

export const Root: React.FC = () => {
  return (
    <PageLayout title="Daily Goal Tracker">
      <a
        href="/goals/new"
        className="btn btn-primary"
        data-testId="create-goal-link"
      >
        Track a new goal
      </a>
    </PageLayout>
  );
};
