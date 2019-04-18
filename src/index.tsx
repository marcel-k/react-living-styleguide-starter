import React from 'react';
import ReactDOM from 'react-dom';
import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components/macro';

import App from './App';

const NormalizedStyle = createGlobalStyle`
  ${styledNormalize}
  
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
  }
`;

// TODO: in the near future, CRA will probably include normalize out of the box.
const Root = () => (
  <React.Fragment>
    <NormalizedStyle />
    <App />
  </React.Fragment>
);

ReactDOM.render(<Root />, document.getElementById('root'));
