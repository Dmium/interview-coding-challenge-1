import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { clearGoals } from "./models/goal";
import { Id } from "./roots/goals/id";
import { NewGoal } from "./roots/goals/new";
import { RecordNumerical } from "./roots/goals/progress/record-numerical";
import { RecordYesNo } from "./roots/goals/progress/record-yes-no";
import { Root } from "./roots/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/goals/new",
    element: <NewGoal />,
  },
  {
    path: "/goals/:id/progress/record-yes-no",
    element: <RecordYesNo />,
  },
  {
    path: "/goals/:id/progress/record-numerical",
    element: <RecordNumerical />,
  },
  {
    path: "/goals/:id",
    element: <Id />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Daily Goal Tracker</Navbar.Brand>
        <Nav.Link
          onClick={() => {
            clearGoals();
            location.reload();
          }}
        >
          Clear Data
        </Nav.Link>
      </Container>
    </Navbar>
    <Container className="mt-5">
      <RouterProvider router={router} />
    </Container>
  </React.StrictMode>
);
