import React from "react";
import { render } from "@testing-library/react";
import useToggle from "./useToggle";

it("renders without crashing", function() {
  render(<useToggle />);
});
