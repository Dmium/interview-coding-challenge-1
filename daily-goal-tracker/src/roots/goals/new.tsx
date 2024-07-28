import React from "react";
import { Button } from "react-bootstrap";
import { PageLayout } from "../../components/pageLayout";

export const NewGoal: React.FC = () => {
  return (
    <div>
      <PageLayout title="Track a new goal">
        <Button href="/goals/new">Track a new goal</Button>
      </PageLayout>
    </div>
  );
};
