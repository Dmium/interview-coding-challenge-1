import React from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { PageLayout } from "../../components/pageLayout";
import { Goal, getGoalById } from "../../models/goal";

const YesNoTable = ({ goal }: { goal: Goal }) => {
  return (
    <>
      <h2>History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Yes/No</th>
          </tr>
        </thead>
        <tbody>
          {goal.records
            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
            .map((record) => {
              const recordedDate = new Date(record.date);
              return (
                <tr key={record.date}>
                  <td>
                    {recordedDate.getDate()}/{recordedDate.getMonth() + 1}/
                    {recordedDate.getFullYear()}
                  </td>
                  <td>{record.value ? "Yes" : "No"}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

const NumericalTable = ({ goal }: { goal: Goal }) => {
  return (
    <>
      <h2>History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {goal.records
            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
            .map((record) => {
              const recordedDate = new Date(record.date);
              return (
                <tr key={record.date}>
                  <td>
                    {recordedDate.getDate()}/{recordedDate.getMonth() + 1}/
                    {recordedDate.getFullYear()}
                  </td>
                  <td>{record.value}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export const Id: React.FC<{}> = () => {
  const { id: goalId } = useParams();
  const goal = getGoalById(parseInt(goalId!))!;
  return (
    <PageLayout title={`Goal: ${goal.description}`}>
      {goal.type === "yes/no" && <YesNoTable goal={goal}></YesNoTable>}
      {goal.type === "numerical" && (
        <NumericalTable goal={goal}></NumericalTable>
      )}
    </PageLayout>
  );
};
