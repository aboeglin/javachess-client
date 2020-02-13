import React from "react";
import ReactDOM from "react-dom";
import { keys, pipe, propOr, curry } from "ramda";
import renderer from "react-test-renderer";
import cleanStack from "clean-stack";
import { Helmet } from "react-helmet";

beforeEach(() => {
  process.env.GATSBY_ENTRYPOINT = "/";
});

export const hasNonEmptyPropTypes = x => {
  const propTypes = propOr(false, "propTypes", x);
  // () => <span>cool</span> is valid, so no need for propTypes
  if (!propTypes) return true;
  // expect some keys if defined
  return pipe(keys, z => z.length > 0)(propTypes);
};

export const render = (C, props = {}, el = "div") => {
  try {
    const div = document.createElement(el);
    ReactDOM.render(
      <>
        <div id="leafletmap" />
        <C {...props} />
      </>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  } catch (error) {
    console.error(error.stack ? cleanStack(error.stack) : error);
  }
};
export const renderize = (C, props = {}, el = "div") => () => {
  try {
    const rend = () => {
      try {
        render(C, props, el);
      } catch (error) {
        if (error.stack) error.stack = cleanStack(error.stack);
        console.error(error.stack ? error.stack : error);
        throw error;
      }
    };
    expect(rend).not.toThrow();
  } catch (error) {
    console.error(error.stack ? cleanStack(error.stack) : error);
  }
};

const nameOf = C => C.displayName || C.name || "A Component";

export const renderWithTestRenderer = curry((C, props) => {
  it(`renders <${nameOf(C)} />`, () => {
    try {
      const c = renderer.create(<C {...props} />);
      let tree = c.toJSON();
      expect(tree).toMatchSnapshot();
    } catch (error) {
      console.log(error.stack ? cleanStack(error.stack) : error);
    }
  });
});

export const standardComponentTest = (C, props = {}, el = "div") => {
  renderWithTestRenderer(C, props);
  it("renders without crashing", renderize(C, props, el));
  it("has propTypes", () => {
    expect(hasNonEmptyPropTypes(C)).toBeTruthy();
  });
};

export const standardComponentTestWithHeadTest = (
  C,
  props = {},
  el = "div",
  headProperty = "",
  headData = null
) => {
  renderWithTestRenderer(C, props);
  it("renders without crashing", renderize(C, props, el));
  it("has propTypes", () => {
    expect(hasNonEmptyPropTypes(C)).toBeTruthy();
  });
  it("has correct head props", () => {
    headData
      ? expect(Helmet.peek()).toHaveProperty(headProperty, headData)
      : expect(Helmet.peek()).toHaveProperty(headProperty);
  });
};
