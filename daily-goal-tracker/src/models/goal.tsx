export interface Goal {
  id?: number;
  description: string;
  type: "numerical" | "yes/no";
}

export const getGoals = (): Goal[] => {
  return JSON.parse(localStorage.getItem("goals") ?? "[]");
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
