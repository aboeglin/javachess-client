// https://github.com/i18next/react-i18next/blob/master/example/test-jest/__mocks__/react-i18next.js

const React = require('react');
const reactI18next = require('react-i18next');
const cleanStack = require('clean-stack');

const hasChildren = node =>
  node && (node.children || (node.props && node.props.children));

const getChildren = node =>
  node && node.children ? node.children : node.props && node.props.children;

const renderNodes = reactNodes => {
  try {
    if (typeof reactNodes === 'string') {
      return reactNodes;
    }

    return Object.keys(reactNodes).map((key, i) => {
      const child = reactNodes[key];
      const isElement = React.isValidElement(child);

      if (typeof child === 'string') {
        return child;
      }
      if (hasChildren(child)) {
        const inner = renderNodes(getChildren(child));
        return React.cloneElement(child, { ...child.props, key: i }, inner);
      }
      if (!child) console.log('child', key, '>>>', child, 'NO CHILD');
      if (child && typeof child === 'object' && !isElement) {
        return Object.keys(child).reduce(
          (str, childKey) => `${str}${child[childKey]}`,
          ''
        );
      }
      if (!child) return '';

      return child;
    });
  } catch (e) {
    if (e.stack) {
      console.warn(cleanStack(e.stack));
    } else {
      console.warn(cleanStack(e));
    }
  }
};

const useMock = [k => k, {}];
useMock.t = k => k;
useMock.i18n = {};

module.exports = {
  /* eslint-disable react/display-name */
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  ),
  /* eslint-enable react/display-name */
  Trans: ({ children }) => renderNodes(children),
  Translation: ({ children }) => children(k => k, { i18n: {} }),
  useTranslation: () => useMock,

  // mock if needed
  I18nextProvider: reactI18next.I18nextProvider,
  initReactI18next: reactI18next.initReactI18next,
  setDefaults: reactI18next.setDefaults,
  getDefaults: reactI18next.getDefaults,
  setI18n: reactI18next.setI18n,
  getI18n: reactI18next.getI18n,
};
