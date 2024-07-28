import React from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GoalSummary } from "../../components/goalSummary";
import { PageLayout } from "../../components/pageLayout";
import { Goal, getAveragesByWeek, getGoalById } from "../../models/goal";

const YesNoTable = ({ goal }: { goal: Goal }) => {
  return (
    <>
      <h2>History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Yes/No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {goal.records
            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
            .map((record) => {
              const recordedDate = new Date(record.date);
              const params = new URLSearchParams();
              params.append("amendDate", record.date);
              return (
                <tr key={record.date}>
                  <td>
                    {recordedDate.getDate()}/{recordedDate.getMonth() + 1}/
                    {recordedDate.getFullYear()}
                  </td>
                  <td>{record.value ? "Yes" : "No"}</td>
                  <td>
                    <a
                      aria-label="Amend this record"
                      href={`/goals/${
                        goal.id
                      }/progress/record-yes-no?${params.toString()}`}
                    >
                      Amend
                    </a>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

const NumericalDisplay = ({ goal }: { goal: Goal }) => {
  if (goal.type === "numerical") {
    const averages = getAveragesByWeek(goal.records);
    return (
      <>
        <h2>Averages</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Week starting date</th>
              <th>Average</th>
            </tr>
          </thead>
          <tbody>
            {averages
              .sort(
                (a, b) => Date.parse(b.startOfWeek) - Date.parse(a.startOfWeek)
              )
              .map((average) => {
                const averageDate = new Date(average.startOfWeek);
                return (
                  <tr key={average.startOfWeek}>
                    <td>
                      {averageDate.getDate()}/{averageDate.getMonth() + 1}/
                      {averageDate.getFullYear()}
                    </td>
                    <td>{average.average}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <h2>History</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {goal.records
              .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
              .map((record) => {
                const recordedDate = new Date(record.date);
                const params = new URLSearchParams();
                params.append("amendDate", record.date);
                return (
                  <tr key={record.date}>
                    <td>
                      {recordedDate.getDate()}/{recordedDate.getMonth() + 1}/
                      {recordedDate.getFullYear()}
                    </td>
                    <td>{record.value}</td>
                    <td>
                      <a
                        aria-label="Amend this record"
                        href={`/goals/${
                          goal.id
                        }/progress/record-numerical?${params.toString()}`}
                      >
                        Amend
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </>
    );
  }
  return <></>;
};

export const Id: React.FC<{}> = () => {
  const { id: goalId } = useParams();
  const goal = getGoalById(parseInt(goalId!))!;
  return (
    <PageLayout title={`Goal: ${goal.description}`}>
      <GoalSummary goal={goal} showLinks></GoalSummary>
      {goal.type === "yes/no" && <YesNoTable goal={goal}></YesNoTable>}
      {goal.type === "numerical" && (
        <NumericalDisplay goal={goal}></NumericalDisplay>
      )}
    </PageLayout>
  );
};
