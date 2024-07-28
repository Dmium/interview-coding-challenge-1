import React from "react";
import { Button } from "react-bootstrap";
import { PageLayout } from "../components/pageLayout";

export const Root: React.FC = () => {
  return (
    <PageLayout title="Daily Goal Tracker">
      <Button href="/goals/new">Track a new goal</Button>
    </PageLayout>
  );
};
