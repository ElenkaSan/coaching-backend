import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";

it("renders without crashing", function() {
  render(
    <BrowserRouter>
    <LoginForm />
    </BrowserRouter>);
});
