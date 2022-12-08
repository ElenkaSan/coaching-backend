import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import SignupForm from "./SignupForm";

it("renders without crashing", function() {
  render(
   <BrowserRouter>
    <SignupForm />
   </BrowserRouter>);
});
