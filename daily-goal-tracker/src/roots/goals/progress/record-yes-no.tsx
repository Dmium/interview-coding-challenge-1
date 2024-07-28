import React from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PageLayout } from "../../../components/pageLayout";
import { useForm } from "../../../components/useForm";
import { getGoalById, recordDaysProgress } from "../../../models/goal";

export const RecordYesNo: React.FC = () => {
  const navigate = useNavigate();
  const { id: goalId } = useParams();
  const [searchParams] = useSearchParams();

  const amendDate = searchParams.get("amendDate") ?? undefined;
  const initialDateDate = amendDate ? new Date(amendDate) : new Date();

  const initialDate = `${initialDateDate.getDate()}/${
    initialDateDate.getMonth() + 1
  }/${initialDateDate.getFullYear()}`;

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
          <ButtonGroup>
            <Button variant="primary" onClick={onYes}>
              Yes
            </Button>
            <Button variant="secondary" onClick={onNo} className="mr-3">
              No
            </Button>
          </ButtonGroup>
        </form>
      </PageLayout>
    </div>
  );
};
