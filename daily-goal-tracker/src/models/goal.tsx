import moment from "moment";

export type Record = NumericalRecord | YesNoRecord;

export type NumericalRecord = {
  value: number;
  date: string;
};

export type YesNoRecord = {
  value: boolean;
  date: string;
};

export type NumericalGoal = {
  id?: number;
  description: string;
  type: "numerical";
  records: NumericalRecord[];
};

export type YesNoGoal = {
  id?: number;
  description: string;
  type: "yes/no";
  records: YesNoRecord[];
};

export type Goal = NumericalGoal | YesNoGoal;

// ------------------Pretend there's an API around here ----------------------
export const getGoals = (): Goal[] => {
  return JSON.parse(localStorage.getItem("goals") ?? "[]");
};
export const getGoalById = (id: number): Goal | undefined => {
  return getGoals().find((goal) => goal.id === id);
};

export const setGoals = (goals: Goal[]): Goal[] => {
  localStorage.setItem("goals", JSON.stringify(goals));
  return goals;
};

export const insertGoal = (goalToInsert: Goal): Goal => {
  const goals = getGoals();
  const goal: Goal = { ...goalToInsert, id: goals.length };
  localStorage.setItem("goals", JSON.stringify([...goals, goal]));
  return goal;
};

export const seedGoals = () => {
  localStorage.setItem(
    "goals",
    '[{"description":"Day 1","type":"numerical","records":[{"value":10,"date":"2024-07-27T23:00:00.000Z"},{"value":20,"date":"2024-08-02T23:00:00.000Z"},{"value":2,"date":"2024-07-24T23:00:00.000Z"}],"id":0},{"description":"Yes and no","type":"yes/no","records":[{"value":true,"date":"2024-07-28T23:00:00.000Z"},{"value":false,"date":"2024-07-27T23:00:00.000Z"},{"value":true,"date":"2024-07-14T23:00:00.000Z"},{"value":false,"date":"2024-07-13T23:00:00.000Z"},{"value":true,"date":"2024-06-09T23:00:00.000Z"},{"value":false,"date":"2024-06-10T23:00:00.000Z"},{"value":true,"date":"2024-06-08T23:00:00.000Z"}],"id":1}]'
  );
};

export const clearGoals = () => {
  localStorage.setItem("goals", "[]");
};
// ---------------------------------------------------------------------------

const addOrOverwriteRecord = (goal: Goal, record: Record) => {
  const foundRecordIndex = goal.records.findIndex(
    (rec) => rec.date === record.date
  );
  if (goal.type === "numerical" && typeof record.value === "number") {
    if (foundRecordIndex !== -1) {
      goal.records[foundRecordIndex] = record;
    } else {
      goal.records.push(record);
    }
  }
  // Typescript compiler doesn't undetstand that the same operation can be applied to both types
  if (goal.type === "yes/no" && typeof record.value === "boolean") {
    if (foundRecordIndex !== -1) {
      goal.records[foundRecordIndex] = record;
    } else {
      goal.records.push(record);
    }
  }
  return goal;
};

export const recordDaysProgress = (goalToUpdate: Goal, record: Record) => {
  const goal = addOrOverwriteRecord(goalToUpdate, record);
  const goals = getGoals();
  const goalEntity = goals.find((g) => g.id === goal.id)!;
  goalEntity.records = goal.records;
  setGoals(goals);
};

export function groupRecordsByWeek<T extends Record>(
  records: T[]
): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  records.forEach((record) => {
    const weekIdentifier = `${moment(record.date).year()}-${moment(
      record.date
    ).week()}`;
    const weekRecords = groups.get(weekIdentifier) ?? [];
    weekRecords.push(record);
    groups.set(weekIdentifier, weekRecords);
  });
  return groups;
}
export type GroupedAverage = { startOfWeek: string; average: number };
export const getNumericalAveragesByWeek = (
  records: NumericalRecord[]
): GroupedAverage[] => {
  const groupedAverages: GroupedAverage[] = [];
  const groupedRecords = groupRecordsByWeek(records);
  groupedRecords.forEach((records, weekIdentifier) => {
    const [year, week] = weekIdentifier.split("-");
    groupedAverages.push({
      startOfWeek: moment(new Date(`${year}-01-05T12:00:00.000Z`))
        .hour(0)
        .week(parseInt(week))
        .hour(0)
        .weekday(0)
        .toISOString(true),
      average:
        records.reduce((acc, record) => acc + record.value, 0) / records.length,
    });
  });
  return groupedAverages;
};

export const getYesNoAveragesByWeek = (
  records: YesNoRecord[]
): GroupedAverage[] => {
  const groupedAverages: GroupedAverage[] = [];
  const groupedRecords = groupRecordsByWeek(records);
  groupedRecords.forEach((records, weekIdentifier) => {
    const [year, week] = weekIdentifier.split("-");
    groupedAverages.push({
      startOfWeek: moment(new Date(`${year}-01-05T12:00:00.000Z`))
        .hour(0)
        .week(parseInt(week))
        .hour(0)
        .weekday(0)
        .toISOString(true),
      average:
        records.reduce((acc, record) => acc + (record.value ? 1 : 0), 0) / 7,
    });
  });
  return groupedAverages;
};
