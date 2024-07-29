import { fireEvent, render } from "@testing-library/react";
import { clearGoals, insertGoal } from "../../../models/goal";
import { RecordNumerical } from "./record-numerical";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
  useSearchParams: () => [{ get: jest.fn() }],
  useParams: () => ({ id: "0" }),
}));

const mockedRecordDaysProgress = jest.fn();

jest.mock("../../../models/goal", () => ({
  ...(jest.requireActual("../../../models/goal") as any),
  recordDaysProgress: (...args: any[]) => mockedRecordDaysProgress(...args),
}));

describe("recordNumerical", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2020-01-01T00:00:00.000Z"));
    clearGoals();
    insertGoal({
      description: "A desc",
      type: "yes/no",
      records: [],
    });
  });
  it("should have the correct title content", async () => {
    const component = render(<RecordNumerical></RecordNumerical>);

    const title = await component.findByRole("heading");
    expect(title.textContent).toEqual("Record progress");
  });
  it("should recordDaysProgress with amount", async () => {
    clearGoals();
    insertGoal({
      description: "A desc",
      type: "numerical",
      records: [],
    });
    const component = render(<RecordNumerical></RecordNumerical>);
    const recordButton = await component.findByText("Record");
    const amountInput = await component.findByTestId("value");

    fireEvent.change(amountInput, { target: { value: "5" } });
    fireEvent.click(recordButton);

    expect(mockedRecordDaysProgress).toHaveBeenCalledWith(expect.anything(), {
      value: 5,
      date: "2020-01-01T00:00:00.000Z",
    });
  });
});
