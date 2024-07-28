import {
  NumericalRecord,
  YesNoRecord,
  clearGoals,
  getGoals,
  insertGoal,
  recordDaysProgress,
} from "./goal";

describe("goal", () => {
  describe("recordDaysProgress", () => {
    it("should record a yes/no progress", () => {
      clearGoals();
      insertGoal({
        description: "A description",
        type: "yes/no",
        records: [],
      });
      const [goal] = getGoals();
      const record: YesNoRecord = {
        value: true,
        date: "2020-01-01T16:00:00.000Z",
      };

      recordDaysProgress(goal, record);

      const [recordedGoal] = getGoals();
      expect(recordedGoal.records[0]).toEqual({
        value: true,
        date: "2020-01-01T16:00:00.000Z",
      });
    });
    it("should record a numerical progress", () => {
      clearGoals();
      insertGoal({
        description: "A description",
        type: "numerical",
        records: [],
      });
      const [goal] = getGoals();
      const record: NumericalRecord = {
        value: 5,
        date: "2020-01-01T16:00:00.000Z",
      };

      recordDaysProgress(goal, record);

      const [recordedGoal] = getGoals();
      expect(recordedGoal.records[0]).toEqual({
        value: 5,
        date: "2020-01-01T16:00:00.000Z",
      });
    });
    it("should overried a record if dates match", () => {
      clearGoals();
      insertGoal({
        description: "A description",
        type: "numerical",
        records: [
          {
            value: 4,
            date: "2020-01-01T16:00:00.000Z",
          },
        ],
      });
      const [goal] = getGoals();
      const record: NumericalRecord = {
        value: 5,
        date: "2020-01-01T16:00:00.000Z",
      };

      recordDaysProgress(goal, record);

      const [recordedGoal] = getGoals();
      expect(recordedGoal.records[0]).toEqual({
        value: 5,
        date: "2020-01-01T16:00:00.000Z",
      });
      expect(recordedGoal.records).toHaveLength(1);
    });
  });
});
