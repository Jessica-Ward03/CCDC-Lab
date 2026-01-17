import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

//Checks that the header works on all pages
test("Header On All Pages", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Injects/i)).toBeInTheDocument();
  expect(screen.getByText(/Scoreboard/i)).toBeInTheDocument();
}
);