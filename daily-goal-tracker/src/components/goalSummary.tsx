import { Card } from "react-bootstrap";
import { Goal } from "../models/goal";

export interface GoalSummaryProps {
  goal: Goal;
  showLinks?: boolean;
}

export const GoalSummary: React.FC<GoalSummaryProps> = ({
  goal,
  showLinks,
}) => {
  return (
    <div data-testid={`goal-card-${goal.id}`}>
      <Card style={{ width: "18rem" }} className="mb-3">
        <Card.Body>
          <Card.Title>{goal.description}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {goal.type === "numerical" ? "Numerical" : "Yes/No"}
          </Card.Subtitle>
          {showLinks && (
            <>
              <Card.Link
                data-testid="record-link"
                href={`/goals/${goal.id}/progress/record-yes-no`}
              >
                Record progress
              </Card.Link>
              <Card.Link data-testid="report-link" href="#">
                View Reports
              </Card.Link>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
