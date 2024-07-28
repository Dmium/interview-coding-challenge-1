import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../../components/pageLayout";
import { useForm } from "../../components/useForm";
import { Goal, insertGoal } from "../../models/goal";

export const NewGoal: React.FC = () => {
  const navigate = useNavigate();
  const initialState: Goal = {
    description: "",
    type: "numerical",
    records: [],
  };
  const { onChange, onSubmit, values } = useForm(() => {
    insertGoal(values);
    navigate("/");
  }, initialState);
  return (
    <div>
      <PageLayout title="Track a new goal">
        <form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter description"
              data-testid="description"
              onChange={onChange}
            />
            <div key={`inline-radio`} className="mb-3 mt-2">
              <Form.Check
                inline
                value="numerical"
                label="numerical"
                name="type"
                type="radio"
                data-testid="numerical"
                onChange={onChange}
              />
              <Form.Check
                inline
                value="yes/no"
                label="yes/no"
                name="type"
                type="radio"
                data-testid="yes-no"
                onChange={onChange}
              />
            </div>
          </Form.Group>
          <Button type="submit" data-testid="save">
            Save Goal
          </Button>
        </form>
      </PageLayout>
    </div>
  );
};
