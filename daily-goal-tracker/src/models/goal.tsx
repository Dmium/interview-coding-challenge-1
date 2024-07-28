export type Record = NumericalRecord | YesNoRecord;

export type NumericalRecord = {
  value: number;
  date: string;
};

export type YesNoRecord = {
  value: boolean;
  date: string;
};

export type Goal =
  | {
      id?: number;
      description: string;
      type: "numerical";
      records: NumericalRecord[];
    }
  | {
      id?: number;
      description: string;
      type: "yes/no";
      records: YesNoRecord[];
    };

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

export const clearGoals = () => {
  localStorage.setItem("goals", "[]");
};

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
