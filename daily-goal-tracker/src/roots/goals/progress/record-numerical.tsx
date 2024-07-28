import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "../../../components/pageLayout";
import { useForm } from "../../../components/useForm";
import { getGoalById, recordDaysProgress } from "../../../models/goal";

export const RecordNumerical: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date();
  const { id: goalId } = useParams();

  const initialDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  const initialState = {
    date: initialDate,
    value: "",
  };

  const submit = () => {
    const goal = getGoalById(parseInt(goalId!))!;
    const dateParts = values.date.split("/").map((part) => parseInt(part));
    recordDaysProgress(goal, {
      value: parseInt(values.value),
      date: new Date(
        dateParts[2],
        dateParts[1] - 1,
        dateParts[0]
      ).toISOString(),
    });
    navigate("/");
  };
  const { onChange, onSubmit, values } = useForm(submit, initialState);

  return (
    <div>
      <PageLayout title="Record progress">
        <form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Enter date (DD/MM/YYYY):</Form.Label>
            <Form.Control
              type="text"
              name="date"
              placeholder="DD/MM/YYYY"
              data-testid="date"
              defaultValue={initialDate}
              onChange={onChange}
            />
            <Form.Label>Enter amount:</Form.Label>
            <Form.Control
              type="number"
              name="value"
              data-testid="value"
              onChange={onChange}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            aria-label="Submit this record"
          >
            Record
          </Button>
        </form>
      </PageLayout>
    </div>
  );
};
