import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from '../App';

test("Inject Page Show Banner", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const img = screen.getByAltText(/IUS CCDC Banner/i); // search by alt text
  expect(img).toBeInTheDocument();              // check it exists
  expect(img).toHaveAttribute("src", "Header.png"); // optional: check src
});