import React from "react";
import { render } from "@testing-library/react";
import NoLoggedIn from "./NoLoggedIn";

it("renders without crashing", function() {
  render(<NoLoggedIn />);
});
