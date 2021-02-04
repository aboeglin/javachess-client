const React = require("react");
const R = require("ramda");
const SHOW_ERRORS = process.env.SHOW_JEST_ERRORS || true;

global.console = R.map((x) => (SHOW_ERRORS ? x : jest.fn()))({
  log: console.log,
  warn: console.warn,
  error: console.error,
});

jest.mock("./src/hocs/withChess", () => (Component) => (props) => (
  <Component {...props} />
));

const mockReactRouter = () => {
  const original = require.requireActual("react-router-dom");
  return {
    ...original,
    useParams: () => ({
			id: 1,
		}),
	}
};
jest.mock("react-router-dom", () => mockReactRouter());
