import {
  NumericalRecord,
  YesNoRecord,
  clearGoals,
  getGoals,
  getNumericalAveragesByWeek,
  getYesNoAveragesByWeek,
  groupRecordsByWeek,
  insertGoal,
  recordDaysProgress,
} from "./goal";

describe("goal", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2020-01-01T00:00:00.000Z"));
  });
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
  describe("caluclateWeeklyAverages", () => {
    describe("groupRecordsByWeek", () => {
      it("should group records by week", () => {
        const records: NumericalRecord[] = [
          {
            value: 1,
            date: "2024-07-23",
          },
          {
            value: 2,
            date: "2024-07-27",
          },
          {
            value: 3,
            date: "2024-07-18",
          },
        ];

        const groups = groupRecordsByWeek(records);

        expect(groups.get("2024-30")).toEqual([
          { value: 1, date: "2024-07-23" },
          { value: 2, date: "2024-07-27" },
        ]);
        expect(groups.get("2024-29")).toEqual([
          { value: 3, date: "2024-07-18" },
        ]);
      });
    });
    it("should calculate weekly numerical averages", () => {
      const records: NumericalRecord[] = [
        {
          value: 1,
          date: "2024-07-23",
        },
        {
          value: 2,
          date: "2024-07-27",
        },
        {
          value: 3,
          date: "2024-07-18",
        },
      ];

      const averages = getNumericalAveragesByWeek(records);

      expect(averages[0]).toEqual({
        startOfWeek: "2024-07-21T00:00:00.000+01:00",
        average: 1.5,
      });
      expect(averages[1]).toEqual({
        startOfWeek: "2024-07-14T00:00:00.000+01:00",
        average: 3,
      });
    });
    it("should calculate weekly yes/no averages", () => {
      const records: YesNoRecord[] = [
        {
          value: true,
          date: "2024-07-23",
        },
        {
          value: true,
          date: "2024-07-27",
        },
        {
          value: false,
          date: "2024-07-24",
        },
        {
          value: false,
          date: "2024-07-18",
        },
      ];

      const averages = getYesNoAveragesByWeek(records);

      expect(averages[0]).toEqual({
        startOfWeek: "2024-07-21T00:00:00.000+01:00",
        average: 2 / 7,
      });
      expect(averages[1]).toEqual({
        startOfWeek: "2024-07-14T00:00:00.000+01:00",
        average: 0,
      });
    });
  });
});
