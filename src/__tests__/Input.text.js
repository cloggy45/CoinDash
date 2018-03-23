import React from "react";
import ReactDOM from "react-dom";

import { createRenderer } from "react-test-renderer/shallow";
import Input from "../components/Input";

const setup = () => {
  const props = {
    label: "none"
  };

  const renderer = createRenderer();
  renderer.render(<Input {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
    renderer: renderer
  };
};

describe("<Input />", () => {
  it("Renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Input />, div);
  });

  it("Render correctly", () => {
    const { output } = setup();
    expect(output.type).toBe("div");
    console.log(output.props);

    const [label, input] = output.props.children;
    expect(label.type).toBe("label");
    expect(input.type).toBe("input");
  });
});
