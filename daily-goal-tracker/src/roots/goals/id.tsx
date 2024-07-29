import React from "react";
import { Table, Tooltip } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts";
import { GoalSummary } from "../../components/goalSummary";
import { PageLayout } from "../../components/pageLayout";
import {
  GroupedAverage,
  NumericalGoal,
  YesNoGoal,
  getGoalById,
  getNumericalAveragesByWeek,
  getYesNoAveragesByWeek,
} from "../../models/goal";

function dateToReadableString(date: Date): string {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

type FormattedAverage = {
  niceDate: string;
  average: number;
  date: Date;
};

function formatAverages(averages: GroupedAverage[]): FormattedAverage[] {
  return averages
    .map((average) => {
      const averageDate = new Date(average.startOfWeek);
      const niceDate = `${averageDate.getDate()}/${
        averageDate.getMonth() + 1
      }/${averageDate.getFullYear()}`;
      return {
        niceDate,
        average: average.average,
        date: averageDate,
      };
    })
    .sort((a, b) => Number(b.date) - Number(a.date));
}

const Averages = ({
  formattedAverages,
  unit,
}: {
  formattedAverages: FormattedAverage[];
  unit?: string;
}) => {
  return (
    <>
      <h2>Averages</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="category" dataKey="niceDate" name="Date" />
          <YAxis type="number" dataKey="average" name="average" unit={unit} />
          <Tooltip />
          <Scatter
            name="Averages"
            data={[...formattedAverages].reverse()}
            fill="#8884d8"
          />
        </ScatterChart>
      </ResponsiveContainer>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Week starting date</th>
            <th>Average</th>
          </tr>
        </thead>
        <tbody>
          {formattedAverages.map((average) => {
            return (
              <tr key={average.niceDate}>
                <td>{average.niceDate}</td>
                <td>
                  {average.average}
                  {unit}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

const YesNoTable = ({ goal }: { goal: YesNoGoal }) => {
  const averages = getYesNoAveragesByWeek(goal.records);
  const formattedAverages = formatAverages(averages).map((average) => ({
    ...average,
    average: Math.round(average.average * 100),
  }));
  return (
    <>
      <Averages formattedAverages={formattedAverages} unit="%" />
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
                  <td>{dateToReadableString(recordedDate)}</td>
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

const NumericalDisplay = ({ goal }: { goal: NumericalGoal }) => {
  const averages = getNumericalAveragesByWeek(goal.records);
  const formattedAverages = formatAverages(averages);

  return (
    <>
      <Averages formattedAverages={formattedAverages} />
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
                  <td>{dateToReadableString(recordedDate)}</td>
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
