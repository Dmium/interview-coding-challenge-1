import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NewGoal } from "./roots/goals/new";
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Daily Goal Tracker</Navbar.Brand>
        <Nav.Link
          onClick={() => {
            localStorage.setItem("goals", "[]");
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
