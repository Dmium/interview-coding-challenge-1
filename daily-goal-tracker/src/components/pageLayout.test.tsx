import { render } from "@testing-library/react";
import { PageLayout } from "./pageLayout";

describe("pageLayout", () => {
  it("should render a title", async () => {
    const component = render(<PageLayout title="A title"></PageLayout>);

    expect((await component.findByRole("heading")).textContent).toEqual(
      "A title"
    );
  });
  it("should render children", async () => {
    const component = render(
      <PageLayout title="A title">
        <p data-testid="child">This is a child</p>
      </PageLayout>
    );

    expect((await component.findByTestId("child")).textContent).toEqual(
      "This is a child"
    );
  });
});
