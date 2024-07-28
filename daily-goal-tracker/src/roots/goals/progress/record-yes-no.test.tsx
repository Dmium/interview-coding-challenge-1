import { fireEvent, render } from "@testing-library/react";
import { clearGoals, insertGoal } from "../../../models/goal";
import { RecordYesNo } from "./record-yes-no";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useParams: () => ({ id: "0" }),
}));

const mockedRecordDaysProgress = jest.fn();

jest.mock("../../../models/goal", () => ({
  ...(jest.requireActual("../../../models/goal") as any),
  recordDaysProgress: (...args: any[]) => mockedRecordDaysProgress(...args),
}));

describe("recordYesNo", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2020-01-01T00:00:00.000Z"));
  });
  it("should have the correct title content", async () => {
    const component = render(<RecordYesNo></RecordYesNo>);

    const title = await component.findByRole("heading");
    expect(title.textContent).toEqual("Record progress");
  });
  it("should recordDaysProgress as yes", async () => {
    clearGoals();
    insertGoal({
      description: "A desc",
      type: "numerical",
      records: [],
    });
    const component = render(<RecordYesNo></RecordYesNo>);
    const yesButton = await component.findByText("Yes");

    fireEvent.click(yesButton);

    expect(mockedRecordDaysProgress).toHaveBeenCalledWith(expect.anything(), {
      value: true,
      date: "2020-01-01T00:00:00.000Z",
    });
  });
  it("should recordDaysProgress as no", async () => {
    clearGoals();
    insertGoal({
      description: "A desc",
      type: "numerical",
      records: [],
    });
    const component = render(<RecordYesNo></RecordYesNo>);
    const noButton = await component.findByText("No");

    fireEvent.click(noButton);

    expect(mockedRecordDaysProgress).toHaveBeenCalledWith(expect.anything(), {
      value: false,
      date: "2020-01-01T00:00:00.000Z",
    });
  });
});
