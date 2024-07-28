import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { PageLayout } from "../../../components/pageLayout";
import { useForm } from "../../../components/useForm";
import { getGoalById, recordDaysProgress } from "../../../models/goal";

export const RecordYesNo: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date();
  const { id: goalId } = useParams();

  const initialDate = `${today.getDate()}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  const initialState = {
    date: initialDate,
  };
  const { onChange, onSubmit, values } = useForm(() => {}, initialState);

  const onYes = () => {
    submit(true);
  };

  const onNo = () => {
    submit(false);
  };

  const submit = (value: boolean) => {
    const goal = getGoalById(parseInt(goalId!))!;
    const dateParts = values.date.split("/").map((part) => parseInt(part));
    recordDaysProgress(goal, {
      value,
      date: new Date(
        dateParts[2],
        dateParts[1] - 1,
        dateParts[0]
      ).toISOString(),
    });
    navigate("/");
  };

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
          </Form.Group>
          <Button variant="primary" onClick={onYes}>
            Yes
          </Button>
          <Button variant="secondary" onClick={onNo} className="mr-3">
            No
          </Button>
        </form>
      </PageLayout>
    </div>
  );
};
