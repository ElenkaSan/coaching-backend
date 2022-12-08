import React from "react";
import { render } from "@testing-library/react";
import useLocalStorage from "./useLocalStorage";

it("renders without crashing", function() {
  render(<useLocalStorage />);
});
